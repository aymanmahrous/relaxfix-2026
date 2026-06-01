-- SQL migration: create RPC function to insert order and decrement user credits atomically
-- Run this in your Supabase SQL editor or as a migration.

create or replace function public.create_order_with_decrement(
  user_id_input text,
  order_json jsonb,
  decrement_amount int
) returns jsonb language plpgsql security definer as $$
declare
  v_wallet_balance integer;
  v_inserted record;
begin
  perform pg_advisory_xact_lock(hashtext(user_id_input)); -- avoid race

  select balance_credits into v_wallet_balance from public.user_wallets where user_id = user_id_input for update;

  if found and v_wallet_balance is not null and v_wallet_balance >= decrement_amount then
    update public.user_wallets set balance_credits = balance_credits - decrement_amount where user_id = user_id_input;
  end if;

  insert into public.orders (data, status, created_at)
  values (order_json, 'new', now())
  returning * into v_inserted;

  return row_to_json(v_inserted);
exception when others then
  raise;
end;
$$;

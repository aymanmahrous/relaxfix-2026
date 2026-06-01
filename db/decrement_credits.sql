-- SQL migration: create decrement_credits RPC used by older code paths
create or replace function public.decrement_credits(user_id_input text, amount int)
returns void language plpgsql security definer as $$
declare
  v_balance integer;
begin
  perform pg_advisory_xact_lock(hashtext(user_id_input));
  select balance_credits into v_balance from public.user_wallets where user_id = user_id_input for update;
  if found and v_balance is not null and v_balance >= amount then
    update public.user_wallets set balance_credits = balance_credits - amount where user_id = user_id_input;
  else
    -- silently ignore if no balance or insufficient funds
    null;
  end if;
end;
$$;

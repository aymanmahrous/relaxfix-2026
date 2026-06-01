-- db/create_order_with_decrement.sql
-- example migration to create RPC that wraps order creation and credits decrement

CREATE OR REPLACE FUNCTION public.create_order_with_decrement(
  p_user_id uuid,
  p_service_id uuid,
  p_amount numeric
)
RETURNS void AS $$
BEGIN
  INSERT INTO orders (user_id, service_id, amount, created_at) VALUES (p_user_id, p_service_id, p_amount, now());
  PERFORM public.decrement_credits(p_user_id, 1);
END;
$$ LANGUAGE plpgsql;

-- db/decrement_credits.sql
-- example migration to decrement credits function

CREATE OR REPLACE FUNCTION public.decrement_credits(user_id uuid, amount integer)
RETURNS void AS $$
BEGIN
  UPDATE profiles SET credits = credits - amount WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

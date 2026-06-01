# Deployment & Secrets (Render / GitHub Actions)

This file contains quick instructions to securely configure environment variables required by the project and to apply the supplied SQL migrations in Supabase.

Required environment variables (set these in GitHub Secrets or Render Environment):

- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_ANON_KEY (optional, for client-side)
- OPENAI_API_KEY
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHAT_ID
- WHATSAPP_API_KEY
- WHATSAPP_ADMIN
- SENDGRID_API_KEY (or SMTP credentials)
- STRIPE_SECRET_KEY (if using Stripe)
- STRIPE_PUBLISHABLE_KEY
- ADMIN_PASSWORD_HASH
- PHONE_NUMBER
- ADMIN_PASS

Steps:
1. Rotate any keys exposed in the repository (do this now in Supabase dashboard).
2. Add the variables above to your Render Service environment variables or GitHub Actions Secrets.
3. In Supabase SQL editor, run the SQL files in `db/` folder to create the recommended RPC functions:
   - db/decrement_credits.sql
   - db/create_order_with_decrement.sql
4. On GitHub: create branch `feature/saaS-revamp` (already created) and push changes. Configure Render to auto-deploy this branch for staging.

Notes:
- Never commit secret keys into the repository.
- Use SUPABASE_SERVICE_ROLE_KEY only on server-side functions (do not expose to clients).

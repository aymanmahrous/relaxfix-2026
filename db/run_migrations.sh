#!/usr/bin/env bash
set -euo pipefail

if [ -z "${DATABASE_URL:-}" ]; then
  echo "ERROR: DATABASE_URL (SUPABASE_DB_URL) is not set. Add it as a repository secret named SUPABASE_DB_URL."
  exit 1
fi

echo "Starting DB migrations using psql..."

# Run each SQL file in the db directory in alphabetical order
for f in db/*.sql; do
  echo "Running migration: $f"
  psql "$DATABASE_URL" -f "$f"
  echo "Finished: $f"
done

echo "All migrations applied."

# Runs a server with database in development mode
run-db-dev:
	npx prisma dev

# Run this command to create a new migration with a specific name
# Example: make migrate-dev name=add_users_table
migrate-dev:
	npx prisma migrate dev --name "$(name)"

# Run this command to create a new migration without a specific name, you can specify it during the prompt
migrate-dev-no-param:
	npx prisma migrate dev

# Run this command to generate Prisma Client
# If any changes are made to your schema, you will need to rerun the generate command to keep those types in sync.
prisma-generate:
	npx prisma generate

# Run this command to seed the database
prisma-seed:
	npx prisma db seed

prisma-reset:
	npx prisma migrate reset --force

prisma-reload:
	make prisma-reset
	make prisma-generate
	make migrate-dev-no-param
	make prisma-seed

generate-password-hash:
	npx tsx scripts/generatePasswordHash.ts

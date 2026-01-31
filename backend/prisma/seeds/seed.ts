import { PrismaClient } from '@prisma-generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

class OrmService extends PrismaClient {
  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
    super({ adapter });
  }
}

const orm = new OrmService();

async function main() {
  // Password hashes generated via `make generate-password-hash`
  await orm.user.create({
    data: {
      email: 'test@test.test',
      password: '$2b$10$fzlKGjzqYp2QNet0n5AAlOEsfVRaxYR/TDWUnfohlcLdq6VIvRVjy',
    },
  });
  await orm.user.create({
    data: {
      email: 'admin@admin.admin',
      role: 'ADMIN',
      password: '$2b$10$fzlKGjzqYp2QNet0n5AAlOEsfVRaxYR/TDWUnfohlcLdq6VIvRVjy',
    },
  });
  await orm.$disconnect();
}

void main();

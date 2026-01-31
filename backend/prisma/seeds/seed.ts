import { PrismaClient } from '@prisma-generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

class OrmService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({ url: process.env.DATABASE_URL });
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
      role: 'asd',
      password: '$2b$10$fzlKGjzqYp2QNet0n5AAlOEsfVRaxYR/TDWUnfohlcLdq6VIvRVjy',
    },
  });
  await orm.$disconnect();
}

void main();

import { PrismaClient } from '@prisma-generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { config } from 'dotenv';

config();

class OrmService extends PrismaClient {
  constructor() {
    console.log('Initializing ORM service...', process.env.DATABASE_URL);
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

  const category1 = await orm.category.create({
    data: {
      name: 'Sample Category 1',
    },
  });
  const category2 = await orm.category.create({
    data: {
      name: 'Sample Category 2',
    },
  });
  const category3 = await orm.category.create({
    data: {
      name: 'Sample Category 3',
    },
  });

  await orm.product.create({
    data: {
      name: 'Sample Product 1',
      description: '<p>This is a sample product 1.</p>',
      price: 10000,
      stock: 3,
      categories: {
        connect: [{ id: category1.id }, { id: category2.id }],
      },
    },
  });
  await orm.product.create({
    data: {
      name: 'Sample Product 2',
      description: '<p>This is a sample product 2.</p>',
      price: 2000,
      stock: 2,
      categories: {
        connect: [{ id: category2.id }, { id: category3.id }],
      },
    },
  });
  await orm.product.create({
    data: {
      name: 'Sample Product 3',
      description: '<p>This is a sample product 3.</p>',
      price: 2000,
      stock: 2,
      categories: {
        connect: [{ id: category1.id }, { id: category3.id }],
      },
    },
  });
  await orm.product.create({
    data: {
      name: 'Sample Product 4',
      description: '<p>This is a sample product 4.</p>',
      price: 100,
      stock: 1,
      categories: {
        connect: [{ id: category1.id }, { id: category2.id }, { id: category3.id }],
      },
    },
  });
  await orm.product.create({
    data: {
      name: 'Sample Product 5',
      description: '<p>This is a sample product 5.</p>',
      price: 200,
      stock: 20,
    },
  });

  await orm.$disconnect();
}

void main();

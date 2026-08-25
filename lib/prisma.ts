import { PrismaClient } from '@prisma/client';

// Vercel-safe PrismaClient singleton
// In serverless environments, each invocation may create a new module scope.
// Without this pattern, hot-reloading in dev or rapid invocations in prod
// would exhaust the database connection pool.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

globalForPrisma.prisma = prisma;

export default prisma;

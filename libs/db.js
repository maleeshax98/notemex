import { PrismaClient } from "@prisma/client";

global.prisma = global.prisma || new PrismaClient({ log: ["info"] });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

module.exports = global.prisma;


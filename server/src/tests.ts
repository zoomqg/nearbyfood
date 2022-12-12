import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const negr = await prisma.place.findMany({
  include: {
    Category: true
  }
})

console.log(negr)
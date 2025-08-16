import { PrismaClient } from "@prisma/local/client";

const prisma = new PrismaClient();
export async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export async function createUser(user: User) {
  await prisma.user.create({
    data: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    },
  });
}

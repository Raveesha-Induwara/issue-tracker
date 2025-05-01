import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const issueData: Prisma.IssueCreateInput[] = [
  {
    title: "Login page not loading",
    description: "Users are unable to access the login page on Safari browsers",
  },
  {
    title: "Profile picture upload fails",
    description:
      "Getting 500 error when trying to upload profile pictures larger than 2MB",
  },
  {
    title: "Dashboard performance issues",
    description: "Dashboard takes more than 5 seconds to load with 100+ items",
  },
];

export async function main() {
  for (const issue of issueData) {
    await prisma.issue.create({ data: issue });
  }
}

main();

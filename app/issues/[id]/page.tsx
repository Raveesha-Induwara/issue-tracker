import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import React from "react";
import Link from "next/link";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Card, Flex, Heading, Text, Grid, Box, Button } from "@radix-ui/themes";

interface Props {
  params: {
    id: string;
  };
}

const IssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    notFound();
  }
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex className="my-5" gap={"5"}>
          <IssueStatusBadge status={issue.status} />
          <Text>
            {issue.createdAt.toLocaleDateString("en-us", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </Flex>
        <Card className="prose max-w-full">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>

      <Box>
        <Button size="3" variant="solid">
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssuePage;

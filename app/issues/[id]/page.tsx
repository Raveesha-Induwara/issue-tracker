import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";

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
    <div>
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
      <Card className="prose ">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssuePage;

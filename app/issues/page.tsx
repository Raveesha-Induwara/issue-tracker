import delay from "delay";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Link from "next/link";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany({});
  await delay(2000);

  return (
    <div>
      <IssueActions />
      <div>
        <Table.Root variant="surface" className="w-full mt-4">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created At
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          {issues.length > 0 ? (
            <Table.Body>
              {issues.map((issue) => (
                <Table.Row key={issue.id}>
                  <Table.Cell>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <div className="block md:hidden">
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <IssueStatusBadge status={issue.status} />
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {issue.createdAt.toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          ) : (
            <Table.Body>
              <Table.Row>
                <Table.Cell>No issues found.</Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table.Root>
      </div>
    </div>
  );
};

export default IssuesPage;

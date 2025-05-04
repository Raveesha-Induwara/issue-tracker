"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Issue } from "../generated/prisma";
import { Button, Table, Text } from "@radix-ui/themes";

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/issues")
      .then((response) => {
        setIssues(response.data);
      })
      .catch((error) => {
        console.error("Error fetching issues:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Text>Loading...</Text>
      </div>
    );
  }
  return (
    <div>
      <Button size={"3"}>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>

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
                    {issue.title}{" "}
                    <div className="block md:hidden">{issue.status}</div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {issue.status}
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

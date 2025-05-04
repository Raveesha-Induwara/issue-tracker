import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "../generated/prisma";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <div>
      <Badge size={"3"} color={statusMap[status].color}>
        {statusMap[status].label}
      </Badge>
    </div>
  );
};

export default IssueStatusBadge;

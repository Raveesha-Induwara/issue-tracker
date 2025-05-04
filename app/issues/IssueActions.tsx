import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const IssueActions = () => {
  return (
    <div>
      <Button size={"3"}>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;

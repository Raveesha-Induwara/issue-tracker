import React from "react";
import { TextField, TextArea, Button } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root placeholder="Title" size={"3"} />
      <TextArea placeholder="Description" size={"3"} />
      <Button size={"3"}>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;

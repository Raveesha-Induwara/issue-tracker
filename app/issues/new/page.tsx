"use client";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { TextField, Button } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root placeholder="Title" size={"3"} />
      <SimpleMDE placeholder="Description" />
      <Button size={"3"}>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;

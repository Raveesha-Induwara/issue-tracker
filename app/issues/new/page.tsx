"use client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Text } from "@radix-ui/themes";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const route = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    await axios
      .post("/api/issues", data)
      .then(() => {
        alert("Issue created successfully!");
        route.push("/issues");
      })
      .catch(() => {
        alert("Failed to create issue. Please try again.");
      });
  };

  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root
        {...register("title", { required: true })}
        placeholder="Title"
        size={"3"}
      />
      {errors.title && (
        <div className="text-red-500 text-sm my-1">
          <Text>This field is required</Text>
        </div>
      )}

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <SimpleMDE
            {...field}
            autoFocus={true}
            spellCheck={true}
            placeholder="Description"
          />
        )}
        rules={{ required: true }}
      />

      {errors.description && (
        <div className="text-red-500 text-sm my-1">
          <Text>This field is required</Text>
        </div>
      )}

      <div className="my-5">
        <Button size={"3"} onClick={handleSubmit(onSubmit)}>
          Submit New Issue
        </Button>
      </div>
    </div>
  );
};

export default NewIssuePage;

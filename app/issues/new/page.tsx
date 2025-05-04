"use client";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { TextField, Button } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "../../validationSchema";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const route = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = async (data: IssueForm) => {
    setIsSubmitting(true);
    await axios
      .post("/api/issues", data)
      .then(() => {
        alert("Issue created successfully!");
        route.push("/issues");
      })
      .catch(() => {
        alert("Failed to create issue. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-lg space-y-3">
      <TextField.Root
        {...register("title", { required: true })}
        placeholder="Title"
        size={"3"}
      />
      <ErrorMessage>{errors.title?.message}</ErrorMessage>

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
      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <div className="my-5">
        <Button
          size={"3"}
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </div>
    </div>
  );
};

export default NewIssuePage;

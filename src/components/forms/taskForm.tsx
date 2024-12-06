"use client";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

const formSchema = z.object({
  titleTask: z.string().optional(),
  task: z.string().min(1, "This field can't be empty"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function TaskForm(uid: string | null | undefined) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleTask: "",
      task: "",
    },
  });

  async function handleSubmitForm(formValue: FormSchema) {
    await addDoc(collection(db, "tasks"), {
      title: formValue.titleTask,
      task: formValue.task,
      uid: { uid },
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <FormField
          name="titleTask"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-row items-center gap-1">
                Title{" "}
                <p className="text-xs text-muted-foreground">(optional)</p>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter title of task"
                  type="text"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="task"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task*</FormLabel>
              <FormControl>
                <Textarea
                  className="h-32"
                  placeholder="Enter your task"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Add task</Button>
      </form>
    </Form>
  );
}

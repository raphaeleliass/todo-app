"use client";
// form imports
import { useState } from "react";
import { useForm } from "react-hook-form";

// ui imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderCircle, Plus } from "lucide-react";

// validação de formulário imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// firebase imports
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

// context api import
import { UserProvider, UseUser } from "@/context/userContext";

// atribuição dos tipos de cada campo
const formSchema = z.object({
  titleTask: z.string().optional(),
  task: z.string().min(1, "This field can't be empty"),
});

// inferencia dos tipos
type FormSchema = z.infer<typeof formSchema>;

export default function TaskForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = UseUser();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleTask: "",
      task: "",
    },
  });

  // envio do formulário
  async function handleSubmitForm(formValue: FormSchema) {
    setLoading(true);
    try {
      await addDoc(collection(db, "tasks"), {
        title: formValue.titleTask,
        task: formValue.task,
        uid: user?.uid,
        created: new Date(),
      });
      form.reset();
      setLoading(false);
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  }

  return (
    <UserProvider>
      <Form {...form}>
        <form
          className={`flex flex-col gap-4 ${loading && "opacity-60"}`}
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
                    maxLength={28}
                    disabled={loading}
                    autoComplete="off"
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
                    className="max-h-32 min-h-32"
                    placeholder="Enter your task"
                    disabled={loading}
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : <Plus />}
          </Button>
        </form>
      </Form>
    </UserProvider>
  );
}

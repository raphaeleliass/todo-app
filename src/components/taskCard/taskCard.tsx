import { Check, Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

interface taskCardProps {
  title: string;
  task: string;
  taskID: string;
}

export default function TaskCard({ title, task, taskID }: taskCardProps) {
  async function deleteTask() {
    try {
      await deleteDoc(doc(db, "tasks", taskID));
    } catch (err) {
      alert(err);
    }
  }

  async function updateTask() {
    try {
      await updateDoc(doc(db, "tasks", taskID), {
        title: title,
        task: task,
      });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Card className="relative mx-auto flex size-60 w-full max-w-xs flex-col justify-between md:mx-0">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <CardDescription className="text-balance">{task}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-row items-center gap-2">
          <Button className="w-full" variant={"secondary"}>
            <Pencil />
          </Button>
          <Button className="w-full" variant={"default"}>
            <Check />
          </Button>
        </div>
      </CardFooter>
      <button
        className="absolute right-1 top-1 rounded-lg p-1 transition-all hover:bg-zinc-200 hover:shadow-xl"
        onClick={deleteTask}
      >
        <Trash className="size-4 text-red-600" />
      </button>
    </Card>
  );
}

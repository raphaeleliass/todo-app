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
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface taskCardProps {
  title: string;
  task: string;
  taskID: string;
}

export default function TaskCard({ title, task, taskID }: taskCardProps) {
  const [editedTask, setEditedTask] = useState<string>("");
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [taskField, setTaskField] = useState<boolean>(false);

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
        title: editedTitle,
        task: editedTask,
      });
      setTaskField(false);
    } catch (err) {
      alert(err);
    }
  }

  function editTask() {
    setTaskField(true);
  }

  return (
    <Card className="relative mx-auto flex size-60 w-full max-w-xs flex-col justify-between md:mx-0">
      <CardHeader>
        <CardTitle>
          {taskField ? (
            <Input
              defaultValue={title}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            `${title}`
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <CardDescription className="text-balance">
          {taskField ? (
            <Textarea
              defaultValue={task + editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
          ) : (
            `${task}`
          )}
        </CardDescription>
      </CardContent>
      <CardFooter>
        {taskField ? (
          <Button onClick={updateTask}>
            <Check />
          </Button>
        ) : (
          <div className="flex w-full flex-row items-center gap-2">
            <Button className="w-full" variant={"secondary"} onClick={editTask}>
              <Pencil />
            </Button>
          </div>
        )}
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

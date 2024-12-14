// Importando ícones do Lucide
import { Check, Pencil, Trash } from "lucide-react";
// Importando componentes de botão
import { Button } from "../ui/button";
// Importando componentes de cartão
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
// Importando funções do Firestore
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
// Importando configuração do Firebase
import { db } from "@/firebase/firebaseConfig";
// Importando hook do React para gerenciamento de estado
import { useState } from "react";
// Importando componentes de textarea e input
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

// Definindo a interface para as propriedades do cartão de tarefa
interface taskCardProps {
  title: string; // Título da tarefa
  task: string; // Descrição da tarefa
  taskID: string; // ID da tarefa
}

// Componente principal do cartão de tarefa
export default function TaskCard({ title, task, taskID }: taskCardProps) {
  // Estados para gerenciar a tarefa editada e a visibilidade do campo de edição
  const [editedTask, setEditedTask] = useState<string>(task);
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [taskField, setTaskField] = useState<boolean>(false);

  // Função para deletar a tarefa
  async function deleteTask() {
    try {
      await deleteDoc(doc(db, "tasks", taskID));
    } catch (err) {
      alert(err);
    }
  }

  // Função para atualizar a tarefa
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

  // Função para habilitar o modo de edição
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
              defaultValue={task}
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

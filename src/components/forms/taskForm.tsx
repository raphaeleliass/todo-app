"use client";

// Importando hooks e funções do React
import { useState } from "react"; // Hook para gerenciar estado
import { useForm } from "react-hook-form"; // Hook para gerenciamento de formulários

// Importando componentes de UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"; // Componentes de formulário
import { Textarea } from "../ui/textarea"; // Componente de textarea
import { Input } from "../ui/input"; // Componente de entrada de texto
import { Button } from "../ui/button"; // Componente de botão

// Importando biblioteca de validação
import { z } from "zod"; // Biblioteca de validação de esquema
import { zodResolver } from "@hookform/resolvers/zod"; // Resolvedor para integração com Zod

// Importando funções do Firebase
import { addDoc, collection } from "firebase/firestore"; // Funções para manipulação de documentos no Firestore
import { db } from "@/firebase/firebaseConfig"; // Configuração do Firebase

// Importando ícones
import { LoaderCircle, Plus } from "lucide-react"; // Ícones para carregamento e adição

// Importando contexto de usuário
import { UserProvider, UseUser } from "@/context/userContext"; // Contexto para gerenciamento de usuário

// Definindo o esquema de validação do formulário
const formSchema = z.object({
  titleTask: z.string().optional(), // Título da tarefa (opcional)
  task: z.string().min(1, "This field can't be empty"), // Tarefa (obrigatório)
});

// Inferindo o tipo do esquema do formulário
type FormSchema = z.infer<typeof formSchema>;

// Componente principal do formulário de tarefas
export default function TaskForm() {
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const { user } = UseUser(); // Obtendo informações do usuário do contexto

  // Configurando o formulário com validação
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema), // Resolvedor para validação
    defaultValues: {
      titleTask: "", // Valor padrão para título da tarefa
      task: "", // Valor padrão para tarefa
    },
  });

  // Função para lidar com o envio do formulário
  async function handleSubmitForm(formValue: FormSchema) {
    setLoading(true); // Ativando estado de carregamento
    try {
      // Adicionando nova tarefa ao Firestore
      await addDoc(collection(db, "tasks"), {
        title: formValue.titleTask, // Título da tarefa
        task: formValue.task, // Conteúdo da tarefa
        uid: user?.uid, // ID do usuário
        created: new Date(), // Data de criação
      });
      form.reset(); // Resetando o formulário
      setLoading(false); // Desativando estado de carregamento
    } catch (err) {
      alert(err); // Exibindo erro
      setLoading(false); // Desativando estado de carregamento
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

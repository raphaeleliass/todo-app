"use client";

import { useState } from "react"; // Hook para gerenciar estado
import { useRouter } from "next/navigation"; // Hook para navegação entre páginas

import {
  Form, // Componente de formulário
  FormControl, // Componente de controle de formulário
  FormField, // Componente de campo de formulário
  FormItem, // Componente de item de formulário
  FormLabel, // Componente de rótulo de formulário
  FormMessage, // Componente de mensagem de formulário
} from "../ui/form";
import { Input } from "../ui/input"; // Componente de entrada de texto
import { Button } from "../ui/button"; // Componente de botão
import { Eye, EyeClosed, LoaderCircle } from "lucide-react"; // Ícones para visibilidade de senha e carregamento

import { z } from "zod"; // Biblioteca de validação de esquema
import { useForm } from "react-hook-form"; // Hook para gerenciamento de formulários
import { zodResolver } from "@hookform/resolvers/zod"; // Resolvedor para integração com Zod

import { FirebaseError } from "firebase/app"; // Erro do Firebase
import { auth } from "@/firebase/firebaseConfig"; // Configuração de autenticação do Firebase
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"; // Funções de autenticação

const formSchema = z.object({
  email: z.string().email("Invalid email"), // Validação de email
  password: z.string().min(1, "Password can't be empty"), // Validação de senha
});

type FormSchema = z.infer<typeof formSchema>; // Tipo inferido do esquema do formulário

export default function SigninForm() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false); // Estado para visibilidade da senha
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const router = useRouter(); // Instância do roteador

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema), // Resolvedor para validação
    defaultValues: {
      email: "", // Valor padrão para email
      password: "", // Valor padrão para senha
    },
  });

  onAuthStateChanged(auth, (user) => {
    // Observador de estado de autenticação
    if (user) {
      router.push("/dashboard"); // Redireciona para o dashboard se o usuário estiver autenticado
    }
  });

  async function submitForm(formValue: FormSchema) {
    // Função para enviar o formulário
    setLoading(true); // Ativa o estado de carregamento

    try {
      await signInWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password,
      );
      setLoading(false); // Desativa o estado de carregamento
      router.push("/dashboard"); // Redireciona para o dashboard
    } catch (err) {
      setLoading(false); // Desativa o estado de carregamento

      if (err instanceof FirebaseError) {
        // Verifica se o erro é do Firebase
        switch (err.code) {
          case "auth/invalid-credential":
            form.setError("email", { message: "Email or password invalid" }); // Define erro para email
            form.setError("password", { message: "Email or password invalid" }); // Define erro para senha
            setLoading(false); // Desativa o estado de carregamento
        }
      }
    }
  }

  function togglePasswordVisibility() {
    // Função para alternar visibilidade da senha
    setPasswordVisible((prev) => !prev); // Alterna o estado de visibilidade
  }

  return (
    <Form {...form}>
      <form
        className={`flex w-full max-w-xs flex-col gap-6 ${loading && "opacity-60"}`}
        onSubmit={form.handleSubmit(submitForm)} // Envia o formulário
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  autoComplete="off"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center justify-center">
                  <Input
                    placeholder="Enter your password"
                    autoComplete="off"
                    type={passwordVisible ? "text" : "password"}
                    {...field}
                  />

                  <span
                    role="button"
                    className="absolute right-2"
                    onClick={togglePasswordVisibility} // Alterna visibilidade da senha
                  >
                    {passwordVisible ? (
                      <EyeClosed className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}

"use client";

// react/next imports
import { useCallback, useEffect, useState } from "react"; // Hooks para gerenciar estado e efeitos colaterais
import { useRouter } from "next/navigation"; // Hook para navegação entre páginas

// ui imports
import {
  Form, // Componente de formulário
  FormControl, // Componente de controle de formulário
  FormField, // Componente de campo de formulário
  FormItem, // Componente de item de formulário
  FormLabel, // Componente de rótulo de formulário
  FormMessage, // Componente de mensagem de formulário
} from "../ui/form"; // Importando componentes de UI para formulários
import { Input } from "../ui/input"; // Componente de entrada de texto
import { Checkbox } from "../ui/checkbox"; // Componente de checkbox
import { Button } from "../ui/button"; // Componente de botão
import { Eye, EyeClosed, LoaderCircle } from "lucide-react"; // Ícones para visibilidade de senha e carregamento

// validação de formulário imports
import { z } from "zod"; // Biblioteca de validação de esquema
import { useForm } from "react-hook-form"; // Hook para gerenciamento de formulários
import { zodResolver } from "@hookform/resolvers/zod"; // Resolvedor para integração com Zod

// firebase imports
import { auth } from "@/firebase/firebaseConfig"; // Configuração de autenticação do Firebase
import { FirebaseError } from "firebase/app"; // Erro do Firebase
import {
  createUserWithEmailAndPassword, // Função para criar usuário com email e senha
  onAuthStateChanged, // Função para observar mudanças no estado de autenticação
  sendEmailVerification, // Função para enviar verificação de email
  updateProfile, // Função para atualizar o perfil do usuário
} from "firebase/auth"; // Importando funções de autenticação do Firebase

// schema do formulário
const formSchema = z
  .object({
    name: z.string().min(1, "Name field can't be empty").trim(), // Validação do nome
    lastName: z
      .string()
      .min(3, "Last name must be 3 characters at least")
      .trim(), // Validação do sobrenome
    email: z.string().email("This email isn't valid").trim(), // Validação do email
    password: z
      .string()
      .min(6, "Password must be 6 characters at least")
      .trim(), // Validação da senha
    confirmPassword: z.string(), // Validação da confirmação da senha
    terms: z.boolean().refine((value) => value), // Validação dos termos
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Caminho para o erro
    message: "Password must be the same", // Mensagem de erro
  });

// inferência de tipo
type FormSchema = z.infer<typeof formSchema>; // Tipo inferido do esquema do formulário

export default function SignupForm() {
  // validação de formulário
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema), // Resolvedor para validação
    defaultValues: {
      name: "", // Valor padrão para nome
      lastName: "", // Valor padrão para sobrenome
      email: "", // Valor padrão para email
      password: "", // Valor padrão para senha
      confirmPassword: "", // Valor padrão para confirmação de senha
      terms: false, // Valor padrão para termos
    },
  });

  // state de loading
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento

  // state para mostrar senha
  const [mainPasswordVisible, setMainPasswordVisible] =
    useState<boolean>(false); // Estado para visibilidade da senha principal

  // state para mostrar senha de confirmação
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false); // Estado para visibilidade da senha de confirmação

  // state para trocar o formulário pela verificação de email de usuário
  const [showEmailValidation, setShowEmailValidation] =
    useState<boolean>(false); // Estado para mostrar validação de email

  // constante que carrega os dados do usuário logado
  const user = auth.currentUser; // Usuário atual autenticado

  // constante responsável por instanciar o next navigation
  const router = useRouter(); // Instância do roteador

  // adiciona nome e sobrenome para o usuário
  async function setAdditionalUserInformation(
    userName: string,
    lastName: string,
  ) {
    const user = auth.currentUser; // Usuário atual
    try {
      if (user) {
        await updateProfile(user, {
          displayName: `${userName} ${lastName}`, // Atualiza o nome de exibição do usuário
        });
      }
    } catch (err) {
      alert(err); // Exibe erro
    }
  }

  // envia verificação de email para o usuário
  const sendVerificationEmail = useCallback(() => {
    if (user) {
      sendEmailVerification(user); // Envia email de verificação
    }
  }, [user]);

  // verifica se o usuário fez a validação do email ao carregar a página
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser && currUser.emailVerified) {
        router.push("/dashboard"); // Redireciona para o dashboard se o email estiver verificado
      } else if (currUser && !currUser.emailVerified) {
        sendVerificationEmail(); // Envia email de verificação
        setShowEmailValidation(true); // Mostra validação de email
      }
    });

    return () => unsubscribe(); // Limpa o observador
  }, [router, sendVerificationEmail]);

  // troca o formulário para o aviso de validação do email
  function showValidationEmail() {
    if (!user?.emailVerified) {
      setShowEmailValidation(true); // Mostra validação de email
    } else {
      router.push("/dashboard"); // Redireciona para o dashboard
    }
  }

  // envia o formulário de cadastro para o firebase com as informações necessárias para o cadastro
  async function submitForm(formValue: FormSchema) {
    setLoading(true); // Ativa o estado de carregamento

    try {
      await createUserWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password,
      ); // Cria usuário com email e senha

      form.reset(); // Reseta o formulário
      setLoading(false); // Desativa o estado de carregamento
      await setAdditionalUserInformation(formValue.name, formValue.lastName); // Adiciona informações do usuário
      sendVerificationEmail(); // Envia email de verificação
      showValidationEmail(); // Mostra validação de email
    } catch (err) {
      setLoading(false); // Desativa o estado de carregamento
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            form.setError("email", { message: "Email already in use" }); // Define erro para email já em uso

            break;
        }
      }
    }
  }

  // atualiza a página ao clicar no botão
  function refreshPage() {
    window.location.reload(); // Atualiza a página
  }

  // mostra a senha digitada pelo usuário
  function toggleMainPasswordVisibility() {
    setMainPasswordVisible((prev) => !prev); // Alterna visibilidade da senha principal
  }
  // mostra a senha de confirmação digitada pelo usuários
  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisible((prev) => !prev); // Alterna visibilidade da senha de confirmação
  }

  return (
    <>
      {showEmailValidation ? (
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-Poppins text-lg font-semibold">
            A verification email has been sent to your inbox.
          </h2>
          <p className="text-sm">
            Please check your email and confirm your address.
          </p>
          <Button className="mt-6" variant={"secondary"} onClick={refreshPage}>
            I&apos;ve already verified my email!
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <h1 className="mb-2 text-2xl">Sign Up</h1>
          <form
            className={`flex w-full max-w-xs flex-col gap-6 ${loading && "opacity-60"}`}
            onSubmit={form.handleSubmit(submitForm)}
            id="signUpForm"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      type="text"
                      autoComplete="off"
                      aria-label="input to place your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      type="text"
                      autoComplete="off"
                      aria-label="input to place your last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu email"
                      type="text"
                      autoComplete="off"
                      aria-label="input to place your email"
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
                  <FormLabel className="text-muted-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        placeholder="Enter your password"
                        type={mainPasswordVisible ? "text" : "password"}
                        autoComplete="off"
                        aria-label="input to put your password"
                        {...field}
                      />

                      <span
                        className="absolute right-2"
                        role="button"
                        onClick={toggleMainPasswordVisibility}
                        aria-label="button to toggle your password visibility"
                      >
                        {mainPasswordVisible ? (
                          <Eye className="size-5" />
                        ) : (
                          <EyeClosed className="size-5" />
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">
                    Confirm your password
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        placeholder="Confirm your password"
                        type={confirmPasswordVisible ? "text" : "password"}
                        autoComplete="off"
                        aria-label="input to confirm your previous password"
                        {...field}
                      />

                      <span
                        className="absolute right-2"
                        role="button"
                        onClick={toggleConfirmPasswordVisibility}
                        aria-label="button to toggle your confirm password visibility"
                      >
                        {confirmPasswordVisible ? (
                          <Eye className="size-5" />
                        ) : (
                          <EyeClosed className="size-5" />
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="terms"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <span className="flex flex-row items-center gap-2">
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                      aria-label="checkbox to accept terms and conditions"
                    />
                    <FormLabel>
                      I agree and accept the terms & conditions
                    </FormLabel>
                  </span>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading ? true : false}
              aria-label="create your account button"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}

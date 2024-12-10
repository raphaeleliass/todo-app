"use client";
import TaskCard from "@/components/taskCard/taskCard";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { auth, db } from "@/firebase/firebaseConfig";
import useUserLoggedIn from "@/hooks/useUserLoggedIn";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

interface TaskList {
  id: string;
  task: string;
  title: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<TaskList[]>([]);
  const { loading } = useUserLoggedIn("/");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      if (currUser && !currUser?.emailVerified) {
        router.push("/signup");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useLayoutEffect(() => {
    function loadTasks() {
      try {
        onSnapshot(collection(db, "tasks"), (snapshot) => {
          const tasksList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<TaskList, "id">),
          }));
          setTasks(tasksList);
        });
      } catch (err) {
        alert(err);
      }
    }
    loadTasks();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-row gap-4">
          <Skeleton className="h-screen w-72" />
          <div className="flex w-full flex-wrap items-start justify-start gap-2">
            {Array.from({ length: 12 }, (_, index) => (
              <Skeleton className="mt-4 aspect-square size-64" key={index} />
            ))}
          </div>
        </div>
      ) : (
        <main className="flex min-h-dvh flex-col items-center justify-center">
          <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarTrigger />

            <div className="flex w-full items-start justify-center">
              <div className="flex w-full flex-wrap items-center gap-4 py-10 transition-all">
                {tasks.length === 0 ? (
                  <div className="mx-auto flex min-h-dvh w-full max-w-xs flex-col items-center justify-center text-balance text-center md:max-w-md md:text-left">
                    <h2 className="font-Poppins text-lg font-semibold drop-shadow-2xl">
                      It seems you still don&apos;t have any tasks
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      register your task in the side menu to get started
                    </p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <TaskCard
                      task={task.task}
                      title={task.title}
                      taskID={task.id}
                      key={task.id}
                    />
                  ))
                )}
              </div>
            </div>
          </SidebarProvider>
        </main>
      )}
    </>
  );
}

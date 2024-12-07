"use client";
import TaskCard from "@/components/taskCard/taskCard";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "@/firebase/firebaseConfig";
import useVerifySignIn from "@/hooks/useVerifySignIn";
import { collection, onSnapshot } from "firebase/firestore";
import { LoaderCircle } from "lucide-react";
import { useLayoutEffect, useState } from "react";

interface TaskList {
  id: string;
  task: string;
  title: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<TaskList[]>([]);
  const { loading } = useVerifySignIn("/signin");

  useLayoutEffect(() => {
    async function loadTasks() {
      try {
        await onSnapshot(collection(db, "tasks"), (snapshot) => {
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
        <div className="flex min-h-dvh w-full items-center justify-center">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : (
        <main className="flex min-h-dvh flex-col items-center justify-center">
          <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarTrigger />

            <div className="flex w-full items-start justify-center">
              <div className="flex w-full flex-wrap items-center gap-4 py-10">
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

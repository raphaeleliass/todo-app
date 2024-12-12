import { UseUser } from "@/context/userContext";
import TaskForm from "../forms/taskForm";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "./sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { LogOut } from "lucide-react";

export function AppSidebar() {
  async function signoutUser() {
    try {
      await signOut(auth);
    } catch (err) {
      alert(err);
    }
  }

  const { user } = UseUser();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <TaskForm />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarFooter className="mb-4 mt-auto flex flex-row items-center justify-between">
        <Avatar>
          <AvatarImage>{user?.photo}</AvatarImage>
          <AvatarFallback>
            {user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-xs">{user?.name}</p>
          <p className="text-xs">{user?.email}</p>
        </div>

        <button aria-label="sign out button" onClick={signoutUser}>
          <LogOut className="size-5" />
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}

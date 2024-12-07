import { UseUser } from "@/app/context/userContext";
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
      <SidebarFooter className="flex flex-row items-center">
        <Avatar>
          <AvatarImage>{user?.photo}</AvatarImage>
          <AvatarFallback>
            {user?.email?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-xs">{user?.name}</p>
          <p className="text-xs">{user?.email}</p>
        </div>

        <Button variant={"secondary"} onClick={signoutUser}>
          Sign out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

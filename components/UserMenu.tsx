"use client";
import { GrUserSettings } from "react-icons/gr";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Pencil,
  Plus,
  PlusCircle,
  Settings,
  Settings2,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { Avatar } from "./ui/avatar";
import { toast } from "sonner";
import { BsGear } from "react-icons/bs";

export function UserMenu() {
  const router = useRouter();
  const onClick = async () => {
    try {
      const response = await signOut();
      toast.success("signed out successfully");

      router.push("/");
    } catch (error: any) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="border" variant="ghost" size="icon">
            <Menu className="text-lg text-sky-400 "/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/dashboard" className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/posts/create" className="flex items-center">
                <Pencil className="mr-2 h-4 w-4" />
                <span>Create Post</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/settings" className="flex items-center">
                <GrUserSettings className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            onClick={onClick}
            className="text-red-400 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4 " />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
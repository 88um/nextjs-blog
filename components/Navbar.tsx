
import React, { useEffect, useState } from "react";
import { Home, Users2 } from "lucide-react";
import { AiFillGithub } from "react-icons/ai";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./utils/ModeToggle";
import AuthButton from "./utils/AuthButton";
import getCurrentUser from "@/actions/current-user";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = async ({ }) => {
    const curr_user = await getCurrentUser();
    //console.log(curr_user)
    const isAuthed = curr_user ? true : false;

    return (
        <div
            className={`w-full py-6 px-8 md:px-16 bg-[#1F2937] font-mono text-white shadow-xl`}
        >
            <div className="flex w-full items-center justify-between">
                <div className="hidden md:block"></div>
                <div className="flex text-xl font-bold items-center">
                    <div className="md:ml-24 text-2xl md:text-3xl text-emerald-400">
                        <Link href={"/"}>Solo &lt; / &gt;</Link>
                    </div>
                </div>
                <div className="flex space-x-3 items-center">
                <ModeToggle />
                    <Button variant="ghost" size="icon" className="">
                        <Link target="_blank" href="https://github.com/88um">
                            <AiFillGithub size={40} className="border rounded-md p-2" />
                        </Link>
                    </Button>



                   
                    <AuthButton isAuthed={isAuthed} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

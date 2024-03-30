'use client'
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Users2 } from 'lucide-react';
import { PiSignOut } from 'react-icons/pi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { UserMenu } from '../UserMenu';

interface AuthButtonProps {
    isAuthed: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ isAuthed }) => {
    //console.log(isAuthed)
    const router = useRouter()
    const onSignOut = async () => {
        await signOut()
        toast.info("Successfully Logged out. Please log back in to create new posts.")
        router.refresh()
    }
    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {isAuthed ? (
                            <div>
                                <UserMenu />
                                <Button
                                    variant={"ghost"}
                                    size="icon"
                                    className="border hidden"

                                >
                                    <PiSignOut className='text-2xl text-red-400' />
                                </Button>
                            </div>

                        ) : (<Link href="/login">
                            <Button
                                variant={"ghost"}
                                size="icon"
                                className="border"
                                //onClick={onSignOut}

                            >
                                <Users2 />
                            </Button>
                        </Link>)}


                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white">
                        <p>{!isAuthed ? "Login to your account" : "Blog Menu"} </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default AuthButton;
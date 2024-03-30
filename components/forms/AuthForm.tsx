"use client";
import {
  ArrowLeft,
  CheckIcon,
  Lock,
  Mail,
  Wand2,
  X,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { loginFormSchema, signupFormSchema } from "@/schemas";
import ImageDrop from "../utils/ImageDrop";
import { toast } from "sonner";

interface AuthFormProps {}


type Variant = "LOGIN" | "SIGNUP";

const AuthForm: React.FC<AuthFormProps> = ({}) => {
  
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");



  const onLogin = async (values: z.infer<typeof loginFormSchema>) => {
    //console.log(values)
    try {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (response?.ok) {
        toast.success('Successfully Logged in');
        router.push("/dashboard");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error : any) {
      console.log(error);
      console.log('yo')
      toast.error(`Error: ${error?.response?.data?.message || error?.message}`);
    }
  };
  const onSignup = async (values: z.infer<typeof signupFormSchema>) => {
    let response;
    try {

      response = await axios.post("/api/user", values);
      const signup = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (!signup?.ok) {
        throw new Error("Sign up failed");
      }
      toast.success('Successfully registered');
      //router.push('/explore')
    } catch (error : any) {
      console.log(error);
      //console.log('yo')
      toast.error(`Error: ${error?.response?.data?.message || error?.message}`);
    }
  };
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const signUpForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      confirmEmail: "",
      confirmPassword: "",
      imageUrl: "",
      name: "",
    },
  });
  const form = variant === "LOGIN" ? loginForm : signUpForm;
  const isLoading = form.formState.isSubmitting;
  const onSubmit = variant === "LOGIN" ? onLogin : onSignup;
  return (
    <div className="mb-24">
      {variant === "LOGIN" ? (
        <div className="mx-auto max-w-lg">
          <div className="flex justify-center">
            <div className=" p-2 border-2 border-dashed w-fit rounded-full">
              <Avatar className="h-[5rem] w-[5rem] border-2   rounded-full ">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1400&q=60                    "
                  alt="alnding"
                  className="rounded-full"
                />
              </Avatar>
            </div>
          </div>
          <h2 className="text-center text-muted-foreground my-3 font-semibold font-code text-3xl">
            Blog Login
          </h2>
          <Form {...loginForm}>
            <form
              onSubmit={form.handleSubmit(onLogin)}
              className="mt-6 flex flex-col space-y-5"
            >
              <FormField
                name="username"
                control={loginForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="flex items-center px-2 border rounded focus-within:border-blue-300 focus-within:border-2">
                        <Mail />
                        <Input
                          {...field}
                          placeholder="Email/Username"
                          className="border-none  focus-visible:ring-0 focus-visible:ring-offset-0 "
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={loginForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center px-2 border rounded focus-within:border-blue-300 focus-within:border-2">
                        <Lock />
                        <Input
                          {...field}
                          placeholder="Password"
                          className="border-none  focus-visible:ring-0 focus-visible:ring-offset-0 "
                          type="password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="bg-sky-500 rounded-md">
                <Button
                  className="w-full bg-transparent rounded py-3"
                  type="submit"
                  disabled={isLoading}
                >
                  <div className="font-medium">Login</div>
                </Button>
              </div>
            </form>
          </Form>
          <div>
            <div className=" flex justify-center  text-xs  mt-5  px-2  text-gray-500 ">
              <div>
                New to the blog?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => setVariant("SIGNUP")}
                >
                  Sign up
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Button variant={"ghost"} onClick={() => setVariant("LOGIN")}>
              <ArrowLeft className="h-4 mr-2" /> Back
            </Button>
          </div>
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSubmit)}
              className="mx-auto max-w-3xl gap-y-6"
            >
              <FormField
                name="imageUrl"
                control={signUpForm.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-4">
                    <FormControl>
                      <ImageDrop
                        type="pfp"
                        label="Add your profile picture"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-center">
                      Add Your Profile Picture
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <FormField
                  name="name"
                  control={signUpForm.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Enter Your Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="username"
                  control={signUpForm.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Enter Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={signUpForm.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="mail@example.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmEmail"
                  control={signUpForm.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Confirm Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="mail@example.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={signUpForm.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Choose Strong Password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={signUpForm.control}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Re-enter Password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-8 w-full flex justify-center rounded-md bg-sky-700">
                <Button
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-transparent"
                  type="submit"
                >
                  Sign Up
                  <Wand2 className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AuthForm;

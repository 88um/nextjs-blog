"use client"
import { Indent } from "@/lib/indent";
import { Editor } from "novel";
import { useState } from "react";
import * as z from "zod";
import axios from 'axios'
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { postFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { Textarea } from "../ui/textarea";
import ImageDrop from "../utils/ImageDrop";
import { useRouter } from "next/navigation";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import py from 'highlight.js/lib/languages/python'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import { common, createLowlight } from 'lowlight'
import { defaultExtensions } from "@/lib/default-extensions";
import StarterKit from "@tiptap/starter-kit";
const lowlightX = createLowlight(common)
lowlightX.register('js', js)
lowlightX.register('ts', ts)
lowlightX.register('py', py)
lowlightX.register('c', c)
lowlightX.register('cpp', cpp)





interface PostFormProps {
    initialValues?: Post;
}

const PostForm: React.FC<PostFormProps> = ({ initialValues }) => {
    const [json, setJson] = useState(null);
    const onUpdated = (editor : any) =>{
        form.setValue("content", ((editor?.getHTML()!)))
        setJson(editor?.getJSON()!)

    }
    const router = useRouter()
    
    const form = useForm<z.infer<typeof postFormSchema>>(
        
        {
        resolver: zodResolver(postFormSchema), 
        // @ts-ignore
        defaultValues: initialValues || {
            title: "",
            description: "",
            coverImage: "",
            content: "",
            tags: "",
        },
    });
    const isLoading = form.formState.isSubmitting;
    const onUpdate = async (data: z.infer<typeof postFormSchema>) => {
        //console.log(initialValues);
        try {
            const response = await axios.patch(
                `/api/account/?accountId=${initialValues?.id}`,
                data
            );
            toast.success("Account Successfully Updated", {
                duration: 3000,
            });
            form.reset()
            //router.refresh();
            router.push("/accounts");
        } catch (error: any) {
            if (error.response?.data) {
                toast.error(error.response.data);
            } else {
                toast.error("Oops, something went wrong");
            }
            console.error(error.response);
        }
    };

    const onCreate = async (data: z.infer<typeof postFormSchema>) => {
        try {
            const response = await axios.post(`/api/post`, {...data, json:json});
            //console.log(json)
            toast.success("Post Successfully Created", {
                duration: 4000,
            });
            //router.refresh();
            //router.push("/accounts");
            router.push(`/posts/${response.data.pathName}`)
        } catch (error: any) {
            if (error.response?.data) {
                toast.error(error.response.data);
            } else {
                toast.error("Oops, something went wrong");
            }
            console.error(error.response);
        }
    };
    const onSubmit = initialValues ? onUpdate : onCreate;

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 p-6">
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Type your title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    The title of your article
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="What is the article about?"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Description of article
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="tags"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Post Hashtags (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="What is the article about?"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Relevant tags for your new post
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="coverImage"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Article cover Image</FormLabel>
                                <FormControl>
                                    <ImageDrop {...field} disabled={isLoading} label="Upload picture" />

                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="content"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Write your article below</FormLabel>
                                <FormControl>

                                    <Editor className="dark:bg-transparent rounded-md w-full" disableLocalStorage extensions={[Indent, CodeBlockLowlight.configure({
                                        lowlight: lowlightX,
                                       
                                       

                                    }),
                                    ]} defaultValue={initialValues?.content || ""} onDebouncedUpdate={onUpdated} />


                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="bg-sky-500 rounded-md mt-8">
                        <Button
                            variant='default'
                            type='submit'
                            disabled={isLoading}
                            className="w-full bg-transparent dark:text-white"
                        >
                            Submit
                        </Button>
                    </div>


                </form>
            </Form>


        </div>
    );
};

export default PostForm;
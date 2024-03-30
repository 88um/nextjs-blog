"use server";
import { postFormSchema } from '@/schemas';
import * as z from 'zod'

export async function onCreate(data: z.infer<typeof postFormSchema>){
    console.log(data)

}

export async function onUpdate(data: z.infer<typeof postFormSchema>){
    console.log(data)

}
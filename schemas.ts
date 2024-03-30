import * as z from 'zod';

export const postFormSchema = z.object({
    title: z.string().min(1, { message: "Title cannot be blank" }),
    description: z.string().min(1, { message: "Description cannot be blank" }),
    coverImage: z.string().min(1, { message: "Cover image URL cannot be blank" }),
    tags: z.string(),
    content: z.string().min(1, { message: "Content cannot be blank" }),
  }).refine(data => {
    return !!data.title && !!data.description && !!data.coverImage && !!data.content;
  }, {
    message: "All fields are required",
  })


  export const loginFormSchema = z.object({
    username: z.string().min(1, { message: "Please enter a username/email" }),
    password: z.string().min(1, { message: "Please enter your password" }),
  });


  export const signupFormSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(1, { message: "Please enter a valid email address" }),
    confirmEmail: z
      .string()
      .email()
      .min(1, { message: "Please enter a valid email address" }),
    name: z.string().min(4, { message: "Please enter your full name" }).refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'Name should not conatin any numbers or special characters'),
    username: z.string().min(3, {
      message: "Please enter your username with minimum 3 characters",
    }).refine((value) => /^[a-zA-Z0-9]+[-'s]?[a-zA-Z0-9 ]+$/.test(value), 'Username can only be alphanumeric'),
    password: z
      .string()
      .min(8, { message: "Please enter a password with minimum 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please enter a password with minimum 8 characters" }),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.confirmEmail === data.email, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  })

  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  
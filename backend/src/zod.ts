import z from 'zod'

export const userSchema = z.object({
    email:z.string().email().trim(),
    firstName:z.string().min(3).trim(),
    lastName:z.string().min(3).trim(),
    password:z.string().trim()
})

export const todoSchema = z.object({
    title:z.string(),
    description:z.string().optional(),
    done:z.boolean().optional()
})
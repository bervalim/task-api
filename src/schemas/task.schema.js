import { z } from "zod"

const taskSchema = z.object({
    id: z.string(),
    title: z.string().min(3).max(40),
    description: z.string().max(255).min(3),
    completed_at: z.string().optional(),
    created_at: z.string(),
    updated_at: z.string()   
});

export const createTaskSchema = taskSchema.pick({
    title: true,
    description: true
});

export const updateTaskSchema =  taskSchema.pick({
    title: true,
    description: true,
    completed_at: true
})
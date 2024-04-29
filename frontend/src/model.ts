import {z} from "zod"

export const MovieSchema = z.object({
    id: z.string(),
    name: z.string(),
    genre: z.string(),
    description: z.string()
})

export type Movie = z.infer<typeof MovieSchema>
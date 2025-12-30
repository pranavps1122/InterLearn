import {z} from 'zod'

export const rejectReviewerSchema = z.object({
    params:z.object({
        id:z.string().min(1,"Reviewer id is required")
    }),
    body:z.object({
        rejection_note:z
        .string()
        .min(5, "Rejection note must be at least 5 characters")
    })
})
import {z} from "zod";

export const userRegisterSchema = z.object({
    body:z.object({
        name:z.string().min(2,"Name must be at least 2 characters")
        .regex(
        /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        "Name must contain only letters and single spaces"
        ),
        email:z.string().email('Invalid email format')

    })
})
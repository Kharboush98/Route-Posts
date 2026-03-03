import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().nonempty("Name is Required").min(3, "Not Less than 3 Chars").max(10, "Not more than 10 Chars"),
    username: z.string().nonempty("username is required").min(3, "Not less than 3 Chars").max(10, "Not more than 10 Chars"),
    email: z.string().nonempty("Email is Required").email("Email is not Valid"),
    password: z.string().nonempty("Password is Required").min(3, "Not Less than 3 Chars").max(11, "Not more than 10 Chars"),
    rePassword: z.string().nonempty("rePassword is Required"),
    dateOfBirth: z.string().nonempty("Date of Birth is Required").refine((date) => {
        let currentYear = new Date().getFullYear();
        let birthYear = new Date(date).getFullYear();
        let age = currentYear - birthYear;

        return age >= 18
    }, "Must be older than 18 years old"),

    gender: z.string().nonempty("Gender is required"),

}).refine((data)=> data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password doesn't match"
})


export const LoginSchema = z.object({
    email: z.string().nonempty("Email is Required").email("Email is not Valid"),
    password: z.string().nonempty("Password is Required").min(3, "Not Less than 3 Chars").max(11, "Not more than 10 Chars"),
})

export const UpdatePasswordSchema = z.object({
    password: z.string().nonempty("Password is Required").min(3, "Not Less than 3 Chars").max(11, "Not more than 10 Chars"),
    newPassword: z.string().nonempty("Password is Required").min(3, "Not Less than 3 Chars").max(11, "Not more than 10 Chars"),
    rePassword: z.string().nonempty("rePassword is Required"),
}).refine((data)=> data.newPassword === data.rePassword, {
    path: ["rePassword"],
    message: "Password doesn't match"
})
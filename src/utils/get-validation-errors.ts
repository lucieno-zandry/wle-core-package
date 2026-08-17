import z from "zod";

export function getValidationErrors<T>(error: z.ZodError<T>){
    return z.flattenError(error).fieldErrors;
}
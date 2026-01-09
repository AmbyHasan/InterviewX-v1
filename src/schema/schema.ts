import {z} from "zod";


export const onboardingScehma=z.object({

  industry: z.string().optional() , //since i am manually sending "tech" as the industry
  subIndustry: z.string().min(1, "Please select a specialization"),
  bio: z.string().max(500).optional(),
  experience:z
  .string()
  .transform((val)=>parseInt(val ,10))
  .pipe(
    z
    .number()
    .min(0 , "Experience must be atleast 0 years")
    .max(50 , "Experience cannot exceed 50 years")
  ) ,
 
 skills: z.string().min(1, "Skills are required")
  }) 






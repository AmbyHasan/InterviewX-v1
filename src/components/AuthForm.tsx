"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/src/components/ui/button"
import Image from "next/image";
import {Form } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import Link from "next/link";
import {toast} from "sonner";
import FormField from "./FormField"
import { useRouter } from "next/navigation"


//defining the zod schema for sign in and sign up
const authFormSchema= (type:FormType)=>{
  return z.object({
    name: type==="sign-up" ? z.string().min(3 ).max(30) : z.string().optional() , //we will have the name field only in sign up form
    email: z.email({message:"Invalid Email Address"}) ,
    password:z.string().min(6 ,{message: "Password must be atleast 6 characters long"}) ,

    })
}



const AuthForm = ({type}:{type:FormType}) => {

    const formSchema= authFormSchema(type) ;
    const router=useRouter();

   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:""
    },
  })
 
  //here we will write the function that we want to be performed when the user submits the form
  function onSubmit(values: z.infer<typeof formSchema>) {
      try{
        if(type==="sign-up"){
          toast.success("Account created successfully ,Please SignIn !!")
          router.push("/sign-in");
          console.log("Sign up credentials" ,values);
      
        }else{
            toast.success("Signed in successfully!!")
            console.log("Sign in credentials" ,values);
            router.push("/");
        }

      }catch(error){
        console.log(error);
        toast.error(`There was an error:${error}`);
      }}
  
  const isSignIn = type=== "sign-in"
  return (

  <div className="card-border lg:min-w-[566px]">
 <div className="flex flex-col gap-6 card py-14 px-10 justiy-center items-center">
  <div className="flex flex-row gap-2 justiy-center items-center bg-gray-950 p-3 rounded-full">
    <Image src="/logo.png" alt="logo" height={32} width={38} className="mask-img"/>
    <h2 className="text-primary-100">InterviewX</h2>
  </div>
  <h3>Smart Interview Preparation with AI</h3>
 
   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">

      {!isSignIn && (
         <FormField 
         control={form.control} 
         name="name" 
         label="Name"
         type="text"
         placeholder="Enter your name"/>   )}


         <FormField 
         control={form.control} 
         name="email" 
         label="Email"
         type="email"
         placeholder="Enter your email"/> 

         <FormField 
         control={form.control} 
         name="password" 
         label="Password"
         type="password"
         placeholder="Enter your password"/> 

   
        <Button type="submit" className="btn">{isSignIn ? "Sign In" : "Create an Account"}</Button>
      </form>
        </Form>
        <p className="text-center">
        {isSignIn ? "No account yet?" :"Already have an account"}
        <Link href= {!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary text-white ml-1">
         {isSignIn ? "Sign Up" : "Sign In"}
         </Link>
          </p>
          </div>
          </div>
  )
}

export default AuthForm

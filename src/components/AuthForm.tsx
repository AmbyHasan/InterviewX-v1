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
import { useState } from "react"
import { ApiResponse } from "../types/ApiResponse"
import { AxiosError } from "axios";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FormType } from "../types"
import { Loader2 } from 'lucide-react';


//defining the zod schema for sign in and sign up
const authFormSchema= (type:FormType)=>{
  return z.object({
    name: type==="sign-up" ? z.string().min(3,{message : "Name must atleast have 3 characters"} ).max(50 , {message:"Name cannot exceed the length 50"}) : z.string().optional() , //we will have the name field only in sign up form
    email: z.email({message:"Invalid Email Address"}) ,
    password:z.string().min(6 ,{message: "Password must be atleast 6 characters long"}) ,

    })
}

//---------------------------------------------------------------------------------------------------------------------------------------------

const AuthForm = ({type}:{type:FormType}) => {

    const formSchema= authFormSchema(type) ;
    const router=useRouter();
     
   const[isSubmitting, setIsSubmitting]=useState(false); //states for signUp and signIn buttons
   const [loadingProvider, setLoadingProvider] = useState<null | "google" | "github">(null) //states for github and google sign in buttons


   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:""
    },
  })

  const handleProviderSignIn = async (provider: "google" | "github") => {
  setLoadingProvider(provider)
  await signIn(provider, { callbackUrl: "/authenticatedLandingPage" })
}

 

  //here we will write the function that we want to be performed when the user submits the form
 async function onSubmit(data: z.infer<typeof formSchema>) {

  
      try{


//-----------------------------------------------------------------------------------------------------------------------------
   //function for sign-up
        if(type==="sign-up"){
          setIsSubmitting(true);

         try{
            //send the data to the backend
         const response=  await axios.post<ApiResponse>("/api/sign-up" , data);
         console.log(response.data.message);
         
          toast.success("Account created successfully ,Please SignIn !!")
          router.push("/sign-in");
          console.log("Sign up credentials" ,data);
         
       
       
        }catch(error){
           console.error("Error in signing up the user" ,error);
           const axiosError= error as AxiosError<ApiResponse>;
           let errorMessage = axiosError.response?.data.message;
           toast(errorMessage);
           router.push("/sign-up");
        }finally{
        setIsSubmitting(false);
        }


      

//------------------------------------------------------------------------------------------------------------------

//when the type is of sign-in

        }else{

    setIsSubmitting(true);       
   const result=  await signIn("credentials" , {
        redirect:false,
        identifier: data.email, //email is our indentifier
        password: data.password
     })
    if(result?.error){
        toast("Login failed");
    }
    //we get sign-in url after successful login
   if (result?.url) {
   toast.success("Signed in successfully!");
   router.replace("authenticatedLandingPage");
}}


      }catch(error){
        console.log(error);
        toast.error(`There was an error:${error}`);
      }
      finally{
        setIsSubmitting(false);
      }
    }
  





//-----------------------------------------------------------------------------------------------------------------------------------------------

 //variable
  const isSignIn = type=== "sign-in"
  return (

  <div className="card-border lg:min-w-141.5">
 <div className="flex flex-col gap-6 card py-14 px-10 justify-center items-center">
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

   
        <Button type="submit" className="btn" disabled={isSubmitting}>
          {
            isSubmitting ?(
               <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            ): (isSignIn ? "Sign In" : "Create an Account")

            }
            
         
          </Button>

        <div className="flex flex-col gap-4 w-full mt-4">

  <Button
    type="button"
    className="btn-secondary w-full rounded-full"
    disabled={loadingProvider === "google"}
    onClick={() => handleProviderSignIn("google")}  
  >

 {loadingProvider === "google" ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      Signing in...
    </>
  ) : (
    <>
      <Image src="/google.svg" width={20} height={20} alt="google" className="mr-2" />
      Sign in with Google
    </>
  )}
  </Button>



  <Button
    type="button"
    className="btn-secondary w-full rounded-full"
    disabled={loadingProvider === "github"}
      onClick={() => handleProviderSignIn("github")}

  >
   {loadingProvider === "github" ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      Signing in...
    </>
  ) : (
    <>
      <Image src="/github.svg" width={20} height={20} alt="github" className="mr-2" />
      Sign in with GitHub
    </>
  )}
  </Button>

</div>

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

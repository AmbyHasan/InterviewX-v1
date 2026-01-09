"use client"
import { useState ,useEffect } from 'react'
import { useForm ,Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingScehma } from '../schema/schema';
import { useRouter } from 'next/navigation';
import { Card,CardContent, CardDescription,CardHeader, CardTitle,} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import Image from "next/image";
import { Input } from './ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import useFetch from '../hooks/use-fetch';
import { updateUser } from '../actions/user';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';


  

const OnboardingForm = () => {

  
   const subIndustries= [
      "Software Development",
      "IT Services",
      "Cybersecurity",
      "Cloud Computing",
      "Artificial Intelligence/Machine Learning",
      "Data Science & Analytics",
      "Internet & Web Services",
      "Robotics",
      "Quantum Computing",
      "Blockchain & Cryptocurrency",
      "IoT (Internet of Things)",
      "Virtual/Augmented Reality",
      "Semiconductor & Electronics",
    ]
  

 

const router= useRouter();

const { //here we are renaming the destructured items recieved from useFetch hook
  loading : updateLoading ,
  fn:updateUserFn,
  data : updateResult 
         }=useFetch(updateUser);

const {register  ,
        handleSubmit ,
        formState : {errors} ,
        setValue ,
        control,
      } = useForm({
    resolver: zodResolver(onboardingScehma) ,
  });

  //converting the option from speacialization into a proper format - > Software Development -software-development
  const toKebabCase = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
};


//handle submit function

const onSubmit= async(values :any)=>{
   try{
    //since the skills are being recived in the string form so  we are converting it into array of strings
     const skillsArray = values.skills
      .split(",")
      .map((skill: string) => skill.trim())
      .filter(Boolean);

       const formattedSubIndustry = toKebabCase(values.subIndustry);
      const combinedIndustry = `tech-${formattedSubIndustry}`; //tech is set by default
   
    //sending the values from the form to updatUserFn from our custom hook
   await updateUserFn({
       experience: values.experience,
      bio: values.bio,
    industry : combinedIndustry ,
     skills:skillsArray
    });
    
   }catch(error){
 console.log("onboarding error" ,error);
   }
};

useEffect(()=>{
 if(updateResult?.success && !updateLoading){
     toast.success("Profile updated successfully!");
     router.push("/tools/dashboard");
     router.refresh();
     
  }

} , [updateLoading ,updateResult])


  return (
   
 <div className="min-h-screen w-full flex justify-center ">
    <Card className="w-full max-w-lg mt-10 mx-2 h-fit  bg-linear-to-r from-[#3d3e3f] to-[#73747533] border-l-white text-white">
   <CardHeader>

    <div className="flex items-center justify-center">
  <div className="flex flex-row gap-2 w-fit bg-gray-950 p-3 rounded-full">
    <Image src="/logo.png" alt="logo" height={32} width={38} className="mask-img"/>
    <h2 className="text-primary-100">InterviewX</h2>
  </div>
  </div>


  <div className="text-center">
    <CardTitle className="gradient-title text-4xl font-bold">Build your InterviewX profile</CardTitle>
    <CardDescription className="text-lg mt-1">Choose your Specialization to unlock personalized career insights and tailored recommendations</CardDescription>
  </div>
   </CardHeader>

   <CardContent>
   <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

  
  <div>
      <Label htmlFor="subIndustry" className="mb-2 mt-2">Specialization</Label>


  <Controller
  name="subIndustry"
  control={control}
  render={({ field }) => (
    <Select onValueChange={field.onChange} value={field.value}>
    <SelectTrigger id="subIndustry" className="w-full">
      <SelectValue placeholder="Select a specialization" />
    </SelectTrigger>

    <SelectContent className="bg-black">
      {subIndustries.map((sub) => (
        <SelectItem value={sub} key={sub}>
          {sub}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
    
  )}
/>

{errors.subIndustry && (
  <p className="text-sm text-red-500 mt-1 ">
    {errors.subIndustry.message}
  </p>
)}

</div>

{/* } */}


<div className="mb-4">
      <Label htmlFor="experience" className="mb-2">Year of Experience</Label>
      <Input id="experience"
       type="number"
       min="0"
       max="50"
       placeholder="Enter years of experience"
       {...register("experience")}
       />

{errors.experience && (
  <p className="text-sm text-red-500 mt-1">
    {errors.experience.message}
  </p>
)}
</div>



<div className="mb-4">
      <Label htmlFor="skills" className="mb-2">Skills</Label>
      <Input id="skills"
       type="string"
       min="0"
       max="50"
       placeholder="eg C++, Java, Python"
       {...register("skills")}
       />

       <p className="text-sm text-muted-foreground mt-1 text-green-600">
        Seperate multiple skills with commas
       </p>

{errors.skills && (
  <p className="text-sm text-red-500 mt-1">
    {errors.skills.message}
  </p>
)}
</div>

<div className="mb-4">
      <Label htmlFor="bio" className="mb-2">Professional Bio</Label>
      <Textarea id="bio"
       min="0"
       max="50"
       placeholder="Briefly describe your experience"
       className="h-32"
       {...register("bio")}
       />



{errors.bio && (
  <p className="text-sm text-red-500 mt-1">
    {errors.bio.message}
  </p>
)}
</div>

<Button type="submit" className="btn-primary w-full" disabled={updateLoading}>
 { updateLoading ? (
   <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
 ):
  "Complete your profile"

 }
</Button>





   </form>
  </CardContent>
  
</Card>
    </div>
    
  )
}

export default OnboardingForm;

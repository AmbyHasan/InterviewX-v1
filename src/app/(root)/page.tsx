import { Button } from '@/src/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import InterviewCard from '@/src/components/InterviewCard'
import { getCurrentUser } from '@/src/models/User'
import { getInterviewByUserId, getLatestInterviews } from '@/src/lib/actions/action'




const page = async() => {
  const user=await getCurrentUser();
  if(!user) return null;
  const userInterviews=await getInterviewByUserId(user?._id.toString());
  const latestInterviews=await getLatestInterviews({userId:user?._id.toString()}); //since there are two arguments for this function
  if(!userInterviews) return null;
  if(!latestInterviews) return null;

  const hasPastInterviews=userInterviews?.length>0;
  const hasUpcomingInterviews=latestInterviews.length>0;

  return (
   <>
   <section className="card-cta m-3">
   <div className="flex flex-col gap-6 max-w-sm">
    <h2>Ace Your Interview with Smart AI Practice & Real-Time Feedback</h2>
    <p className="text-lg">
      Practice on real interview questios and get instant feedback
    </p>
    <Button asChild className="btn-primary max-sm:w-full">
      <Link href="/interview">Start an interview</Link>
    </Button>
   </div>
   
   <Image src="/robot.png" alt="robot image" width={400} height={400}  className="mask-img"></Image>
 
   </section>



   <section className="flex flex-col gap-6 mt-8">
    <h2 className="m-2">Your interviews</h2>
    <div className="interviews-section flex ">
       {
          hasPastInterviews ? (
            userInterviews?.map((interview )=>(
              //@ts-ignore
              <InterviewCard
               interviewId={interview._id.toString()}
               userId={interview.userId.toString()}
               role={interview.role}
               type={interview.type}
              techstack={interview.techstack}
               createdAt={interview.createdAt.toString()}
               key={interview._id.toString()}
              
              />
            ))
           ):      <p>You have not taken any inteviews yet</p> 
          }
    </div>
   </section>


   <section className="flex flex-col gap-6 mt-8">
    <h2 className="m-2">Take an interview</h2>
    <div className="interview-section flex">

        {
          hasUpcomingInterviews ? (
            latestInterviews?.map((interview)=>(
              <InterviewCard 
                interviewId={interview._id.toString()}
                userId={interview.userId.toString()}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
               createdAt={interview.createdAt.toString()}
               key={interview._id.toString()}
              
              
              
              />
            ))
           ):      <p>There are no new interviews available</p> 
          }

        
    
  </div> 
   </section>
   </>
  )
}

export default page

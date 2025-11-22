import { Button } from '@/src/components/ui/button'
import { dummyInterviews } from '@/src/constants'
import Image from 'next/image'
import Link from 'next/link'
import InterviewCard from '@/src/components/InterviewCard'


const page = () => {
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
      {dummyInterviews.map((interview)=>(
        <InterviewCard {...interview} key={interview.id}/>
      ))}
    {/* <p>You haven&apos;t taken any interviews yet</p> */}
    </div>
   </section>

   <section className="flex flex-col gap-6 mt-8">
    <h2 className="m-2">Take an interview</h2>
    <div className="interview-section flex">
        {dummyInterviews.map((interview)=>(
        <InterviewCard {...interview} key={interview.id}/>
      ))}
       {/* <p>There are no interviews available</p> */}
  </div> 
   </section>
   </>
  )
}

export default page

"use client"
import  { useEffect, useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function landingPage() {


  const searchParams = useSearchParams()
  //for displaying the log out toast when the user logs out
  useEffect(() => {
    if (searchParams.get("loggedOut") === "true") {
      toast.success("Logged out successfully")
    }
  }, [searchParams])

  ;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 3D tilt effect on feature cards
    const handleCardMouseMove = (card: HTMLDivElement, e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleCardMouseLeave = (card: HTMLDivElement) => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    };

    const listeners: Array<{ card: HTMLDivElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cardRefs.current.forEach(card => {
      if (card) {
        const moveHandler = (e: MouseEvent) => handleCardMouseMove(card, e);
        const leaveHandler = () => handleCardMouseLeave(card);
        
        card.addEventListener('mousemove', moveHandler);
        card.addEventListener('mouseleave', leaveHandler);
        
        listeners.push({ card, move: moveHandler, leave: leaveHandler });
      }
    });

    // Parallax effect for orbs
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbsRef.current) return;
      
      const orbs = orbsRef.current.querySelectorAll('.orb');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        (orb as HTMLElement).style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      listeners.forEach(({ card, move, leave }) => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
   {
    icon: '🤖',
    title: 'AI-Powered Interviewing',
    description:
      'Practice real interview questions generated on the spot by advanced AI tailored to your role and tech stack.'
  },
  {
    icon: '📊',
    title: 'Smart Performance Analytics',
    description:
      'Get detailed insights on your answers, including accuracy, clarity, confidence level, and improvement areas.'
  },
  {
    icon: '🎯',
    title: 'Role-Based Question Sets',
    description:
      'Choose roles, levels, and tech stacks to get highly relevant questions for your dream job.'
  },
  {
    icon: '🔒',
    title: 'Secure & Private Practice',
    description:
      'Your interview attempts, recordings, and feedback remain fully private and protected.'
  },
  {
    icon: '⚡',
    title: 'Instant Feedback & Scoring',
    description:
      'Receive AI-generated feedback, strengths, weaknesses, and an overall score immediately after each interview.'
  },
  {
    icon: '🧠',
    title: 'Continuous Skill Improvement',
    description:
      'Track your progress across multiple interviews and see where you’re getting stronger over time.'
  }
];

  

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* Background Decoration */}
      <div ref={orbsRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full px-12 py-5 flex z-[1000] bg-black/80 backdrop-blur-md">
       <Image src="/logo.png" alt="Logo" height={32} width={38} ></Image>
        <div className="text-3xl text-white font-bold ml-2 ">InterviewX</div>
        
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-12 pt-24 pb-12 z-10">
        <div className="text-center max-w-4xl">
          <div className="w-48 h-48 mx-auto mb-10 relative logo-float">
            <img 
              src="logo.png" 
              alt="InterviewX Logo" 
              className="fade-soft"
          ></img>
          </div>
          
          <h1 className="text-6xl font-bold mb-5 text-white shimmer-text">InterviewX</h1>
          <p className="text-2xl text-gray-400 mb-10">Transform Your Interview Process with AI-Powered Intelligence</p>
          
          <div className="flex gap-5 justify-center">
            <Link href="/sign-up">
            <button className="px-10 py-4 text-lg rounded-full bg-linear-to-r from-blue-900 to-blue-500 text-white shadow-lg shadow-blue-500/40 btn-3d hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/60">
              Get Started
            </button>
            </Link>
           
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-12 bg-linear-to-b from-black to-slate-900">
        <h2 className="text-5xl font-bold text-center mb-5 gradient-text">Powerful Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mt-14">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="feature-card bg-white/5 p-10 rounded-2xl backdrop-blur-md border border-white/10 hover:shadow-2xl hover:shadow-blue-500/40 hover:border-blue-500/60"
            >
              <div className="text-5xl mb-5 inline-block pulse-icon">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
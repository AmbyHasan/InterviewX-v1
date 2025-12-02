"use client"
import  { useEffect, useRef } from 'react';
import Link from "next/link";
import Image from 'next/image';

export default function landingPage() {
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
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze candidate responses in real-time, providing instant feedback and insights.'
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Comprehensive dashboards and reports help you make data-driven hiring decisions with confidence.'
    },
    {
      icon: '🎯',
      title: 'Custom Questions',
      description: 'Create tailored interview scenarios that match your specific job requirements and company culture.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Enterprise-grade security ensures your interview data remains confidential and protected.'
    },
    {
      icon: '⚡',
      title: 'Real-Time Feedback',
      description: 'Get instant insights during interviews to adapt your approach and dig deeper into key topics.'
    },
    {
      icon: '🌐',
      title: 'Global Reach',
      description: 'Conduct interviews across time zones with multilingual support and seamless video integration.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-20px) rotateZ(5deg); }
        }

        @keyframes shimmer {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes move {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .logo-float {
          animation: float 6s ease-in-out infinite;
        }

        .shimmer-text {
          animation: shimmer 3s ease-in-out infinite;
        }

        .pulse-icon {
          animation: pulse 2s ease-in-out infinite;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: move 20s ease-in-out infinite;
        }

        .orb1 {
          width: 400px;
          height: 400px;
          background: #1e3a8a;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb2 {
          width: 350px;
          height: 350px;
          background: #3b82f6;
          bottom: 10%;
          right: 10%;
          animation-delay: 3s;
        }

        .orb3 {
          width: 300px;
          height: 300px;
          background: #60a5fa;
          top: 50%;
          left: 50%;
          animation-delay: 6s;
        }

        .gradient-text {
          background: linear-gradient(135deg, #1e3a8a, #3b82f6, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .feature-card {
          transition: all 0.5s;
          transform-style: preserve-3d;
        }

        .btn-3d {
          transform-style: preserve-3d;
          transition: all 0.3s;
        }
      `}</style>

      {/* Background Decoration */}
      <div ref={orbsRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full px-12 py-5 flex  items-center z-[1000] bg-black/80 backdrop-blur-md">
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
            //   style={{ filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.6))' }}
            />
          </div>
          
          <h1 className="text-6xl font-bold mb-5 text-white shimmer-text">InterviewX</h1>
          <p className="text-2xl text-gray-400 mb-10">Transform Your Interview Process with AI-Powered Intelligence</p>
          
          <div className="flex gap-5 justify-center">
            <Link href="/sign-up">
            <button className="px-10 py-4 text-lg rounded-full bg-gradient-to-r from-blue-900 to-blue-500 text-white shadow-lg shadow-blue-500/40 btn-3d hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/60">
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

      {/* Footer */}
      <footer className="text-center py-10 bg-black/90 text-gray-500">
        <p>&copy; 2025 InterviewX by Amber Hasan</p>
      </footer>
    </div>
  );
}
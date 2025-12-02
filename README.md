InterviewX

InterviewX is a modern, AI-powered interview practice platform built with Next.js, TypeScript, and VAPI. It enables users to conduct realistic mock interviews, receive AI-generated feedback, and store session history — all within an intuitive and responsive web interface.


🚀 Project Overview

InterviewX provides a complete end-to-end interview simulation experience, integrating:
AI Interviewer powered by the VAPI Voice/Chat SDK
User authentication with persistent sessions
Secure data storage for users and interview records
A polished modern UI built using React 19 + TailwindCSS
Server-side rendering and API routes via Next.js App Router
It is designed for students, job seekers, and professionals looking to improve communication skills, structured answering, and interview readiness.

✨ Features

🎙️ AI Interviewer
Real-time voice and text-based interview sessions
Workflow-based interview logic via @vapi-ai/web

Event-based handling of speech start/end, responses, and call lifecycle
🔐 Authentication
Email/password login
Secure session handling with next-auth
Persistent user data using MongoDB Adapter

🗂️ Data Persistence
MongoDB database using mongoose
Interview session storage with timestamps and metadata
Modular models for users and interviews

🧰 Modern Web Stack
Next.js App Router (app/)
TypeScript
Tailwind CSS + PostCSS
React 19 features and optimizations

🛠️ Tech Stack
Category	Technology
Framework	Next.js (App Router)
Language	TypeScript
Authentication	next-auth + @auth/mongodb-adapter
Database	MongoDB, mongoose
AI / Voice Agent	@vapi-ai/web, @ai-sdk/google (optional)
Styling	Tailwind CSS, PostCSS


Deployment	Vercel

⚙️ Quick Start

Prerequisites
Node.js 18+
MongoDB (Atlas or local)
A VAPI workflow + public token


1. Install Dependencies
npm install

2. Create Environment Variables
Create a .env.local file in the root:

MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/interviewx
NEXTAUTH_SECRET=some_long_random_secret
NEXT_PUBLIC_VAPI_WEB_TOKEN=pk_live_xxx
NEXT_PUBLIC_VAPI_WORKFLOW_ID=wf_xxx

3. Run Development Server
npm run dev


App runs at:
➡️ http://localhost:3000

📁 Project Structure
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       └── ... (route handlers)
├── components/
│   └── Agent.tsx
├── lib/
│   ├── vapi.ts
│   ├── mongodb.ts
│   ├── dbConnect.ts
│   └── utils.ts
├── models/
│   ├── User.ts
│   └── Interviews.ts
├── constants/
├── types/
└── package.json


Key Components:

Agent.tsx – Manages VAPI client events and interview UI
vapi.ts – Initializes VAPI SDK with public token
next-auth configuration – Auth logic in options.ts
Mongoose models – Defines User + Interview +Feedback schemas

🔐 Authentication & Data Flow
Authentication is powered by next-auth
Sessions and users are stored using the MongoDB Adapter
Interviews are persisted using Mongoose models
Client-side agent triggers workflows via NEXT_PUBLIC_VAPI_WORKFLOW_ID

🧪 Testing & Linting
Linting:
npm run lint
Add unit tests for API and database logic as needed.

☁️ Deployment
Deploy easily to Vercel:
Push your repo to GitHub
Import it in Vercel
Add all required environment variables in the Vercel dashboard
Deploy 🎉

Make sure to configure:
MONGODB_URI
NEXTAUTH_SECRET
VAPI public token + workflow ID

🤝 Contributing
Contributions are welcome!
Fork the repository
Create a feature branch
Make changes with clear, focused commits
Add/update documentation
Open a pull request
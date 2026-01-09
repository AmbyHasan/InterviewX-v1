# InterviewX 🎤🤖

**InterviewX** is a modern, AI-powered interview practice platform built with **Next.js**, **TypeScript**, and **VAPI**.  
It enables users to conduct realistic mock interviews, receive AI-generated feedback, and store session history — all within an intuitive and responsive web interface.

---

## 🚀 Project Overview

InterviewX provides a complete end-to-end interview simulation experience, integrating:

- AI Interviewer powered by the **VAPI Voice/Chat SDK**
- User authentication with persistent sessions
- Secure data storage for users and interview records
- A polished modern UI built using **React 19 + Tailwind CSS**
- Server-side rendering and API routes via **Next.js App Router**

It is designed for **students, job seekers, and professionals** looking to improve communication skills, structured answering, and interview readiness.

---

## ✨ Features

### 🎙️ AI Interviewer
- Real-time voice and text-based interview sessions  
- Workflow-based interview logic via `@vapi-ai/web`  
- Event-based handling of speech start/end, responses, and call lifecycle  

### 🔐 Authentication
- Email and password login  
- Secure session handling with **next-auth**  
- Persistent user data using **MongoDB Adapter**  

### 🗂️ Data Persistence
- MongoDB database using **mongoose**  
- Interview session storage with timestamps and metadata  
- Modular models for users and interviews  

### 🧰 Modern Web Stack
- Next.js App Router (`app/`)
- TypeScript
- Tailwind CSS + PostCSS
- React 19 features and optimizations

---

## 🛠️ Tech Stack

| Category | Technology |
|--------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Authentication | next-auth + @auth/mongodb-adapter |
| Database | MongoDB, mongoose |
| AI / Voice Agent | @vapi-ai/web, @ai-sdk/google (optional) |
| Styling | Tailwind CSS, PostCSS |
| Deployment | Vercel |

---

## ⚙️ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (Atlas or local)
- A VAPI workflow and public token

---

### 1️⃣ Install Dependencies

```bash
npm install
```


### 2️⃣Create Environment Variables

- Create a .env.local file in the root directory:

- MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/interviewx
- NEXTAUTH_SECRET=some_long_random_secret
- NEXT_PUBLIC_VAPI_WEB_TOKEN=pk_live_xxx
- NEXT_PUBLIC_VAPI_WORKFLOW_ID=wf_xxx


### 3️⃣ Run the Development Server
npm run dev


-The application will be available at:
-➡️ http://localhost:3000

## 📁 Project Structure

```bash
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (root)/
│   │   ├── interview/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── options.ts
│   │   │   └── route.ts
│   │   ├── sign-up/
│   │   │   └── route.ts
│   │   └── vapi/
│   │       └── generate/
│   │           └── route.ts
│   │
│   ├── landingPage/
│   ├── globals.css
│   └── layout.tsx
│
├── components/
├── constants/
│
├── lib/
│   ├── action.ts
│   ├── dbConnect.ts
│   ├── groq.ts
│   ├── mongodb.ts
│   ├── utils.ts
│   └── vapi.ts
│
├── models/
├── types/
├── middleware.ts
│
├── .env
├── .gitignore
├── components.json
├── eslint.config.mjs
└── image.png

```

## 🧩 Key Components

- **Agent.tsx**  
  Manages VAPI client events and controls the interview user interface.

- **vapi.ts**  
  Initializes the VAPI SDK using the public token and handles AI interview setup.

- **next-auth configuration**  
  Authentication logic configured in `options.ts`.

- **Mongoose models**  
  Define schemas for **User**, **Interview**, and **Feedback** data.

---

## 🔐 Authentication & Data Flow

- Authentication is handled using **next-auth**.
- User sessions and account data are stored using the **MongoDB Adapter**.
- Interview sessions are persisted using **Mongoose models**.
- The client-side interview agent triggers AI workflows via the  
  `NEXT_PUBLIC_VAPI_WORKFLOW_ID` environment variable.

This setup ensures secure authentication, reliable data persistence, and smooth communication between the client, server, and AI interview engine.

---

## 🧪 Testing & Linting

### Linting

```bash
npm run lint
```


## ☁️ Deployment

The project can be deployed seamlessly on **Vercel**.

### Deployment Steps

1. Push the repository to **GitHub**  
2. Import the project into **Vercel**  
3. Add all required environment variables in the Vercel dashboard  
4. Deploy 🎉


             ┌───────────────┐
             │   NextAuth    │
             │ (Auth Layer)  │
             └───────┬───────┘
                     │
               session.user.id
                     │
        ┌────────────┴────────────┐
        │                         │
 ┌──────▼──────┐           ┌──────▼──────┐
 │  MongoDB    │           │   Neon DB   │
 │ InterviewX  │           │ Tools Data  │
 │ (Interviews)│           │ (Resume etc)│
 └─────────────┘           └─────────────┘


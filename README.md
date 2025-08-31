# 📝 Notion Clone AI

A collaborative Notion-style document editor with **real-time sync, authentication, and AI-powered features**.  
Built with **Liveblocks**, **Clerk**, **Firestore**, **Hono**, and **OpenAI**, and deployed on **Vercel**.

![notionclone](https://github.com/user-attachments/assets/6da1dfd0-0043-46b7-aa0d-c388caaff92d)

---

## Features

- 🔑 **Authentication** – Secure login with [Clerk](https://clerk.com)
- 🤝 **Real-Time Collaboration** – Multi-user editing with [Liveblocks](https://liveblocks.io)
- 💬 **AI Chat-to-Doc** – Chat with your documents using OpenAI via Cloudflare Workers
- 🌍 **AI Translate** – Instantly translate content into multiple languages
- 🗄 **Cloud Storage** – Store documents in [Firebase Firestore](https://firebase.google.com/docs/firestore)
- ⚡ **Lightweight Backend** – Powered by [Hono](https://hono.dev) for API routes
- 🚀 **Fast Deployment** – Hosted on [Vercel](https://vercel.com)

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) (Frontend)
- [Liveblocks](https://liveblocks.io/) (Real-time collaboration)
- [Clerk](https://clerk.com/) (Authentication)
- [Firebase Firestore](https://firebase.google.com/) (Database)
- [Hono](https://hono.dev/) (Edge API framework)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) (Edge AI + APIs)
- [OpenAI](https://openai.com/) (AI Translate & Chat)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [Vercel](https://vercel.com/) (Deployment)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SteeveSticks/NOTION-CLONE.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
LIVEBLOCKS_PRIVATE_KEY=

NEXT_PUBLIC_BASE_URL=
```

4.Run locally:

```bash
npm run dev
```

---

## Backend (Hono + Cloudflare Workers)

1. Backend is generated separately from the frontend, if you need that you can contact me for that.

2. Install dependencies:

```bash
npm install
```

3. Add .dev.vars file (for local Cloudflare dev):

```bash
OPENAI_API_KEY=your_openai_key
```

4. Run locally with wrangler:

```bash
npm wrangler dev
```

## Deployment

- Frontend -> Vercel
- Backend -> Cloudflare Workers
- Configure your frontend to call the backend workers routes for AI functions.

---

🤖 AI Features

- Translate Document: Translate content into limited supported language using OpenAI.

- Chat with Document: Query your documents, and AI provides contextual answers.

- Runs on Cloudflare Edge Workers for low-latency performance.

---

## Author

- Stephen Adebanjo (Steeve) - Fullstack Developer

Contributions are welcome! Please open an issue or submit a pull request.

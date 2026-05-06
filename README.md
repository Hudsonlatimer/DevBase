# DevBase

DevBase is a project management dashboard for freelance developers. It provides a centralized place to track projects, manage tasks, and monitor revenue.

Live at: [https://devbasehq.xyz](https://devbasehq.xyz)

## Features

- Dashboard Overview: View active projects, monthly revenue, and status distribution.
- Project Tracking: Manage project deadlines, status updates, and internal notes.
- Finance Hub: Track project budgets and paid invoices to monitor income.
- Tech Stack: Built with Next.js, Supabase, and Tailwind CSS.
- Netlify Ready: Pre-configured for deployment on Netlify.

## Tech Stack

- Framework: [Next.js](https://nextjs.org/)
- Backend/Auth: [Supabase](https://supabase.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Icons: [Lucide React](https://lucide.dev/)
- Deployment: [Netlify](https://www.netlify.com/)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/hudsonlatimer/devbase.git
cd lead-tracker-main
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Setup Database
Run the SQL found in `supabase_schema.sql` in your Supabase SQL Editor to create the tables (`projects`, `invoices`, `tasks`).

### 5. Run the development server
```bash
npm run dev
```

## Google Authentication

To enable Google Login:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Navigate to APIs & Services > Credentials.
4. Create OAuth client ID (Web application).
5. Add `https://your-project-ref.supabase.co/auth/v1/callback` to Authorized redirect URIs.
6. Add Client ID and Client Secret to Supabase > Authentication > Providers > Google.

## License
Built by [Hudson Latimer](https://github.com/hudsonlatimer). 
Distributed under the MIT License.
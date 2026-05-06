import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevBase - The Ultimate Freelance CRM",
    template: "%s | DevBase",
  },
  description: "Manage your entire freelance web development agency in one place. Track projects, notes, and revenue with our free, powerful dashboard.",
  keywords: ["freelance CRM", "web developer dashboard", "project management", "freelance tools", "agency management", "revenue tracking"],
  authors: [{ name: "DevBase" }],
  creator: "DevBase",
  publisher: "DevBase",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "DevBase - The Ultimate Freelance CRM",
    description: "Manage your entire freelance web development agency in one place. Track projects, notes, and revenue.",
    url: "https://devbasehq.xyz",
    siteName: "DevBase",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevBase - The Ultimate Freelance CRM",
    description: "Manage your entire freelance web development agency in one place.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
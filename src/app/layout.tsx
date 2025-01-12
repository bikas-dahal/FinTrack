import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

// Font Setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Ensures text is visible while font loads
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Ensures text is visible while font loads
});


export const metadata: Metadata = {
  title: {
    default: "FinTrack - Financial Management Made Easy",
    template: "%s | FinTrack",        
  },
  description:
    "Effortlessly manage your finances with FinTrack. Track income, expenses, set budgets, and gain valuable financial insights in Nepal.",
  keywords: [
    "finance management",
    "budgeting app",
    "expense tracker",
    "income tracker",
    "financial planning",
    "Nepal",
    "personal finance",
    "investment tracking",
  ],
  authors: [{ name: "Bikas Dahal" }, { url: "https://bikasdahal.tech" }],
  openGraph: {
    title: "FinTrack - Financial Management Made Easy",
    description:
        "Effortlessly manage your finances with FinTrack. Track income, expenses, set budgets, and gain valuable financial insights in Nepal.",
    url: "https://fintrack.vercel.app",    
    siteName: "FinTrack",
   
    locale: "en_US",
    type: "website",
  },
  twitter: {
      card: "summary_large_image",
      title: "FinTrack - Financial Management Made Easy",
      description:
          "Effortlessly manage your finances with FinTrack. Track income, expenses, set budgets, and gain valuable financial insights in Nepal.",
      site: "@bikas_dahal",
      creator: "@bikas_dahal",
   },
  robots: {
    index: true,
    follow: true,
    googleBot: {
        index: true,
        follow: true,
    },
  },
  
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" attribute={'class'} enableSystem disableTransitionOnChange>
        <SessionProvider session={session}>
          {children}
          <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
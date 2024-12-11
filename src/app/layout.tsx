import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../context/userContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  fallback: ["sans-serif"],
  display: "swap",
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  fallback: ["sans-serif"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Todo App",
  description:
    "A powerful and intuitive Todo App designed to help you stay organized and boost productivity. Created by Raphael Elias.",
  keywords: [
    "todo app",
    "task management app",
    "productivity tools",
    "task organization",
    "Raphael Elias",
    "task planner",
    "to-do list manager",
    "efficient task management",
    "personal productivity app",
    "daily task tracker",
    "organize tasks online",
    "best todo app",
    "task scheduling software",
    "task prioritization",
    "simple task organizer",
    "boost productivity",
  ],
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#ffffff",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  openGraph: {
    title: "Todo App - Organize Your Tasks Efficiently",
    description:
      "A powerful and intuitive Todo App designed to help you stay organized and boost productivity. Created by Raphael Elias.",
    url: "https://raphaelelias.tech",
    siteName: "Todo App",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Todo App - Organize Your Tasks Efficiently",
    description:
      "A powerful and intuitive Todo App designed to help you stay organized and boost productivity. Created by Raphael Elias.",
    creator: "@faeleliass",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased`}
      >
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}

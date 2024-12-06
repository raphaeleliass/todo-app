import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  fallback: ["sans-serif"],
  display: "swap",
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  fallback: ["sans-serif"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}

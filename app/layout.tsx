import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"



import "./globals.css";
import ModalProvider from "@/components/providers/ModalProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Provider from "@/components/providers/Provider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joshua's Blog :)",
  description: "Personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased scroll-smooth  ")}>
        <Toaster position="top-center" richColors/>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider />
          <Navbar/>
          <Provider>{children}</Provider>
          <Footer/>
          
        </ThemeProvider>

      </body>
    </html>
  );
}

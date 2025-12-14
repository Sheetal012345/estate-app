import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from '@clerk/nextjs';
import Header from "@/app/_components/Header";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Real Estate App",
  description: "Property listings",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          
          {/* Header stays on all pages */}
          <Header /> 

          {/* MAIN CONTENT */}
          <div className="pt-24"> 
            <Provider>
              <Toaster richColors position="top-right" />

              {children}
            </Provider>
          </div>

        </body>
      </html>
    </ClerkProvider>
  );
}

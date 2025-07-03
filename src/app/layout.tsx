import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "@/components/header/NavbarComponent";
import { Suspense } from "react";
import Loading from "./loading";
import Error from "./error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const suwannaphum = localFont({
  src: [
    {
      path: '../../public/fonts/Suwannaphum-Black.ttf',
      weight: '900',
      style: 'black',
    },
    {
      path: '../../public/fonts/Suwannaphum-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/Suwannaphum-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Suwannaphum-Light.ttf',
      weight: '300',
      style: 'light',
    },
    {
      path: '../../public/fonts/Suwannaphum-Thin.ttf',
      weight: '100',
      style: 'thin',
    }
  ],
  variable: "--font-suwannaphum",
  display: "swap",
})


export const metadata: Metadata = {
  title: "Home | FullStack Morning",
  description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
  twitter: {
    card: "summary_large_image",
    title: "Home | FullStack Morning",
    description: "A simple Next.js app with TypeScript, Tailwind CSS, and Geist UI",
    images: "",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} ${suwannaphum.variable} antialiased`}
      >
        
        <ErrorBoundary errorComponent={Error}>
          <NavbarComponent />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ErrorBoundary>
        
      </body>
    </html>
  );
}

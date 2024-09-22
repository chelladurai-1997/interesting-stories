import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./lib/contexts/UserContext";
import { Toaster } from "react-hot-toast";
import SessionMonitor from "./components/organism/SessionMonitor/SessionMonitor";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linking Hearts",
  description: "just meet your soulmate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextTopLoader color="#007BFF" showSpinner={false} />
        <UserProvider>
          {children}
          <SessionMonitor />
        </UserProvider>
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

        {/* <Footer /> */}
      </body>
    </html>
  );
}

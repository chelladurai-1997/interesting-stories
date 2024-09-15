import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./lib/contexts/UserContext";
import Footer from "./components/organism/Footer/Footer";
import { Toaster } from "react-hot-toast";
import SessionMonitor from "./components/organism/SessionMonitor/SessionMonitor";

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
        <UserProvider>
          {children}
          <SessionMonitor />
        </UserProvider>
        <Toaster position="top-right" />

        <Footer />
      </body>
    </html>
  );
}

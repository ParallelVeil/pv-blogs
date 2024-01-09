import "./globals.css";
import Navbar from "./components/Navbar";
import type { Metadata } from "next";
import DateHandler from "./context/DateContext";

export const metadata: Metadata = {
  title: "ishiko's Blog",
  description: "Created by pv-raw-blogs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="px-4 md:px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
          <DateHandler>
            {children}
          </DateHandler>
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Nav } from "./nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code statistics",
  description: "Code statistics!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="container mx-auto">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}

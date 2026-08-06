import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harry Wu | AI Resume",
  description: "An AI-powered resume and recruiting assistant for Harry Wu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

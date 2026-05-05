import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prakhar Bhardwaj | AI Engineer",
  description:
    "AI Engineer & ML Specialist — CMU MS graduate specializing in LLMs, Computer Vision, and building production AI systems.",
  keywords: ["AI Engineer", "Machine Learning", "Computer Vision", "LLM", "Carnegie Mellon", "Prakhar Bhardwaj"],
  openGraph: {
    title: "Prakhar Bhardwaj | AI Engineer",
    description: "AI Engineer & ML Specialist — CMU MS graduate specializing in LLMs and Computer Vision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

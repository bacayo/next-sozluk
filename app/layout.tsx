import "./globals.css";
import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import { ThemeProvider } from "./providers/ThemeProvider";
import Navbar from "./components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

const source = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Sozluk",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={source.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

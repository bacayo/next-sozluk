import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { getSession } from "./actions/getCurrentUser";
import SupabaseProvider from "./providers/SupabaseProvider";
import ReduxProvider from "./providers/ReduxProvider";
import { Toaster } from "./components/ui/Toaster";

const source = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Sozluk",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={source.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SupabaseProvider>
              <Navbar session={session} />
              {children}
              <Toaster />
            </SupabaseProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

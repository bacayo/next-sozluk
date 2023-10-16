import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { getSession } from "./actions/getCurrentUser";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import SupabaseProvider from "./providers/SupabaseProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import ReduxProvider from "./providers/ReduxProvider";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Container from "./components/Container";
import Sidebar from "./components/Sidebar";
import { Toaster } from "./components/ui/Toaster";

const source = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Sozluk-ozgur bilgi kaynagi",
  description: "Next Solzuk",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const session = await getSession();

  const { data: topics } = await supabase.from("topics").select("*");

  const { data: myProfile } = await supabase
    .from("profiles")
    .select()
    .match({ id: session?.user.id })
    .single();

  return (
    <html lang="en">
      <body className={source.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SupabaseProvider>
              <Navbar session={session} profile={myProfile} />
              <Container>
                <Sidebar topics={topics} />
                {children}
              </Container>
              <Toaster />
            </SupabaseProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

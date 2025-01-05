import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
  title: "Hamza Asif • Full Stack Developer",
  description: "A portfolio website to showcase my projects and skills",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen">
        <PlausibleProvider
          domain={
            process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL?.startsWith("https://")
              ? process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL!.slice(8)
              : process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL!
          }
          // I'm using a custom-domain and self-hosting plausible
          // buuuuut if this doesn't apply to you, feel free to adjust this
          customDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          selfHosted={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? true : false}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Header />
            <main className="pt-16">{children}</main>
            <Toaster />
          </ThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}

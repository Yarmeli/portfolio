import { Header } from "@/components/Header";
import "./globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen">
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}

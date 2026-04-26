import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeRegistry from "@/components/theme/ThemeRegistry";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopKit - E-commerce App",
  description: "Modern, clean, high-fidelity e-commerce experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: '#673ab7' } }}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        </head>
        <body className="m-0 p-0" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} suppressHydrationWarning>
          <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <ThemeRegistry>
              <Navbar />
              <main style={{ flexGrow: 1 }}>{children}</main>
            </ThemeRegistry>
          </NextThemesProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

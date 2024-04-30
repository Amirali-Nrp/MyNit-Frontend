import type { Metadata } from "next";

import "./globals.css";

import ReactQueryProvider from "@/components/providers/react-query-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import ToasterContainer from "@/components/ToasterContainer/ToasterContainer";

export const metadata: Metadata = {
  title: "uNit",
  description: "uNit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log("id in session", session?.user.id);

  return (
    <html lang="en">
      <body className={"min-h-screen bg-[#BDCDD9]"}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterContainer />
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Deptron",
  description: "Deptron Robotics",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/deptron_logo.svg",
        href: "/deptron_logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/deptron_logo.svg",
        href: "/deptron_logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "lenis/dist/lenis.css";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL('https://rgbtechagency.com'),
  title: "RGB Tech | Digital Transformation & Software Development Agency",
  description:
    "RGB Tech (under RGB Graphics Design and Solution) builds modern websites, mobile apps, AI solutions, and enterprise software that transform businesses and accelerate digital growth.",
  keywords:
    "RGB Tech, RGB Graphics Design and Solution, software development, web development, mobile app development, AI solutions, digital transformation, Next.js, React, MERN stack",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "RGB Tech | Digital Transformation Agency",
    description:
      "We build modern websites, mobile apps, AI solutions & enterprise software under RGB Graphics Design and Solution.",
    url: "/",
    siteName: "RGB Tech",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={dark}>
      <html lang="en">
        <body>
          <SmoothScroll>
            <ScrollReveal />
            {children}
          </SmoothScroll>
        </body>
      </html>
    </ClerkProvider>
  );
}

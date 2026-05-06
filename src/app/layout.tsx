import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://metrixai.io"),
  title: {
    default: "MetrixAI - AI-Powered Talent Intelligence Platform",
    template: "%s | MetrixAI",
  },
  description:
    "MetrixAI helps HR leaders see who is ready, who is at risk, and who is next — so leadership continuity is never left to chance.",
  keywords: [
    "talent intelligence",
    "AI HR",
    "career pathing",
    "skill mapping",
    "succession planning",
    "employee development",
    "HR technology",
    "talent management",
  ],
  authors: [{ name: "MetrixAI" }],
  creator: "MetrixAI",
  publisher: "MetrixAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://metrixai.io",
    siteName: "MetrixAI",
    title: "MetrixAI",
    description:
      "Stop paying to hire people you already have. MetrixAI shows you who's ready — before the next role opens, the next leader leaves, or the next external search begins.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MetrixAI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MetrixAI",
    description:
      "Stop paying to hire people you already have. MetrixAI shows you who's ready — before the next role opens.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Calendly styles */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MetrixAI",
              url: "https://metrixai.io",
              logo: "https://metrixai.io/logo.png",
              description:
                "MetrixAI helps HR leaders see who is ready, who is at risk, and who is next — so leadership continuity is never left to chance.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@metrixai.io",
                contactType: "sales",
              },
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MetrixAI",
              url: "https://metrixai.io",
            }),
          }}
        />
      </body>
    </html>
  );
}

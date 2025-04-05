import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Software Engineer Portfolio",
  description:
    "Professional portfolio showcasing software engineering skills and projects",
  metadataBase: new URL("https://yourportfolio.com"),
  keywords: ["software engineer", "web developer", "portfolio", "projects"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Software Engineer Portfolio",
    description:
      "Professional portfolio showcasing software engineering skills and projects",
    url: "https://yourportfolio.com",
    siteName: "Software Engineer Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Gentle approach to avoid layout shifts
              (function() {
                // Set scroll restoration to manual
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                
                // Clear any hash to prevent automatic scrolling
                if (window.location.hash) {
                  window.history.replaceState('', document.title, window.location.pathname + window.location.search);
                }
                
                // Single gentle scroll rather than forcing
                requestAnimationFrame(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'auto'
                  });
                });
              })();
            `,
          }}
        />
      </head>
      <body>
        <Header />
        <div className="site-background">
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

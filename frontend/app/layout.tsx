import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "GB Technologies — Revenue-Engineered Web Platforms & Digital Flagships",
  description:
    "We engineer bespoke, conversion-obsessed web platforms, sub-second digital flagships, and decoupled modern applications for companies that cannot afford to look ordinary or load slow.",
  metadataBase: new URL("https://gb-technologies.com"),
  openGraph: {
    title: "GB Technologies — Revenue-Engineered Web Platforms & Digital Flagships",
    description:
      "We engineer bespoke, conversion-obsessed web platforms, sub-second digital flagships, and decoupled modern applications.",
    siteName: "GB Technologies",
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
      suppressHydrationWarning
      className="antialiased font-sans"
    >
      <head>
        {/* Zero-runtime FOWT prevention script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&d)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--canvas)] text-[var(--text-primary)] transition-colors duration-150">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

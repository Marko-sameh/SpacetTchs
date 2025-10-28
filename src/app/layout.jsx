import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Providers } from "@/components/Providers";
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { PageTransition } from '@/components/PageTransition'
import { ScrollProgress } from '@/components/ScrollProgress'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Space Techs",
  "url": "https://spacetechs.net",
  "sameAs": [
    "https://github.com/spacetechs",
    "https://linkedin.com/in/spacetechs",
    "https://twitter.com/spacetechs"
  ],
  "jobTitle": "Creative Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Space Techs"
  },
  "knowsAbout": [
    "Web Development",
    "Mobile Development",
    "Artificial Intelligence",
    "Digital Markting",
    "3D Websites",
    "React",
    "Three.js",
    "Next.js",
    "Flutter",
    "Dart",
    "Backend",
    "Express.js"
  ]
}

export const metadata = {
  title: {
    default: "Space Techs - Creative Developer & 3D Portfolio",
    template: "%s | Space Techs",
  },
  description: "Accelerating the Future with Mobile, Web, and AI Innovation. Interactive 3D portfolio showcasing cutting-edge web development, mobile apps, and AI solutions.",
  keywords: [
    "portfolio", "developer", "3D", "web development", "creative", "mobile", "AI",
    "React", "Three.js", "Next.js", "interactive", "animation", "modern web",
    "responsive design", "user experience", "digital innovation"
  ],
  authors: [{ name: "Space Techs" }],
  creator: "Space Techs",
  publisher: "Space Techs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spacetechs.net",
    siteName: "Space Techs",
    title: "Space Techs - Creative Developer & 3D Portfolio",
    description: "Accelerating the Future with Mobile, Web, and AI Innovation. Interactive 3D portfolio showcasing cutting-edge web development, mobile apps, and AI solutions.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Space Techs - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Techs - Creative Developer & 3D Portfolio",
    description: "Accelerating the Future with Mobile, Web, and AI Innovation",
    images: ["/images/og-image.jpg"],
    creator: "@spacetechs",
  },

  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://spacetechs.net" />
        <link rel="icon" href="/logo_wbg.png" sizes="any" />
        <link rel="icon" href="/logo_wbg.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo_wbg.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Providers>
            <ScrollProgress />
            <Navbar />
            <PageTransition>
              <ErrorBoundary>
                <main className="min-h-screen" role="main">
                  {children}
                </main>
              </ErrorBoundary>
            </PageTransition>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from '@/components/features/navigation/Navbar'
import { Footer } from '@/components/ui/layout/Footer'
import { PageTransition } from '@/components/ui/layout/PageTransition'
import { ScrollProgress } from '@/components/ui/common/ScrollProgress'
import { ErrorBoundary } from '@/components/ui/common/ErrorBoundary'
import { FloatingContactButton } from '@/components/ui/FloatingContactButton'
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from '@/lib/seo'

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

export const metadata = {
  metadataBase: new URL('https://spacetechs.net'),
  title: {
    default: "SpaceTechs - Web Development Company | Mobile Apps | AI Solutions | Digital Marketing",
    template: "%s | SpaceTechs - Web Development Company",
  },
  description: "Leading web development company specializing in custom websites, mobile app development, AI solutions, and digital marketing. Transform your business with cutting-edge technology and innovative digital solutions.",
  keywords: [
    "web development company", "mobile app development", "AI solutions provider", "digital marketing agency",
    "custom websites", "mobile apps", "SpaceTechs", "spacetechs.net", "web development services",
    "mobile application development", "artificial intelligence solutions", "digital marketing services",
    "custom web development", "responsive web design", "e-commerce development", "React development",
    "Next.js development", "React Native apps", "Flutter development", "Node.js development",
    "Python development", "machine learning", "SEO optimization", "social media marketing",
    "3D web development", "Three.js", "interactive websites", "modern web applications",
    "cross-platform mobile apps", "iOS app development", "Android app development",
    "web app development", "progressive web apps", "API development", "database design",
    "cloud solutions", "DevOps services", "UI/UX design", "branding services"
  ],
  authors: [{ name: "SpaceTechs", url: "https://spacetechs.net" }],
  creator: "SpaceTechs",
  publisher: "SpaceTechs",
  category: "Technology",
  classification: "Business",
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
  alternates: {
    canonical: "https://spacetechs.net",
    languages: {
      'en-US': 'https://spacetechs.net',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spacetechs.net",
    siteName: "SpaceTechs - Web Development Company",
    title: "SpaceTechs - Leading Web Development Company | Mobile Apps | AI Solutions",
    description: "Transform your business with SpaceTechs - premier web development company specializing in custom websites, mobile app development, AI solutions, and digital marketing services.",
    images: [
      {
        url: "https://spacetechs.net/images/og-spacetechs-web-development.jpg",
        width: 1200,
        height: 630,
        alt: "SpaceTechs - Web Development Company | Mobile Apps | AI Solutions",
        type: "image/jpeg",
      },
      {
        url: "https://spacetechs.net/logo_wbg.png",
        width: 512,
        height: 512,
        alt: "SpaceTechs Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@spacetechs",
    creator: "@spacetechs",
    title: "SpaceTechs - Web Development Company | Mobile Apps | AI Solutions",
    description: "Leading web development company specializing in custom websites, mobile app development, AI solutions, and digital marketing services.",
    images: ["https://spacetechs.net/images/og-spacetechs-web-development.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="icon" href="/logo_wbg.png" sizes="any" />
        <link rel="icon" href="/logo_wbg.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo_wbg.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://fonts.googleapis.com/css2?family=Audiowide&family=Exo+2:wght@400&display=swap';
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
                document.head.appendChild(link);
              })();
            `
          }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Audiowide&family=Exo+2:wght@400&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
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
            <FloatingContactButton />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
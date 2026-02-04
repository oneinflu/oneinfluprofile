import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import { AuthProvider } from "@/providers/auth";
import { MainLayout } from "@/layout/main-layout";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";
import Script from "next/script";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "INFLU — One smart link. Get hired and paid.",
    description: "INFLU brings services, portfolios, enquiries, and payments into one simple link — no website required.",
    icons: {
        icon: "/faviconwhite.png",
        shortcut: "/faviconwhite.png",
        apple: "/faviconwhite.png",
    },
};

export const viewport: Viewport = {
    themeColor: "#7f56d9",
    colorScheme: "light dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-N8G4PGG8SZ" />
                <Script id="google-analytics">
                    {`
                        window.dataLayer = window.dataLayer || []; 
                        function gtag(){dataLayer.push(arguments);} 
                        gtag('js', new Date()); 
                        gtag('config', 'G-N8G4PGG8SZ'); 
                    `}
                </Script>
               
            </head>
            <body className={cx(inter.variable, "bg-primary antialiased")}>
                <RouteProvider>
                    <Theme>
                        <AuthProvider>
                            <MainLayout>
                                {children}
                            </MainLayout>
                        </AuthProvider>
                    </Theme>
                </RouteProvider>
                  </body>
        </html>
    );
}

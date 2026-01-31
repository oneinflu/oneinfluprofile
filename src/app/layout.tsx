import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import { AuthProvider } from "@/providers/auth";
import { ThemeFab } from "@/components/application/theme-toggle/theme-fab";
import { SiteHeader } from "@/components/application/site-header";
import { MarketingFooter } from "@/components/marketing/footer";
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
                <Script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer />
                <Script id="onesignal-init">
                    {`
                        window.OneSignalDeferred = window.OneSignalDeferred || []; 
                        OneSignalDeferred.push(async function(OneSignal) { 
                            await OneSignal.init({ 
                                appId: "faba9dc9-fbc3-487b-a574-58b2deed46b4", 
                                safari_web_id: "web.onesignal.auto.5a4f7f6e-eec9-48b6-8a5c-3683e8870b3c", 
                                notifyButton: { 
                                    enable: false, 
                                },
                                autoResubscribe: false,
                                allowLocalhostAsSecureOrigin: true
                            }); 
                        }); 
                    `}
                </Script>
            </head>
            <body className={cx(inter.variable, "bg-primary antialiased")}>
                <RouteProvider>
                    <Theme>
                        <AuthProvider>
                            <Suspense fallback={null}>
                                <SiteHeader />
                            </Suspense>
                            {children}
                            <Suspense fallback={null}>
                                <MarketingFooter />
                            </Suspense>
                            <ThemeFab />
                        </AuthProvider>
                    </Theme>
                </RouteProvider>
                  </body>
        </html>
    );
}

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

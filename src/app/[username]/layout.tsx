import type { Metadata } from "next";

export default function Layout({ children }: { children: React.ReactNode }) {
    return children as any;
}

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    const username = params.username;
    let avatar: string | null = null;
    try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const url = `${API_BASE}/users/${encodeURIComponent(username)}/profile`;
        const res = await fetch(url, { next: { revalidate: 300 } });
        const data = await res.json().catch(() => ({}));
        avatar = data?.profile?.avatarUrl || null;
    } catch {}
    const image = avatar || "https://oneinflu.com/avatar.svg";
    return {
        openGraph: {
            images: [image],
        },
        twitter: {
            images: [image],
            card: "summary_large_image",
        },
    };
}

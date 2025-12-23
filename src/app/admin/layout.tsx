import type { ReactNode } from "react";
import { AppSidebar } from "@/layout/sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <AppSidebar />
            {children}
        </>
    );
}

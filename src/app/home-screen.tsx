"use client";

import { BookOpen01, Check, Copy01, Cube01, HelpCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useClipboard } from "@/hooks/use-clipboard";
import { AppSidebar } from "@/layout/sidebar";

export const HomeScreen = () => {
    const clipboard = useClipboard(); 

    return (
        <><AppSidebar /></>
    );
};

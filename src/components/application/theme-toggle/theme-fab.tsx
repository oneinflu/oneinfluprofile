"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon01 } from "@untitledui/icons";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

export const ThemeFab = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    const isDark = resolvedTheme === "dark";
    const label = isDark ? "Switch to light" : "Switch to dark";

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <ButtonUtility
                icon={isDark ? Sun : Moon01}
                tooltip={label}
                onPress={() => setTheme(isDark ? "light" : "dark")}
            />
        </div>
    );
};

"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";

export const UntitledLogo = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <div {...props} className={cx("flex h-8 w-max items-center justify-start overflow-visible", props.className)}>
            <img src="/light.svg" alt="Logo" className="h-full w-auto shrink-0 dark:hidden" />
            <img src="/logo.svg" alt="Logo" className="hidden h-full w-auto shrink-0 dark:block" />
        </div>
    );
};

"use client";

import { useSearchParams } from "next/navigation";
import { cx } from "@/utils/cx";

interface PhonePreviewProps {
  username?: string;
  className?: string;
  frameClassName?: string;
}

export const PhonePreview = ({ username, className, frameClassName }: PhonePreviewProps) => {
  const params = useSearchParams();
  const u = username ?? params.get("username");

  return (
    <div
      className={cx(
        "mx-auto aspect-[9/19] w-full max-w-sm rounded-[2rem] bg-linear-to-b from-[#222] via-[#000] to-[#444] dark:from-[#d4d7da] dark:via-[#bfc3c7] dark:to-[#eceff1] p-1 shadow-2xl",
        className,
      )}
    >
      <div className={cx("size-full overflow-hidden rounded-[inherit] bg-alpha-black ring-1 ring-primary", frameClassName)}>
        <iframe title="Profile preview" src={`/${u}`} className="size-full border-0" />
      </div>
    </div>
  );
};


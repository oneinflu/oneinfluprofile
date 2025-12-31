import type { ReactNode } from "react";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { cx } from "@/utils/cx";

interface FeaturedCardCommonProps {
    title: string;
    description: ReactNode;
    confirmLabel?: string;
    className?: string;
    onDismiss?: () => void;
    onConfirm?: () => void;
    showClose?: boolean;
    showActions?: boolean;
}

export const FeaturedCardProgressBar = ({
    title,
    description,
    confirmLabel,
    progress,
    className,
    onDismiss,
    onConfirm,
    showClose = false,
    showActions = false,
}: FeaturedCardCommonProps & {
    progress: number;
}) => {
    return (
        <div className={cx("relative flex flex-col rounded-xl bg-secondary p-4", className)}>
            <p className="text-sm font-semibold text-primary">{title}</p>
            <p className="mt-1 text-sm text-tertiary">{description}</p>
            {showClose && (
                <div className="absolute top-2 right-2">
                    <CloseButton onClick={onDismiss} size="sm" />
                </div>
            )}
            <div className="mt-4 flex">
                <ProgressBar value={progress} />
            </div>
            {showActions && (
                <div className="mt-4 flex gap-3">
                    <Button onClick={onDismiss} color="link-gray" size="sm">
                        Dismiss
                    </Button>
                    {confirmLabel && (
                        <Button onClick={onConfirm} color="link-color" size="sm">
                            {confirmLabel}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

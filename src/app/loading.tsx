import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";

export default function Loading() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-black">
            <LoadingIndicator size="xl" type="line-spinner" />
        </div>
    );
}

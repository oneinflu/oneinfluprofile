export default function ConstructionUpdatesPage() {
    return (
        <section className="flex min-h-screen flex-col lg:pl-[300px]">
            <div className="top-0 z-10 border-b border-secondary bg-primary/95 px-4 pb-4 pt-6 backdrop-blur md:px-8">
                <div className="mx-auto w-full max-w-8xl">
                    <h1 className="text-display-sm font-semibold text-primary">Construction Updates</h1>
                    <p className="mt-1 text-sm text-tertiary">Fresh start. Build the new experience here.</p>
                </div>
            </div>
            <div className="flex-1 px-4 pb-12 pt-4 md:px-8">
                <div className="mx-auto w-full max-w-8xl">
                    <div className="rounded-2xl bg-primary p-6 text-sm text-tertiary ring-1 ring-secondary_alt">
                        Empty state
                    </div>
                </div>
            </div>
        </section>
    );
}

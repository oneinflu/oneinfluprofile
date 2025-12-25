import { Button } from "@/components/base/buttons/button";

export const NewsletterIPhoneMockup01 = () => {
    return (
        <section className="overflow-hidden bg-primary pt-16 md:py-24">
            <div className="mx-auto w-full max-w-6xl ">
                <div className="relative grid grid-cols-1 items-center gap-10 rounded-3xl bg-linear-to-br from-[#6241e9] via-[#5B3FD7] to-[#4f36c3] p-8 text-white ring-1 ring-[#6d52df] shadow-xl md:grid-cols-2 md:p-12">
                    <div className="z-10 flex flex-col items-start">
                        <h2 className="text-display-sm md:text-display-md lg:text-display-lg font-semibold">Turn your bio link into a business.</h2>
                        <p className="mt-4 text-md md:text-lg text-white/85">Stop sending people everywhere.
Give your clients one clear place to understand your work, contact you instantly, and pay without friction.</p>
                        <div className="mt-8 md:mt-10">
                            <Button href="/register" size="xl">
                                Create your free INFLU link
                            </Button>
                            <p className="mt-3 text-sm text-white/85">
                                Takes less than 2 minutes · No credit card required · Free forever
                            </p>
                        </div>
                    </div>

                    <div className="relative flex items-end justify-center min-h-90 md:min-h-100 md:w-full md:-mb-12">
                        <img
                            src="/mockup.png"
                            alt=""
                            className="z-10 w-full max-w-71 rounded-2xl md:max-w-78.5 md:drop-shadow-iphone-mockup"
                        />

                        
                    </div>
                </div>
            </div>
        </section>
    );
};

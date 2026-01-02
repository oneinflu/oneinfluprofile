"use client";

import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { DialogTrigger, ModalOverlay, Modal, Dialog } from "@/components/application/modals/modal";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { registerStart } = useAuth();

    const nextHref = "/username";

    const handleContinue = async () => {
        if (!email.trim() || loading) return;
        setLoading(true);
        try {
            const id = await registerStart(email.trim());
            const requestId = String(id || "");
            try {
                sessionStorage.setItem("influu_register_id", requestId);
                sessionStorage.setItem("influu_register_email", email.trim());
            } catch {}
            router.push(nextHref);
        } catch (e) {
            // noop
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex min-h-screen">
            <div className="flex w-full flex-col md:grid md:grid-cols-2">
                <div className="flex min-h-screen w-full flex-col px-4 py-12 md:px-12 lg:px-16 xl:px-20">
                    <div className="flex w-full items-start justify-start">
                        <UntitledLogo className="h-8 w-auto" />
                    </div>

                    <div className="mx-auto flex w-full max-w-sm grow items-center md:mx-0 md:max-w-md">
                        <div className="flex w-full flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-display-sm font-semibold text-primary">Register</h1>
                                <p className="text-md text-tertiary">Create your account with your email.</p>
                            </div>

                            <Input label="Email" placeholder="Enter your email" value={email} onChange={setEmail} />

                            <Button size="lg" onClick={handleContinue} isDisabled={!email.trim() || loading}>
                                {loading ? "Sending..." : "Continue"}
                            </Button>

                            <div className="flex items-center gap-3">
                                <div className="h-px w-full bg-border-secondary" />
                                <span className="text-sm text-tertiary">or</span>
                                <div className="h-px w-full bg-border-secondary" />
                            </div>

                            <div className="text-sm text-tertiary">
                                <span>By proceeding you agree to </span>
                                <DialogTrigger>
                                    <Button color="link-color" size="sm">T&amp;C</Button>
                                    <ModalOverlay isDismissable>
                                        <Modal>
                                            <Dialog aria-label="Terms and Conditions">
                                                {({ close }) => (
                                                    <div className="mx-auto w-[min(92vw,900px)] max-h-[80vh] overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary">
                                                        <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                                            <div className="flex min-w-0 flex-col">
                                                                <h2 className="text-lg font-semibold text-primary">Terms and Conditions</h2>
                                                                <p className="text-sm text-tertiary">Please review the Terms carefully</p>
                                                            </div>
                                                            <Button size="sm" onClick={() => close()}>Close</Button>
                                                        </div>
                                                        <div className="px-4 py-4">
                                                            <iframe
                                                                title="Terms"
                                                                src="/terms?embed=1"
                                                                className="h-[65vh] w-full rounded-xl ring-1 ring-secondary"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </Dialog>
                                        </Modal>
                                    </ModalOverlay>
                                </DialogTrigger>
                                <span> and </span>
                                <DialogTrigger>
                                    <Button color="link-color" size="sm">Privacy Policy</Button>
                                    <ModalOverlay isDismissable>
                                        <Modal>
                                            <Dialog aria-label="Privacy Policy">
                                                {({ close }) => (
                                                    <div className="mx-auto w-[min(92vw,900px)] max-h-[80vh] overflow-hidden rounded-2xl bg-primary shadow-xl ring-1 ring-secondary">
                                                        <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                                            <div className="flex min-w-0 flex-col">
                                                                <h2 className="text-lg font-semibold text-primary">Privacy Policy</h2>
                                                                <p className="text-sm text-tertiary">How we handle your data</p>
                                                            </div>
                                                            <Button size="sm" onClick={() => close()}>Close</Button>
                                                        </div>
                                                        <div className="px-4 py-4">
                                                            <iframe
                                                                title="Privacy"
                                                                src="/privacy?embed=1"
                                                                className="h-[65vh] w-full rounded-xl ring-1 ring-secondary"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </Dialog>
                                        </Modal>
                                    </ModalOverlay>
                                </DialogTrigger>
                                <span> of INFLU.</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-tertiary">Already have an account?</span>
                                <Button color="link-color" size="sm" href="/login">Login here</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <img
                        alt="Register illustration"
                        src="./register.png"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}

import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";

export default function LoginPage() {
    return (
        <section className="flex min-h-screen bg-primary">
            <div className="flex w-full flex-col md:grid md:grid-cols-2">
                <div className="flex min-h-screen w-full flex-col px-4 py-12 md:px-12 lg:px-16 xl:px-20">
                    <div className="flex w-full items-start justify-start">
                        <UntitledLogo className="h-8 w-auto" />
                    </div>

                    <div className="mx-auto flex w-full max-w-sm grow items-center md:mx-0 md:max-w-md">
                        <div className="flex w-full flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-display-sm font-semibold text-primary">Welcome Back!</h1>
                                <p className="text-md text-tertiary">Access your account with your email.</p>
                            </div>

                            <Input label="Email" placeholder="Enter your email" />

                            <Button size="lg">Continue</Button>

                            <div className="flex items-center gap-3">
                                <div className="h-px w-full bg-border-secondary" />
                                <span className="text-sm text-tertiary">or</span>
                                <div className="h-px w-full bg-border-secondary" />
                            </div>

                            <SocialButton social="google" size="lg" className="w-full">Continue with Google</SocialButton>

                            <div className="flex items-center justify-between">
                                <Button color="link-gray" size="sm">Forgot password</Button>
                                <Button color="link-gray" size="sm">Forgot username</Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-tertiary">New here?</span>
                                <Button color="link-color" size="sm" href="/register">Register</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <img
                        alt="Login illustration"
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}

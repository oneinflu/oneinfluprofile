"use client";

import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/providers/auth";

const Prefix = ({ className }: { className?: string }) => (
    <span className={className}>oneinflu.com/</span>
);

const UsernameContent = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [sessionId, setSessionId] = useState("");
    useEffect(() => {
        try {
            const e = sessionStorage.getItem("influu_register_email") || "";
            const sid = sessionStorage.getItem("influu_register_id") || "";
            setEmail(e);
            setSessionId(sid);
        } catch {}
    }, []);
    const [handle, setHandle] = useState("");
    useEffect(() => {
        const suggested = email.split("@")[0] || "";
        setHandle(suggested);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);
    const verifyHref = email ? `/verify?id=${encodeURIComponent(sessionId)}&to=${encodeURIComponent(email)}` : "/verify";
    const [available, setAvailable] = useState<null | boolean>(null);
    const [checking, setChecking] = useState(false);
    const { registerSaveUsername } = useAuth();
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const name = handle.trim();
        if (!name) {
            setAvailable(null);
            return;
        }
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
        const controller = new AbortController();
        setChecking(true);
        const url = `${API_BASE}/auth/username/check?username=${encodeURIComponent(name)}`;
        console.group("USERNAME_CHECK");
        console.log("REQUEST GET", url);
        console.log("EXPECTED_RESPONSE_SHAPES", {
            available: { success: true, status: "ok", data: { available: true } },
            unavailable: { success: true, status: "ok", data: { available: false } },
        });
        console.groupEnd();
        fetch(url, { signal: controller.signal })
            .then(async (res) => {
                const data = await res.json().catch(() => ({}));
                console.group("USERNAME_CHECK_RESPONSE");
                console.log("STATUS", res.status);
                console.log("BODY", data);
                console.groupEnd();
                const isAvailable = Boolean(data && data.data && typeof data.data.available !== "undefined" ? data.data.available : true);
                setAvailable(isAvailable);
            })
            .catch(() => {})
            .finally(() => setChecking(false));
        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handle]);

    const onContinue = async () => {
        if (!available) return;
        const id = sessionId;
        const uname = handle.trim().toLowerCase();
        if (!id || !uname) return;
        setSaving(true);
        try {
            await registerSaveUsername(id, uname);
            try { localStorage.setItem("influu_username", uname); } catch {}
            try { sessionStorage.setItem("influu_verify_mode", "register"); } catch {}
            router.push("/verify");
        } catch {
        } finally {
            setSaving(false);
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
                            <div>
                                <Button color="secondary" size="sm" iconLeading={ArrowLeft} href="/register">
                                    Back
                                </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-display-sm font-semibold text-primary">Create username</h1>
                                <p className="text-md text-tertiary">Try something similar to your social handles for easy recognition.</p>
                            </div>

                            <Input
                                size="md"
                                label="Username"
                                icon={Prefix}
                                iconClassName="left-3.5 text-md text-tertiary w-auto h-auto"
                                inputClassName="pl-36"
                                placeholder="your-handle"
                                value={handle}
                                onChange={(v) => setHandle(String(v))}
                                isInvalid={available === false}
                                hint={available === false ? "Username not available" : undefined}
                            />

                            <Button size="lg" onClick={onContinue} isDisabled={!available || saving} isLoading={saving}>Continue</Button>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">
                    <img
                        alt="Username illustration"
                        src="./username.png"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default function UsernamePage() {
    return (
        <Suspense fallback={null}>
            <UsernameContent />
        </Suspense>
    );
}

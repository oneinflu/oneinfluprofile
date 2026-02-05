"use client";

import { Heading, Modal as AriaModal, ModalOverlay as AriaModalOverlay, Dialog as AriaDialog } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { useEffect, useRef } from "react";

interface RequestSuccessModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  username: string;
  service: string;
  contactMethod: "email" | "whatsapp";
  email?: string | null;
  whatsapp?: string | null;
}

export function RequestSuccessModal({ isOpen, onOpenChange, username, service, contactMethod, email, whatsapp }: RequestSuccessModalProps) {
  const waText = `Hi ${username}, I just submitted a request for ${service}`;
  const waLink = whatsapp ? `https://wa.me/${encodeURIComponent(String(whatsapp).replace(/[^0-9+]/g, ""))}?text=${encodeURIComponent(waText)}` : null;
  const mailLink = email ? `mailto:${email}?subject=${encodeURIComponent("Collaboration inquiry")}&body=${encodeURIComponent(waText)}` : null;
  const animRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let alive = true;
    if (!isOpen || !animRef.current) return;
    (async () => {
      try {
        const mod = await import("lottie-web");
        if (!alive || !animRef.current) return;
        const anim = mod.default.loadAnimation({
          container: animRef.current,
          renderer: "svg",
          loop: false,
          autoplay: true,
          path: "/sent.json"
        });
        const t = setTimeout(() => {
          try {
            anim.destroy();
          } catch {}
        }, 3000);
        return () => {
          clearTimeout(t);
          try {
            anim.destroy();
          } catch {}
        };
      } catch {}
    })();
    return () => { alive = false; };
  }, [isOpen]);

  return (
    <AriaModalOverlay 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      className={({ isEntering, isExiting }) => cx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",
        isEntering && "animate-in fade-in duration-300",
        isExiting && "animate-out fade-out duration-200"
      )}
    >
      <AriaModal
        className={({ isEntering, isExiting }) => cx(
          "w-full sm:w-auto sm:max-w-md outline-none",
          isEntering && "animate-in slide-in-from-bottom-10 zoom-in-95 duration-300 ease-out",
          isExiting && "animate-out slide-out-to-bottom-10 zoom-out-95 duration-200 ease-in"
        )}
      >
        <AriaDialog className="outline-none focus:outline-none w-full">
          {({ close }) => (
            <div className="bg-white dark:bg-gray-900 w-full rounded-2xl overflow-hidden flex flex-col shadow-2xl ring-1 ring-gray-200 dark:ring-white/10">
              <div className="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-white dark:bg-gray-900">
                <Heading slot="title" className="text-lg font-bold text-gray-900 dark:text-white">
                  Request submitted
                </Heading>
                <Button size="sm" onClick={close} className="rounded-lg">
                  Close
                </Button>
              </div>
              <div className="p-6 bg-white dark:bg-gray-900">
                <div className="mx-auto flex w-full flex-col items-center gap-4 text-center">
                  <div ref={animRef} className="inline-flex size-20 items-center justify-center rounded-full bg-secondary/20 ring-1 ring-secondary_alt overflow-hidden" />
                  <p className="text-md font-semibold text-primary dark:text-white">Your request for “{service || "Service"}” has been registered</p>
                  <p className="text-sm text-tertiary dark:text-gray-400">We’ve notified {username}. You’ll hear back soon.</p>
                  <p className="text-sm text-tertiary dark:text-gray-400">Feel free to reach out directly while we process it.</p>
                  <div className="mt-2 w-full">
                    {contactMethod === "whatsapp" ? (
                      waLink ? (
                        <Button size="sm" color="primary" className="w-full" onClick={() => window.open(waLink!, "_blank")}>Chat on WhatsApp</Button>
                      ) : (
                        <Button size="sm" color="secondary" className="w-full" disabled>WhatsApp unavailable</Button>
                      )
                    ) : mailLink ? (
                      <Button size="sm" color="secondary" className="w-full" onClick={() => { window.location.href = mailLink!; }}>Email Us</Button>
                    ) : (
                      <Button size="sm" color="secondary" className="w-full" disabled>Email unavailable</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
}

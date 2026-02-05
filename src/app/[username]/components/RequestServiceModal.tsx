"use client";

import { Heading, Modal as AriaModal, ModalOverlay as AriaModalOverlay, Dialog as AriaDialog } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { RadioGroup, RadioButton } from "@/components/base/radio-buttons/radio-buttons";
import { cx } from "@/utils/cx";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";

interface RequestServiceModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  username: string;
  offers: Array<{ title: string; description: string | null; priceType: "fixed" | "starting" | "custom"; price?: number; cta?: "request" | "pay" | "request_pay_later" | null; delivery?: string | null; includes?: string[] }>;
  prefillService: string | null;
  onSuccess: (service: string) => void;
  displayName: string;
}

export function RequestServiceModal({ isOpen, onOpenChange, username, offers, prefillService, onSuccess, displayName }: RequestServiceModalProps) {
  const [serviceKey, setServiceKey] = useState<string | null>(prefillService);
  const [budget, setBudget] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "email">("whatsapp");
  const [contact, setContact] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const services = offers.map(o => o.title);
  const items = services.map((t) => ({ id: t, label: t }));
  const selectedTitle = serviceKey || services[0] || null;
  const selectedOffer = offers.find((o) => o.title === selectedTitle) || null;

  useEffect(() => {
    if (isOpen) {
      setServiceKey(prefillService || null);
    }
  }, [isOpen, prefillService]);

  const submit = async () => {
    const selectedService = selectedTitle || "Service";
    if (!name.trim() || !contact.trim()) return;
    try {
      await api.post(`/users/${username}/enquiries`, {
        service: selectedService,
        brand: name.trim(),
        contactMethod,
        contact: contact.trim(),
        message: message.trim(),
        budget: budget ? Number(budget) : undefined,
      });
      onOpenChange(false);
      onSuccess(selectedService);
    } catch {}
  };

  return (
    <AriaModalOverlay 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      className={({ isEntering, isExiting }) => cx(
        "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4",
        isEntering && "animate-in fade-in duration-300",
        isExiting && "animate-out fade-out duration-200"
      )}
    >
      <AriaModal
        className={({ isEntering, isExiting }) => cx(
          "w-full sm:w-auto sm:max-w-lg outline-none",
          isEntering && "animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 ease-out",
          isExiting && "animate-out slide-out-to-bottom-full sm:zoom-out-95 duration-200 ease-in"
        )}
      >
        <AriaDialog className="outline-none focus:outline-none w-full">
          {({ close }) => (
            <div className="bg-white dark:bg-gray-900 w-full rounded-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh] shadow-2xl ring-1 ring-gray-200 dark:ring-white/10">
              <div className="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-start bg-white dark:bg-gray-900">
                <div>
                  <Heading slot="title" className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedTitle ? `Request to ${displayName}` : "Request a Service"}
                  </Heading>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedTitle ? "Review the service details and share your info" : "Share a few details to get started"}
                  </p>
                </div>
                <Button size="sm" color="primary" onClick={close} className="rounded-lg">
                  Close
                </Button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar bg-white dark:bg-gray-900">
                {/* Service Selection */}
                {!prefillService && (
                    <Select
                        size="md"
                        label="Service"
                        placeholder="Select a service"
                        items={items}
                        selectedKey={serviceKey || undefined}
                        onSelectionChange={(key) => setServiceKey(String(key))}
                    >
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                )}

                {/* Service Details Card */}
                {selectedOffer && (
                  <div className="border border-gray-200 dark:border-white/10 rounded-xl p-4 bg-white dark:bg-white/5">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-base">{selectedOffer.title}</h4>
                    {selectedOffer.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{selectedOffer.description}</p>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Delivery</div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{selectedOffer.delivery || "—"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Includes</div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {(selectedOffer.includes || []).slice(0, 3).join(", ") || "—"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-4">
                  <Input label="Budget (optional)" type="number" inputMode="numeric" placeholder="Your budget (optional)" value={budget} onChange={setBudget} />
                  
                  <Input isRequired label="Your Name" placeholder="Brand / Your name" value={name} onChange={setName} />
                  
                  <div className="flex min-w-0 flex-col gap-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Method</p>
                    <RadioGroup value={contactMethod} onChange={(v) => setContactMethod(v as any)} className="flex gap-4">
                        <RadioButton value="whatsapp" label="WhatsApp" />
                        <RadioButton value="email" label="Email" />
                    </RadioGroup>
                  </div>

                  <Input 
                    isRequired 
                    label="Contact Detail" 
                    placeholder={contactMethod === "whatsapp" ? "WhatsApp number" : "Email address"}
                    type={contactMethod === "email" ? "email" : "tel"}
                    inputMode={contactMethod === "email" ? "email" : "numeric"}
                    value={contact} 
                    onChange={setContact} 
                  />
                  
                  <TextArea label="Message (optional)" placeholder="Briefly describe your requirement..." rows={4} value={message} onChange={setMessage} />
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 pb-8 sm:pb-4">
                <Button size="lg" color="primary" className="w-full" onClick={submit}>Submit Request</Button>
              </div>
            </div>
          )}
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
}

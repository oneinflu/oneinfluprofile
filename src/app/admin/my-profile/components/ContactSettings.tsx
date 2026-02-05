"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input, InputBase } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Badge } from "@/components/base/badges/badges";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";

interface ContactSettingsProps {
  initialData: any;
  onUpdate: () => void;
}

export function ContactSettings({ initialData, onUpdate }: ContactSettingsProps) {
  const { token, user, updateUserById } = useAuth();
  
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">("email");
  const [emailId, setEmailId] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [whatsappCode, setWhatsappCode] = useState<string>("+91");
  const [emailOtpSessionId, setEmailOtpSessionId] = useState<string | null>(null);
  const [emailOtp, setEmailOtp] = useState<string>("");
  
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
  const [isVerifyingEmailOtp, setIsVerifyingEmailOtp] = useState(false);
  const [isSavingWhatsapp, setIsSavingWhatsapp] = useState(false);
  const [saveSuccessContact, setSaveSuccessContact] = useState(false);

  const [isSavingEmailPref, setIsSavingEmailPref] = useState(false);
  const [savedContactMethod, setSavedContactMethod] = useState<"email" | "whatsapp">("email");

  useEffect(() => {
    const contact = initialData?.contact || initialData || {};
    
    if (contact) {
      // Check for preference with various possible key names
      const preference = contact.method || contact.contactPreference || contact.contact_preference;
      
      let method = "email";
      if (preference) {
        method = preference;
      } else {
        // Fallback: if no preference, check if phone data exists.
        // We check 'phone' as well because the backend might return the number in 'phone' field but not 'whatsapp'.
        const hasPhone = !!(contact.whatsapp || contact.phone);
        method = hasPhone ? "whatsapp" : "email";
      }
      
      setContactMethod(method as "email" | "whatsapp");
      setSavedContactMethod(method as "email" | "whatsapp");
      setEmailId(contact.email || "");
      
      const rawWa = contact.whatsapp || contact.phone || "";
      const plus = rawWa.trim().startsWith("+");
      const digits = rawWa.replace(/\D/g, "");
      
      if (digits) {
        if (plus) {
          const m = rawWa.match(/^\+\d{1,3}/);
          const code = m ? m[0] : "+91";
          const number = rawWa.replace(code, "").replace(/\D/g, "");
          setWhatsappCode(code);
          setWhatsappNumber(number);
        } else {
          setWhatsappCode("+91");
          setWhatsappNumber(digits);
        }
      } else {
        setWhatsappCode("+91");
        setWhatsappNumber("");
      }
    }
  }, [initialData]);

  const handleContactMethodChange = (key: string | number | null) => {
    const val = String(key || "email") as "email" | "whatsapp";
    setContactMethod(val);
  };

  const handleSendOtp = async () => {
    try {
      setIsSendingEmailOtp(true);
      if (!token || !user?.id || !emailId.trim()) return;
      const res = await api.post<{ success: boolean; status: string; data: { id: string } }>(`/users/id/${user.id}/email/otp/send`, { email: emailId.trim().toLowerCase() }, { token });
      setEmailOtpSessionId(res.data.id);
    } catch {}
    finally {
      setIsSendingEmailOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsVerifyingEmailOtp(true);
      if (!token || !user?.id || !emailOtpSessionId || !emailOtp.trim()) return;
      await api.post(`/users/id/${user.id}/email/otp/verify`, { id: emailOtpSessionId, code: emailOtp.trim() }, { token });
      // Also update preference to email
      await updateUserById(user.id, { contactPreference: "email" });
      
      setEmailOtp("");
      setEmailOtpSessionId(null);
      
      onUpdate();
      setSaveSuccessContact(true);
      setTimeout(() => setSaveSuccessContact(false), 3000);
    } catch {}
    finally {
      setIsVerifyingEmailOtp(false);
    }
  };
  
  const handleSaveEmailPreference = async () => {
    try {
      setIsSavingEmailPref(true);
      if (!token || !user?.id) return;
      await updateUserById(user.id, { contactPreference: "email" });
      
      onUpdate();
      setSaveSuccessContact(true);
      setTimeout(() => setSaveSuccessContact(false), 3000);
    } catch {}
    finally {
      setIsSavingEmailPref(false);
    }
  };

  const handleSaveWhatsapp = async () => {
    try {
      setIsSavingWhatsapp(true);
      if (!token || !user?.id) return;
      const code = whatsappCode.startsWith("+") ? whatsappCode : `+${whatsappCode}`;
      const number = whatsappNumber.replace(/\D/g, "");
      const full = `${code}${number}`;
      await updateUserById(user.id, { whatsapp: full, contactPreference: "whatsapp" });
      
      onUpdate();
      setSaveSuccessContact(true);
      setTimeout(() => setSaveSuccessContact(false), 3000);
    } catch {}
    finally {
      setIsSavingWhatsapp(false);
    }
  };

  return (
    <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 flex-col">
          <h2 className="text-lg font-semibold text-primary">Point of Contact</h2>
          <p className="text-sm text-tertiary">How brands should contact you</p>
        </div>
      </div>
      <div className="mt-3 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <Select
          label="Preferred method"
          size="md"
          selectedKey={contactMethod}
          items={[
            { id: "email", label: "Email address" },
            { id: "whatsapp", label: "WhatsApp" },
          ]}
          onSelectionChange={handleContactMethodChange}
        >
          {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
        </Select>
        {contactMethod === "email" ? (
          <div className="flex flex-col gap-2">
            <Input label="Email ID" size="md" value={emailId} onChange={setEmailId} placeholder="your@email.com" />
            {(emailId.trim().toLowerCase() !== String(initialData?.email || "").trim().toLowerCase()) ? (
              <div className="flex items-center justify-end gap-2">
                <Button
                  size="sm"
                  color="secondary"
                  isLoading={isSendingEmailOtp}
                  onClick={handleSendOtp}
                >
                  Send OTP
                </Button>
                <InputBase size="md" value={emailOtp} onChange={setEmailOtp} placeholder="Enter OTP" />
                <Button
                  size="sm"
                  isLoading={isVerifyingEmailOtp}
                  onClick={handleVerifyOtp}
                >
                  Save changes
                </Button>
                {saveSuccessContact && (
                  <Badge type="pill-color" size="md" color="success">
                    Information updated
                  </Badge>
                )}
              </div>
            ) : (
              (savedContactMethod !== "email") && (
                <div className="flex items-center justify-end gap-2">
                   <Button
                     size="sm"
                     isLoading={isSavingEmailPref}
                     onClick={handleSaveEmailPreference}
                   >
                     Save changes
                   </Button>
                   {saveSuccessContact && (
                     <Badge type="pill-color" size="md" color="success">
                       Information updated
                     </Badge>
                   )}
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-[130px_1fr] gap-2">
              <Select
                label="Code"
                size="md"
                selectedKey={whatsappCode}
                items={[
                  { id: "+91", label: "+91" },
                  { id: "+1", label: "+1" },
                  { id: "+44", label: "+44" },
                  { id: "+61", label: "+61" },
                  { id: "+971", label: "+971" },
                ]}
                onSelectionChange={(key) => setWhatsappCode(String(key))}
              >
                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
              </Select>
              <Input label="WhatsApp number" size="md" value={whatsappNumber} onChange={setWhatsappNumber} placeholder="WhatsApp number" />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                isLoading={isSavingWhatsapp}
                onClick={handleSaveWhatsapp}
              >
                Save changes
              </Button>
              {saveSuccessContact && (
                <Badge type="pill-color" size="md" color="success">
                  Information updated
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import { useAuth } from "@/providers/auth";

interface PaymentSettingsProps {
  initialData: any;
  onUpdate: () => void;
}

export function PaymentSettings({ initialData, onUpdate }: PaymentSettingsProps) {
  const { token, user, updateUserById } = useAuth();
  
  const [upiId, setUpiId] = useState<string>("");
  const [isSavingUpi, setIsSavingUpi] = useState(false);
  const [saveSuccessUpi, setSaveSuccessUpi] = useState(false);

  useEffect(() => {
    const payment = initialData?.payment || initialData || {};
    if (payment) {
      setUpiId(payment.upiId || payment.upi || "");
    }
  }, [initialData]);

  const handleSave = async () => {
    try {
      setIsSavingUpi(true);
      if (!token || !user?.id) return;
      const val = upiId.trim();
      await updateUserById(user.id, { upi: val });
      
      onUpdate();
      setSaveSuccessUpi(true);
      setTimeout(() => setSaveSuccessUpi(false), 3000);
    } catch {}
    finally {
      setIsSavingUpi(false);
    }
  };

  return (
    <div className="rounded-2xl bg-primary p-4 md:p-5 shadow-xs ring-1 ring-secondary_alt">
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 flex-col">
          <h2 className="text-lg font-semibold text-primary">Payment Settings</h2>
          <p className="text-sm text-tertiary">Enable Pay Now with your UPI ID</p>
        </div>
      </div>
      <div className="mt-3 grid w-full grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
        <Input label="UPI ID" size="md" value={upiId} onChange={setUpiId} placeholder="yourid@bank" />
        <div className="flex items-end justify-end gap-2">
          <Button
            size="sm"
            color="primary"
            isLoading={isSavingUpi}
            onClick={handleSave}
          >
            Save changes
          </Button>
          {saveSuccessUpi && (
            <Badge type="pill-color" size="md" color="success">
              Information updated
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { api } from "@/utils/api";

type PublicPaymentResponse = {
  success: boolean;
  status: string;
  data: {
    payment: {
      id: string;
      amount: number;
      currency: string;
      brand?: string | null;
      notes?: string | null;
      purpose?: string | null;
      status: string;
      user?: { username: string } | null;
      offer?: { title: string; price?: number; priceType?: string } | null;
      upi?: string | null;
    };
  };
};

export default function PaymentPage() {
  const params = useParams();
  const paymentID = String((params as any)?.paymentID || "");
  const [payment, setPayment] = useState<PublicPaymentResponse["data"]["payment"] | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!paymentID) return;
        const res = await api.get<PublicPaymentResponse>(`/pay/${encodeURIComponent(paymentID)}`);
        if (!alive) return;
        setPayment(res.data.payment);
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, [paymentID]);

  const username = payment?.user?.username || "";
  const amount = payment?.amount || 0;
  const upiId = payment?.upi || "";
  const service = payment?.offer?.title || payment?.purpose || "Payment";
  const formatINR = new Intl.NumberFormat("en-IN");

  return (
    <>
      <section className="lg:hidden flex min-h-screen pt-5 bg-linear-to-br from-[#ffffff] via-[#F4EBFF] to-[#ffffff] dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#42307D] dark:to-[#000000] px-4 pb-20 overflow-y-auto scrollbar-hide">
        <div className="w-full max-w-sm mx-auto">
          <div className="rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt">
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-semibold text-primary text-center">{username ? `${username} • Payment` : "Payment"}</h1>
              <p className="text-sm text-tertiary text-center">{service}</p>
            </div>
            <div className="mt-3 rounded-xl bg-primary_hover p-4 ring-1 ring-secondary_alt">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-secondary">Amount</p>
                  <p className="text-md font-semibold text-primary">₹{formatINR.format(amount)}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">Currency</p>
                  <p className="text-sm text-primary">{payment?.currency || "INR"}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">Status</p>
                  <p className="text-sm text-primary">{payment?.status || "active"}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary">UPI</p>
                  <p className="text-sm text-primary">{upiId || "—"}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full" size="sm" color="primary" onClick={() => setOpen(true)}>Pay Now</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="hidden lg:flex min-h-screen items-center justify-center bg-linear-to-br from-[#ffffff] via-[#F4EBFF] to-[#ffffff] dark:bg-linear-to-br dark:from-[#0d1117] dark:via-[#42307D] dark:to-[#000000] px-4">
        <div className="mx-auto aspect-[9/19] w-full max-w-sm rounded-[2rem] bg-linear-to-b from-[#ffffff] via-[#F4EBFF] to-[#EDE6FF] dark:from-[#0b0f14] dark:via-[#1b103f] dark:to-[#000000] p-1 shadow-2xl">
          <div className="size-full overflow-hidden rounded-[inherit] bg-alpha-black ring-1 ring-primary relative">
            <div className="size-full overflow-y-auto scrollbar-hide bg-primary p-3 pb-20">
              <div className="rounded-2xl bg-primary p-4 shadow-xs ring-1 ring-secondary_alt">
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-2xl font-semibold text-primary text-center">{username ? `${username} • Payment` : "Payment"}</h1>
                  <p className="text-sm text-tertiary text-center">{service}</p>
                </div>
                <div className="mt-3 rounded-xl bg-primary_hover p-4 ring-1 ring-secondary_alt">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-secondary">Amount</p>
                      <p className="text-md font-semibold text-primary">₹{formatINR.format(amount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary">Currency</p>
                      <p className="text-sm text-primary">{payment?.currency || "INR"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary">Status</p>
                      <p className="text-sm text-primary">{payment?.status || "active"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary">UPI</p>
                      <p className="text-sm text-primary">{upiId || "—"}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full" size="sm" color="primary" onClick={() => setOpen(true)}>Pay Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PayBottomSheet isOpen={open} onOpenChange={setOpen} name={username || "Payment"} upiId={upiId} amount={amount} />
    </>
  );
}

function PayBottomSheet({ isOpen, onOpenChange, name, upiId, amount }: { isOpen: boolean; onOpenChange: (open: boolean) => void; name: string; upiId: string; amount: number }) {
  const pa = encodeURIComponent(upiId || "");
  const pn = encodeURIComponent(name || "");
  const am = encodeURIComponent(String(amount || 0));
  const phonePe = `phonepe://pay?pa=${pa}&pn=${pn}&cu=INR&am=${am}`;
  const googlePay = `tez://upi/pay?pa=${pa}&pn=${pn}&cu=INR&am=${am}`;
  const whatsappPay = `upi://pay?pa=${pa}&pn=${pn}&cu=INR&am=${am}`;
  const disabled = !upiId || !amount;
  return (
    <AriaDialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
      <Button slot="trigger" className="hidden">Open</Button>
      <AriaModalOverlay
        isDismissable
        className={({ isEntering, isExiting }) =>
          `fixed inset-0 z-50 bg-overlay/40 backdrop-blur-sm ${isEntering ? "duration-150 ease-out animate-in fade-in" : ""} ${isExiting ? "duration-100 ease-in animate-out fade-out" : ""}`
        }
      >
        {({ state }) => (
          <AriaModal className="w-full cursor-auto">
            <AriaDialog aria-label="Make a Payment" className="fixed inset-x-0 bottom-0 mx-auto w-[min(92vw,640px)] max-h-[80vh] overflow-y-auto rounded-t-2xl bg-primary shadow-xl ring-1 ring-secondary_alt focus:outline-hidden">
              <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                <div className="flex min-w-0 flex-col">
                  <h2 className="text-lg font-semibold text-primary">Make a Payment</h2>
                  <p className="text-sm text-tertiary">Choose your payment app</p>
                </div>
                <Button size="sm" onClick={() => state.close()}>Close</Button>
              </div>
              <div className="px-4 py-4">
                <div className="grid grid-cols-3 gap-3">
                  <button
                    disabled={disabled}
                    onClick={() => { if (!disabled) window.location.href = phonePe; }}
                    className="flex flex-col items-center gap-2 rounded-xl bg-primary p-4 ring-1 ring-secondary_alt disabled:opacity-50"
                  >
                    <img src="/phonepe-icon.png" alt="PhonePe" className="size-10" />
                    <div className="text-sm font-medium text-primary">PhonePe</div>
                  </button>
                  <button
                    disabled={disabled}
                    onClick={() => { if (!disabled) window.location.href = googlePay; }}
                    className="flex flex-col items-center gap-2 rounded-xl bg-primary p-4 ring-1 ring-secondary_alt disabled:opacity-50"
                  >
                    <img src="/google-pay-icon.png" alt="Google Pay" className="size-10" />
                    <div className="text-sm font-medium text-primary">G Pay</div>
                  </button>
                  <button
                    disabled={disabled}
                    onClick={() => { if (!disabled) window.location.href = whatsappPay; }}
                    className="flex flex-col items-center gap-2 rounded-xl bg-primary p-4 ring-1 ring-secondary_alt disabled:opacity-50"
                  >
                    <img src="/whatsapp.png" alt="UPI Pay" className="size-10 rounded" />
                    <div className="text-sm font-medium text-primary">UPI Pay</div>
                  </button>
                </div>
              </div>
            </AriaDialog>
          </AriaModal>
        )}
      </AriaModalOverlay>
    </AriaDialogTrigger>
  );
}


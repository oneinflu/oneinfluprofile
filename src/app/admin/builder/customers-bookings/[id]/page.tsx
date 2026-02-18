"use client";
 
 import { useMemo, useState } from "react";
 import { useParams, useRouter } from "next/navigation";
 import { Button } from "@/components/base/buttons/button";
 import { Badge } from "@/components/base/badges/badges";
 import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
 import { CheckDone01, Clock, ArrowLeft, Mail01, UploadCloud02, XCircle } from "@untitledui/icons";
 
 type PaymentStatus = "on_track" | "due_soon" | "overdue";
 
 const nf = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
 
 export default function BookingDetailPage() {
     const params = useParams();
     const router = useRouter();
     const id = String(params?.id || "");
 
     const booking = useMemo(() => {
         const sample = {
             buyerName: "Rohit Mehta",
             phone: "98765 43210",
             unit: "A-1203",
             project: "altius",
             bookingDate: "2026-02-08",
             totalValue: 9150000,
             amountPaid: 4500000,
             nextDueDate: "2026-03-10",
             paymentStatus: "due_soon" as PaymentStatus,
         };
         return sample;
     }, [id]);
 
    const agreementDocs = useMemo(
        () => [
            { name: "Agreement_Draft.pdf", size: 512_000, url: "https://example.com/Agreement_Draft.pdf", type: "application/pdf" },
        ],
        [id],
    );
    const idProofDocs = useMemo(
        () => [
            { name: "PAN.jpg", size: 240_000, url: "https://picsum.photos/seed/pan/600/400", type: "image/jpeg" },
            { name: "Aadhaar.pdf", size: 380_000, url: "https://example.com/Aadhaar.pdf", type: "application/pdf" },
        ],
        [id],
    );
    const loanDocs = useMemo(
        () => [
            { name: "Sanction_Letter.pdf", size: 820_000, url: "https://example.com/Sanction_Letter.pdf", type: "application/pdf" },
        ],
        [id],
    );

    const toBadgeColor = (s: PaymentStatus): "success" | "warning" | "error" =>
         s === "on_track" ? "success" : s === "due_soon" ? "warning" : "error";
 
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [payAmount, setPayAmount] = useState("");
    const [payType, setPayType] = useState<"Booking advance" | "Construction stage payment" | "Final settlement" | "Miscellaneous">("Booking advance");
    const [payMode, setPayMode] = useState<"Bank transfer" | "UPI" | "Cheque" | "Cash">("Bank transfer");
    const [chequeNumber, setChequeNumber] = useState("");
    const [bankRef, setBankRef] = useState("");
    const today = new Date().toISOString().slice(0, 10);
    const [payDate, setPayDate] = useState(today);
    const [linkSchedule, setLinkSchedule] = useState(false);
    const [scheduleStage, setScheduleStage] = useState<"Booking advance" | "Slab payment" | "Plaster stage" | "Final payment">("Slab payment");
    const [receiptFiles, setReceiptFiles] = useState<Array<{ name: string; size: number; progress: number }>>([]);
    const [reuploadOpen, setReuploadOpen] = useState(false);
    const [reuploadDoc, setReuploadDoc] = useState<{ category: "agreement" | "id" | "loan"; name: string } | null>(null);
    const [reuploadReason, setReuploadReason] = useState("");
    const [reuploadDue, setReuploadDue] = useState(today);
    const [notifySms, setNotifySms] = useState(true);
    const [notifyEmail, setNotifyEmail] = useState(true);
    const [requestedMap, setRequestedMap] = useState<Record<string, { reason: string; due: string }>>({});
    const [toast, setToast] = useState<string | null>(null);

     return (
         <section className="flex min-h-screen flex-col lg:pl-[300px]">
             <div className="top-0 z-10 px-4 md:px-8 pt-6 pb-4">
                 <div className="w-full max-w-8xl">
                     <div className="flex items-center justify-between gap-3">
                         <div className="flex items-center gap-3">
                             <Button size="sm" color="secondary" iconLeading={ArrowLeft} onClick={() => router.push("/admin/builder/customers-bookings")}>
                                 Back
                             </Button>
                             <div className="flex flex-col">
                                 <h1 className="text-display-sm font-semibold text-primary">Booking {id}</h1>
                                 <p className="text-sm text-tertiary">{booking.buyerName} • {booking.unit} · {booking.project}</p>
                             </div>
                         </div>
                         <Badge type="pill-color" size="md" color={toBadgeColor(booking.paymentStatus)}>
                             {booking.paymentStatus === "on_track" ? "On track" : booking.paymentStatus === "due_soon" ? "Due soon" : "Overdue"}
                         </Badge>
                     </div>
                 </div>
             </div>
 
             <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-12">
                 <div className="w-full max-w-8xl grid gap-6">
                     <div className="rounded-2xl bg-primary p-4 ring-1 ring-secondary_alt">
                         <p className="text-sm font-semibold text-primary">Summary</p>
                         <div className="mt-2 grid gap-3 md:grid-cols-2">
                             <div className="flex flex-col gap-1">
                                 <span className="text-xs text-tertiary">Buyer name</span>
                                 <span className="text-sm font-medium text-primary">{booking.buyerName}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                                 <span className="text-xs text-tertiary">Unit details</span>
                                 <span className="text-sm font-medium text-primary">{booking.unit} · {booking.project}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                                 <span className="text-xs text-tertiary">Contact</span>
                                 <span className="text-sm font-medium text-primary">{booking.phone}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                                 <span className="text-xs text-tertiary">Booking amount</span>
                                 <span className="text-sm font-medium text-primary">{nf.format(booking.totalValue)}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                                 <span className="text-xs text-tertiary">Agreement status</span>
                                 <span className="text-sm font-medium text-primary">Drafted</span>
                             </div>
                         </div>
                     </div>
 
                     <div className="rounded-2xl bg-primary p-4 ring-1 ring-secondary_alt">
                         <p className="text-sm font-semibold text-primary">Payment Timeline</p>
                         <div className="mt-3 grid gap-3 md:grid-cols-2">
                             <div className="flex items-center gap-2 rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                 <CheckDone01 className="size-5 text-success-primary" />
                                 <div className="flex min-w-0 flex-col">
                                     <span className="text-sm font-medium text-primary">Booking advance</span>
                                     <span className="text-xs text-tertiary">Paid</span>
                                 </div>
                             </div>
                             <div className="flex items-center gap-2 rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                 <CheckDone01 className="size-5 text-success-primary" />
                                 <div className="flex min-w-0 flex-col">
                                     <span className="text-sm font-medium text-primary">Slab payment</span>
                                     <span className="text-xs text-tertiary">Paid</span>
                                 </div>
                             </div>
                             <div className="flex items-center gap-2 rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                 <Clock className="size-5 text-warning-primary" />
                                 <div className="flex min-w-0 flex-col">
                                     <span className="text-sm font-medium text-primary">Plaster stage</span>
                                     <span className="text-xs text-tertiary">In progress</span>
                                 </div>
                             </div>
                             <div className="flex items-center gap-2 rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                 <Clock className="size-5 text-warning-primary" />
                                 <div className="flex min-w-0 flex-col">
                                     <span className="text-sm font-medium text-primary">Final payment</span>
                                     <span className="text-xs text-tertiary">Pending</span>
                                 </div>
                             </div>
                         </div>
                     </div>
 
                     <div className="rounded-2xl bg-primary p-4 ring-1 ring-secondary_alt">
                         <p className="text-sm font-semibold text-primary">Payment History</p>
                         <div className="mt-2 rounded-lg ring-1 ring-secondary_alt">
                             <div className="hidden md:grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.6fr)] gap-2 px-3 py-2 text-xs font-medium text-tertiary">
                                 <div>Date</div>
                                 <div>Amount</div>
                                 <div>Mode</div>
                                 <div className="text-right">Receipt</div>
                             </div>
                             <ul className="divide-y divide-secondary">
                                 <li className="grid grid-cols-1 gap-2 px-3 py-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.6fr)] md:items-center">
                                     <div className="text-xs text-secondary">2026-02-05</div>
                                     <div className="text-xs text-primary font-semibold">{nf.format(1500000)}</div>
                                     <div className="text-xs text-secondary">NEFT</div>
                                     <div className="md:text-right">
                                         <Button size="sm" color="secondary">View</Button>
                                     </div>
                                 </li>
                                 <li className="grid grid-cols-1 gap-2 px-3 py-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.6fr)] md:items-center">
                                     <div className="text-xs text-secondary">2026-01-12</div>
                                     <div className="text-xs text-primary font-semibold">{nf.format(3000000)}</div>
                                     <div className="text-xs text-secondary">Cheque</div>
                                     <div className="md:text-right">
                                         <Button size="sm" color="secondary">View</Button>
                                     </div>
                                 </li>
                             </ul>
                         </div>
                     </div>
 
                     <div className="rounded-2xl bg-primary p-4 ring-1 ring-secondary_alt">
                         <p className="text-sm font-semibold text-primary">Documents</p>
                        <div className="mt-2 grid gap-3 md:grid-cols-3">
                            <div className="rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                <p className="text-sm font-medium text-primary">Agreement copy</p>
                                {agreementDocs.length === 0 ? (
                                    <p className="mt-2 text-xs text-tertiary">No files uploaded yet.</p>
                                ) : (
                                    <ul className="mt-2 grid gap-2">
                                        {agreementDocs.map((f, i) => {
                                            const key = `agreement:${f.name}`;
                                            const req = requestedMap[key];
                                            return (
                                                <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2 rounded bg-primary p-2 ring-1 ring-secondary_alt">
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <p className="truncate text-sm text-primary">{f.name}</p>
                                                            {req && <Badge type="pill-color" size="sm" color="warning">Re-upload requested</Badge>}
                                                        </div>
                                                        <p className="text-[11px] text-tertiary">{Math.round(f.size / 1024)} KB{req ? ` • Due ${req.due}` : ""}</p>
                                                    </div>
                                                    <div className="flex shrink-0 items-center gap-2">
                                                        <a className="text-xs text-secondary underline" href={f.url} target="_blank" rel="noreferrer">View</a>
                                                        <a className="text-xs text-secondary underline" href={f.url} download>Download</a>
                                                        <button
                                                            className="text-xs text-brand-primary underline"
                                                            onClick={() => {
                                                                setReuploadDoc({ category: "agreement", name: f.name });
                                                                setReuploadReason("");
                                                                setReuploadDue(today);
                                                                setReuploadOpen(true);
                                                            }}
                                                        >
                                                            Request re-upload
                                                        </button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                                <div className="mt-2">
                                    <FileUpload.DropZone hint="Upload PDF or images" accept=".pdf,image/*" allowsMultiple={false} />
                                </div>
                            </div>
                            <div className="rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                <p className="text-sm font-medium text-primary">ID proof</p>
                                {idProofDocs.length === 0 ? (
                                    <p className="mt-2 text-xs text-tertiary">No files uploaded yet.</p>
                                ) : (
                                    <ul className="mt-2 grid gap-2">
                                        {idProofDocs.map((f, i) => {
                                            const key = `id:${f.name}`;
                                            const req = requestedMap[key];
                                            return (
                                                <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2 rounded bg-primary p-2 ring-1 ring-secondary_alt">
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        {f.type.startsWith("image/") ? (
                                                            <img src={f.url} alt={f.name} className="h-8 w-12 rounded object-cover ring-1 ring-secondary_alt" />
                                                        ) : (
                                                            <div className="h-8 w-12 rounded bg-secondary/20 ring-1 ring-secondary_alt" />
                                                        )}
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <p className="truncate text-sm text-primary">{f.name}</p>
                                                                {req && <Badge type="pill-color" size="sm" color="warning">Re-upload requested</Badge>}
                                                            </div>
                                                            <p className="text-[11px] text-tertiary">{Math.round(f.size / 1024)} KB{req ? ` • Due ${req.due}` : ""}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 items-center gap-2">
                                                        <a className="text-xs text-secondary underline" href={f.url} target="_blank" rel="noreferrer">View</a>
                                                        <a className="text-xs text-secondary underline" href={f.url} download>Download</a>
                                                        <button
                                                            className="text-xs text-brand-primary underline"
                                                            onClick={() => {
                                                                setReuploadDoc({ category: "id", name: f.name });
                                                                setReuploadReason("");
                                                                setReuploadDue(today);
                                                                setReuploadOpen(true);
                                                            }}
                                                        >
                                                            Request re-upload
                                                        </button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                                <div className="mt-2">
                                    <FileUpload.DropZone hint="Upload ID proof" accept=".pdf,image/*" allowsMultiple />
                                </div>
                            </div>
                            <div className="rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                <p className="text-sm font-medium text-primary">Loan documents</p>
                                {loanDocs.length === 0 ? (
                                    <p className="mt-2 text-xs text-tertiary">No files uploaded yet.</p>
                                ) : (
                                    <ul className="mt-2 grid gap-2">
                                        {loanDocs.map((f, i) => {
                                            const key = `loan:${f.name}`;
                                            const req = requestedMap[key];
                                            return (
                                                <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-2 rounded bg-primary p-2 ring-1 ring-secondary_alt">
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <p className="truncate text-sm text-primary">{f.name}</p>
                                                            {req && <Badge type="pill-color" size="sm" color="warning">Re-upload requested</Badge>}
                                                        </div>
                                                        <p className="text-[11px] text-tertiary">{Math.round(f.size / 1024)} KB{req ? ` • Due ${req.due}` : ""}</p>
                                                    </div>
                                                    <div className="flex shrink-0 items-center gap-2">
                                                        <a className="text-xs text-secondary underline" href={f.url} target="_blank" rel="noreferrer">View</a>
                                                        <a className="text-xs text-secondary underline" href={f.url} download>Download</a>
                                                        <button
                                                            className="text-xs text-brand-primary underline"
                                                            onClick={() => {
                                                                setReuploadDoc({ category: "loan", name: f.name });
                                                                setReuploadReason("");
                                                                setReuploadDue(today);
                                                                setReuploadOpen(true);
                                                            }}
                                                        >
                                                            Request re-upload
                                                        </button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                                <div className="mt-2">
                                    <FileUpload.DropZone hint="Upload loan related files" accept=".pdf,image/*" allowsMultiple />
                                </div>
                            </div>
                        </div>
                     </div>
 
                     <div className="rounded-2xl bg-primary p-4 ring-1 ring-secondary_alt">
                         <p className="text-sm font-semibold text-primary">Actions</p>
                         <div className="mt-3 flex flex-wrap gap-2">
                            <Button size="sm" color="secondary" onClick={() => setPaymentOpen(true)}>Add payment</Button>
                            <Button size="sm" color="secondary" iconLeading={Mail01} onClick={() => { setReuploadDoc({ category: "agreement", name: "General Documents" }); setReuploadReason(""); setReuploadDue(today); setReuploadOpen(true); }}>Send reminder</Button>
                             <Button size="sm" color="secondary" iconLeading={UploadCloud02}>Upload document</Button>
                             <Button size="sm" color="secondary-destructive" iconLeading={XCircle}>Cancel booking</Button>
                         </div>
                     </div>
                 </div>
             </div>

            <ModalOverlay isOpen={reuploadOpen} onOpenChange={setReuploadOpen}>
                <Modal className="w-full max-w-lg rounded-2xl bg-primary p-0 shadow-xl ring-1 ring-secondary_alt">
                    <Dialog className="w-full">
                        <div className="flex max-h-[85vh] flex-col">
                            <div className="border-b border-secondary p-4">
                                <h3 className="text-lg font-semibold text-primary">Request Re-upload</h3>
                                <p className="text-sm text-tertiary">Ask the buyer to re-upload a document.</p>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="grid gap-3">
                                    <div className="rounded-xl bg-primary p-3 ring-1 ring-secondary_alt">
                                        <p className="text-xs font-semibold text-secondary">Document</p>
                                        <div className="mt-1 text-sm text-primary">{reuploadDoc ? `${reuploadDoc.category === "agreement" ? "Agreement copy" : reuploadDoc.category === "id" ? "ID proof" : "Loan document"} • ${reuploadDoc.name}` : "—"}</div>
                                    </div>
                                    <Input size="sm" label="Reason" value={reuploadReason} onChange={setReuploadReason} placeholder="e.g. Blurry scan, upload original PDF" />
                                    <Input size="sm" label="Due date" type="date" value={reuploadDue} onChange={setReuploadDue} />
                                    <div className="rounded-xl bg-primary p-3 ring-1 ring-secondary_alt">
                                        <p className="text-xs font-semibold text-secondary">Notify</p>
                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            <div className="flex items-center justify-between rounded-lg bg-primary_hover p-2 ring-1 ring-secondary_alt">
                                                <span className="text-sm text-primary">SMS</span>
                                                <Toggle isSelected={notifySms} onChange={setNotifySms} aria-label="Notify via SMS" />
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg bg-primary_hover p-2 ring-1 ring-secondary_alt">
                                                <span className="text-sm text-primary">Email</span>
                                                <Toggle isSelected={notifyEmail} onChange={setNotifyEmail} aria-label="Notify via Email" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-secondary p-4">
                                <div className="flex items-center justify-end gap-2">
                                    <Button color="secondary" onClick={() => setReuploadOpen(false)}>Cancel</Button>
                                    <Button
                                        onClick={async () => {
                                            const doc = reuploadDoc;
                                            if (!doc) {
                                                setReuploadOpen(false);
                                                return;
                                            }
                                            const key = `${doc.category}:${doc.name}`;
                                            setRequestedMap((prev) => ({ ...prev, [key]: { reason: reuploadReason || "Please re-upload", due: reuploadDue } }));
                                            setReuploadOpen(false);
                                            setToast("Re-upload request sent");
                                            setTimeout(() => setToast(null), 2500);
                                        }}
                                    >
                                        Send Request
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>

            <ModalOverlay isOpen={paymentOpen} onOpenChange={setPaymentOpen}>
                <Modal className="w-full max-w-lg rounded-2xl bg-primary p-0 shadow-xl ring-1 ring-secondary_alt">
                    <Dialog className="w-full">
                        <div className="flex max-h-[85vh] flex-col">
                            <div className="border-b border-secondary p-4">
                                <h3 className="text-lg font-semibold text-primary">Add Payment</h3>
                                <p className="text-sm text-tertiary">Capture a payment and update the schedule.</p>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="rounded-xl bg-primary_hover/30 p-3 ring-1 ring-secondary_alt">
                                    <p className="text-xs font-semibold text-secondary">Booking</p>
                                    <div className="mt-2 grid gap-3 md:grid-cols-2 text-sm">
                                        <div>
                                            <p className="text-[11px] text-tertiary">Buyer</p>
                                            <p className="font-medium text-primary">{booking.buyerName}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-tertiary">Unit</p>
                                            <p className="font-medium text-primary">{booking.unit}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-tertiary">Total value</p>
                                            <p className="font-semibold text-secondary">{nf.format(booking.totalValue)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-tertiary">Amount paid</p>
                                            <p className="font-semibold text-secondary">{nf.format(booking.amountPaid)}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-[11px] text-tertiary">Pending amount</p>
                                            <p className="font-semibold text-secondary">
                                                {nf.format(Math.max(0, booking.totalValue - booking.amountPaid))}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-4">
                                    <div className="rounded-xl bg-primary p-3 ring-1 ring-secondary_alt">
                                        <p className="text-xs font-semibold text-secondary">Amount</p>
                                        <div className="mt-2 grid gap-3">
                                            <Input
                                                size="sm"
                                                label="Amount received"
                                                type="number"
                                                value={payAmount}
                                                onChange={setPayAmount}
                                                placeholder="e.g. 500000"
                                            />
                                            <div className="grid gap-2">
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    className="w-full justify-between"
                                                    onClick={() => {
                                                        const pending = Math.max(0, booking.totalValue - booking.amountPaid);
                                                        const adv = Math.min(pending, Math.round(booking.totalValue * 0.1));
                                                        setPayAmount(String(adv));
                                                        setPayType("Booking advance");
                                                    }}
                                                >
                                                    Booking advance
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    color="secondary"
                                                    className="w-full justify-between"
                                                    onClick={() => {
                                                        const pending = Math.max(0, booking.totalValue - booking.amountPaid);
                                                        const slab = Math.min(pending, Math.round(pending * 0.25));
                                                        setPayAmount(String(slab));
                                                        setPayType("Construction stage payment");
                                                    }}
                                                >
                                                    Slab payment
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="w-full justify-between"
                                                    onClick={() => {
                                                        setPayAmount("");
                                                    }}
                                                >
                                                    Custom amount
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-primary p-3 ring-1 ring-secondary_alt">
                                        <p className="text-xs font-semibold text-secondary">Type & Mode</p>
                                        <div className="mt-2 grid gap-3 md:grid-cols-2">
                                            <Select
                                                size="sm"
                                                label="Payment type"
                                                selectedKey={payType}
                                                onSelectionChange={(key) => setPayType(String(key) as typeof payType)}
                                                items={[
                                                    { id: "Booking advance", label: "Booking advance" },
                                                    { id: "Construction stage payment", label: "Construction stage payment" },
                                                    { id: "Final settlement", label: "Final settlement" },
                                                    { id: "Miscellaneous", label: "Miscellaneous" },
                                                ]}
                                            >
                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                            </Select>
                                            <Select
                                                size="sm"
                                                label="Payment mode"
                                                selectedKey={payMode}
                                                onSelectionChange={(key) => setPayMode(String(key) as typeof payMode)}
                                                items={[
                                                    { id: "Bank transfer", label: "Bank transfer" },
                                                    { id: "UPI", label: "UPI" },
                                                    { id: "Cheque", label: "Cheque" },
                                                    { id: "Cash", label: "Cash" },
                                                ]}
                                            >
                                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                            </Select>
                                            {payMode === "Cheque" && (
                                                <Input
                                                    size="sm"
                                                    label="Cheque number"
                                                    value={chequeNumber}
                                                    onChange={setChequeNumber}
                                                    placeholder="Enter cheque number"
                                                />
                                            )}
                                            {payMode === "Bank transfer" && (
                                                <Input
                                                    size="sm"
                                                    label="Reference number"
                                                    value={bankRef}
                                                    onChange={setBankRef}
                                                    placeholder="Bank ref / UTR"
                                                />
                                            )}
                                            <Input
                                                size="sm"
                                                label="Payment date"
                                                type="date"
                                                value={payDate}
                                                onChange={setPayDate}
                                            />
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-primary p-3 ring-1 ring-secondary_alt">
                                        <p className="text-xs font-semibold text-secondary">Receipt (optional)</p>
                                        <div className="mt-2">
                                            <FileUpload.Root>
                                                <FileUpload.DropZone
                                                    hint="Images or PDF"
                                                    accept="image/*,application/pdf"
                                                    onDropFiles={(files) => {
                                                        const arr = Array.from(files);
                                                        setReceiptFiles((prev) => [
                                                            ...prev,
                                                            ...arr.map((f) => ({ name: f.name, size: f.size, progress: 100 })),
                                                        ]);
                                                    }}
                                                />
                                                {receiptFiles.length > 0 && (
                                                    <FileUpload.List>
                                                        {receiptFiles.map((f, i) => (
                                                            <FileUpload.ListItemProgressBar
                                                                key={`${f.name}-${i}`}
                                                                name={f.name}
                                                                size={f.size}
                                                                progress={f.progress}
                                                                onDelete={() => setReceiptFiles((prev) => prev.filter((_, idx) => idx !== i))}
                                                            />
                                                        ))}
                                                    </FileUpload.List>
                                                )}
                                            </FileUpload.Root>
                                        </div>
                                    </div>
                                    <div className="rounded-xl bg-primary p-3 ring-1 ring-secondary_alt">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-semibold text-secondary">Link to schedule</p>
                                            <Toggle isSelected={linkSchedule} onChange={setLinkSchedule} aria-label="Link to schedule" />
                                        </div>
                                        {linkSchedule && (
                                            <div className="mt-2">
                                                <Select
                                                    size="sm"
                                                    label="Mark this against"
                                                    selectedKey={scheduleStage}
                                                    onSelectionChange={(key) => setScheduleStage(String(key) as typeof scheduleStage)}
                                                    items={[
                                                        { id: "Booking advance", label: "Booking advance" },
                                                        { id: "Slab payment", label: "Slab payment" },
                                                        { id: "Plaster stage", label: "Plaster stage" },
                                                        { id: "Final payment", label: "Final payment" },
                                                    ]}
                                                >
                                                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                                </Select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-secondary p-4">
                                <div className="flex items-center justify-end gap-2">
                                    <Button color="secondary" onClick={() => setPaymentOpen(false)}>Cancel</Button>
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            setPaymentOpen(false);
                                        }}
                                    >
                                        Save Payment
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setPaymentOpen(false);
                                        }}
                                    >
                                        Save & Send Receipt
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
            {toast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] w-[min(92vw,640px)] rounded-2xl bg-secondary px-6 py-4 text-lg font-semibold text-primary shadow-2xl ring-1 ring-secondary_alt">
                    {toast}
                </div>
            )}
         </section>
     );
 }
 

 "use client";
 
 import { useEffect, useMemo, useState } from "react";
 import { Button } from "@/components/base/buttons/button";
 import { useAuth } from "@/providers/auth";
 import { useClipboard } from "@/hooks/use-clipboard";
 import { QrCode01, Link02 } from "@untitledui/icons";
 import { Toggle } from "@/components/base/toggle/toggle";
 import { Input } from "@/components/base/input/input";
 
 export default function QrListingsPage() {
     const { user } = useAuth();
     const clipboard = useClipboard();
     const [toast, setToast] = useState<string | null>(null);
     const [project, setProject] = useState<"altius" | "valley" | "heights">("altius");
     const [showAvailability, setShowAvailability] = useState(true);
     const [showPricing, setShowPricing] = useState(true);
     const [showUpdates, setShowUpdates] = useState(true);
     const [showMedia, setShowMedia] = useState(true);
     const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleString());
 
     const origin = typeof window !== "undefined" ? window.location.origin : "https://oneinflu.com";
     const privateLink = useMemo(() => {
         const username = user?.username || "";
         return `${origin}/builder/${encodeURIComponent(username)}/projects/${project}`;
     }, [origin, user?.username, project]);
 
     const qrUrl = useMemo(() => {
         const data = encodeURIComponent(privateLink);
         return `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${data}`;
     }, [privateLink]);
 
     const [accessDisabled, setAccessDisabled] = useState(false);
     const [accessExpiryOn, setAccessExpiryOn] = useState(false);
     const [accessExpiryDate, setAccessExpiryDate] = useState<string>("");
     const [accessPasswordOn, setAccessPasswordOn] = useState(false);
     const [accessPassword, setAccessPassword] = useState("");
     const [privateAccessLink, setPrivateAccessLink] = useState<string>("");
     useEffect(() => {
         const token = Math.random().toString(36).slice(2, 8);
         setPrivateAccessLink(`${privateLink}?access=${token}`);
         setAccessDisabled(false);
         // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [project, privateLink]);
 
     return (
         <section className="flex min-h-screen flex-col lg:pl-[300px]">
             <div className="top-0 z-10 border-b border-secondary bg-primary/95 px-4 pb-4 pt-6 backdrop-blur md:px-8">
                 <div className="mx-auto w-full max-w-8xl">
                     <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                         <div className="min-w-0">
                             <h1 className="text-display-sm font-semibold text-primary">QR &amp; Project Listings</h1>
                             <p className="text-xs text-tertiary">Share live project data with buyers, brokers, and partners</p>
                         </div>
                         <div className="flex flex-wrap items-center gap-2">
                             <Button
                                 size="sm"
                                 iconLeading={QrCode01}
                                 onClick={() => {
                                     setLastUpdated(new Date().toLocaleString());
                                     setToast("Generated a new QR");
                                     setTimeout(() => setToast(null), 2000);
                                 }}
                             >
                                 Generate New QR
                             </Button>
                             <Button
                                 size="sm"
                                 color="secondary"
                                 iconLeading={Link02}
                                 onClick={async () => {
                                     const res = await clipboard.copy(privateLink, "qr-link");
                                     setToast(res.success ? "Private link copied" : "Copy failed");
                                     setTimeout(() => setToast(null), 2000);
                                 }}
                             >
                                 Copy Private Link
                             </Button>
                         </div>
                     </div>
                 </div>
             </div>
 
             <div className="flex-1 px-4 pb-12 pt-4 md:px-8">
                 <div className="mx-auto w-full max-w-8xl">
                     <div className="flex flex-wrap items-center gap-2">
                         {[
                             { id: "altius", label: "Altius" },
                             { id: "valley", label: "Valley" },
                             { id: "heights", label: "Heights" },
                         ].map((p) => {
                             const active = project === (p.id as typeof project);
                             return (
                                 <button
                                     key={p.id}
                                     type="button"
                                     onClick={() => setProject(p.id as typeof project)}
                                     className={
                                         active
                                             ? "inline-flex items-center rounded-full border border-brand-primary bg-brand-primary px-3 py-1 text-xs font-semibold text-primary shadow-xs"
                                             : "inline-flex items-center rounded-full border border-secondary bg-primary_hover px-3 py-1 text-xs font-medium text-secondary hover:bg-secondary/40"
                                     }
                                 >
                                     {p.label}
                                 </button>
                             );
                         })}
                     </div>
   <div className="mt-4 grid gap-4 md:grid-cols-4">
                         {[
                             { label: "QR scans today", value: 0, foot: "Today" },
                             { label: "Total project views", value: 0 },
                             { label: "Most viewed units", value: 0 },
                             { label: "Broker shares", value: 0 },
                         ].map((m) => (
                             <div key={m.label} className="rounded-2xl bg-primary p-4 ring-1 ring-secondary_alt">
                                 <p className="text-xs text-secondary">{m.label}</p>
                                 <p className="mt-2 text-2xl font-semibold text-primary">{m.value}</p>
                                 {m.foot ? <p className="text-2xs mt-1 text-tertiary">{m.foot}</p> : null}
                             </div>
                         ))}
                     </div>
                     <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
                         <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                             <p className="text-xs font-semibold text-secondary">Live QR</p>
                             <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] md:items-start">
                                 <div className="flex flex-col items-center gap-3">
                                     <div className="rounded-xl bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                         <img
                                             src={qrUrl}
                                             alt="Project QR"
                                             className="h-60 w-60 rounded-md object-contain"
                                         />
                                     </div>
                                     <div className="text-xs text-tertiary">
                                         <span className="rounded-full bg-secondary/30 px-2 py-0.5 text-[10px] font-medium text-quaternary">Private</span>
                                         <span className="ml-2">Last updated: {lastUpdated}</span>
                                     </div>
                                     <div className="flex flex-wrap items-center gap-2">
                                         <Button
                                             size="sm"
                                             onClick={() => {
                                                 window.open(qrUrl, "_blank", "noopener,noreferrer");
                                             }}
                                         >
                                             Download PNG
                                         </Button>
                                         <Button
                                             size="sm"
                                             color="secondary"
                                             onClick={() => {
                                                 window.open(qrUrl, "_blank", "noopener,noreferrer");
                                             }}
                                         >
                                             Download PDF for brochure
                                         </Button>
                                         <Button
                                             size="sm"
                                             color="secondary"
                                             onClick={async () => {
                                                 const res = await clipboard.copy(privateLink, "qr-link-copy");
                                                 setToast(res.success ? "QR link copied" : "Copy failed");
                                                 setTimeout(() => setToast(null), 2000);
                                             }}
                                         >
                                             Copy QR link
                                         </Button>
                                     </div>
                                 </div>
                                 <div className="rounded-xl bg-primary_hover/30 p-4 ring-1 ring-secondary_alt">
                                     <p className="text-xs font-semibold text-secondary">Visibility Controls</p>
                                     <div className="mt-3 grid gap-2">
                                         <div className="flex items-center justify-between rounded-lg bg-primary p-2 ring-1 ring-secondary_alt">
                                             <span className="text-sm text-primary">Show unit availability</span>
                                             <Toggle isSelected={showAvailability} onChange={setShowAvailability} aria-label="Show unit availability" />
                                         </div>
                                         <div className="flex items-center justify-between rounded-lg bg-primary p-2 ring-1 ring-secondary_alt">
                                             <span className="text-sm text-primary">Show live pricing</span>
                                             <Toggle isSelected={showPricing} onChange={setShowPricing} aria-label="Show live pricing" />
                                         </div>
                                         <div className="flex items-center justify-between rounded-lg bg-primary p-2 ring-1 ring-secondary_alt">
                                             <span className="text-sm text-primary">Show construction updates</span>
                                             <Toggle isSelected={showUpdates} onChange={setShowUpdates} aria-label="Show construction updates" />
                                         </div>
                                         <div className="flex items-center justify-between rounded-lg bg-primary p-2 ring-1 ring-secondary_alt">
                                             <span className="text-sm text-primary">Show media/videos</span>
                                             <Toggle isSelected={showMedia} onChange={setShowMedia} aria-label="Show media/videos" />
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     <div className="rounded-2xl bg-primary p-4 md:p-5 ring-1 ring-secondary_alt">
                         <div className="flex items-center justify-between">
                             <p className="text-xs font-semibold text-secondary">Private Access Links</p>
                             {accessDisabled ? (
                                 <span className="rounded-full bg-error-secondary px-2 py-0.5 text-[11px] font-medium text-primary">Disabled</span>
                             ) : (
                                 <span className="rounded-full bg-secondary/30 px-2 py-0.5 text-[11px] font-medium text-quaternary">Active</span>
                             )}
                         </div>
                         <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-start">
                             <div className="grid gap-3">
                                 <Input
                                     size="sm"
                                     label="Private link URL"
                                     value={privateAccessLink}
                                     onChange={() => {}}
                                     isReadOnly
                                 />
                                 <div className="grid gap-2 md:grid-cols-2">
                                     <div className="rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                         <div className="flex items-center justify-between">
                                             <span className="text-sm text-primary">Expiry</span>
                                             <Toggle isSelected={accessExpiryOn} onChange={setAccessExpiryOn} aria-label="Expiry toggle" />
                                         </div>
                                         {accessExpiryOn && (
                                             <div className="mt-2">
                                                 <Input size="sm" label="Expires on" type="date" value={accessExpiryDate} onChange={setAccessExpiryDate} />
                                             </div>
                                         )}
                                     </div>
                                     <div className="rounded-lg bg-primary_hover p-3 ring-1 ring-secondary_alt">
                                         <div className="flex items-center justify-between">
                                             <span className="text-sm text-primary">Password</span>
                                             <Toggle isSelected={accessPasswordOn} onChange={setAccessPasswordOn} aria-label="Password toggle" />
                                         </div>
                                         {accessPasswordOn && (
                                             <div className="mt-2">
                                                 <Input size="sm" label="Password" value={accessPassword} onChange={setAccessPassword} />
                                             </div>
                                         )}
                                     </div>
                                 </div>
                             </div>
                             <div className="flex flex-col items-stretch gap-2">
                                 <Button
                                     size="sm"
                                     color="secondary"
                                     onClick={async () => {
                                         const res = await clipboard.copy(privateAccessLink, "private-link");
                                         setToast(res.success ? "Private link copied" : "Copy failed");
                                         setTimeout(() => setToast(null), 2000);
                                     }}
                                 >
                                     Copy link
                                 </Button>
                                 <Button
                                     size="sm"
                                     onClick={() => {
                                         const token = Math.random().toString(36).slice(2, 8);
                                         setPrivateAccessLink(`${privateLink}?access=${token}`);
                                         setAccessDisabled(false);
                                         setToast("Generated new link");
                                         setTimeout(() => setToast(null), 2000);
                                     }}
                                 >
                                     Generate new link
                                 </Button>
                                 <Button
                                     size="sm"
                                     color="secondary-destructive"
                                     onClick={() => {
                                         setAccessDisabled(true);
                                         setToast("Access disabled");
                                         setTimeout(() => setToast(null), 2000);
                                     }}
                                 >
                                     Disable access
                                 </Button>
                             </div>
                         </div>
                     </div>
 
                       
                     </div>
 
                 
                 </div>
             </div>
 
             {toast && (
                 <div className="fixed bottom-8 left-1/2 z-[9999] w-[min(92vw,640px)] -translate-x-1/2 rounded-2xl bg-secondary px-6 py-4 text-lg font-semibold text-primary shadow-2xl ring-1 ring-secondary_alt">
                     {toast}
                 </div>
             )}
         </section>
     );
 }
 

"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { QRCode } from "@/components/shared-assets/qr-code";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { 
    Calendar, 
    Building02, 
    MarkerPin01, 
    Link01, 
    Plus, 
    Trash01, 
    CheckCircle, 
    QrCode01, 
    BankNote01, 
    LayersTwo01, 
    ArrowLeft,
    File04,
    Activity,
    Target02,
    X,
    Camera01
} from "@untitledui/icons";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";
import jsQR from "jsqr";
import { cx } from "@/utils/cx";

export interface Application {
  event: {
    id: string;
    code: string;
    brandName: string;
    eventName: string;
    eventType: string; // "paid" | "barter" | "gifted"
    date: string;
    city: string;
    venue: string;
    creatorCountNeeded?: number;
    creatorCriteria?: {
      minFollowers: number;
      niches: string[];
      city: string;
    };
    deliverables?: Array<{
      platform: string;
      type: string;
      quantity: number;
      deadline?: { kind: string; value: string | null; date: string | null };
      brandTagMandatory: boolean;
      locationTagMandatory: boolean;
      hashtagsRequired: boolean;
      brandMusicProvided: boolean;
      contentApprovalRequired: boolean;
    }>;
    entryType: string;
    qrCheckinRequired: boolean;
    dashboardAccessRequired?: boolean;
    doClientApprovalNeeded?: boolean;
    isGuestsAllowedplusone?: boolean;
    isLimitedMenu?: boolean;
    inhouseFoodandBeverages?: boolean;
    payment?: {
      type: string;
      fixedAmount: number | null;
      minAmount: number | null;
      maxAmount: number | null;
      timeline: string;
      timelineDays: number | null;
      invoiceRequired: boolean;
      perCreator: boolean;
    };
    status?: string;
    invitationBannerUrl: string;
    slug?: string;
    description?: string;
  };
  application: {
    id?: string;
    _id?: string;
    status: string;
    appliedAt: string;
    inviteCode: string;
    checkedIn: boolean;
    checkedInAt: string | null;
    bringingPlusOne: boolean;
    plusOneName: string | null;
    plusOnePhone: string | null;
    willingToAttend?: boolean;
    doClientApprovalNeeded?: boolean;
    shareProfessionalDashboard?: boolean;
    dashboardImageUrl?: string;
    isInvitationShared?: boolean;
    taskCompletion?: boolean;
    submittedLinks?: string[];
  };
}

// Helper Functions
const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
    } catch {
      return dateString;
    }
};

const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
    } catch {
      return "";
    }
};

const getStatusColor = (status: string): any => {
    switch (status.toLowerCase()) {
      case 'invited': return 'success';
      case 'accepted': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      case 'declined': return 'error';
      default: return 'gray';
    }
};

const ApplicationProgress = ({ application }: { application: Application }) => {
    const status = application.application.status.toLowerCase();
    
    // Determine current step index
    // Steps: 0: Applied, 1: Shortlisted, 2: Invited
    let currentStep = 0;
    if (["invited", "accepted"].includes(status)) {
        currentStep = 3; // All done
    } else if (["rejected", "declined"].includes(status)) {
        currentStep = 1; // Stopped at applied/review
    } else if (status === "pending") {
        currentStep = 1; // In review (Shortlisted step)
    } else {
        currentStep = 1;
    }

    // Dates
    const appliedDate = new Date(application.application.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const steps = [
        { label: "Applied", date: appliedDate },
        { label: "Shortlisted", date: "In Review" },
        { label: "Invited", date: "Final Decision" }
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary">
            <h3 className="text-lg font-bold text-primary mb-6">Application Progress</h3>
            <div className="relative flex justify-between">
                {/* Connecting Line */}
                <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-200 -z-0" />
                <div 
                    className="absolute top-3 left-0 h-0.5 bg-brand-solid -z-0 transition-all duration-500" 
                    style={{ width: `${Math.min(currentStep, 2) * 50}%` }}
                />

                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const isUpcoming = index > currentStep;

                    return (
                        <div key={index} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                            <div className={cx(
                                "flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors duration-300",
                                isCompleted ? "bg-brand-solid border-brand-solid text-white" : 
                                isCurrent ? "bg-white border-brand-solid" : "bg-white border-gray-300"
                            )}>
                                {isCompleted ? (
                                    <CheckCircle className="size-4" />
                                ) : isCurrent ? (
                                    <div className="w-2 h-2 rounded-full bg-brand-solid" />
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                                )}
                            </div>
                            <div className="text-center">
                                <p className={cx("text-sm font-semibold", isUpcoming ? "text-tertiary" : "text-primary")}>
                                    {step.label}
                                </p>
                                <p className="text-xs text-tertiary">{step.date}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface ApplicationStatusCardProps {
    application: Application;
    token: string | null;
    onCheckInSuccess: () => void;
    className?: string;
}

const ApplicationStatusCard = ({ application, token, onCheckInSuccess, className }: ApplicationStatusCardProps) => {
    const [showQrCode, setShowQrCode] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const isInvited = ["invited", "accepted"].includes(application.application.status.toLowerCase());
    const isCheckedIn = application.application.checkedIn;
    const checkinUrl = typeof window !== 'undefined' ? `${window.location.origin}/events/checkin?eventCode=${application.event.code}` : '';

    // QR Scanning Logic
    useEffect(() => {
        let animationFrameId: number;

        const scan = () => {
            if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
                const video = videoRef.current;
                const canvas = canvasRef.current;
                if (!canvas) return;

                canvas.height = video.videoHeight;
                canvas.width = video.videoWidth;
                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });

                    if (code) {
                        console.log("QR Code found:", code.data);
                        handleScanSuccess(code.data);
                        return; // Stop scanning loop
                    }
                }
            }
            if (isScanning) {
                animationFrameId = requestAnimationFrame(scan);
            }
        };

        if (isScanning) {
            animationFrameId = requestAnimationFrame(scan);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isScanning]);

    const startCamera = async () => {
        setIsScanning(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // Wait for video to play
                await videoRef.current.play();
            }
        } catch (err) {
            console.error("Camera error:", err);
            alert("Unable to access camera. Please ensure you have granted permissions.");
            setIsScanning(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsScanning(false);
    };

    const handleScanSuccess = async (scannedData: string) => {
        stopCamera();
        
        try {
            // Extract eventCode from URL if possible, otherwise use data as code
            let eventCode = scannedData;
            try {
                const url = new URL(scannedData);
                const codeParam = url.searchParams.get("eventCode");
                if (codeParam) eventCode = codeParam;
            } catch {}

            // Perform Check-in
            const res = await api.post<{ success: boolean; data: any }>("/events/checkin", {
                eventCode: eventCode,
                inviteCode: application.application.inviteCode
            }, { token });

            if (res.success) {
                alert("Check-in Successful!");
                onCheckInSuccess();
            } else {
                alert("Check-in failed. Please try again.");
            }
        } catch (e: any) {
            console.error("Check-in error", e);
            alert(e.message || "Failed to check in.");
        }
    };

    return (
        <div className={cx("bg-white rounded-2xl p-6 shadow-sm border border-secondary", className)}>
            <div className="flex items-center gap-3 mb-6">
                <FeaturedIcon icon={Activity} color="brand" theme="modern" size="lg" />
                <h3 className="text-lg font-bold text-primary">Application Status</h3>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-secondary">
                    <span className="text-sm font-medium text-tertiary">Current Status</span>
                    <Badge type="pill-color" size="lg" color={getStatusColor(application.application.status)}>
                        {application.application.status}
                    </Badge>
                </div>

                {/* Check-in Status / Action */}
                {isInvited && (
                    <div className="space-y-4 pt-4 border-t border-secondary">
                        <div className="flex items-center gap-2">
                            <QrCode01 className="size-5 text-gray-400" />
                            <span className="text-sm font-semibold text-primary">Event Check-in</span>
                        </div>

                        {isCheckedIn ? (
                            <div className="flex items-center gap-3 p-3 bg-success-50 rounded-xl border border-success-200 text-success-700">
                                <CheckCircle className="size-5" />
                                <div className="flex flex-col">
                                    <span className="font-semibold">Checked In</span>
                                    <span className="text-xs opacity-80">{formatDateTime(application.application.checkedInAt || "")}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {!showQrCode && !isScanning ? (
                                    <div className="flex flex-col gap-3">
                                        <Button 
                                            size="md" 
                                            color="primary" 
                                            className="w-full justify-center"
                                            onClick={startCamera}
                                            iconLeading={Camera01}
                                        >
                                            Scan Venue QR
                                        </Button>
                                       
                                    </div>
                                ) : showQrCode ? (
                                    <div className="p-4 bg-white rounded-xl border border-secondary flex flex-col items-center animate-in fade-in zoom-in-95 duration-200 shadow-lg">
                                        <QRCode 
                                            value={checkinUrl} 
                                            size="md"
                                            options={{
                                                width: 160,
                                                height: 160,
                                                dotsOptions: { color: "#000000", type: "rounded" },
                                            }}
                                        />
                                        <p className="text-xs text-center text-tertiary mt-3 mb-3">Scan this code at the venue entrance</p>
                                        <Button 
                                            size="sm" 
                                            color="secondary" 
                                            onClick={() => setShowQrCode(false)}
                                            className="w-full justify-center"
                                        >
                                            Close QR Code
                                        </Button>
                                    </div>
                                ) : (
                                    // Scanner View
                                    <div className="relative overflow-hidden rounded-xl border border-secondary bg-black aspect-square">
                                        <video 
                                            ref={videoRef} 
                                            className="w-full h-full object-cover" 
                                            playsInline 
                                            muted
                                        />
                                        <canvas ref={canvasRef} className="hidden" />
                                        <div className="absolute inset-0 border-2 border-white/50 rounded-xl pointer-events-none">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-brand-solid rounded-lg" />
                                        </div>
                                        <button 
                                            onClick={stopCamera}
                                            className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                        >
                                            <X className="size-5" />
                                        </button>
                                        <p className="absolute bottom-4 left-0 w-full text-center text-white text-xs bg-black/50 py-1">
                                            Align QR code within the frame
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function ApplicationDetailPage() {
  const { token } = useAuth();
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<string[]>([""]);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        if (!token) return;
        // Since we don't have a direct endpoint, fetch all and find
        const res = await api.get<{ success: boolean; status: string; data: { applications: Application[] } }>("/events/my-applications", { token });
        if (res.success && res.data?.applications) {
          const found = res.data.applications.find(app => (
                    app.application.id === id || 
                    app.application._id === id || 
                    app.application.inviteCode === id
                  ));
                  if (found) {
            setApplication(found);
            if (found.application.submittedLinks && found.application.submittedLinks.length > 0) {
              setLinks(found.application.submittedLinks);
            }
          } else {
             // Handle not found
             console.error("Application not found");
          }
        }
      } catch (e) {
        console.error("Failed to fetch application", e);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [token, id]);

  const handleCheckInSuccess = () => {
      setApplication(prev => prev ? {
          ...prev,
          application: {
              ...prev.application,
              checkedIn: true,
              checkedInAt: new Date().toISOString()
          }
      } : null);
  };

  if (loading) {
      return (
          <div className="flex min-h-screen items-center justify-center lg:pl-[300px]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
      );
  }

  if (!application) {
      return (
          <div className="flex min-h-screen flex-col items-center justify-center gap-4 lg:pl-[300px]">
              <p className="text-tertiary">Application not found</p>
              <Button size="sm" color="secondary" onClick={() => router.back()}>
                  Back to Applications
              </Button>
          </div>
      );
  }

  const isInvited = ["invited", "accepted"].includes(application.application.status.toLowerCase());
  const appId = application.application.id || application.application._id || application.application.inviteCode;
  const isCheckedIn = application.application.checkedIn;

  // Submit Work Logic
  const addLink = () => setLinks([...links, ""]);
  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };
  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleSubmitWork = async () => {
    const validLinks = links.filter(l => l.trim() !== "");
    if (validLinks.length === 0) {
        alert("Please add at least one link.");
        return;
    }

    setSubmitting(true);
    try {
        if (!token || !appId) return;
        
        await api.post(`/events/public/code/${application.event.code}/applications/${appId}/links`, {
            links: validLinks
        }, { token });
        
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (e: any) {
        console.error("Submit failed", e);
        alert(e.message || "Failed to submit links. Please try again.");
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col lg:pl-[300px]">
        {/* Header */}
        <div className="border-b border-secondary bg-primary px-4 py-6 md:px-8">
            <div className="mx-auto w-full max-w-8xl">
                <div className="flex flex-col gap-4">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm font-medium text-tertiary hover:text-primary transition-colors w-fit"
                    >
                        <ArrowLeft className="size-4" />
                        Back to applications
                    </button>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-display-sm font-semibold text-primary">{application.event.eventName}</h1>
                        <p className="text-md text-tertiary">Application Details & Status</p>
                    </div>
                    
                    {/* Tabs Style Navigation (Visual Only for now) */}
                    <div className="mt-4 flex gap-6 border-b border-secondary">
                        <button className="pb-3 text-sm font-semibold border-b-2 border-brand-solid text-brand-solid">
                            Overview
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 bg-gray-50">
            <div className="mx-auto w-full max-w-8xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Progress Tracker */}
                        <ApplicationProgress application={application} />

                        {/* Banner Section */}
                        {isInvited && application.event.invitationBannerUrl && (
                            <div className="bg-white rounded-2xl p-2 shadow-sm border border-secondary overflow-hidden">
                                <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-secondary/30">
                                    <img 
                                        src={application.event.invitationBannerUrl} 
                                        alt="Event Banner" 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        )}

                        {/* About Section (Merged with Event Details) */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary">
                            <div className="flex items-center gap-3 mb-6">
                                <FeaturedIcon icon={File04} color="brand" theme="modern" size="lg" />
                                <h3 className="text-xl font-bold text-primary">About Campaign</h3>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <Building02 className="size-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-tertiary">Brand</p>
                                            <p className="text-base font-semibold text-primary">{application.event.brandName}</p>
                                        </div>
                                    </div>

                                    {/* Merged Event Details Info */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
                                        <div className="flex gap-3">
                                            <div className="p-2 bg-gray-50 rounded-lg h-fit">
                                                <Calendar className="size-5 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-tertiary">Date & Time</p>
                                                <p className="text-sm font-semibold text-primary">{formatDate(application.event.date)}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="p-2 bg-gray-50 rounded-lg h-fit">
                                                <MarkerPin01 className="size-5 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-tertiary">Location</p>
                                                <p className="text-sm font-semibold text-primary">{application.event.venue}</p>
                                                <p className="text-sm text-tertiary">{application.event.city}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {application.event.description && (
                                        <div className="prose prose-sm max-w-none text-tertiary mt-4 border-t border-secondary pt-4">
                                            <p>{application.event.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Application Status - MOBILE ONLY */}
                        <ApplicationStatusCard 
                            application={application} 
                            token={token} 
                            onCheckInSuccess={handleCheckInSuccess}
                            className="lg:hidden"
                        />

                        {/* Deliverables Section */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary">
                            <div className="flex items-center gap-3 mb-6">
                                <FeaturedIcon icon={LayersTwo01} color="brand" theme="modern" size="lg" />
                                <h3 className="text-xl font-bold text-primary">Deliverables</h3>
                            </div>

                            {application.event.deliverables && application.event.deliverables.length > 0 ? (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {application.event.deliverables.map((del, idx) => (
                                        <li key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-secondary bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-white border border-secondary shadow-sm shrink-0">
                                                <span className="text-lg font-bold text-brand-600">x{del.quantity}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-primary capitalize text-lg">{del.platform}</p>
                                                <p className="text-sm text-tertiary capitalize mb-2">{del.type}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {del.brandTagMandatory && <Badge size="sm" type="pill-color" color="gray">Tag Brand</Badge>}
                                                    {del.hashtagsRequired && <Badge size="sm" type="pill-color" color="gray">Hashtags</Badge>}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-tertiary">No specific deliverables listed.</p>
                            )}
                        </div>

                        {/* Submit Work Section (If Checked In) */}
                        {isCheckedIn && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary ring-1 ring-brand-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <FeaturedIcon icon={Link01} color="success" theme="modern" size="lg" />
                                    <div>
                                        <h3 className="text-xl font-bold text-primary">Submit Work</h3>
                                        <p className="text-sm text-tertiary">Add links to your published content</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {links.map((link, index) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="relative flex-1">
                                                <Input 
                                                    value={link}
                                                    onChange={(val) => updateLink(index, val)}
                                                    placeholder="Paste your content link here..."
                                                />
                                            </div>
                                            {links.length > 1 && (
                                                <Button 
                                                    color="secondary" 
                                                    onClick={() => removeLink(index)}
                                                    iconLeading={Trash01}
                                                    className="shrink-0"
                                                />
                                            )}
                                        </div>
                                    ))}
                                    
                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <Button 
                                            color="secondary" 
                                            onClick={addLink}
                                            iconLeading={Plus}
                                            className="flex-1 sm:flex-none"
                                        >
                                            Add another link
                                        </Button>
                                        <Button 
                                            color="primary" 
                                            onClick={handleSubmitWork}
                                            disabled={submitting}
                                            className="flex-1 sm:flex-none"
                                        >
                                            {submitting ? 'Submitting...' : submitSuccess ? 'Submitted Successfully!' : 'Submit Links'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        {/* Application Status - DESKTOP ONLY */}
                        <ApplicationStatusCard 
                            application={application} 
                            token={token} 
                            onCheckInSuccess={handleCheckInSuccess}
                            className="hidden lg:block"
                        />

                      

                        {/* Compensation Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary">
                            <div className="flex items-center gap-3 mb-6">
                                <FeaturedIcon icon={BankNote01} color="gray" theme="modern" size="lg" />
                                <h3 className="text-lg font-bold text-primary">Compensation</h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="p-4 rounded-xl bg-gray-50 border border-secondary">
                                    <span className="text-xs text-tertiary uppercase tracking-wide block mb-1">Type</span>
                                    <Badge type="pill-color" size="md" color={application.event.eventType === 'paid' ? 'success' : 'gray'}>
                                        {application.event.eventType === 'paid' ? 'Paid Campaign' : 'Barter / Gifted'}
                                    </Badge>
                                </div>
                                
                                {application.event.payment && application.event.eventType === 'paid' && (
                                    <div className="p-4 rounded-xl bg-success-50 border border-success-200">
                                        <span className="text-xs text-success-700 uppercase tracking-wide block mb-1">Total Amount</span>
                                        <span className="text-2xl font-bold text-success-700">
                                            ₹{application.event.payment.fixedAmount?.toLocaleString() || application.event.payment.minAmount?.toLocaleString() || 0}
                                        </span>
                                        {application.event.payment.invoiceRequired && (
                                            <div className="mt-2 flex items-center gap-1.5 text-xs text-success-700 opacity-80">
                                                <span className="size-1.5 rounded-full bg-current" />
                                                Invoice required
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Amenities & Rules Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary">
                            <div className="flex items-center gap-3 mb-6">
                                <FeaturedIcon icon={CheckCircle} color="gray" theme="modern" size="lg" />
                                <h3 className="text-lg font-bold text-primary">Amenities & Rules</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-secondary">
                                    <span className="text-sm text-tertiary">F&B Provided</span>
                                    <Badge type="pill-color" size="sm" color={application.event.inhouseFoodandBeverages ? 'success' : 'gray'}>
                                        {application.event.inhouseFoodandBeverages ? 'Yes' : 'No'}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-secondary">
                                    <span className="text-sm text-tertiary">Menu Type</span>
                                    <Badge type="pill-color" size="sm" color={application.event.isLimitedMenu ? 'warning' : 'gray'}>
                                        {application.event.isLimitedMenu ? 'Limited Menu' : 'Standard Menu'}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-tertiary">Plus One Allowed</span>
                                    <Badge type="pill-color" size="sm" color={application.event.isGuestsAllowedplusone ? 'success' : 'gray'}>
                                        {application.event.isGuestsAllowedplusone ? 'Yes' : 'No'}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

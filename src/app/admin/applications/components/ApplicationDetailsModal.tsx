"use client";

import { useState, useEffect } from "react";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { QRCode } from "@/components/shared-assets/qr-code";
import { Calendar, Building02, MarkerPin01, Link01, Plus, Trash01, CheckCircle, QrCode01, BankNote01, LayersTwo01 } from "@untitledui/icons";
import { api } from "@/utils/api";
import { useAuth } from "@/providers/auth";
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

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
  onUpdate?: () => void;
}

export function ApplicationDetailsModal({ isOpen, onClose, application, onUpdate }: ApplicationDetailsModalProps) {
  const { token } = useAuth();
  const [links, setLinks] = useState<string[]>([""]);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  useEffect(() => {
    if (application?.application?.submittedLinks && application.application.submittedLinks.length > 0) {
      setLinks(application.application.submittedLinks);
    } else {
      setLinks([""]);
    }
    setSubmitSuccess(false);
    setShowQrCode(false);
  }, [application]);

  if (!application) return null;

  const isInvited = ["invited", "accepted"].includes(application.application.status.toLowerCase());
  const appId = application.application.id || application.application._id;
  const isCheckedIn = application.application.checkedIn;

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
        if (onUpdate) onUpdate();
        setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (e: any) {
        console.error("Submit failed", e);
        alert(e.message || "Failed to submit links. Please try again.");
    } finally {
        setSubmitting(false);
    }
  };

  const checkinUrl = typeof window !== 'undefined' ? `${window.location.origin}/events/checkin?eventCode=${application.event.code}` : '';

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <Dialog className="outline-none flex flex-col max-h-[90vh]">
          {({ close }) => (
            <>
              {/* Header / Top Section */}
              <div className="relative flex flex-col md:flex-row border-b border-gray-200 bg-white">
                 <div className="absolute top-4 right-4 z-10">
                    <CloseButton onPress={close} />
                 </div>
                 
                 {/* Left: Banner */}
                 {isInvited && application.event.invitationBannerUrl ? (
                   <div className="w-full md:w-[280px] h-[200px] md:h-auto relative shrink-0">
                      <img 
                          src={application.event.invitationBannerUrl} 
                          alt="Event Banner" 
                          className="absolute inset-0 w-full h-full object-cover"
                      />
                   </div>
                 ) : null}

                 {/* Right: Event Info */}
                 <div className="flex-1 p-6 pr-12 flex flex-col justify-center gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge type="pill-color" size="md" color={getStatusColor(application.application.status)}>
                            {application.application.status}
                        </Badge>
                        <Badge type="pill-color" size="md" color="gray">
                            {application.event.eventType === 'paid' ? 'Paid' : 'Barter'}
                        </Badge>
                        {isCheckedIn && application.application.checkedInAt && (
                           <BadgeWithIcon type="pill-color" size="md" color="success" iconLeading={CheckCircle}>
                              Checked in at {formatDateTime(application.application.checkedInAt)}
                           </BadgeWithIcon>
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">{application.event.eventName}</h2>
                        <div className="flex items-center gap-2 text-sm font-medium text-brand-600 mt-1">
                            <Building02 className="size-4" />
                            <span>{application.event.brandName}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                             <Calendar className="size-4 text-gray-400" />
                             <span>{formatDate(application.event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <MarkerPin01 className="size-4 text-gray-400" />
                             <span>{application.event.venue}, {application.event.city}</span>
                        </div>
                    </div>

                    {/* Check-in Action Area - Inline in Header */}
                    {isInvited && !isCheckedIn && (
                        <div className="mt-2">
                            {!showQrCode ? (
                                <Button 
                                    size="sm" 
                                    color="primary" 
                                    onClick={() => setShowQrCode(true)}
                                    iconLeading={QrCode01}
                                >
                                    Scan QR to Check In
                                </Button>
                            ) : (
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 inline-flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-1.5 bg-white rounded-md mb-2 shadow-sm">
                                        <QRCode 
                                            value={checkinUrl} 
                                            size="md"
                                            options={{
                                                width: 140,
                                                height: 140,
                                                dotsOptions: { color: "#000000", type: "rounded" },
                                            }}
                                        />
                                    </div>
                                    <Button 
                                        size="sm" 
                                        color="secondary" 
                                        onClick={() => setShowQrCode(false)}
                                        className="w-full justify-center"
                                    >
                                        Hide QR
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                 </div>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Creator Criteria - Takes 1 column on desktop if available, or spans if needed */}
                      {application.event.creatorCriteria && (
                          <div className="md:col-span-3">
                            <section className="space-y-2">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Creator Criteria</h3>
                                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 mb-1">Min Followers</span>
                                        <span className="font-semibold text-gray-900">{application.event.creatorCriteria.minFollowers.toLocaleString()}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 mb-1">City</span>
                                        <span className="font-semibold text-gray-900">{application.event.creatorCriteria.city}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 mb-1">Niches</span>
                                        <div className="flex flex-wrap gap-1">
                                            {application.event.creatorCriteria.niches.map((n, i) => (
                                                <Badge key={i} type="pill-color" color="gray" size="sm">{n}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                          </div>
                      )}

                      {/* Deliverables - Takes 2 columns */}
                      <section className="md:col-span-2 space-y-2">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                              <LayersTwo01 className="size-4" />
                              Deliverables
                          </h3>
                          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-full">
                              {application.event.deliverables && application.event.deliverables.length > 0 ? (
                                  <ul className="space-y-3">
                                      {application.event.deliverables.map((del, idx) => (
                                          <li key={idx} className="flex items-start gap-3 text-sm">
                                              <div className="bg-gray-100 px-2 py-1 rounded-md text-gray-700 font-bold text-xs min-w-[32px] text-center">
                                                  x{del.quantity}
                                              </div>
                                              <div>
                                                  <p className="font-medium text-gray-900 capitalize">{del.platform} {del.type}</p>
                                                  <div className="flex flex-wrap gap-1 mt-1">
                                                      {del.brandTagMandatory && <span className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 uppercase tracking-wide font-medium">Tag Brand</span>}
                                                      {del.hashtagsRequired && <span className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 uppercase tracking-wide font-medium">Hashtags</span>}
                                                  </div>
                                              </div>
                                          </li>
                                      ))}
                                  </ul>
                              ) : (
                                  <p className="text-sm text-gray-500">No specific deliverables listed.</p>
                              )}
                          </div>
                      </section>

                      {/* Compensation - Takes 1 column */}
                      <section className="space-y-2">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                              <BankNote01 className="size-4" />
                              Compensation
                          </h3>
                          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-full flex flex-col justify-center">
                              <div className="flex flex-col gap-1 mb-3">
                                  <span className="text-xs text-gray-500 uppercase tracking-wide">Type</span>
                                  <span className="text-lg font-semibold text-gray-900 capitalize">{application.event.eventType}</span>
                              </div>
                              {application.event.payment && application.event.eventType === 'paid' && (
                                  <div className="pt-3 border-t border-gray-100 flex flex-col gap-1">
                                      <span className="text-xs text-gray-500 uppercase tracking-wide">Amount</span>
                                      <span className="text-2xl font-bold text-green-600">
                                          ₹{application.event.payment.fixedAmount?.toLocaleString() || application.event.payment.minAmount?.toLocaleString() || 0}
                                      </span>
                                      {application.event.payment.invoiceRequired && (
                                          <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                              <span className="size-1.5 rounded-full bg-gray-400" />
                                              Invoice required
                                          </span>
                                      )}
                                  </div>
                              )}
                          </div>
                      </section>
                  </div>

                  {/* Submit Work (Only if Checked In) */}
                  {isCheckedIn && (
                      <section className="space-y-2 mt-6">
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                              <Link01 className="size-4" />
                              Submit Work
                          </h3>
                          
                          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-5">
                              <div className="space-y-3">
                                  {links.map((link, index) => (
                                      <div key={index} className="flex gap-2">
                                          <div className="relative flex-1">
                                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                  <Link01 className="h-4 w-4 text-gray-400" />
                                              </div>
                                              <Input
                                                  value={link}
                                                  onChange={(val) => updateLink(index, String(val))}
                                                  placeholder="Paste link to your post (Instagram, YouTube, etc.)"
                                                  className="pl-9"
                                              />
                                          </div>
                                          {links.length > 1 && (
                                              <Button 
                                                  size="md" 
                                                  color="secondary" 
                                                  onClick={() => removeLink(index)}
                                                  iconLeading={Trash01}
                                                  className="!p-2.5"
                                                  aria-label="Remove link"
                                              />
                                          )}
                                      </div>
                                  ))}
                                  
                                  <Button 
                                      size="sm" 
                                      color="secondary" 
                                      onClick={addLink} 
                                      iconLeading={Plus}
                                      className="w-full justify-center"
                                  >
                                      Add another link
                                  </Button>
                              </div>

                              <div className="pt-4 border-t border-gray-100">
                                  <Button 
                                      size="lg" 
                                      className="w-full justify-center"
                                      onClick={handleSubmitWork}
                                      isLoading={submitting}
                                      disabled={submitSuccess}
                                  >
                                      {submitSuccess ? "Submitted Successfully!" : "Submit Work"}
                                  </Button>
                                  {submitSuccess && (
                                      <p className="mt-2 text-sm text-center text-green-600 font-medium animate-in fade-in">
                                          Your work has been submitted successfully.
                                      </p>
                                  )}
                              </div>
                          </div>
                      </section>
                  )}
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

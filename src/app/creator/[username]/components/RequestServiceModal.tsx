"use client";

import { Heading, Modal as AriaModal, ModalOverlay as AriaModalOverlay, Dialog as AriaDialog } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";

interface RequestServiceModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  service: any; // Type this better if possible, using Service interface
  displayName: string;
}

export function RequestServiceModal({ isOpen, onOpenChange, service, displayName }: RequestServiceModalProps) {
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
                    Request to {displayName}
                  </Heading>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Review the service details and share your info
                  </p>
                </div>
                <Button size="sm" color="primary" onClick={close} className="rounded-lg">
                  Close
                </Button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar bg-white dark:bg-gray-900">
                {/* Service Details Card */}
                {service && (
                  <div className="border border-gray-200 dark:border-white/10 rounded-xl p-4 bg-white dark:bg-white/5">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-base">{service.title}</h4>
                    <div className="flex gap-8">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Delivery</div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{service.time}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Includes</div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{service.revisions || "Standard revisions"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price</div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{service.price === 'Custom' ? 'Custom' : service.price}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-4">
                  <Input label="Your Name *" placeholder="Brand / Your name" />
                  <Input label="Email / Contact *" placeholder="your@email.com" />
                  <TextArea label="Message (optional)" placeholder="Briefly describe your requirement..." rows={4} />
                  
                  <div className="space-y-1.5">
                    <Label>Attachments (Reference Material)</Label>
                    <FileUpload.Root>
                      <FileUpload.DropZone hint="Upload references, brand assets, or moodboards" />
                    </FileUpload.Root>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 pb-8 sm:pb-4">
                <Button size="lg" color="primary" className="w-full" onClick={close}>Submit Request</Button>
              </div>
            </div>
          )}
        </AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
}

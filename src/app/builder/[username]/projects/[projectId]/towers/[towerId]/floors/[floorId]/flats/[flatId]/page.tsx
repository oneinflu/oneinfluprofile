"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight,
  MapPin, 
  Download, 
  Maximize2, 
  Users, 
  ArrowUpFromLine, 
  Info, 
  Calendar, 
  Dumbbell, 
  School, 
  Hospital, 
  Train, 
  Briefcase, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  Droplets,
  Share2,
  Play,
  Image as ImageIcon,
  X,
  Loader2,
  TrendingUp,
  ShoppingCart,
  Coffee,
  Car,
  Navigation,
  Star,
  Map,
  Filter,
  Fuel,
  ShoppingBag
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { cx } from "@/utils/cx";
import { formatIndianCurrency } from "@/utils/formatCurrency";
import { Button } from "@/components/base/buttons/button";
import lottie from "lottie-web";

// --- Mock Data Removed (Moved to Dynamic Generation) ---

const Section = ({ title, children, className = "" }: { title?: string, children: React.ReactNode, className?: string }) => (
  <section className={`py-6 border-b border-gray-100 dark:border-white/5 last:border-0 ${className}`}>
    {title && <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">{title}</h2>}
    {children}
  </section>
);

const DetailRow = ({ label, value, subtext, highlight = false, infoText }: { label: string, value: string | number, subtext?: string, highlight?: boolean, infoText?: string }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="py-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
          {infoText && (
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="text-right">
          <div className={cx("text-sm font-medium", highlight ? "text-gray-900 dark:text-white font-bold" : "text-gray-700 dark:text-gray-300")}>
            {value}
          </div>
          {subtext && <div className="text-xs text-gray-400">{subtext}</div>}
        </div>
      </div>
      {/* Inline Info Expansion */}
      <AnimatePresence>
        {showInfo && infoText && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="text-[11px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg mt-1 mb-1">
              {infoText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({ title, icon: Icon, children }: { title: string, icon?: any, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          {Icon && <Icon className="w-5 h-5 text-gray-500" />}
          {title}
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }} 
            animate={{ height: "auto" }} 
            exit={{ height: 0 }} 
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-200 dark:border-white/10">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ScheduleVisitModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState<"phone" | "otp" | "details" | "success">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [details, setDetails] = useState({ name: "", email: "", profile: "" });
  const [isLoading, setIsLoading] = useState(false);
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === "success" && animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'https://lottie.host/9e4d0706-5385-4556-9a5c-50201202517d/E8k07Q3Q4D.json' // Public Success Check Animation
      });
      return () => anim.destroy();
    }
  }, [step]);

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("details");
    }, 1500);
  };

  const handleSubmitDetails = () => {
    if (!details.name || !details.email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="w-full max-w-md bg-white dark:bg-black rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-white/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {step === "phone" && "Schedule a Visit"}
            {step === "otp" && "Verify Number"}
            {step === "details" && "Your Details"}
            {step === "success" && "Request Sent"}
          </h3>
          {step !== "success" && (
            <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-gray-200 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {step === "phone" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Phone Number</label>
              <div className="flex gap-3">
                <div className="px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-500 font-medium select-none">
                  +91
                </div>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98765 43210"
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all placeholder:text-gray-300"
                  autoFocus
                />
              </div>
            </div>
            <Button 
              onClick={handleSendOtp} 
              disabled={phone.length < 10 || isLoading}
              className="w-full py-4 text-base rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Send OTP"}
            </Button>
            <p className="text-xs text-center text-gray-400">
              We'll send a 4-digit code to verify your number.
            </p>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">Enter the code sent to +91 {phone}</p>
              <div className="relative w-full max-w-[240px] mx-auto h-16">
                {/* Real hidden input */}
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-text tracking-[1em]"
                  autoFocus
                />
                {/* Visual Slots */}
                <div className="flex justify-between w-full h-full pointer-events-none">
                  {[0, 1, 2, 3].map((idx) => (
                    <div 
                      key={idx} 
                      className={cx(
                        "w-12 h-16 rounded-xl border-2 flex items-center justify-center text-2xl font-bold bg-gray-50 dark:bg-white/5 transition-all",
                        otp[idx] 
                          ? "border-black dark:border-white text-black dark:text-white" 
                          : "border-gray-200 dark:border-white/10 text-gray-300",
                        // Highlight current slot
                        (otp.length === idx || (otp.length === 4 && idx === 3)) 
                          ? "ring-2 ring-black/20 dark:ring-white/20 border-black dark:border-white" 
                          : ""
                      )}
                    >
                      {otp[idx] || ""}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button 
              onClick={handleVerifyOtp} 
              disabled={otp.length < 4 || isLoading}
              className="w-full py-4 text-base rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Verify & Proceed"}
            </Button>
            <button onClick={() => setStep("phone")} className="w-full text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">
              Change Number
            </button>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">Full Name</label>
              <input 
                type="text" 
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">I am an</label>
              <div className="grid grid-cols-2 gap-3">
                {["End User", "Investor"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setDetails({ ...details, profile: type })}
                    className={cx(
                      "px-4 py-3 rounded-xl border font-medium transition-all text-sm",
                      details.profile === type 
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white" 
                        : "bg-white dark:bg-black text-gray-500 border-gray-200 dark:border-white/10 hover:border-gray-300"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <Button 
              onClick={handleSubmitDetails} 
              disabled={!details.name || !details.email || !details.profile || isLoading}
              className="w-full py-4 mt-2 text-base rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Confirm Schedule"}
            </Button>
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-6">
            <div ref={animationContainer} className="w-32 h-32 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Sent!</h3>
            <p className="text-gray-500 mb-8">
              Our team will contact you shortly to confirm your visit slot.
            </p>
            <Button 
              onClick={onClose}
              className="w-full py-4 text-base rounded-xl bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-bold hover:bg-gray-200 transition-all"
            >
              Done
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const SimilarFlatsModal = ({ isOpen, onClose, currentFlat, pricing, snapshot, currentGrandTotal }: { 
  isOpen: boolean, 
  onClose: () => void, 
  currentFlat: any,
  pricing: any,
  snapshot: any,
  currentGrandTotal: number
}) => {
  // Generate mock alternatives with realistic pricing logic
  const alternatives = useMemo(() => {
    if (!currentFlat || !pricing || !snapshot) return [];
    
    const currentFloor = parseInt(currentFlat.floor) || 1;
    const currentFlatNum = parseInt(currentFlat.flatNumber) || 101;
    const currentFacing = currentFlat.facing;
    const area = snapshot.builtUpArea;
    
    // Cost Drivers
    const FLOOR_RISE_PER_FLOOR_SFT = 20; // ₹20 per sft per floor
    const EAST_FACING_PLC_SFT = 150; // ₹150 per sft for East
    
    // Tax Factor for accurate difference (GST + Stamp + Reg)
    const taxFactor = 1 + ((pricing.gstPercent || 5) + (pricing.stampDutyPercent || 7) + (pricing.registrationPercent || 1)) / 100;

    const getFacingCost = (facing: string) => facing === "East" ? (area * EAST_FACING_PLC_SFT) : 0;
    const getFloorCost = (floor: number) => (floor * area * FLOOR_RISE_PER_FLOOR_SFT);

    const currentFacingCost = getFacingCost(currentFacing);
    const currentFloorCost = getFloorCost(currentFloor);
    
    // Helper to create alt
    const createAlt = (targetFloor: number, flatOffset: number, forceFacing?: string) => {
      const newFloor = targetFloor;
      // If target is same as current, ensure we change something (facing) or skip?
      // User requested specific floors. If same floor, we flip facing to make it a valid alternative.
      const isSameFloor = newFloor === currentFloor;
      const newFacing = forceFacing || (isSameFloor ? (currentFacing === "East" ? "West" : "East") : currentFacing);
      
      const newFlatNum = currentFlatNum + ((newFloor - currentFloor) * 100) + (isSameFloor ? 1 : 0); // Mock flat number change
      
      const newFacingCost = getFacingCost(newFacing);
      const newFloorCost = getFloorCost(newFloor);
      
      const baseDiff = (newFloorCost - currentFloorCost) + (newFacingCost - currentFacingCost);
      const totalDiff = Math.round(baseDiff * taxFactor); // Apply tax to the difference
      
      const total = Math.round(currentGrandTotal + totalDiff);
      
      return {
        id: `alt-${newFloor}-${newFlatNum}`,
        floor: newFloor,
        flatNumber: newFlatNum,
        facing: newFacing,
        bhk: snapshot.bhk,
        totalCost: total,
        diff: totalDiff
      };
    };

    // User requested specific floors: 40, 39, 31
    const specificFloors = [40, 39, 31];
    
    // Filter out current floor if facing is same (handled inside createAlt logic partially, but let's be explicit)
    // Actually, createAlt handles same-floor by flipping facing.
    
    return specificFloors.map((floor, idx) => createAlt(floor, idx));
  }, [currentFlat, pricing, snapshot, currentGrandTotal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
       <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="w-full max-w-md bg-white dark:bg-black rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-white/10"
       >
         <div className="flex justify-between items-center mb-6">
           <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Similar Flats</h3>
            <p className="text-xs text-gray-500 mt-1">Compare prices based on floor & facing</p>
           </div>
           <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-gray-200 transition-colors">
             <X className="w-5 h-5" />
           </button>
         </div>

         <div className="space-y-3">
           {alternatives.map((alt) => {
             const isPositive = alt.diff > 0;
             const diffFormatted = formatIndianCurrency(Math.abs(alt.diff));
             
             return (
               <div key={alt.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white dark:hover:bg-black hover:shadow-lg hover:scale-[1.02] transition-all duration-300 hover:border-black/10 dark:hover:border-white/20">
                  <div>
                     <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-lg">
                       Unit {alt.flatNumber} 
                       <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 bg-white dark:bg-white/10 px-2 py-1 rounded-md border border-gray-200 dark:border-white/5">
                         {alt.floor}th Floor
                       </span>
                     </div>
                     <div className="text-xs font-medium text-gray-500 mt-1 mb-2">{alt.bhk} • {alt.facing} Facing</div>
                     
                     <div className="flex items-center gap-2">
                        <div className="text-sm font-bold text-gray-900 dark:text-white bg-white dark:bg-white/10 px-2 py-1 rounded-lg border border-gray-100 dark:border-white/5 shadow-sm">
                          {formatIndianCurrency(alt.totalCost)}
                        </div>
                     </div>
                  </div>
                  
                  <div className="text-right flex flex-col justify-between h-full gap-4">
                     <div className={cx(
                       "text-xs font-bold px-2 py-1 rounded-full border",
                       isPositive 
                        ? "text-red-600 bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-900/30" 
                        : (alt.diff === 0 ? "text-gray-500 bg-gray-100" : "text-green-600 bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-900/30")
                     )}>
                       {alt.diff === 0 ? "Same Price" : `${isPositive ? '+' : '-'} ${diffFormatted}`}
                     </div>
                     
                     <button className="text-xs font-bold text-black dark:text-white flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                       View <ArrowRight className="w-3 h-3" />
                     </button>
                  </div>
               </div>
             );
           })}
         </div>
       </motion.div>
    </div>
  );
};

const LocalityModal = ({ isOpen, onClose, location }: { isOpen: boolean, onClose: () => void, location: string }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Mock Data for Kollur, Hyderabad
  const places = useMemo(() => [
    { id: 1, name: "Ratnadeep Supermarket", type: "grocery", distance: "1.2 km", rating: 4.5, reviews: 128 },
    { id: 2, name: "The Gaudium School", type: "education", distance: "2.5 km", rating: 4.8, reviews: 85 },
    { id: 3, name: "Citizens Specialty Hospital", type: "health", distance: "8.0 km", rating: 4.2, reviews: 450 },
    { id: 4, name: "Sarath City Capital Mall", type: "fashion", distance: "12 km", rating: 4.7, reviews: 2000 },
    { id: 5, name: "HP Petrol Pump", type: "fuel", distance: "1.5 km", rating: 4.0, reviews: 50 },
    { id: 6, name: "Euro International School", type: "education", distance: "1.8 km", rating: 4.3, reviews: 60 },
    { id: 7, name: "Continental Hospitals", type: "health", distance: "9.5 km", rating: 4.6, reviews: 800 },
    { id: 8, name: "RR Pharmacy", type: "health", distance: "0.8 km", rating: 4.1, reviews: 25 },
    { id: 9, name: "Starbucks Coffee", type: "lifestyle", distance: "10 km", rating: 4.4, reviews: 300 },
    { id: 10, name: "Gachibowli Metro Station", type: "commute", distance: "11 km", rating: 4.2, reviews: 1200 },
    { id: 11, name: "Indian Oil Petrol Bunk", type: "fuel", distance: "2.2 km", rating: 3.9, reviews: 85 },
    { id: 12, name: "Zudio - Kollur", type: "fashion", distance: "3.5 km", rating: 4.3, reviews: 150 },
    { id: 13, name: "Vijetha Supermarket", type: "grocery", distance: "1.0 km", rating: 4.0, reviews: 95 },
    { id: 14, name: "PVR Cinemas", type: "lifestyle", distance: "12 km", rating: 4.6, reviews: 1500 },
  ], []);

  const categories = [
    { id: 'all', label: 'All', icon: Map },
    { id: 'grocery', label: 'Grocery', icon: ShoppingCart },
    { id: 'fashion', label: 'Fashion', icon: ShoppingBag },
    { id: 'fuel', label: 'Petrol Bunks', icon: Fuel },
    { id: 'education', label: 'Education', icon: School },
    { id: 'health', label: 'Health', icon: Hospital },
    { id: 'lifestyle', label: 'Lifestyle', icon: Coffee },
    { id: 'commute', label: 'Commute', icon: Car },
  ];

  const filteredPlaces = activeFilter === 'all' 
    ? places 
    : places.filter(p => p.type === activeFilter);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col sm:justify-center items-center bg-black/60 backdrop-blur-sm sm:p-4">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="w-full max-w-2xl bg-white dark:bg-black h-[92vh] mt-auto sm:mt-0 sm:h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header / Map Area */}
        <div className="relative h-[35%] sm:h-[40%] bg-gray-200 w-full shrink-0">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{ border: 0 }}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            allowFullScreen
          ></iframe>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-black/90 rounded-full shadow-lg hover:scale-105 transition-transform z-10 text-black dark:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span className="text-xs font-bold text-gray-900 dark:text-white">{location}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-black overflow-hidden relative rounded-t-3xl -mt-6 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-100 dark:border-white/10">
          
          <div className="p-4 border-b border-gray-100 dark:border-white/5">
             <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 sm:hidden"></div>
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Explore Neighborhood</h3>
             
             {/* Filters */}
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
               {categories.map(cat => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveFilter(cat.id)}
                   className={cx(
                     "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                     activeFilter === cat.id
                       ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                       : "bg-gray-50 dark:bg-white/5 text-gray-500 border-gray-200 dark:border-white/10 hover:border-gray-300"
                   )}
                 >
                   <cat.icon className="w-3 h-3" />
                   {cat.label}
                 </button>
               ))}
             </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
             {filteredPlaces.map(place => (
               <div key={place.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 flex items-center justify-center border border-gray-100 dark:border-white/5 shadow-sm">
                        {place.type === 'grocery' && <ShoppingCart className="w-5 h-5 text-blue-500" />}
                        {place.type === 'fashion' && <ShoppingBag className="w-5 h-5 text-pink-500" />}
                        {place.type === 'fuel' && <Fuel className="w-5 h-5 text-orange-500" />}
                        {place.type === 'education' && <School className="w-5 h-5 text-indigo-500" />}
                        {place.type === 'health' && <Hospital className="w-5 h-5 text-red-500" />}
                        {place.type === 'lifestyle' && <Coffee className="w-5 h-5 text-amber-500" />}
                        {place.type === 'commute' && <Car className="w-5 h-5 text-green-500" />}
                     </div>
                     <div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{place.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                           <span className="flex items-center gap-0.5 text-[10px] font-bold text-gray-900 dark:text-white bg-green-100 dark:bg-green-900/30 px-1 rounded">
                             {place.rating} <Star className="w-2 h-2 fill-current" />
                           </span>
                           <span className="text-[10px] text-gray-400">({place.reviews})</span>
                           <span className="text-[10px] text-gray-300">•</span>
                           <span className="text-[10px] font-medium text-gray-500">{place.distance}</span>
                        </div>
                     </div>
                  </div>
                  
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name + " " + location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-xs font-bold"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Directions
                  </a>
               </div>
             ))}
             
             {filteredPlaces.length === 0 && (
               <div className="text-center py-8 text-gray-400 text-sm">
                 No places found in this category.
               </div>
             )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function FlatDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [activeView, setActiveView] = useState<"plan" | "video">("plan");
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const [isPlanFullscreen, setIsPlanFullscreen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [isAlternativesOpen, setIsAlternativesOpen] = useState(false);
  const [isLocalityOpen, setIsLocalityOpen] = useState(false);
  
  // --- Dynamic Data Generation ---
  const propertyData = useMemo(() => {
    const flatIdStr = Array.isArray(params.flatId) ? params.flatId[0] : params.flatId;
    const floorIdStr = Array.isArray(params.floorId) ? params.floorId[0] : params.floorId;
    const towerIdStr = Array.isArray(params.towerId) ? params.towerId[0] : params.towerId;

    // Simple deterministic logic based on flat number for demo purposes
    const flatNum = parseInt(flatIdStr?.replace(/\D/g, '') || "0") || 101;
    const isEast = flatNum % 2 !== 0; // Odd flats are East facing
    const bhkType = flatNum % 3 === 0 ? "4BHK" : (flatNum % 2 === 0 ? "2BHK" : "3BHK + Study");
    
    // Areas based on BHK
    const areas = {
      "2BHK": { carpet: 1250, builtUp: 1650 },
      "3BHK + Study": { carpet: 1850, builtUp: 2450 },
      "4BHK": { carpet: 2400, builtUp: 3200 }
    };
    const area = areas[bhkType as keyof typeof areas] || areas["3BHK + Study"];

    return {
      identity: {
        projectName: "Signature Altius",
        builderName: "Signature Global",
        location: "Kollur, Hyderabad",
        reraId: "HRERA-PKL-GGM-2024",
        status: "Under Construction",
        tower: `Tower ${towerIdStr?.replace('tower-', '') || 'A'}`,
        floor: floorIdStr,
        flatNumber: flatIdStr,
        facing: isEast ? "East" : "West"
      },
      snapshot: {
        bhk: bhkType,
        carpetArea: area.carpet,
        builtUpArea: area.builtUp,
        facing: isEast ? "East" : "West",
        planType: `Type ${String.fromCharCode(65 + (flatNum % 3))}` // Type A, B, C
      },
      floorPlan: {
        image: "/floorplan.png",
      },
      towerContext: {
        totalFloors: 40,
        flatsPerFloor: 8,
        liftCount: 4,
        distanceToLift: "15m",
        fireExitProximity: "Adjacent"
      },
      pricing: {
        ratePerSft: 12500, // Higher rate for Gurgaon premium project
        floorRisePerSft: 50,
        plcPerSft: isEast ? 200 : 0, // Charge for East facing
        amenities: 750000,
        carParking: 400000,
        corpusFundPerSft: 200,
        maintenancePerSft: 4.5,
        maintenanceMonths: 24,
        gstPercent: 5,
        stampDutyPercent: 7, // Haryana stamp duty is around 7-8%
        registrationPercent: 1,
        legalCharges: 35000
      },
      payment: {
        plan: "Construction Linked Plan (CLP)",
        downPayment: 10,
        emiEstimate: 125000,
        banks: ["HDFC", "SBI", "ICICI", "Axis"]
      },
      possession: {
        date: "Dec 2026",
        gracePeriod: "6 Months",
        stage: "Structure Complete",
        lastUpdate: "2 days ago"
      },
      amenities: {
        lifestyle: ["Clubhouse", "Infinity Pool", "Gym", "Mini Theatre"],
        family: ["Kids Play Area", "Senior Citizen Zone", "Creche"],
        safety: ["24/7 CCTV", "Biometric Access", "Fire Safety"],
        utilities: ["100% Power Backup", "Water Treatment Plant"]
      },
      locality: {
        schools: "2 km (Euro International)",
        hospitals: "3 km (Park Hospital)",
        offices: "5 km (Cyber City)",
        metro: "1 km (Dwarka Expressway)"
      },
      legal: {
        reraStatus: "Approved",
        landTitle: "Freehold",
        approvals: ["DTCP", "Fire", "Airport Authority"]
      },
      maintenance: {
        monthly: 4.5,
        powerBackup: "At Actuals",
        waterCharges: "Metered",
        handover: "After 80% Occupancy"
      }
    };
  }, [params]);

  const { 
    identity, snapshot, floorPlan, towerContext, pricing, 
    payment, possession, amenities, locality, legal, maintenance 
  } = propertyData;

  const handleDownloadPlan = () => {
    const link = document.createElement('a');
    link.href = floorPlan.image;
    link.download = `${identity.projectName}-Flat-${identity.flatNumber}-FloorPlan.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Pricing Logic ---
  const saleableArea = snapshot.builtUpArea; // Using built-up as saleable for calculation
  
  // 1. Base Cost
  const basePrice = saleableArea * pricing.ratePerSft;
  const floorRiseCost = saleableArea * pricing.floorRisePerSft;
  const plcCost = saleableArea * pricing.plcPerSft;
  const agreementValue = basePrice + floorRiseCost + plcCost + pricing.carParking;

  // 2. Additional Charges
  const corpusFund = saleableArea * pricing.corpusFundPerSft;
  const maintenanceAdvance = saleableArea * pricing.maintenancePerSft * pricing.maintenanceMonths;
  const totalAdditional = pricing.amenities + corpusFund + maintenanceAdvance + pricing.legalCharges;

  // 3. Govt Charges (Estimated on Agreement Value + Amenities usually, simplifying to Agreement Value)
  const gst = agreementValue * (pricing.gstPercent / 100);
  const stampDuty = agreementValue * (pricing.stampDutyPercent / 100);
  const registration = agreementValue * (pricing.registrationPercent / 100);
  const totalGovt = gst + stampDuty + registration;

  const grandTotal = agreementValue + totalAdditional + totalGovt;

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-32">
      {/* 1. Simplified Header (Sticky) */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold leading-tight">{identity.projectName}</h1>
              <div className="text-xs text-gray-500">{identity.location}</div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto">
        
        {/* 2. Hero Section: Floor Plan & Video (First & Prominent) */}
        <div className="relative bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
           <div className="aspect-[4/3] w-full relative group bg-gray-200 dark:bg-gray-900 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeView === 'plan' ? (
                  <motion.img 
                    key="plan"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={floorPlan.image} 
                    alt="Floor Plan" 
                    className="w-full h-full object-contain p-8" 
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <motion.video 
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src="https://oneinflu.b-cdn.net/3ddd.mp4" 
                      className="w-full h-full object-cover"
                      controls={false}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <button 
                      onClick={() => setIsVideoFullscreen(true)}
                      className="absolute bottom-6 right-6 p-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white/90 hover:text-white transition-all z-10"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </AnimatePresence>

              {/* Fullscreen Video Overlay */}
              <AnimatePresence>
                {isVideoFullscreen && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                  >
                    <button 
                      onClick={() => setIsVideoFullscreen(false)}
                      className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    
                    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12">
                      <video 
                        src="https://oneinflu.b-cdn.net/3ddd.mp4" 
                        className="w-full h-full max-h-[90vh] object-contain sm:object-contain landscape:w-full portrait:h-full portrait:w-full portrait:object-contain"
                        controls
                        controlsList="nodownload"
                         disablePictureInPicture
                         onContextMenu={(e) => e.preventDefault()}
                         autoPlay
                         muted={false}
                        loop
                        playsInline
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* View Toggle */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex bg-black/50 backdrop-blur-xl rounded-full p-1.5 border border-white/10 z-20 shadow-2xl">
                <button 
                  onClick={() => setActiveView('plan')} 
                  title="Floor Plan"
                  className={cx(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-all", 
                    activeView === 'plan' ? "bg-white text-black shadow-lg scale-105" : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setActiveView('video')} 
                  title="Model Flat"
                  className={cx(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-all", 
                    activeView === 'video' ? "bg-white text-black shadow-lg scale-105" : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Play className="w-5 h-5" />
                </button>
              </div>

              {/* Floating Actions (Only show for Plan) */}
              {activeView === 'plan' && (
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <button 
                    onClick={() => setIsPlanFullscreen(true)}
                    className="p-2 bg-white/90 dark:bg-black/90 rounded-full shadow-sm hover:scale-110 transition-transform" 
                    title="Zoom"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleDownloadPlan}
                    className="p-2 bg-white/90 dark:bg-black/90 rounded-full shadow-sm hover:scale-110 transition-transform" 
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Unit Badge (Only show for Plan to avoid cluttering video) */}
              {activeView === 'plan' && (
                <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg backdrop-blur-sm z-10">
                   Unit {identity.flatNumber}
                </div>
              )}
           </div>

           {/* Fullscreen Video Overlay */}
           <AnimatePresence>
                {isVideoFullscreen && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                  >
                     <button 
                        onClick={() => setIsVideoFullscreen(false)}
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                     >
                        <X className="w-6 h-6" />
                     </button>
                     <video 
                        src="https://oneinflu.b-cdn.net/3ddd.mp4" 
                        className="w-full max-h-[90vh] object-contain"
                        controls={false}
                        autoPlay
                        muted={false}
                        loop
                        playsInline
                        controlsList="nodownload"
                        disablePictureInPicture
                        onContextMenu={(e) => e.preventDefault()}
                     />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fullscreen Plan Overlay */}
              <AnimatePresence>
                {isPlanFullscreen && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-white dark:bg-black flex items-center justify-center p-4"
                  >
                     <button 
                        onClick={() => setIsPlanFullscreen(false)}
                        className="absolute top-6 right-6 p-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full text-black dark:text-white transition-colors z-50"
                     >
                        <X className="w-6 h-6" />
                     </button>
                     
                     <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
                        <img 
                          src={floorPlan.image} 
                          alt="Floor Plan Fullscreen" 
                          className="max-w-full max-h-full object-contain"
                        />
                        
                        {/* Download in Fullscreen */}
                        <button 
                          onClick={handleDownloadPlan}
                          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full shadow-xl hover:scale-105 transition-transform"
                        >
                          <Download className="w-4 h-4" />
                          <span className="font-bold">Download Plan</span>
                        </button>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>

           {/* Quick Stats Overlay (Bottom Sheet Style) */}
           <div className="bg-white dark:bg-black -mt-6 rounded-t-3xl relative px-4 pt-6 pb-2">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{snapshot.bhk}</h2>
                    <div className="text-gray-500 text-sm mt-1">{identity.tower} • {snapshot.facing} Facing • Floor {identity.floor}</div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Total Price</div>
                    <div className="text-2xl font-bold text-black dark:text-white tracking-tight">{formatIndianCurrency(grandTotal)}</div>
                 </div>
              </div>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                 {[
                   { label: "Carpet", value: `${snapshot.carpetArea} sft` },
                   { label: "Built-up", value: `${snapshot.builtUpArea} sft` },
                   { label: "Type", value: snapshot.planType },
                   { label: "Status", value: identity.status },
                 ].map((stat, i) => (
                   <div key={i} className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl text-center">
                      <div className="text-[10px] text-gray-500 uppercase font-medium mb-1">{stat.label}</div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white truncate">{stat.value}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="px-4">

            {/* Price Trend Highlight */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-500/20 flex items-center justify-between shadow-sm">
              <div>
                 <div className="text-[10px] text-amber-800 dark:text-amber-200 uppercase font-bold tracking-wider mb-0.5">Effective Price</div>
                 <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatIndianCurrency(Math.round(grandTotal / snapshot.builtUpArea))}<span className="text-sm font-medium text-gray-500 ml-1">/sft</span>
                 </div>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-white/10 px-3 py-1.5 rounded-lg shadow-sm border border-white/50 dark:border-white/5">
                 <div className="p-1.5 bg-green-100 dark:bg-green-500/20 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                 </div>
                 <div>
                    <div className="text-[10px] text-gray-400 font-medium leading-none mb-0.5">Appreciation</div>
                    <div className="text-xs font-bold text-green-600 dark:text-green-400 leading-tight">
                       +12.5% <span className="text-[10px] text-gray-400 font-normal">in 1 yr</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* 3. Detailed Pricing (Expandable) */}
            <Section title="Cost Breakdown" className="pt-2">
               <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-4 border border-blue-100 dark:border-blue-900/30">
                  <div className="space-y-1 mb-4">
                      <DetailRow 
                        label="Base Price" 
                        value={formatIndianCurrency(basePrice)} 
                        subtext={`₹${pricing.ratePerSft}/sft × ${saleableArea} sft`}
                        infoText="Basic cost of the apartment based on super built-up area."
                      />
                      <DetailRow 
                        label="Floor Rise" 
                        value={formatIndianCurrency(floorRiseCost)} 
                        subtext={`₹${pricing.floorRisePerSft}/sft`}
                        infoText="Premium charged for higher floors (usually starts from 5th floor)."
                      />
                      <DetailRow 
                        label="PLC (Facing)" 
                        value={formatIndianCurrency(plcCost)} 
                        subtext={`₹${pricing.plcPerSft}/sft`}
                        infoText="Preferential Location Charge for premium views or facing (e.g., East/Corner)."
                      />
                      <DetailRow 
                        label="Car Parking" 
                        value={formatIndianCurrency(pricing.carParking)} 
                        infoText="Charges for 1 covered car parking slot."
                      />
                      <DetailRow 
                        label="Amenities" 
                        value={formatIndianCurrency(pricing.amenities)} 
                        infoText="Clubhouse, gym, pool, and common infrastructure charges."
                      />
                      
                      <div className="border-t border-dashed border-gray-200 dark:border-white/10 my-4"></div>
                      
                      <DetailRow 
                        label="Corpus Fund" 
                        value={formatIndianCurrency(corpusFund)}
                        subtext={`₹${pricing.corpusFundPerSft}/sft`}
                        infoText="One-time contribution to the society's long-term maintenance fund."
                      />
                      <DetailRow 
                        label="Maintenance Advance" 
                        value={formatIndianCurrency(maintenanceAdvance)}
                        subtext={`₹${pricing.maintenancePerSft}/sft × ${pricing.maintenanceMonths} months`}
                        infoText={`Advance maintenance collected for first ${pricing.maintenanceMonths} months.`}
                      />
                      
                      <div className="border-t border-dashed border-gray-200 dark:border-white/10 my-4"></div>
                      
                      <DetailRow 
                        label="GST" 
                        value={formatIndianCurrency(gst)}
                        subtext={`${pricing.gstPercent}%`}
                        infoText="Goods & Services Tax applicable on under-construction properties."
                      />
                       <DetailRow 
                        label="Stamp Duty & Reg" 
                        value={formatIndianCurrency(stampDuty + registration)}
                        subtext={`${pricing.stampDutyPercent + pricing.registrationPercent}% (Approx)`}
                        infoText={`Stamp Duty (${pricing.stampDutyPercent}%) + Registration (${pricing.registrationPercent}%) calculated on agreement value.`}
                      />
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                     <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">Grand Total</span>
                     <span className="font-bold text-2xl text-black dark:text-white tracking-tight">{formatIndianCurrency(grandTotal)}</span>
                   </div>
                   <p className="text-[10px] text-gray-500 mt-2 text-center">Excludes legal charges ({formatIndianCurrency(pricing.legalCharges)}). Final amount subject to statutory changes.</p>
                </div>
            </Section>

            {/* 4. Tower & Floor Context */}
            <Section title="Tower Context">
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                     <div className="text-xs text-gray-500 mb-1">Floor Density</div>
                     <div className="flex items-center gap-2 font-semibold">
                        <Users className="w-4 h-4 text-blue-500" />
                        {towerContext.flatsPerFloor} Flats / Floor
                     </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                     <div className="text-xs text-gray-500 mb-1">Elevators</div>
                     <div className="flex items-center gap-2 font-semibold">
                        <ArrowUpFromLine className="w-4 h-4 text-blue-500" />
                        {towerContext.liftCount} Lifts
                     </div>
                  </div>
               </div>
            </Section>

            {/* 5. Payment & Loan Options */}
            <Section title="Payment & Loan Options">
               <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-white/10">
                     <div className="text-sm font-medium text-gray-500">Payment Plan</div>
                     <div className="font-bold text-gray-900 dark:text-white text-right">{payment.plan}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                     <div className="p-3 bg-white dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Booking Amount</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{payment.downPayment}%</div>
                        <div className="text-[10px] text-gray-400">of Total Value</div>
                     </div>
                     <div className="p-3 bg-white dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Est. EMI</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{formatIndianCurrency(payment.emiEstimate)}</div>
                        <div className="text-[10px] text-gray-400">for 20 yrs @ 8.5%</div>
                     </div>
                  </div>

                  <div className="pt-1">
                     <div className="text-xs text-gray-500 mb-2">Bank Tie-ups</div>
                     <div className="flex flex-wrap gap-2">
                        {payment.banks.map(bank => (
                           <span key={bank} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-lg text-xs font-bold text-blue-700 dark:text-blue-300">
                              {bank}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </Section>

            {/* 6. Possession & Timeline */}
            <Section title="Possession & Timeline">
               <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30 flex items-center justify-between">
                     <div>
                        <div className="text-xs text-green-700 dark:text-green-400 font-bold uppercase tracking-wider mb-1">Expected Possession</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{possession.date}</div>
                        <div className="text-[10px] text-green-600 dark:text-green-500 mt-0.5">Grace Period: {possession.gracePeriod}</div>
                     </div>
                     <Calendar className="w-8 h-8 text-green-500/20" />
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                     <div className="text-xs text-gray-500 mb-1">Current Stage</div>
                     <div className="font-bold text-sm">{possession.stage}</div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                     <div className="text-xs text-gray-500 mb-1">Last Update</div>
                     <div className="font-bold text-sm">{possession.lastUpdate}</div>
                  </div>
               </div>
            </Section>

            {/* 7. Locality & Connectivity */}
            <Section title="Locality & Connectivity">
               <div className="space-y-4">
                  {/* Map Preview Placeholder */}
                  <div 
                     onClick={() => setIsLocalityOpen(true)}
                     className="w-full h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden relative group cursor-pointer hover:opacity-90 transition-all"
                  >
                     <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(identity.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        className="w-full h-full object-cover pointer-events-none"
                        tabIndex={-1}
                     ></iframe>
                     <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div className="bg-white/90 dark:bg-black/90 px-4 py-2 rounded-full text-xs font-bold shadow-sm flex items-center gap-2 group-hover:scale-105 transition-transform">
                           <MapPin className="w-3.5 h-3.5 text-red-500" />
                           View on Map
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                     <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                           <School className="w-4 h-4 text-blue-500" />
                           <span className="text-xs font-bold text-gray-500">Schools</span>
                        </div>
                        <div className="text-sm font-semibold">{locality.schools}</div>
                     </div>
                     <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                           <Hospital className="w-4 h-4 text-red-500" />
                           <span className="text-xs font-bold text-gray-500">Hospitals</span>
                        </div>
                        <div className="text-sm font-semibold">{locality.hospitals}</div>
                     </div>
                     <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                           <Briefcase className="w-4 h-4 text-amber-500" />
                           <span className="text-xs font-bold text-gray-500">Offices</span>
                        </div>
                        <div className="text-sm font-semibold">{locality.offices}</div>
                     </div>
                     <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                           <Train className="w-4 h-4 text-purple-500" />
                           <span className="text-xs font-bold text-gray-500">Metro</span>
                        </div>
                        <div className="text-sm font-semibold">{locality.metro}</div>
                     </div>
                  </div>
               </div>
            </Section>

            {/* 8. Maintenance & Living Costs */}
            <Section title="Maintenance & Living Costs">
               <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/5">
                  <div className="flex items-center justify-between mb-4">
                     <div>
                        <div className="text-xs text-gray-500 mb-0.5">Est. Monthly Maintenance</div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                           {formatIndianCurrency(maintenance.monthly * snapshot.builtUpArea)}<span className="text-sm font-normal text-gray-500">/mo</span>
                        </div>
                        <div className="text-[10px] text-gray-400">@ ₹{maintenance.monthly}/sft</div>
                     </div>
                     <div className="p-3 bg-white dark:bg-black rounded-full shadow-sm">
                        <Droplets className="w-5 h-5 text-blue-500" />
                     </div>
                  </div>
                  
                  <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-white/10">
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Power Backup</span>
                        <span className="font-medium">{maintenance.powerBackup}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Water Charges</span>
                        <span className="font-medium">{maintenance.waterCharges}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Handover</span>
                        <span className="font-medium text-right max-w-[50%]">{maintenance.handover}</span>
                     </div>
                  </div>
               </div>
            </Section>

            {/* 9. Comparison Shortcut */}
            <div className="mt-8 mb-4 p-4 bg-gradient-to-r from-gray-900 to-black rounded-2xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
               <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-1">Compare Similar Flats</h3>
                  <p className="text-sm text-gray-400 mb-4">See other {snapshot.bhk} units on different floors or facings.</p>
                  <button 
                     onClick={() => setIsAlternativesOpen(true)}
                     className="w-full py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors"
                  >
                     View Alternatives
                  </button>
               </div>
            </div>

            {/* 10. Other Details (Collapsed) */}
            <Accordion title="Amenities List" icon={Dumbbell}>
               <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold mb-2">Lifestyle</h4>
                    <div className="flex flex-wrap gap-2">
                       {amenities.lifestyle.map(item => (
                         <span key={item} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-white/10 rounded-md">
                           {item}
                         </span>
                       ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-2">Family & Kids</h4>
                    <div className="flex flex-wrap gap-2">
                       {amenities.family.map(item => (
                         <span key={item} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-white/10 rounded-md">
                           {item}
                         </span>
                       ))}
                    </div>
                  </div>
               </div>
            </Accordion>

            <Accordion title="Legal & Maintenance" icon={FileText}>
               <div className="space-y-2">
                  <DetailRow label="RERA ID" value={identity.reraId} />
                  <DetailRow label="Land Title" value={legal.landTitle} />
                  <DetailRow label="Maintenance" value={`₹${maintenance.monthly}/sft`} />
               </div>
            </Accordion>

            {/* Footer Info */}
            <div className="py-8 text-center text-xs text-gray-400">
               <p>Powered by INFLU</p>
               <p className="mt-1">RERA: {identity.reraId}</p>
            </div>
        </div>
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 z-40">
         <div className="max-w-3xl mx-auto">
            <Button 
              onClick={() => setIsVisitModalOpen(true)}
              className="w-full py-4 text-lg font-bold shadow-2xl bg-black dark:bg-white text-white dark:text-black hover:scale-[1.01] active:scale-[0.99] transition-all rounded-2xl"
            >
               Schedule Site Visit
            </Button>
         </div>
      </div>
      
      <ScheduleVisitModal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)} />
      <SimilarFlatsModal 
        isOpen={isAlternativesOpen} 
        onClose={() => setIsAlternativesOpen(false)} 
        currentFlat={identity}
        pricing={pricing}
        snapshot={snapshot}
        currentGrandTotal={grandTotal}
      />
      <LocalityModal 
        isOpen={isLocalityOpen} 
        onClose={() => setIsLocalityOpen(false)} 
        location={identity.location} 
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { api } from "@/utils/api";
import { Button, styles as buttonStyles } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";
import { Calendar, Building02, ArrowRight } from "@untitledui/icons";
import { Application } from "./components/ApplicationDetailsModal";


export default function MyApplicationsPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!token) return;
        const res = await api.get<{ success: boolean; status: string; data: { applications: Application[] } }>("/events/my-applications", { token });
        if (res.success && res.data?.applications) {
          setApplications(res.data.applications);
        }
      } catch (e) {
        console.error("Failed to fetch applications", e);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const filteredApps = applications.filter(app => {
    if (filter === "All") return true;
    const status = app.application.status.toLowerCase();
    
    if (filter === "Applied") return status === "pending" || status === "applied";
    if (filter === "Shortlisted") return status === "shortlisted";
    if (filter === "Invited") return status === "invited" || status === "accepted";
    
    return status === filter.toLowerCase();
  });

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen lg:pl-[300px] bg-secondary">
       <div className="px-4 md:px-8 pt-6 pb-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-display-sm font-semibold text-primary">My Applications</h1>
              <p className="text-md text-tertiary">Track your event applications and status</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {["All", "Applied", "Shortlisted", "Invited"].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={cx(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                    filter === status 
                      ? "bg-purple-600 text-white border-purple-600" 
                      : "bg-white text-secondary border-gray-200 hover:bg-gray-50"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 pb-12">
        <div className="w-full max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 rounded-2xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-tertiary">No applications found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app, index) => {
                // Try multiple paths to find the ID, fallback to inviteCode if ID is missing
                const appId = app.application.id || 
                             app.application._id || 
                             (app as any)._id || 
                             (app as any).id || 
                             (app as any).applicationId ||
                             (app.application as any).applicationId ||
                             (app.application as any).application_id ||
                             app.application.inviteCode; // Fallback to inviteCode
                
                return (
                  <Link 
                    key={index} 
                    href={appId ? `/admin/my-applications/${appId}` : "#"}
                    onClick={(e) => {
                        if (!appId) {
                            e.preventDefault();
                            console.error("Application ID not found", app);
                        }
                    }}
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md p-5 cursor-pointer"
                  >
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{app.event.eventName}</h3>
                          <div className="flex items-center gap-2 text-sm font-medium text-brand-600 mt-1">
                            <Building02 className="size-4" />
                            <span>{app.event.brandName}</span>
                          </div>
                        </div>
                        <Badge type="pill-color" size="md" color={getStatusColor(app.application.status)}>
                          {app.application.status}
                        </Badge>
                     </div>
                     
                     <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="text-gray-500">Status</span>
                          <span className="font-medium capitalize">{app.application.status}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="text-gray-500">Applied on</span>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-gray-400" />
                            <span className="font-medium">{formatDate(app.application.appliedAt)}</span>
                          </div>
                        </div>
                     </div>

                     {/* Hover Overlay */}
                     <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          <Button 
                              color="primary" 
                              size="md" 
                              className="shadow-xl ring-2 ring-white" 
                              iconTrailing={ArrowRight}
                              onClick={(e: any) => {
                                   e.preventDefault();
                                   e.stopPropagation();
                                  if (appId) {
                                      router.push(`/admin/my-applications/${appId}`);
                                  }
                              }}
                          >
                              View Details
                          </Button>
                        </div>
                     </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string): "success" | "warning" | "error" | "gray" | "brand" | "blue" | "indigo" | "purple" | "pink" | "orange" {
  switch (status.toLowerCase()) {
    case 'invited': return 'success';
    case 'accepted': return 'success';
    case 'pending': return 'warning';
    case 'rejected': return 'error';
    case 'declined': return 'error';
    default: return 'gray';
  }
}

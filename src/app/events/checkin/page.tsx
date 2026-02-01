import { Suspense } from "react";
import { Metadata } from "next";
import CheckinClient from "./checkin-client";

export const metadata: Metadata = {
  title: "Event Check-in | INFLU",
  description: "Verify your event invitation",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CheckinClient />
    </Suspense>
  );
}

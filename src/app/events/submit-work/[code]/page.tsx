import { Suspense } from "react";
import { Metadata } from "next";
import SubmitWorkClient from "./submit-work-client";

export const metadata: Metadata = {
  title: "Submit Work | Influu",
  description: "Submit your content links for the event",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SubmitWorkClient />
    </Suspense>
  );
}

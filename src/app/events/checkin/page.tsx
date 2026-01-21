import { Metadata } from "next";
import CheckinClient from "./checkin-client";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({ 
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Event Check-in | Influu",
  description: "Verify your event invitation",
};

export default function Page() {
  return <CheckinClient fontClassName={greatVibes.className} />;
}

import { CreatorsHero } from "@/components/marketing/creators-hero";
import { CreatorChat } from "@/components/marketing/creator-chat";
import { CreatorFeatures } from "@/components/marketing/creator-features";


export default function CreatorsPage() {
    return (
        <main className="min-h-screen pt-0 pb-20">
            <CreatorsHero />
            <CreatorChat />
            <CreatorFeatures />
         
        </main>
    );
}

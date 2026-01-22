import { CreatorsHero } from "@/components/marketing/creators-hero";
import { CreatorChat } from "@/components/marketing/creator-chat";
import { CreatorFeatures } from "@/components/marketing/creator-features";


export default function CreatorsPage() {
    return (
        <main className="min-h-screen ">
            <CreatorsHero />
            <CreatorChat />
            <CreatorFeatures />
         
        </main>
    );
}


import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
    let url: string | null = null;
    try {
        const body = await req.json();
        url = body.url;
    } catch (e) {
        return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }

    if (!url) {
        return NextResponse.json({ success: false, error: "URL is required" }, { status: 400 });
    }

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
                "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": '"macOS"',
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Upgrade-Insecure-Requests": "1"
            }
        });

        if (!response.ok) {
            return NextResponse.json({ success: false, error: "Failed to fetch URL" }, { status: response.status });
        }

        const html = await response.text();
        const resolvedUrl = response.url;
        const domain = new URL(resolvedUrl).hostname;
        const $ = cheerio.load(html);

        const getMeta = (name: string) => 
            $(`meta[property="${name}"]`).attr("content") || 
            $(`meta[name="${name}"]`).attr("content");

        let title = getMeta("og:title") || getMeta("twitter:title") || $("title").text();
        let image = getMeta("og:image") || getMeta("twitter:image");
        let description = getMeta("og:description") || getMeta("twitter:description") || getMeta("description");

        // Schema.org fallback
        if (!image) {
            $("script[type='application/ld+json']").each((i, el) => {
                try {
                    const json = JSON.parse($(el).html() || "{}");
                    const data = Array.isArray(json) ? json.find(item => item["@type"] === "Product") : (json["@type"] === "Product" ? json : null);
                    
                    if (data) {
                        if (!title) title = data.name;
                        if (!image) image = Array.isArray(data.image) ? data.image[0] : data.image;
                        if (!description) description = data.description;
                    }
                } catch (e) {}
            });
        }

        // Domain specific image logic (Amazon/Flipkart high-res)
        if (domain.includes("amazon")) {
            const amznTitle = $("#productTitle").text().trim();
            if (amznTitle) title = amznTitle;

            const dynamicImage = $("#landingImage").attr("data-a-dynamic-image") || 
                               $("#imgBlkFront").attr("data-a-dynamic-image");
            if (dynamicImage) {
                try {
                    const images = JSON.parse(dynamicImage);
                    const largestImage = Object.keys(images)[0]; 
                    if (largestImage) image = largestImage;
                } catch (e) {}
            }
            if (!image) {
                image = $("#landingImage").attr("src") || $("#imgBlkFront").attr("src");
            }
        } else if (domain.includes("flipkart")) {
            const fkTitle = $("span.B_NuCI").text().trim() || $(".VU-ZEz").text().trim();
            if (fkTitle) title = fkTitle;
            
            if (!image || image.includes("flipkart.com/image")) {
                 const fkImg = $("img._396cs4").first().attr("src") || $(".DByuf4").first().attr("src");
                 if (fkImg) image = fkImg;
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                url: resolvedUrl,
                title: title?.trim() || "",
                description: description?.trim() || "",
                imageUrl: image || "",
                price: "" // Explicitly returning empty price as requested
            }
        });

    } catch (error) {
        console.error("Metadata fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch metadata" }, { status: 500 });
    }
}

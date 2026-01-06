import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
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
            return NextResponse.json({ error: "Failed to fetch URL" }, { status: response.status });
        }

        const html = await response.text();
        // Use resolved URL for domain specific logic (handles short links)
        const resolvedUrl = response.url;
        const domain = new URL(resolvedUrl).hostname;
        const $ = cheerio.load(html);

        const getMeta = (name: string) => 
            $(`meta[property="${name}"]`).attr("content") || 
            $(`meta[name="${name}"]`).attr("content");

        let title = getMeta("og:title") || getMeta("twitter:title") || $("title").text();
        let image = getMeta("og:image") || getMeta("twitter:image");
        let description = getMeta("og:description") || getMeta("twitter:description") || getMeta("description");
        let price: string | null | undefined = getMeta("product:price:amount") || getMeta("price");
        let currency = getMeta("product:price:currency") || getMeta("currency") || "INR";

        // Try to find Schema.org Product data (JSON-LD)
        // This is a common standard for e-commerce sites
        if (!price || !image) {
            $("script[type='application/ld+json']").each((i, el) => {
                try {
                    const json = JSON.parse($(el).html() || "{}");
                    // Handle single object or array of objects
                    const data = Array.isArray(json) ? json.find(item => item["@type"] === "Product") : (json["@type"] === "Product" ? json : null);
                    
                    if (data) {
                        if (!title) title = data.name;
                        if (!image) image = Array.isArray(data.image) ? data.image[0] : data.image;
                        if (!description) description = data.description;
                        
                        // Price in offers
                        if (!price && data.offers) {
                             const offer = Array.isArray(data.offers) ? data.offers[0] : data.offers;
                             if (offer) {
                                 if (offer.price) price = offer.price.toString();
                                 if (offer.priceCurrency) currency = offer.priceCurrency;
                             }
                        }
                    }
                } catch (e) {}
            });
        }

        // Domain specific logic


        if (domain.includes("amazon")) {
            // Amazon Title
            const amznTitle = $("#productTitle").text().trim();
            if (amznTitle) title = amznTitle;

            // Amazon Image
            // Try to get high-res image from data-a-dynamic-image
            const dynamicImage = $("#landingImage").attr("data-a-dynamic-image") || 
                               $("#imgBlkFront").attr("data-a-dynamic-image");
            if (dynamicImage) {
                try {
                    const images = JSON.parse(dynamicImage);
                    // Get the largest image key (URL)
                    const largestImage = Object.keys(images)[0]; 
                    if (largestImage) image = largestImage;
                } catch (e) {}
            }
            
            if (!image) {
                image = $("#landingImage").attr("src") || $("#imgBlkFront").attr("src");
            }

            // Amazon Price
            const priceWhole = $(".a-price-whole").first().text().replace(/[^0-9.]/g, "");
            if (priceWhole) {
                price = priceWhole;
            } else {
                 const priceBlock = $("#priceblock_ourprice").text() || $("#priceblock_dealprice").text();
                 if (priceBlock) price = priceBlock.replace(/[^0-9.]/g, "");
            }
        } else if (domain.includes("flipkart")) {
            // Flipkart Title
            const fkTitle = $("span.B_NuCI").text().trim() || $(".VU-ZEz").text().trim();
            if (fkTitle) title = fkTitle;

            // Flipkart Price
            const fkPrice = $("div._30jeq3").first().text() || 
                          $(".Nx9bqj").first().text() || 
                          $(".hZ3P6w").first().text() ||
                          $(".cqIxEP").first().text();
            if (fkPrice) price = fkPrice.replace(/[^0-9.]/g, "");

            // Flipkart Image
            // Sometimes Flipkart uses og:image correctly, but sometimes it needs specific classes
            // Checking for specific image container if og:image is generic
            if (!image || image.includes("flipkart.com/image")) {
                 const fkImg = $("img._396cs4").first().attr("src") || $(".DByuf4").first().attr("src");
                 if (fkImg) image = fkImg;
            }
        } else if (domain.includes("meesho")) {
             // Meesho Title
             const mTitle = $("h1").first().text().trim();
             if (mTitle) title = mTitle;

             // Meesho Price
             const mPrice = $("h4").filter((i, el) => $(el).text().includes("₹")).first().text();
             if (mPrice) price = mPrice.replace(/[^0-9.]/g, "");
        }

        // Fallback for price if still null
        if (!price) {
            // Check for JSON embedded price "price": 12.34 or \"price\": 12.34
            // Also check for "price": "12.34"
            const jsonPriceMatch = html.match(/\\"price\\":\s*"?([\d.]+)"?/) || html.match(/"price":\s*"?([\d.]+)"?/);
            
            if (jsonPriceMatch && jsonPriceMatch[1]) {
                 const p = parseFloat(jsonPriceMatch[1]);
                 if (p > 0) {
                     price = p.toString();
                     
                     // Infer currency if defaulting to INR
                     if (currency === "INR") {
                         const text = $("body").text();
                         const dollarCount = (text.match(/\$/g) || []).length;
                         const rupeeCount = (text.match(/₹/g) || []).length;
                         if (dollarCount > rupeeCount) {
                             currency = "USD";
                         }
                     }
                 }
            } else {
                // Try to find something that looks like a price near the title or buy button
                // This is a heuristic
                const text = $("body").text();
                // Regex for ₹ 1,234 or Rs. 1234
                const priceMatch = text.match(/(?:₹|Rs\.?)\s?([\d,]+\.?\d*)/i);
                if (priceMatch && priceMatch[1]) {
                   // price = priceMatch[1].replace(/,/g, ""); // Risky to auto-assign
                }
            }
        }

        // Clean up title
        if (title) {
            title = title.trim();
        }

        // Format price
        if (price && price.endsWith(".")) {
            price = price.slice(0, -1);
        }
        
        let formattedPrice = null;
        if (price) {
            if (currency === "INR") {
                formattedPrice = `₹${price}`;
            } else if (currency === "USD") {
                formattedPrice = `$${price}`;
            } else {
                formattedPrice = `${price} ${currency}`;
            }
        }

        return NextResponse.json({
            title: title || "",
            image: image || "",
            description: description || "",
            price: formattedPrice || "",
            url
        });

    } catch (error) {
        console.error("Metadata fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 });
    }
}

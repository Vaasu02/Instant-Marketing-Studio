import { NextResponse } from "next/server";
import { generateMarketingCopy } from "@/lib/gemini";
import { generateLifestyleImage } from "@/lib/stability";

export async function POST(request: Request) {
    try {
        const { productName, description } = await request.json();

        if (!productName || !description) {
            return NextResponse.json(
                { error: "Product name and description are required" },
                { status: 400 }
            );
        }


        const copyData = await generateMarketingCopy(productName, description);
        const { slogan, socialPost, imagePrompt } = copyData;


        const imageUrl = await generateLifestyleImage(imagePrompt);

        return NextResponse.json({
            slogan,
            socialPost,
            imageUrl,
            imagePrompt
        });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate assets" },
            { status: 500 }
        );
    }
}

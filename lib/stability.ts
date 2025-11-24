const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const STABILITY_API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';


export async function generateLifestyleImage(prompt: string): Promise<string> {
    if (!prompt) throw new Error("Missing image prompt");

    try {
        const response = await fetch(STABILITY_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'image/png',
                'Authorization': `Bearer ${STABILITY_API_KEY}`
            },
            body: JSON.stringify({
                text_prompts: [{
                    text: prompt,
                    weight: 1
                }],
                output_format: 'png',
                aspect_ratio: '1:1',
                samples: 1,
                steps: 30,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Stability API Error: ${response.status} - ${errorText}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString('base64');
        return `data:image/png;base64,${base64}`;

    } catch (error) {
        console.error("Stability Generation Error:", error);
        throw error;
    }
}

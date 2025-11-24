
# BrandBlast: Instant Marketing Studio ✨

BrandBlast is an AI-powered application that turns a simple product idea into a complete marketing kit in seconds. It generates a professional lifestyle image, a catchy slogan, and an engaging social media post.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd assign
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your Gemini API Key:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```
    *(Note: Stability AI key is hardcoded for this demo as per assignment instructions)*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Technical Write-up (Assignment Submission)

**AI Models Used:**
*   **Text:** Google Gemini 2.5 Flash.
*   **Image:** Stability AI SDXL 1.0 (via direct API).

**Why I Chose Them:**
I selected **Gemini 2.5 Flash** for its exceptional speed and low latency, which is critical for a real-time "magic" feel. It excels at creative writing (slogans/copy). For visuals, **Stability AI SDXL** was chosen because it offers high-fidelity, photorealistic image generation that is easy to integrate via a simple REST API, ensuring a "wow" factor for the product shots.

**How AI is Used:**
The app uses a chained AI workflow. First, the user's input is sent to Gemini to generate marketing copy and a *refined, detailed image prompt* optimized for Stable Diffusion. This optimized prompt is then sent to Stability AI to generate the visual asset. This "prompt engineering by AI" ensures much higher quality results than raw user input.

**Architecture:**
Built on **Next.js 14 (App Router)** for a robust full-stack framework.
*   **Frontend:** React components with **Tailwind CSS** for a premium "Bento Grid" design.
*   **Backend:** Next.js API Routes act as an orchestrator, keeping API keys secure and managing the parallel/sequential execution of AI models.
*   **State:** React State manages the async flow and loading UI states.

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health status
  app.get("/api/health", (req, res) => {
    res.json({ status: "active", version: "2026.1" });
  });

  // Server-side Gemini API strategy generation endpoint
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { challenge, companyDetails, serviceFocus } = req.body;
      
      const key = process.env.GEMINI_API_KEY;
      if (!key || key.includes("MY_GEMINI_API_KEY")) {
        return res.status(400).json({ 
          error: "GEMINI_API_KEY is not configured in this preview environment. Please configure your key in settings secrets to activate the server-side AI architect." 
        });
      }

      // Initialize SDK inside route handler (lazy initialization pattern to prevent startup crashes)
      const ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = 
        "You are the Lead Solution Architect at Ayanshu Innovations. " +
        "You provide extremely polished, technical, and high-level enterprise architectural strategic advice. " +
        "You match client hurdles directly to our six service tiers: Cloud & DevOps, Cybersecurity, Software Dev, " +
        "IT Infrastructure, Managed IT, and Digital Transformation. Keep your tone objective, friendly, authoritative, " +
        "and deeply professional. Avoid generic AI introductory filler text; start directly with the strategic plan.";

      const prompt = `CLIENT HURDLE DISCLOSURE:
"${challenge || 'Optimize legacy software stacks and cloud networks.'}"

COMPANY SCALE & INFRASTRUCTURE DETAIL:
"${companyDetails || 'Medium business with hybrid computing clusters.'}"

SERVICE TRANSFORMATION FOCUS:
"${serviceFocus || 'General Platform & Digital Transformation Consulting'}"

Draft a high-fidelity, actionable modernization roadmap. Structure it with:
1. **Critical Hurdles Clarified**: 2-3 brief insights on their challenges.
2. **Modular 4-Stage Sprint Roadmap**: Specific milestones with estimated timelines.
3. **Recommended Modern Technology Architecture**: Concrete technologies matching their parameters.
4. **Added Compliance & Security Strategy**: A clear recommendation for high-level regulatory readiness.
Use elegant, scannable markdown formatting, bold keywords, and clean typography layouts.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.70,
        }
      });

      res.json({ result: response.text });
    } catch (err: any) {
      console.error("Server-side Gemini generation failure: ", err);
      res.status(500).json({ error: err.message || "Failed to reach backend Gemini model clusters." });
    }
  });

  // Vite middleware for real-time asset hosting & fallback static router in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server bootstrap completed. Active on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start fullstack container: ", error);
});

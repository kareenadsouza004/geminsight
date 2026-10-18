import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback intelligent answers for retail company The ArKitects Pvt. Ltd.
const getFallbackAnswer = (persona: string, query: string) => {
  const q = query.toLowerCase();
  
  if (q.includes('festive') || q.includes('target') || q.includes('miss')) {
    return {
      text: "Based on store data, 18 out of 284 stores are at risk of missing their festive targets. Most of these are in the North East and East zones due to delayed stock shipments of premium 55-inch OLED TVs and double-door refrigerators. Moving 420 units from the Kolkata central warehouse will bridge this gap in 48 hours.",
      followUps: [
        "Should we trigger moving stock between stores today?",
        "What is the expected revenue impact if delayed?",
        "Which product categories have surplus stock?"
      ],
      actionCandidate: {
        headline: "Move 420 TV and fridge units to 18 East stores",
        detail: "Kolkata warehouse holds excess inventory. Transferring stock by Friday safeguards ₹3.8 Crore in festive weekend sales.",
        priority: "Critical",
        solutions: [
          "Deploy Express Logistics to deliver units within 36 hours (cost +₹40/unit)",
          "Re-route local regional stock from 4 overstocked tier-1 hub stores"
        ]
      }
    };
  }

  if (q.includes('cut cost') || q.includes('cost') || q.includes('save')) {
    return {
      text: "We can reduce ₹4.2 Crore in expenses this quarter without hurting sales. The biggest opportunity is switching last-mile appliance delivery to local store dispatches instead of distant regional warehouses. This cuts delivery cost by ₹62 per order and speeds up delivery by 14 hours.",
      followUps: [
        "What is the setup time for local store delivery?",
        "How much warehouse storage cost will this cut?",
        "Does this require extra store team staff?"
      ],
      actionCandidate: {
        headline: "Shift appliance deliveries to nearest store fulfillment",
        detail: "Using 140 equipped hub stores for direct customer deliveries lowers transport fees and speeds up customer setup.",
        priority: "Medium",
        solutions: [
          "Enable 80 Tier-1 stores with local courier partner vans immediately",
          "Pilot full store dispatch across Delhi and Mumbai clusters first"
        ]
      }
    };
  }

  // Persona specific default fallbacks
  switch (persona) {
    case 'Chief Financial Officer (CFO)':
      return {
        text: "Our company profit margin is steady at 18.4%. Cash available stands at ₹482 Crore, which gives us 48 days of operations. Currently, ₹84 Crore is tied up in unsold stock, mostly in older 4G smartphones and single-door refrigerators. Clearing these through festive bundle offers can free up ₹56 Crore within 20 days.",
        followUps: [
          "Which 5 products tie up the most cash right now?",
          "How did our marketing spend perform over the weekend?",
          "Can we renegotiate payment terms with top TV suppliers?"
        ]
      };
    case 'Chief People Officer (CHRO)':
      return {
        text: "Employee happiness is at 84 out of 100. Employees leaving stands at 7.2%, which is 3 points better than industry average. Open jobs being filled are at 142 roles, mainly festive store advisors. AI now handles 41% of repetitive store tasks like barcode matching and shift rosters, giving staff more time with customers.",
        followUps: [
          "Which store regions have the highest staff satisfaction?",
          "How fast are we closing festive sales advisor hiring?",
          "What is the progress on the customer service AI training?"
        ]
      };
    case 'Chief Digital & Technology Officer (CDTO)':
      return {
        text: "AI automation has saved 18,400 team hours this month across billing, inventory counting, and warranty claims. Systems worked without a break 99.94% of the time. 42 out of 48 company data tools are fully synced. Tool usage among store staff is at 88%.",
        followUps: [
          "Which 3 software tools experienced small delays?",
          "How can we reduce our monthly cloud and AI tool costs?",
          "What is the timeline to connect the last 6 warehouse tools?"
        ]
      };
    case 'Chief Operations & Supply Chain Officer (COSO)':
      return {
        text: "96.4% of customer orders were delivered on time this week. Stock available against festive demand is at 94%. 91% of festive inventory has arrived in warehouses ahead of Diwali. Delivery cost is ₹185 per order, and damaged goods are at an all-time low of 0.42%.",
        followUps: [
          "Are any container shipments delayed at Mumbai port?",
          "Which stores need emergency stock for ACs?",
          "How are third-party delivery partners performing?"
        ]
      };
    default: // CEO
      return {
        text: "The ArKitects is tracking at 104% of this month's revenue goal with ₹1,240 Crore in sales. Customer happiness score is 74 out of 100. We hold 24.2% market share, leading our top competitor by 3.1 points. High-demand categories like inverter ACs and smart OLED TVs are up 34% and 22% compared to last year.",
        followUps: [
          "Which region is driving the fastest sales growth?",
          "How is our customer happiness score trending vs rivals?",
          "What is our revenue forecast for Diwali festive week?"
        ]
      };
  }
};

// Clean helper to strip any stray markdown asterisks or bolding
function cleanPlainEnglish(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/`{1,3}/g, '')
    .trim();
}

app.post('/api/chat', async (req, res) => {
  const { prompt, persona, conversationHistory } = req.body;
  const currentPersona = persona || 'Chief Executive Officer (CEO)';

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // If Gemini is available, query real AI
  if (ai) {
    try {
      const systemInstruction = `You are GemInsight AI, the connected leadership intelligence brain for "The ArKitects Pvt. Ltd.", a large retail company specializing in electronics and home appliances (ACs, TVs, phones, laptops, kitchen appliances, and festive sales across 284 stores in India).

You are answering the leader: ${currentPersona}.

CRITICAL RULES:
1. LANGUAGE RULE: Use very simple, plain English that a person who has never worked in retail or in a big company can understand.
2. NO BIG WORDS AND NO JARGON.
3. MANDATORY PLAIN LABELS:
   - Use "Moving stock between stores" instead of "Rebalancing"
   - Use "Employees leaving" instead of "Attrition"
   - Use "Product" instead of "SKU"
   - Use "Customer happiness score" instead of "NPS"
   - Use "Days our cash will last" instead of "Runway"
   - Use "Time systems worked without a break" instead of "Uptime"
   - Use "How many people use it" instead of "Adoption"
   - Use "Open jobs being filled" instead of "Pipeline"
   - Use "Jump, causes, use, improve, reduce" instead of "Surge, triggers, leverage, optimise, mitigate"
4. FORMATTING RULE: NEVER show asterisks (**) or any markdown formatting symbols. Output completely clean plain text. Use simple line breaks and short lists if needed.
5. LENGTH: Answers must be short, crisp and only as long as needed.
6. CONTENT: Tailor answers strictly to the responsibilities of ${currentPersona}. Provide numbers in ₹ (Crores/Lakhs) and realistic retail scenarios.
7. Return a JSON structure with this exact schema:
{
  "text": "Your plain English answer without asterisks or markdown",
  "followUps": ["Question 1?", "Question 2?", "Question 3?"],
  "actionCandidate": null or {"headline": "Short title", "detail": "Two sentence plan.", "priority": "Critical" | "Medium" | "Low", "solutions": ["Solution 1", "Solution 2"]}
}`;

      const historySummary = Array.isArray(conversationHistory)
        ? conversationHistory.slice(-4).map((m: any) => `${m.role}: ${m.text}`).join('\n')
        : '';

      const fullPrompt = `${historySummary ? `Previous conversation:\n${historySummary}\n\n` : ''}User Question: ${prompt}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      const responseText = response.text || '';
      try {
        const parsed = JSON.parse(responseText);
        const cleanText = cleanPlainEnglish(parsed.text || responseText);
        const followUps = (parsed.followUps || []).map((q: string) => cleanPlainEnglish(q)).slice(0, 3);
        const actionCandidate = parsed.actionCandidate ? {
          headline: cleanPlainEnglish(parsed.actionCandidate.headline || ''),
          detail: cleanPlainEnglish(parsed.actionCandidate.detail || ''),
          priority: parsed.actionCandidate.priority || 'Medium',
          solutions: (parsed.actionCandidate.solutions || []).map((s: string) => cleanPlainEnglish(s)),
        } : null;

        return res.json({
          text: cleanText,
          followUps: followUps.length > 0 ? followUps : [
            "What is the expected revenue impact?",
            "Which stores need immediate attention?",
            "Can we turn this into an automated action?"
          ],
          actionCandidate,
        });
      } catch (parseError) {
        return res.json({
          text: cleanPlainEnglish(responseText),
          followUps: [
            "What is the revenue impact?",
            "Which stores need help?",
            "How does this compare to last week?"
          ],
          actionCandidate: null,
        });
      }
    } catch (apiError: any) {
      console.warn('Gemini API call failed, using intelligent fallback:', apiError?.message);
    }
  }

  // Fallback intelligent response
  const fallback = getFallbackAnswer(currentPersona, prompt);
  return res.json({
    text: cleanPlainEnglish(fallback.text),
    followUps: fallback.followUps,
    actionCandidate: fallback.actionCandidate || null,
  });
});

// Vite middleware in dev or static files in prod
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`GemInsight server listening on http://0.0.0.0:${port}`);
  });
}

startServer();

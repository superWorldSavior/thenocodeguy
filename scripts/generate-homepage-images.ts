/**
 * One-shot script to generate homepage images via OpenAI GPT Image API.
 * Usage: npx tsx scripts/generate-homepage-images.ts
 *
 * Requires OPENAI_API_KEY in .env.local
 */

import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const OUTPUT_DIR = path.resolve(__dirname, "../public/images/homepage");

// OVERLAY STYLE — identical visual style on every image:
// Same white head silhouette at top, same thin white lines, same circular nodes, same 40% opacity.
// Only the NODE LABELS and WORKFLOW STEPS change per domain context.
const OVERLAY_STYLE =
  "In the bottom-right area, a small elegant semi-transparent white overlay graphic (40% opacity, like a refined watermark). It has the EXACT same visual style on every image: a minimalist workflow flowchart made of thin white lines connecting small circular nodes. At the very top node there is always the same small stylized white human head silhouette icon (simple, geometric, forward-facing). The lines and nodes are white, thin, clean. No color, no glow, no blue, no neon.";

const IMAGES: { filename: string; prompt: string }[] = [
  {
    filename: "hero-main.webp",
    prompt:
      `A real photograph taken inside a bright modern coworking space. A diverse team of 4 people sit around a large wooden table with laptops and coffee cups. One woman points at a wall-mounted TV showing a bar chart. Warm afternoon sunlight through floor-to-ceiling windows, green plants on shelves. Shot on Canon EOS R5, 35mm lens, shallow depth of field. Photojournalistic corporate style. No blue ghosts, no sci-fi, no glowing neon. 16:9 landscape format. ${OVERLAY_STYLE} The workflow nodes below the head are labeled with tiny icons representing: "Brief" → "Match" → "Deploy" → "Report".`,
  },
  {
    filename: "domaine-btp.webp",
    prompt:
      `A real photograph of a woman in her 40s wearing a navy blazer, sitting at a desk inside a construction site portable office. On her desk: a yellow hard hat, rolled blueprints, a tablet showing a spreadsheet, and a takeaway coffee. Through the window behind her, a construction crane and scaffolding are visible in golden hour light. Shot on Sony A7IV, 50mm, natural tones. Documentary photography style. No blue ghosts, no sci-fi, no glowing neon. 4:3 format. ${OVERLAY_STYLE} The workflow nodes below the head represent construction tasks: "Invoices" → "PPSPS" → "Suppliers" → "Reporting".`,
  },
  {
    filename: "domaine-commerce.webp",
    prompt:
      `A real photograph of a man in his 30s wearing a crisp white shirt, sitting at a clean modern desk in a glass-walled office. He wears a wireless headset and smiles while looking at his laptop screen which shows colorful sales pipeline charts. A notebook, pen, and espresso cup sit beside the laptop. Soft diffused natural light, blurred office background. Shot on Fujifilm X-T5, 56mm. Corporate photography. No blue ghosts, no sci-fi, no glowing neon. 4:3 format. ${OVERLAY_STYLE} The workflow nodes below the head represent sales tasks: "Prospect" → "Qualify" → "CRM" → "Close".`,
  },
  {
    filename: "domaine-admin.webp",
    prompt:
      `A real photograph of a tidy modern office desk from a slightly elevated angle. On the desk: an open laptop showing a spreadsheet with colored rows, a neat stack of manila folders, a small potted succulent, a ceramic pen holder, and a printed calendar on the wall. Warm natural light from a window on the left. No person in frame. Shot on Nikon Z6, 35mm. Minimalist, organized, calming. No blue ghosts, no sci-fi, no glowing neon. 4:3 format. ${OVERLAY_STYLE} The workflow nodes below the head represent admin tasks: "Mail" → "Sort" → "Schedule" → "Archive".`,
  },
  {
    filename: "domaine-web.webp",
    prompt:
      `A real photograph of a developer workspace at night. Two ultrawide monitors on a standing desk: left screen shows a dark-themed code editor with syntax-highlighted code, right screen shows a website analytics dashboard with graphs. Mechanical keyboard with subtle RGB backlighting, a mouse, and a mug. Moody ambient lighting with a warm desk lamp. No person visible. Tech editorial photography. No blue ghosts, no sci-fi. 4:3 format. ${OVERLAY_STYLE} The workflow nodes below the head represent web tasks: "Monitor" → "Deploy" → "Analyze" → "Alert".`,
  },
  {
    filename: "mission-casestudy.webp",
    prompt:
      `A real photograph with a diagonal split composition. Left side: exterior of a modern construction site in warm daylight, workers in orange vests and hard hats near scaffolding, tower crane in background. Right side: clean modern office interior, a woman at a desk working on a laptop showing a document management interface. Connected by a clean diagonal cut. Documentary style, warm natural tones. No blue ghosts, no sci-fi, no glowing neon. 16:9 format. ${OVERLAY_STYLE} The workflow nodes below the head represent the case study flow: "Audit" → "Setup" → "Automate" → "Save 10h/week".`,
  },
];

async function generateImage(
  prompt: string,
  filename: string
): Promise<void> {
  const outputPath = path.join(OUTPUT_DIR, filename);

  if (existsSync(outputPath)) {
    console.log(`⏭ ${filename} already exists, skipping`);
    return;
  }

  console.log(`🎨 Generating ${filename}...`);

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1.5",
      prompt,
      n: 1,
      size: filename.includes("hero") || filename.includes("mission")
        ? "1536x1024"
        : "1024x1024",
      quality: "high",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error for ${filename}: ${response.status} ${err}`);
  }

  const data = (await response.json()) as {
    data: { b64_json: string }[];
  };

  const b64 = data.data[0].b64_json;
  const buffer = Buffer.from(b64, "base64");
  await writeFile(outputPath, buffer);
  console.log(`✅ Saved ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY not set. Create .env.local first.");
    process.exit(1);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const img of IMAGES) {
    try {
      await generateImage(img.prompt, img.filename);
    } catch (err) {
      console.error(`❌ Failed: ${img.filename}`, err);
    }
  }

  console.log("\n🎉 Done! Check public/images/homepage/");
}

main();

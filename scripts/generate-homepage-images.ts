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

const IMAGES: { filename: string; prompt: string }[] = [
  {
    filename: "hero-main.webp",
    prompt:
      "Professional modern office scene with diverse team collaborating with AI holographic interfaces. Clean, corporate aesthetic with indigo and white color scheme. Digital assistants visualized as sleek holographic figures working alongside humans at desks with laptops and screens showing dashboards. Soft ambient lighting, photorealistic style, 16:9 landscape format. No text or logos.",
  },
  {
    filename: "domaine-btp.webp",
    prompt:
      "Construction site office interior with a professional woman at a desk reviewing digital documents on a large screen. Construction plans, hard hats visible in background. AI assistant visualized as subtle holographic overlay helping sort paperwork. Warm lighting mixed with industrial elements. Modern corporate photography style, 4:3 format. No text or logos.",
  },
  {
    filename: "domaine-commerce.webp",
    prompt:
      "Modern sales office with CRM dashboard on screen, professional salesperson at desk with headset. AI visualization showing automated email sequences and LinkedIn outreach as flowing data streams. Indigo and white color scheme, clean corporate photography style, 4:3 format. No text or logos.",
  },
  {
    filename: "domaine-admin.webp",
    prompt:
      "Clean modern office desk with organized files, laptop showing spreadsheets and calendar. AI assistant visualized as subtle digital overlay automating invoice processing and scheduling. Professional administrative setting with plants and natural light. Corporate photography style, 4:3 format. No text or logos.",
  },
  {
    filename: "domaine-web.webp",
    prompt:
      "Modern tech workspace with multiple monitors showing website analytics dashboards, code editors, and deployment pipelines. AI visualization as holographic assistant monitoring site performance. Dark mode screens with indigo accent lighting. Corporate tech photography style, 4:3 format. No text or logos.",
  },
  {
    filename: "mission-kellyassist.webp",
    prompt:
      "Split scene: left side shows a construction site with workers and scaffolding, right side shows a modern office where an AI-augmented administrative assistant manages documents digitally. Visual bridge between construction and digital administration. Professional corporate photography, warm and indigo tones, 16:9 format. No text or logos.",
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
      model: "gpt-image-1",
      prompt,
      n: 1,
      size: filename.includes("hero") || filename.includes("mission")
        ? "1536x1024"
        : "1024x1024",
      quality: "medium",
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

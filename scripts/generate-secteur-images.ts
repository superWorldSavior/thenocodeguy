/**
 * Generate carousel (humans) + gallery (domain context) images.
 * Usage: npx tsx scripts/generate-secteur-images.ts
 *
 * Outputs:
 *   public/images/homepage/carousel-admin.webp   — admin avec personne
 *   public/images/homepage/carousel-web.webp     — web avec personne
 *   public/images/homepage/gallery-btp.webp      — chantier réel
 *   public/images/homepage/gallery-commerce.webp — boutique/retail
 *   public/images/homepage/gallery-admin.webp    — bureau papiers admin
 *   public/images/homepage/gallery-web.webp      — device avec site web
 */

import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const OUTPUT_DIR = path.resolve(__dirname, "../public/images/homepage");

const OVERLAY_STYLE =
  "In the bottom-right area, a small elegant semi-transparent white overlay graphic (40% opacity, like a refined watermark). It has the EXACT same visual style on every image: a minimalist workflow flowchart made of thin white lines connecting small circular nodes. At the very top node there is always the same small stylized white human head silhouette icon (simple, geometric, forward-facing). The lines and nodes are white, thin, clean. No color, no glow, no blue, no neon.";

const IMAGES: { filename: string; prompt: string }[] = [
  // ── CAROUSEL: humans in every image ──────────────────────────────────────

  {
    filename: "carousel-admin.webp",
    prompt: `Candid documentary photograph of a woman in her late 30s sitting at her office desk, mid-action, slightly leaning forward as she reviews a paper document. She wears a simple light blouse. Her desk is lived-in: an open agenda with handwritten notes, a half-drunk coffee, sticky notes on the monitor edge, a pen in hand. Warm afternoon light through a window. Slightly shallow depth of field, natural bokeh. Shot on Sony A7IV 50mm f/1.8. Authentic workplace photography, not staged, not corporate stock. No sci-fi, no glowing effects. 4:3. ${OVERLAY_STYLE} Workflow nodes: "Mail" → "Sort" → "Schedule" → "Archive".`,
  },
  {
    filename: "carousel-web.webp",
    prompt: `Candid photograph of a man in his early 30s sitting at a desk in a bright open-plan office, looking at his laptop with a focused expression. He wears a casual dark t-shirt. His workspace has a relaxed feel: a ceramic mug, a notebook with pen marks, a small cactus. A few colleagues are visible blurred in the background. Natural window light. Shot on Fujifilm X-T5 35mm. Authentic, slightly candid, not over-styled. No sci-fi, no neon. 4:3. ${OVERLAY_STYLE} Workflow nodes: "Monitor" → "Deploy" → "Analyze" → "Alert".`,
  },

  // ── GALLERY: domain context, always with human presence ──────────────────

  {
    filename: "gallery-btp.webp",
    prompt: `Candid documentary photograph on an active outdoor construction site. A foreman in an orange high-visibility vest and yellow hard hat crouches down, pointing at something on a large unrolled blueprint on a dirty wooden pallet, while a younger colleague in work clothes stands beside him listening. Real construction site background: exposed concrete walls, scaffolding, a crane silhouette. Overcast natural daylight, slight dust haze. Shot on Canon EOS R5 28mm f/4. Gritty and authentic, not clean studio. No computers. 4:3.`,
  },
  {
    filename: "gallery-commerce.webp",
    prompt: `Candid photograph inside a busy small French retail shop. A woman shop owner in her 40s, wearing a casual apron over her clothes, is in the middle of a lively conversation with a customer, laughing slightly. Behind her: wooden shelves packed with products in warm packaging. The counter has a card payment terminal, a few price tags, a paper bag. Warm tungsten pendant lighting, slightly cluttered, very real. Shot on Leica Q2 28mm. Authentic independent commerce, not a sterile chain store. No computers. 4:3.`,
  },
  {
    filename: "gallery-admin.webp",
    prompt: `Candid close-up photograph of a woman's hands actively writing in an open paper planner on an office desk. Her handwriting is mid-sentence. Around her hands: an uncapped pen, a messy stack of papers with handwritten annotations, a few sticky notes in different colors, a white coffee cup with lipstick on the rim. The scene is natural, slightly busy, lived-in. Warm window light from the side, shallow depth of field. Shot on Canon EOS R5 85mm f/1.4. Authentic, not a flat lay, not staged. 4:3.`,
  },
  {
    filename: "gallery-web.webp",
    prompt: `Candid photograph of a young woman standing at a large glass whiteboard in a creative studio, drawing a website wireframe with a black marker. She has her back slightly turned, focused on the board. Colorful sticky notes with sketches are stuck around her wireframe. In the background: blurred colleagues at desks, a plant, exposed brick wall. Natural daylight. Shot on Sony A7IV 35mm f/2. Authentic digital agency atmosphere, creative but real. No flat devices on tables. 4:3.`,
  },
];

async function generateImage(prompt: string, filename: string): Promise<void> {
  const outputPath = path.join(OUTPUT_DIR, filename);

  if (existsSync(outputPath)) {
    console.log(`⏭  ${filename} already exists, skipping`);
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
      size: "1024x1024",
      quality: "high",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(
      `OpenAI API error for ${filename}: ${response.status} ${err}`
    );
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

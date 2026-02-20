import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { process_name, time_per_week_hours, tools_used, repetitive_tasks, team_size } = body;

    if (!process_name || !time_per_week_hours || !tools_used || !repetitive_tasks) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const windmillRes = await fetch(
      "http://localhost:8000/api/w/admins/jobs/run_wait_result/p/f/openclaw/automation_audit",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer PEXS3yqaduRqpFy53vDrDlpG12OzWUFF",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          process_name,
          time_per_week_hours: Number(time_per_week_hours),
          tools_used,
          repetitive_tasks,
          team_size: Number(team_size) || 1,
        }),
      }
    );

    if (!windmillRes.ok) {
      const errText = await windmillRes.text();
      console.error("Windmill error:", errText);
      return NextResponse.json({ error: "Erreur lors de l'analyse IA" }, { status: 500 });
    }

    const result = await windmillRes.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error("API audit error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}

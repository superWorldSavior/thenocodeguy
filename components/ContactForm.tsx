"use client";

import { useState } from "react";

type Labels = {
  intro: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  ok: string;
  err: string;
};

export default function ContactForm({
  endpoint,
  labels,
}: {
  endpoint: string;
  labels: Labels;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return <p className="tncg-cform-ok">{labels.ok}</p>;
  }

  return (
    <form className="tncg-cform" onSubmit={onSubmit}>
      <p className="tncg-cform-intro">{labels.intro}</p>
      <input
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder={labels.email}
        className="tncg-input"
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder={labels.message}
        className="tncg-input tncg-textarea"
      />
      <div className="tncg-cform-actions">
        <button type="submit" className="tncg-cta" disabled={status === "sending"}>
          {status === "sending" ? labels.sending : labels.send}{" "}
          <span className="tncg-arr" aria-hidden="true">→</span>
        </button>
        {status === "err" && <span className="tncg-cform-err">{labels.err}</span>}
      </div>
    </form>
  );
}

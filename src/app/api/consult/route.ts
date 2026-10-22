const CONSULT_EMAIL = "consult@erounpartners.com";

const PRACTICE_AREAS = ["상속", "형사", "이혼·가사", "민사·부동산", "기타"] as const;

function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ ok: false }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = text(data.name, 80);
  const contact = text(data.contact, 40);
  const message = text(data.message, 4000);
  const page = text(data.page, 200);
  const company = text(data.company, 200);
  const areas = Array.isArray(data.areas)
    ? data.areas.filter(
        (area): area is string =>
          typeof area === "string" &&
          (PRACTICE_AREAS as readonly string[]).includes(area),
      )
    : [];

  if (!name || !contact) {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (company) {
    return Response.json({ ok: true });
  }

  const mail = await fetch(`https://formsubmit.co/ajax/${CONSULT_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://erounpartners.com",
      Referer: "https://erounpartners.com/",
    },
    body: JSON.stringify({
      name,
      연락처: contact,
      관심분야: areas.length > 0 ? areas.join(", ") : "선택 없음",
      message: message || "작성된 내용 없음",
      접수페이지: page,
      _subject: `[상담 신청] ${name}`,
      _template: "table",
      _captcha: "false",
    }),
  });

  const result = (await mail.json().catch(() => null)) as
    | { success?: boolean | string }
    | null;

  if (!mail.ok || String(result?.success) !== "true") {
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}

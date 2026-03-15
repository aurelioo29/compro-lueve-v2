// app/api/contact/route.js
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // pastikan Node, bukan edge (biar ENV & fetch stabil)

const SCRIPT_URL = process.env.APPS_SCRIPT_URL;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    if (!SCRIPT_URL) {
      return NextResponse.json(
        { status: false, message: "APPS_SCRIPT_URL is not set" },
        { status: 500 }
      );
    }

    const { fullname, phone, email } = await request.json();

    if (!fullname || !phone) {
      return NextResponse.json(
        { status: false, message: "Field fullname & phone number is required" },
        { status: 400 }
      );
    }

    // email opsional; kalau diisi harus valid
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { status: false, message: "Invalid email" },
        { status: 400 }
      );
    }

    // Kirim ke Apps Script (server-to-server, aman dari CORS)
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // apps script-mu udah support JSON -> aman
      body: JSON.stringify({
        fullname,
        phone,
        email: email || "",
        source: "website",
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { status: false, message: `Apps Script error: ${res.status} ${text}` },
        { status: 502 }
      );
    }

    const msg = encodeURIComponent(
      `Hi LUEVE, I'm ${fullname}. Phone: ${phone}. Email: ${email || "-"}`
    );
    const wa = `https://wa.me/6281533780888?text=${msg}`;

    return NextResponse.json({ status: true, redirect: wa });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

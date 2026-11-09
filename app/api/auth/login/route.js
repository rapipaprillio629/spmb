import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/mongodb";
import {
  createSessionToken,
  SESSION_COOKIE,
} from "../../../../lib/auth";

export const runtime = "nodejs";

const destinations = {
  siswa: "/siswa/dashboard",
  admin: "/admin/dashboard",
  kepsek: "/kepsek/dashboard",
};

export async function POST(request) {
  try {
    const body = await request.json();

    const identifier = String(body.identifier ?? "")
      .trim()
      .toLowerCase();

    const password = body.password;

    if (
      !identifier ||
      identifier.length > 254 ||
      typeof password !== "string" ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return NextResponse.json(
        { message: "NISN/email atau password salah." },
        { status: 401 }
      );
    }

const db = await connectDB();

    const user = await db.collection("users").findOne({
      $or: [
        { email: identifier },
        { nisn: identifier },
      ],
    });

    if (
      !user ||
      typeof user.passwordHash !== "string" ||
      !(await bcrypt.compare(password, user.passwordHash)) ||
      !Object.hasOwn(destinations, user.role)
    ) {
      return NextResponse.json(
        { message: "NISN/email atau password salah." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(user);

    const response = NextResponse.json({
      message: "Login berhasil.",
      redirectTo: destinations[user.role],
    });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}

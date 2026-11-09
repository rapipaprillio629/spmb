import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const nisn = String(body.nisn ?? "").trim();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const phone = String(body.phone ?? "").trim();
    const password = body.password;

    if (
      !name ||
      !/^\d{10}$/.test(nisn) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !/^\+?[0-9]{9,15}$/.test(phone) ||
      typeof password !== "string" ||
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 128 ||
      body.agreement !== true
    ) {
      return NextResponse.json(
        { message: "Periksa kembali data pendaftaran." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("spmb_citra_negara");
    const users = db.collection("users");

    const existing = await users.findOne({
      $or: [{ nisn }, { email }],
    });

    if (existing) {
      return NextResponse.json(
        { message: "NISN atau email sudah terdaftar." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await users.insertOne({
      name,
      nisn,
      email,
      phone,
      passwordHash,
      role: "siswa",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Registrasi berhasil." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}

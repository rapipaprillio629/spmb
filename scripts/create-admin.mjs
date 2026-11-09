import "dotenv/config";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI belum diatur.");
}

const rl = createInterface({ input, output });

const client = new MongoClient(uri);

try {
  const role = await rl.question(
    "Role akun (admin/kepsek): "
  );

  if (!["admin", "kepsek"].includes(role)) {
    throw new Error("Role harus admin atau kepsek.");
  }

  const name = await rl.question("Nama lengkap: ");
  const email = (
    await rl.question("Email: ")
  ).trim().toLowerCase();

  const password = await rl.question(
    "Password awal (minimal 6 karakter): "
  );

  if (
    !name.trim() ||
    name.trim().length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password.length < 6 ||
    Buffer.byteLength(password, "utf8") > 72
  ) {
    throw new Error("Data akun tidak memenuhi ketentuan.");
  }

  await client.connect();

  const db = client.db("spmb_citra_negara");
  const users = db.collection("users");

  await users.createIndex({ email: 1 }, { unique: true });
  await users.createIndex({ nisn: 1 }, { unique: true });

  const existing = await users.findOne({ email });

  if (existing) {
    throw new Error(
      "Email sudah terdaftar. Tidak ada akun yang diubah."
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await users.insertOne({
    name: name.trim(),
    email,
    passwordHash,
    role,
    createdAt: new Date(),
  });

  console.log(`Akun ${role} berhasil dibuat.`);
} finally {
  rl.close();
  await client.close();
}

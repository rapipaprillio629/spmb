import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "spmb_session";

function getSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET belum dikonfigurasi dengan benar.");
  }

  return new TextEncoder().encode(secret);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });

    if (
      typeof payload.sub !== "string" ||
      !["siswa", "admin", "kepsek"].includes(payload.role)
    ) {
      return null;
    }

    return {
      userId: payload.sub,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

export async function requireRole(role) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== role) {
    const destinations = {
      siswa: "/siswa/dashboard",
      admin: "/admin/dashboard",
      kepsek: "/kepsek/dashboard",
    };

    redirect(destinations[session.role]);
  }

  return session;
}

export async function createSessionToken(user) {
  const { SignJWT } = await import("jose");

  return new SignJWT({ role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user._id.toString())
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

export { SESSION_COOKIE };

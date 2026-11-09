"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal.");
        return;
      }

      router.replace(data.redirectTo);
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <section className="login-left">
          <div className="left-content">
            <div className="brand">
              <div className="brand-logo">
                <img src="/asset/logo cn.png" alt="Logo Citra Negara" />
              </div>
              <span>SPMB Citra Negara</span>
            </div>

            <h1>Selamat datang kembali</h1>

            <p>
              Masuk untuk melanjutkan pendaftaran,
              mengunggah berkas, dan melihat
              pengumuman seleksi.
            </p>
          </div>
        </section>

        <section className="login-right">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2>Masuk</h2>
              <p>Gunakan NISN atau email yang didaftarkan.</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">NISN / Email</label>
                <input
                  id="email"
                  type="text"
                  autoComplete="username"
                  placeholder="Masukkan NISN atau email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Kata Sandi</label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-options">
                <label className="remember">
                  <input type="checkbox" name="remember" />
                  <span>Ingat saya</span>
                </label>

                <a href="/lupa-password" className="forgot-password">
                  Lupa kata sandi?
                </a>
              </div>

              {error && (
                <p role="alert" className="auth-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>

              <p className="register-text">
                Belum punya akun?{" "}
                <a href="/register">Daftar</a>
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

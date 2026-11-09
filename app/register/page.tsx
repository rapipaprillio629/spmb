"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./register.css";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    nisn: "",
    email: "",
    phone: "",
    password: "",
  });

  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          agreement,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registrasi gagal.");
        return;
      }

      setSuccess("Registrasi berhasil. Mengarahkan ke login...");

      router.push("/login");
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register-page">
      <div className="register-container">
        <section className="register-left">
          <div className="register-left-content">
            <div className="register-brand">
              <div className="register-logo">
                <img src="/asset/logo cn.png" alt="Logo Citra Negara" />
              </div>
              <span>SPMB Citra Negara</span>
            </div>

            <h1>Mulai pendaftaranmu hari ini</h1>

            <p>
              Buat akun calon siswa, lalu lengkapi data
              dan berkas secara bertahap.
            </p>
          </div>
        </section>

        <section className="register-right">
          <div className="register-form-wrapper">
            <div className="register-header">
              <h2>Buat Akun</h2>
              <p>Isi data berikut untuk mendaftar.</p>
            </div>

            <form
              className="register-form"
              onSubmit={handleRegister}
            >
              <div className="register-form-group">
                <label htmlFor="name">Nama Lengkap</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Sesuai ijazah / rapor"
                  value={form.name}
                  onChange={handleChange}
                  maxLength={120}
                  required
                />
              </div>

              <div className="register-form-group">
                <label htmlFor="nisn">NISN</label>
                <input
                  id="nisn"
                  name="nisn"
                  type="text"
                  inputMode="numeric"
                  placeholder="10 digit NISN"
                  value={form.nisn}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  required
                />
              </div>

              <div className="register-form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <label htmlFor="phone">No. HP</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="08xxxxxxxxxx"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-form-group">
                <label htmlFor="password">Kata Sandi</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Minimal 8 karakter"
                  value={form.password}
                  onChange={handleChange}
                  minLength={8}
                  maxLength={72}
                  required
                />
              </div>

              <div className="register-agreement">
                <label>
                  <input
                    type="checkbox"
                    checked={agreement}
                    onChange={(e) =>
                      setAgreement(e.target.checked)
                    }
                    required
                  />
                  <span>
                    Saya menyetujui syarat dan ketentuan
                  </span>
                </label>
              </div>

              {error && (
                <p role="alert" className="auth-error">
                  {error}
                </p>
              )}

              {success && (
                <p role="status" className="auth-success">
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Daftar"}
              </button>

              <p className="register-login-text">
                Sudah punya akun?{" "}
                <a href="/login">Masuk</a>
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

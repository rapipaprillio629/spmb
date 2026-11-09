import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import "./dashboard-siswa.css";

const menu = [
  { label: "Dashboard", href: "/dashboard/calon-siswa", icon: "🏠", active: true },
  { label: "Biodata Siswa", href: "/dashboard/calon-siswa/biodata", icon: "👤" },
  { label: "Data Orang Tua", href: "/dashboard/calon-siswa/orang-tua", icon: "👪" },
  { label: "Upload Berkas", href: "/dashboard/calon-siswa/berkas", icon: "📎" },
  { label: "Pembayaran", href: "/dashboard/calon-siswa/pembayaran", icon: "💳" },
  { label: "Pengumuman", href: "/dashboard/calon-siswa/pengumuman", icon: "📣" },
];

// Data contoh. Nanti ganti dengan data dari database.
const stats = [
  { icon: "📝", value: "50%", label: "Kelengkapan data" },
  { icon: "📎", value: "2/4", label: "Berkas terunggah" },
  { icon: "💵", value: "Rp 300.000", label: "Biaya pendaftaran" },
  { icon: "⏳", value: "12 hari", label: "Sisa waktu daftar" },
];

const tahapan = [
  { judul: "Isi Biodata Siswa", status: "Selesai", selesai: true, aksi: "Ubah", href: "/dashboard/calon-siswa/biodata" },
  { judul: "Isi Data Orang Tua", status: "Selesai", selesai: true, aksi: "Ubah", href: "/dashboard/calon-siswa/orang-tua" },
  { judul: "Upload Berkas (2/4)", status: "Belum lengkap", selesai: false, aksi: "Isi", href: "/dashboard/calon-siswa/berkas" },
  { judul: "Bayar Biaya Pendaftaran", status: "Belum dibayar", selesai: false, aksi: "Isi", href: "/dashboard/calon-siswa/pembayaran" },
];

const jadwal = [
  { judul: "Pendaftaran", tanggal: "1 Okt - 15 Nov 2026" },
  { judul: "Tes Seleksi & Wawancara", tanggal: "22 Nov 2026" },
  { judul: "Pengumuman", tanggal: "26 Nov 2026" },
  { judul: "Daftar Ulang", tanggal: "29 Nov - 6 Des 2026" },
];

export default async function DashboardCalonSiswa() {
  // Proteksi di server: hanya role calon_siswa yang boleh masuk
  const cookieStore = await cookies();
  const session = await getSession(cookieStore.get("spmb_session")?.value);

  if (!session) redirect("/login");
  if (session.role !== "calon_siswa") redirect("/login");

  const nama = session.nama || "Siswa";
  const inisial = nama.charAt(0).toUpperCase();
  const noDaftar = `2026-${String(session.sub).padStart(6, "0")}`;
  const langkahSelesai = tahapan.filter((t) => t.selesai).length;
  const progress = (langkahSelesai / tahapan.length) * 100;

  return (
    <div className="ds-layout">
      <aside className="ds-sidebar">
        <div className="ds-brand">
          <div className="ds-logo">🏫</div>
          <span className="ds-brand-name">SPMB Citra Negara</span>
        </div>

        <nav className="ds-nav">
          {menu.map((m) => (
            <Link
              key={m.label}
              href={m.href}
              className={`ds-nav-item ${m.active ? "ds-nav-item--active" : ""}`}
            >
              <span className="ds-nav-icon">{m.icon}</span>
              {m.label}
            </Link>
          ))}
        </nav>

        <div className="ds-help">
          <strong>Butuh bantuan?</strong>
          <p>Panitia SPMB: (021) 555-0123</p>
          <p>Senin-Jumat, 08.00-15.00 WIB</p>
        </div>
      </aside>

      <main className="ds-main">
        <header className="ds-header">
          <div>
            <h1>Dashboard</h1>
            <p>Selamat datang, pantau proses pendaftaranmu di sini.</p>
          </div>
          <div className="ds-user">
            <div className="ds-avatar">{inisial}</div>
            <div>
              <div className="ds-user-name">{nama}</div>
              <div className="ds-user-no">No. Daftar: {noDaftar}</div>
            </div>
          </div>
        </header>

        <section className="ds-stats">
          {stats.map((s) => (
            <div className="ds-card ds-stat" key={s.label}>
              <div className="ds-stat-icon">{s.icon}</div>
              <div>
                <div className="ds-stat-value">{s.value}</div>
                <div className="ds-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="ds-content">
          <div className="ds-card ds-tahapan">
            <h2>Tahapan Pendaftaran</h2>
            <div className="ds-progress">
              <div className="ds-progress-bar" style={{ width: `${progress}%` }} />
            </div>

            <ul className="ds-steps">
              {tahapan.map((t, i) => (
                <li className="ds-step" key={t.judul}>
                  <div className={`ds-step-badge ${t.selesai ? "ds-step-badge--done" : ""}`}>
                    {t.selesai ? "✓" : i + 1}
                  </div>
                  <div className="ds-step-text">
                    <div className="ds-step-title">{t.judul}</div>
                    <div className="ds-step-status">{t.status}</div>
                  </div>
                  <Link href={t.href} className="ds-btn">
                    {t.aksi}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ds-card ds-jadwal">
            <h2>Jadwal Penting</h2>
            <ul>
              {jadwal.map((j) => (
                <li key={j.judul}>
                  <div className="ds-jadwal-title">{j.judul}</div>
                  <div className="ds-jadwal-date">{j.tanggal}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

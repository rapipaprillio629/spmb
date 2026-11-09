export default function HomePage() {
  return (
    <main className="page">
      {/* Navbar */}
      <header className="navbar">
        <div className="container navbar-inner">
          <div className="brand">
            <div className="brand-logo">
              <img src="asset/logo cn.png"></img>
            </div>
            <span>SPMB Citra Negara</span>
          </div>

          <nav className="nav-menu">
            <a href="#beranda">Beranda</a>
            <a href="#alur">Alur</a>
            <a href="#jalur">Jalur</a>
            <a href="#jadwal">Jadwal</a>
            <a href="#kontak">Kontak</a>
          </nav>

          <div className="nav-actions">
            <a href="/login" className="btn btn-outline btn-small">
              Masuk
            </a>

            <a href="#" className="btn btn-primary btn-small">
              Daftar Sekarang
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="beranda">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="announcement">
              Pendaftaran dibuka 1 Oktober – 15 November 2026
            </div>

            <h1>
              Daftar siswa baru SMK Citra Negara{" "}
              <span>lebih mudah</span>
            </h1>

            <p className="hero-description">
              Sistem Penerimaan Murid Baru online untuk calon siswa.
              Isi data, unggah berkas, dan pantau hasil seleksi dari satu
              tempat.
            </p>

            <div className="hero-buttons">
              <a href="#" className="btn btn-primary">
                Daftar Sekarang
              </a>

              <a href="/login" className="btn btn-outline">
                Masuk ke Akun
              </a>
            </div>
          </div>

          {/* Status Pendaftaran */}
          <div className="status-card">
            <h3>Status Pendaftaran</h3>

            <div className="status-item">
              <div className="status-icon">
                <img src="/icon/pulpen.png" alt=""/>
              </div>

              <div>
                <strong>Biodata lengkap</strong>
                <span>Selesai</span>
              </div>
            </div>

            <div className="status-item">
              <div className="status-icon">
                <img src="/icon/klip.png" alt=""/>
              </div>

              <div>
                <strong>Upload berkas</strong>
                <span>2 dari 4 terunggah</span>
              </div>
            </div>

            <div className="status-item">
              <div className="status-icon">
                <img src="/icon/speaker.png" alt=""/>
              </div>

              <div>
                <strong>Pengumuman</strong>
                <span>20 Oktober 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alur Pendaftaran */}
      <section className="section" id="alur">
        <div className="container">
          <h2 className="section-title">
            Alur Pendaftaran
          </h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>

              <div className="step-content">
                <h3>Buat Akun</h3>
                <p>
                  Daftar dengan NISN dan email aktif
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>

              <div className="step-content">
                <h3>Lengkapi Data</h3>
                <p>
                  Biodata, orang tua, dan berkas
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>

              <div className="step-content">
                <h3>Bayar & Ikuti Tes</h3>
                <p>
                  Bayar pendaftaran, lalu tes seleksi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biaya Pendidikan */}
      <section className="section biaya-section">
        <div className="container">
          <h2 className="section-title">
            Biaya Pendidikan
          </h2>

          <div className="cost-grid">
            <div className="cost-card">
              <h3>Biaya Pendaftaran</h3>
              <p>Rp 300.000</p>
            </div>

            <div className="cost-card">
              <h3>Uang Pangkal</h3>
              <p>Rp 8.000.000</p>
            </div>

            <div className="cost-card">
              <h3>SPP per Bulan</h3>
              <p>Rp 750.000</p>
            </div>

            <div className="cost-card">
              <h3>Seragam & Perlengkapan</h3>
              <p>Rp 1.500.000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <p>© 2026 Panitia SPMB</p>

          <p>
            Bantuan: (021) 555-0123 · spmb@contoh.sch.id
          </p>
        </div>
      </footer>
    </main>
  );
}
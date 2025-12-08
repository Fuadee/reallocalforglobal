import logoUrl from '/logo.png';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#eaf3ff] to-[#f7f9fb] py-5">
      <div className="section-shell flex flex-col items-center gap-3 text-center">

        {/* Logo */}

        <a href="/" className="flex flex-col items-center gap-0">
          <img
            src={logoUrl}
            alt="JoinJoy Logo"
            className="h-14 w-14 mix-blend-multiply"
          />
          <span className="text-slate-800 font-semibold text-lg">
            JoinJoy Krabi
          </span>
        </a>




    

        {/* Social + Terms as vertical icons */}
        <div className="flex justify-center gap-6">

  {/* Instagram */}
  <a href="https://www.instagram.com/joinjoy.travel/" target="_blank" className="flex flex-col items-center gap-1 hover:text-[#1877F2] transition text-slate-600">
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="3" width="16" height="16" rx="4"></rect>
      <circle cx="11" cy="11" r="3"></circle>
      <circle cx="16" cy="7" r="1"></circle>
    </svg>
    <span className="text-sm">Instagram</span>
  </a>

  {/* Facebook */}
  <a href="https://www.facebook.com/Joinjoytravel" target="_blank" className="flex flex-col items-center gap-1 hover:text-[#1877F2] transition text-slate-600">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="mx-auto">
      <path d="M12 2C6.486 2 2 6.486 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H8v-2.89h2.438V9.797c0-2.412 1.432-3.743 3.626-3.743 1.051 0 2.149.188 2.149.188v2.36h-1.212c-1.194 0-1.566.741-1.566 1.498v1.79H16.5l-.4 2.89h-2.099v6.99C18.343 21.128 22 16.991 22 12c0-5.514-4.486-10-10-10z"/>
    </svg>
    <span className="text-sm">Facebook</span>
  </a>

  {/* TikTok */}
<a href="https://www.tiktok.com/@joinjoytravel?lang=en" target="_blank" className="flex flex-col items-center gap-1 hover:text-[#1877F2] transition text-slate-600">
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 3c.2 1.5 1.3 3 3 3.5v2.2c-1.3-.1-2.6-.6-3.7-1.3v5.4a4 4 0 1 1-4-4h1.2V6.5h-.2A6 6 0 1 0 14 12V3z" />
  </svg>
  <span className="text-sm">TikTok</span>
</a>

  {/* Terms */}
  <a href="/terms" className="flex flex-col items-center gap-1 hover:text-[#1877F2] transition text-slate-600">
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 4h16v16H4z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
    <span className="text-sm">Terms</span>
  </a>

</div>

        <p className="text-xs text-slate-400">© 2025 JoinJoy Travel</p>
      </div>
    </footer>
  );
}

export default Footer;

function Footer() {
  return (
    <footer
      className="bg-black border-t border-slate-800 text-slate-300"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Brand / Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} Ticketify. Tutti i diritti riservati.
        </p>

        {/* Navigazione footer */}
        <nav aria-label="Footer navigation">
          <ul className="flex gap-4 text-sm">
            <li>
              <a
                href="/privacy"
                className="
                  hover:text-slate-100
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-violet-500
                  rounded-sm
                "
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="
                  hover:text-slate-100
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-violet-500
                  rounded-sm
                "
              >
                Termini
              </a>
            </li>
            <li>
              <a
                href="/contatti"
                className="
                  hover:text-slate-100
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-violet-500
                  rounded-sm
                "
              >
                Contatti
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
export default Footer;
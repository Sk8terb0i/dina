import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // location.pathname enthält den Pfad OHNE den basename.
  // Wenn du auf der Startseite bist, ist es hier also immer "/"
  const location = useLocation();
  const navigate = useNavigate();

  // Hintergrund für den sticky Header beim Scrollen einblenden
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helfer-Funktion: Verhindert den Vite/GitHub Pages Reload-Bug
  const fixTrailingSlash = () => {
    setTimeout(() => {
      const currentBrowserPath = window.location.pathname;
      // Falls der Pfad in der URL exakt auf "dina" endet (ohne Slash), fügen wir ihn lautlos hinzu
      if (currentBrowserPath.endsWith("dina")) {
        window.history.replaceState(null, "", currentBrowserPath + "/");
      }
    }, 50);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    navigate("/");
    fixTrailingSlash();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname === "/") {
      // Wenn wir schon auf der Startseite sind, direkt runterscrollen
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Wenn wir auf "Über mich" sind: Zurück zur Startseite navigieren, Slash fixen und scrollen
      navigate("/");
      fixTrailingSlash();

      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Kurze Pause, damit die Startseite in Ruhe laden kann
    }
  };

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <style>
        {`
          .site-header {
            position: fixed; /* Header bleibt beim Scrollen oben */
            top: 0;
            left: 0;
            width: 100%;
            padding: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100;
            font-family: 'Satoshi', system-ui, sans-serif;
            color: #13256d;
            transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          }

          /* Sanfter Hintergrund beim Herunterscrollen */
          .site-header.scrolled {
            padding: 1.2rem 2rem;
            background-color: rgba(159, 184, 163, 0.92);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(19, 37, 109, 0.05);
          }

          .brand-link {
            font-size: 1.1rem;
            letter-spacing: 0.5px;
            white-space: nowrap;
            cursor: pointer;
          }

          .nav-menu {
            display: flex;
            gap: 2.5rem;
          }

          .nav-link {
            color: inherit;
            text-decoration: none;
            font-weight: 500;
            position: relative;
            padding-bottom: 4px;
            -webkit-tap-highlight-color: transparent;
            cursor: pointer;
          }

          /* Animierter Unterstrich */
          .nav-link::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: var(--primary, #D0D6CA);
            transform: scaleX(0);
            transform-origin: bottom right;
            transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          }

          .nav-link:hover::after,
          .nav-link:focus::after,
          .nav-link:active::after {
            transform: scaleX(1);
            transform-origin: bottom left;
          }

          /* Mobile Hamburger Button */
          .hamburger-btn {
            display: none;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            color: var(--text, #13256d);
            z-index: 101;
            -webkit-tap-highlight-color: transparent;
          }

          .mobile-menu-drawer {
            display: none;
          }

          /* Mobile Responsive Anpassungen */
          @media (max-width: 768px) {
            .site-header {
              padding: 1.25rem 1rem !important;
            }

            .site-header.scrolled {
              padding: 1rem !important;
            }

            .brand-link {
              font-size: clamp(0.72rem, 3.8vw, 0.95rem) !important;
              font-weight: 400 !important; 
              white-space: nowrap !important; 
              max-width: none !important;
            }

            .nav-menu {
              display: none !important;
            }

            .hamburger-btn {
              display: flex !important;
              align-items: center;
              justify-content: center;
            }

            /* Mobile Dropdown Menü */
            .mobile-menu-drawer {
              display: flex !important;
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background-color: rgba(159, 184, 163, 0.95);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              padding: 1.5rem 2rem 2rem 2rem;
              gap: 1.25rem;
              box-shadow: 0 10px 25px rgba(19, 37, 109, 0.08);
              opacity: 0;
              transform: translateY(-10px);
              pointer-events: none;
              transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
              z-index: 99;
              border-bottom: 1px solid rgba(19, 37, 109, 0.1);
            }

            .mobile-menu-drawer.open {
              opacity: 1;
              transform: translateY(0);
              pointer-events: auto;
            }

            .mobile-menu-drawer .nav-link {
              font-size: 1.1rem;
              padding: 0.4rem 0;
            }
          }
        `}
      </style>

      {/* Brand Title / Zurück zur Startseite */}
      <a href="/" onClick={handleHomeClick} className="nav-link brand-link">
        Dina Galizzi Psychosoziale Beratung
      </a>

      {/* Desktop Navigation */}
      <nav className="nav-menu">
        <Link to="/about" className="nav-link">
          Über mich
        </Link>
        <a href="#contact" onClick={handleContactClick} className="nav-link">
          Kontakt
        </a>
      </nav>

      {/* Mobile Hamburger Toggle Icon */}
      <button
        className="hamburger-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menü öffnen"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isMenuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu-drawer ${isMenuOpen ? "open" : ""}`}>
        <Link
          to="/about"
          className="nav-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Über mich
        </Link>
        <a href="#contact" className="nav-link" onClick={handleContactClick}>
          Kontakt
        </a>
      </div>
    </header>
  );
}

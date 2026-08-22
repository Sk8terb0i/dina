import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fixTrailingSlash = () => {
    setTimeout(() => {
      const currentBrowserPath = window.location.pathname;
      if (currentBrowserPath.endsWith("dina")) {
        window.history.replaceState(null, "", currentBrowserPath + "/");
      }
    }, 50);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("scrollToTop"));
    } else {
      navigate("/");
      fixTrailingSlash();
      setTimeout(() => window.scrollTo(0, 0), 50);
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("scrollToContact"));
    } else {
      navigate("/#contact");
      fixTrailingSlash();
    }
  };

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <style>
        {`
          .site-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100vw;
            max-width: 100%;
            box-sizing: border-box !important;
            padding: 1.5rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 100;
            font-family: 'Satoshi', system-ui, sans-serif;
            color: #13256d;
            transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
            border-bottom: 1px solid transparent;
          }

          /* Eleganter Frosted-Glass Effekt, der den Farbverlauf durchscheinen lässt */
          .site-header.scrolled {
            padding: 1rem 2rem;
            background-color: rgba(255, 255, 255, 0.15); 
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
          }

          .brand-link {
            display: block;
            flex: 1 1 auto;
            min-width: 0 !important;
            font-size: 1.1rem;
            letter-spacing: 0.5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
          }

          .nav-menu {
            display: flex;
            gap: 2.5rem;
            flex-shrink: 0;
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

          .nav-link::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: var(--secondary, #f0daf1);
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

          .hamburger-btn {
            display: none;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0.4rem;
            color: var(--text, #13256d);
            z-index: 101;
            flex: 0 0 auto !important; 
            margin-left: 0.75rem;
            -webkit-tap-highlight-color: transparent;
          }

          .mobile-menu-drawer {
            display: none;
          }

          @media (max-width: 768px) {
            .site-header {
              padding: 1rem 1.25rem !important;
            }

            .site-header.scrolled {
              padding: 0.85rem 1.25rem !important;
            }

            .brand-link {
              font-size: clamp(0.78rem, 3.8vw, 0.95rem) !important;
              font-weight: 500 !important;
            }

            .nav-menu {
              display: none !important;
            }

            .hamburger-btn {
              display: flex !important;
              align-items: center;
              justify-content: center;
            }

            .mobile-menu-drawer {
              display: flex !important;
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              width: 100%;
              box-sizing: border-box !important;
              /* Leicht verdunkelter Glass-Effekt für das Mobile-Menü */
              background-color: rgba(161, 212, 198, 0.85);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              padding: 1.5rem 1.5rem 2rem 1.5rem;
              gap: 1.25rem;
              box-shadow: 0 10px 25px rgba(19, 37, 109, 0.08);
              opacity: 0;
              transform: translateY(-10px);
              pointer-events: none;
              transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
              z-index: 99;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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

      {/* Brand Title */}
      <a href="/" onClick={handleHomeClick} className="brand-link">
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

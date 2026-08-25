import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

// ========================================================
// GLOBAL CONSTANTS
// ========================================================
const DESKTOP_SCROLL_MULTIPLIER = 0.4;
const DESKTOP_SCROLL_EASING = 0.08;

const TOP_SCREEN_OFFSET = "20vh";
const TIMELINE_TOP_GAP = "6rem";
const TIMELINE_LILY_SIZE = "60px";

// ========================================================
// HERO LILY SIZING (Easy to edit)
// ========================================================
// Desktop
const DESKTOP_HERO_LILY_WIDTH = "800px";
const DESKTOP_HERO_LILY_HEIGHT = "500px";

// Mobile
const MOBILE_HERO_LILY_WIDTH = "70vw";
const MOBILE_HERO_LILY_HEIGHT = "220px";
const MOBILE_HERO_LILY_X_OFFSET = "0px";

// ========================================================
// OTHER CONSTANTS
// ========================================================
const MOBILE_HEADER_TOP_PADDING = "16vh";
const MOBILE_SCROLL_FLIP_THRESHOLD = 2;
const MOBILE_LILY_FLIP_SPEED = "0.25s";
const MOBILE_TIMELINE_TOP_GAP = "2rem";

const MOBILE_CONTACT_CARD_WIDTH = "92%";
const MOBILE_CONTACT_CARD_MAX_WIDTH = "420px";
const MOBILE_CONTACT_CARD_PADDING = "2.2rem 1.25rem";

const WAVY_LINE_ANIM_SPEED = "3.2s";
const SECTION_FADE_SPEED = "0.8s";
const SECTION_STAGGER_STEP = 600;
const HERO_TEXT_FADE_SPEED = "1.8s";

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [contactMode, setContactMode] = useState("email");

  // Read More States
  const [ansatzExpanded, setAnsatzExpanded] = useState(false);
  const [zielExpanded, setZielExpanded] = useState(false);

  // ========================================================
  // FORM STATE & SUBMIT HANDLER
  // ========================================================
  const [formData, setFormData] = useState({
    name: "",
    contactValue: "",
    message: "",
    _gotcha: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: "" });

    try {
      const response = await fetch("https://formspree.io/f/meeyvnwz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          [contactMode === "email" ? "E-Mail" : "Telefonnummer"]:
            formData.contactValue,
          "Bevorzugte Kontaktart":
            contactMode === "email" ? "E-Mail" : "Telefonanruf",
          Nachricht: formData.message,
          _gotcha: formData._gotcha,
        }),
      });

      if (response.ok) {
        setFormStatus({ submitting: false, success: true, error: "" });
        setFormData({ name: "", contactValue: "", message: "", _gotcha: "" });
      } else {
        const data = await response.json();
        setFormStatus({
          submitting: false,
          success: false,
          error:
            data?.errors?.[0]?.message ||
            "Fehler beim Senden. Bitte erneut versuchen.",
        });
      }
    } catch (err) {
      setFormStatus({
        submitting: false,
        success: false,
        error:
          "Verbindungsfehler. Bitte sende eine E-Mail an kontakt@dinagalizzi.ch",
      });
    }
  };

  const targetScrollY = useRef(0);
  const isAnimatingScroll = useRef(false);
  const touchStartY = useRef(0);
  const scrollRafId = useRef(null);

  useEffect(() => {
    targetScrollY.current = window.scrollY;

    const updateScrollState = () => {
      const isMobile = window.innerWidth <= 768;
      const threshold = isMobile ? MOBILE_SCROLL_FLIP_THRESHOLD : 20;

      const currentY = isMobile
        ? window.scrollY
        : isAnimatingScroll.current
          ? targetScrollY.current
          : window.scrollY;

      setIsScrolled(currentY > threshold);
      setShowBackToTop(window.scrollY > 400);
    };

    const handleNativeScroll = () => {
      if (!isAnimatingScroll.current) {
        targetScrollY.current = window.scrollY;
      }
      updateScrollState();
    };

    const handleTouchStart = (e) => {
      if (window.innerWidth <= 768 && e.touches.length > 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.innerWidth <= 768 && e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const dragDistance = touchStartY.current - currentY;

        if (dragDistance > 2) {
          setIsScrolled(true);
        } else if (dragDistance < -5 || window.scrollY <= 2) {
          setIsScrolled(false);
        }
      }
    };

    const smoothScrollLoop = () => {
      const currentY = window.scrollY;
      const diff = targetScrollY.current - currentY;

      if (Math.abs(diff) < 0.5) {
        window.scrollTo(0, targetScrollY.current);
        isAnimatingScroll.current = false;
        updateScrollState();
        return;
      }

      window.scrollTo(0, currentY + diff * DESKTOP_SCROLL_EASING);
      scrollRafId.current = requestAnimationFrame(smoothScrollLoop);
    };

    const handleWheel = (e) => {
      if (window.innerWidth < 768) return;
      e.preventDefault();

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      targetScrollY.current = Math.max(
        0,
        Math.min(
          targetScrollY.current + e.deltaY * DESKTOP_SCROLL_MULTIPLIER,
          maxScroll,
        ),
      );

      updateScrollState();

      if (!isAnimatingScroll.current) {
        isAnimatingScroll.current = true;
        scrollRafId.current = requestAnimationFrame(smoothScrollLoop);
      }
    };

    const handleScrollToTopEvent = () => {
      targetScrollY.current = 0;
      if (!isAnimatingScroll.current && window.innerWidth >= 768) {
        isAnimatingScroll.current = true;
        scrollRafId.current = requestAnimationFrame(smoothScrollLoop);
      } else if (window.innerWidth < 768) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const handleScrollToContactEvent = () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const headerOffset = 100;
        const y =
          contactSection.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;

        if (window.innerWidth >= 768) {
          targetScrollY.current = Math.max(0, y);
          if (!isAnimatingScroll.current) {
            isAnimatingScroll.current = true;
            scrollRafId.current = requestAnimationFrame(smoothScrollLoop);
          }
        } else {
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scrollToTop", handleScrollToTopEvent);
    window.addEventListener("scrollToContact", handleScrollToContactEvent);

    updateScrollState();

    if (window.location.hash === "#contact") {
      setTimeout(handleScrollToContactEvent, 250);
    }

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scrollToTop", handleScrollToTopEvent);
      window.removeEventListener("scrollToContact", handleScrollToContactEvent);
      if (scrollRafId.current) {
        cancelAnimationFrame(scrollRafId.current);
      }
      isAnimatingScroll.current = false;
    };
  }, []);

  const handleScrollToTop = () => {
    window.dispatchEvent(new CustomEvent("scrollToTop"));
  };

  const getBlockDelay = (index, totalBlocks = 4) => {
    return isScrolled
      ? index * SECTION_STAGGER_STEP
      : (totalBlocks - 1 - index) * SECTION_STAGGER_STEP;
  };

  const seoData = {
    title: "Dina Galizzi | Psychosoziale Beratung",
    description: "Einfühlsame psychosoziale Beratung für neue Perspektiven.",
    canonicalUrl: "https://dinagalizzi.ch/",
  };

  const kostenItems = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      title: "Format",
      desc: "Einzelberatung. Beratung in deutscher und englischer Sprache möglich.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      title: "Dauer",
      desc: "60 bis 90 Minuten pro Gespräch",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <circle cx="12" cy="12" r="2"></circle>
          <path d="M6 12h.01M18 12h.01"></path>
        </svg>
      ),
      title: "Kosten",
      desc: "CHF 100 pro Stunde",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      title: "Erstgespräch",
      desc: "CHF 60",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="5" x2="5" y2="19"></line>
          <circle cx="6.5" cy="6.5" r="2.5"></circle>
          <circle cx="17.5" cy="17.5" r="2.5"></circle>
        </svg>
      ),
      title: "Vergünstigungen",
      desc: "Nach Absprache (z.B. für Studierende, AHV-Bezüger, IV-Bezüger)",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      ),
      title: "Bezahlung",
      desc: "Direkt im Anschluss bar oder via Twint",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
      title: "Terminabsagen",
      desc: "Bitte 24h im Voraus. Bei späteren Absagen oder unentschuldigtem Nichterscheinen wird ein Unkostenbeitrag von CHF 50.– verrechnet.",
    },
  ];

  const methodenItems = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      ),
      title: "Individualpsychologie",
      desc: "Nach Alfred Adler",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
      ),
      title: "Gesprächs- und lösungsorientierte Beratung",
      desc: "Fokussiert und zielgerichtet",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      title: "Ressourcen- und Resilienzförderung",
      desc: "Stärkung der inneren Widerstandskraft",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12h4l2-9 5 18 3-10h4"></path>
        </svg>
      ),
      title: "Werteorientierte Beratung",
      desc: "Ausrichtung an persönlichen Überzeugungen, Personenzentrierte Beratung nach Karl Rogers",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: "Förderung der Selbstreflexion",
      desc: "und Selbstwirksamkeit",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
          <line x1="16" y1="8" x2="2" y2="22"></line>
          <line x1="17.5" y1="15" x2="9" y2="15"></line>
        </svg>
      ),
      title: "Gebetsseelsorge",
      desc: "Auf Wunsch. Ich bin Christin, und mein Glaube prägt mein Menschenbild sowie meine Werte. Wenn du dies wünschst, kann das Gebet als ergänzender Bestandteil in die Beratung einfliessen. Dies geschieht ausschliesslich auf deinen ausdrücklichen Wunsch und mit Respekt gegenüber deiner persönlichen Überzeugung.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
      title: "Keine Traumatherapie",
      desc: "Bei schweren Traumafolgen oder akuten psychischen Belastungen ist es mir wichtig, dass du die bestmögliche Unterstützung durch eine spezialisierte Fachperson erhältst. Sehr gerne begleite ich dich jedoch einfühlsam bei belastenden Lebenserfahrungen im Rahmen meiner Möglichkeiten. Wenn es für dich hilfreich ist, kann dies auch eine wertvolle Ergänzung zu einer laufenden Therapie sein.",
    },
  ];

  // ========================================================
  // SANFTE MODULARE SVG-LINIE FÜR JEDEN BLOCK
  // ========================================================
  const TimelineBgCurve = ({ reverse }) => {
    const xMid = reverse ? 45 : 55;
    const pathData = `M 50,0 C 50,30 ${xMid},35 ${xMid},50 C ${xMid},65 50,70 50,100`;

    return (
      <div
        className="desktop-timeline-line"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <svg
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          style={{ overflow: "visible" }}
        >
          <path
            d={pathData}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.5"
            opacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  };

  const TimelineLilyPad = ({ rotation = 0, xPos = "50%", scale = 1 }) => {
    const baseSize = parseInt(TIMELINE_LILY_SIZE) || 48;
    const computedSize = `${baseSize * scale}px`;

    return (
      <div
        className="timeline-lily-wrapper"
        style={{
          position: "absolute",
          left: xPos,
          top: "50%",
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          "--lily-rot": `${rotation}deg`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <svg
          viewBox="0 0 48.25 46.59"
          width={computedSize}
          height={computedSize}
          style={{ overflow: "visible" }}
        >
          <path
            d="M17.68,4.77c1.57.66,3.18,1.56,3.45,4.57.06.7-.25,2.14-.03,2.81.88,2.76,3.83,1.24,3.31-.49-.63-2.12-1.59-2.92-1.89-3.86-.77-2.39.23-3.96,1.85-5.41C27.1-.06,33,.04,36.25,1.72c6.11,3.17,14.17,10.59,10.63,27.13-5.47,25.52-42.23,21.27-45.87-3.34,0,0-3.39-11.81,7.36-19.12,2.85-1.94,6.13-2.95,9.31-1.62Z"
            fill="var(--primary)"
          />
        </svg>
      </div>
    );
  };

  return (
    <main
      style={{
        "--text": "#13256d",
        "--background-solid": "#68B2AD",
        "--primary": "#D0D6CA",
        "--secondary": "#f0daf1",
        "--accent": "#e3efff",
        color: "var(--text)",
        fontFamily: "'Satoshi', system-ui, sans-serif",
        minHeight: "100vh",
        fontWeight: 400,
        position: "relative",
        overflowX: "hidden",
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonicalUrl} />

        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />

        <style>
          {`
            html, #root {
              margin: 0 !important;
              padding: 0 !important;
              background: linear-gradient(180deg, #A1D4C6 0%, #68B2AD 50%, #3B8F92 100%) !important;
              width: 100% !important;
              max-width: 100vw !important;
              overflow-x: hidden !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
              background: transparent !important;
              width: 100% !important;
              max-width: 100vw !important;
              overflow-x: hidden !important;
              scroll-behavior: auto !important;
            }
            * {
              box-sizing: border-box !important;
            }

            ::-webkit-scrollbar {
              width: 12px;
              -webkit-appearance: none;
            }
            html::-webkit-scrollbar, body::-webkit-scrollbar {
              display: block !important;
            }
            ::-webkit-scrollbar-track {
              background: #68B2AD;
            }
            ::-webkit-scrollbar-thumb {
              background: #13256d;
              border-radius: 10px;
              border: 3px solid #68B2AD;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #272e6a;
            }

            .hero-lily-container {
              width: 100%;
              max-width: ${DESKTOP_HERO_LILY_WIDTH};
              height: ${DESKTOP_HERO_LILY_HEIGHT};
              position: relative;
              z-index: 2;
            }
            
            .hero-lily-container svg {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }

            .hero-top-text {
              font-size: clamp(1.6rem, 3.5vw, 2.4rem);
              font-weight: 500;
              margin-top: 5rem;
              margin-bottom: -3rem;
              color: var(--text);
              letter-spacing: -0.02em;
              opacity: 1;
              transform: translateY(0);
              transition: opacity ${HERO_TEXT_FADE_SPEED} ease-in-out, transform ${HERO_TEXT_FADE_SPEED} ease-in-out;
            }
            .hero-top-text.scrolled {
              opacity: 0;
              transform: translateY(-20px);
            }

            .bottom-text-block {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity ${HERO_TEXT_FADE_SPEED} ease-in-out, transform ${HERO_TEXT_FADE_SPEED} ease-in-out;
            }
            .bottom-text-block.scrolled {
              opacity: 1;
              transform: translateY(0);
            }

            .intro-ul {
              list-style: none;
              padding: 0;
              margin: 1.25rem 0;
              font-style: italic;
              opacity: 0.9;
            }
            .intro-ul li {
              margin-bottom: 0.6rem;
            }

            .read-more-btn {
              background: none;
              border: none;
              color: var(--text);
              font-weight: 600;
              font-size: 1rem;
              padding: 0;
              margin-top: 0.5rem;
              cursor: pointer;
              text-decoration: underline;
              text-underline-offset: 4px;
              text-decoration-color: var(--secondary);
              opacity: 0.8;
              transition: opacity 0.2s;
              font-family: inherit;
            }
            .read-more-btn:hover {
              opacity: 1;
            }
            .expanded-content {
              animation: fadeIn 0.5s ease-out forwards;
              margin-top: 0.8rem;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-5px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .kosten-list, .methoden-list {
              display: flex;
              flex-direction: column;
              gap: 1.2rem;
              margin-top: 1.5rem;
            }
            .kosten-item {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              gap: 1.25rem;
              text-align: right;
            }
            .methoden-item {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 1.25rem;
              text-align: left;
            }
            .kosten-item-text, .methoden-item-text {
              display: flex;
              flex-direction: column;
              gap: 0.15rem;
            }
            .kosten-item-title, .methoden-item-title {
              font-weight: 600;
              font-size: 1.05rem;
              color: var(--text);
            }
            .kosten-item-desc, .methoden-item-desc {
              font-size: 0.95rem;
              opacity: 0.85;
              line-height: 1.4;
            }
            .kosten-item-icon, .methoden-item-icon {
              width: 22px;
              height: 22px;
              flex-shrink: 0;
              color: var(--text);
              background: rgba(19, 37, 109, 0.06);
              padding: 10px;
              border-radius: 50%;
              box-sizing: content-box !important;
            }

            .back-to-top-btn {
              position: fixed;
              bottom: 2rem;
              right: 2rem;
              background: transparent;
              border: none;
              color: var(--text);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              z-index: 100;
              opacity: 0;
              transform: translateY(12px);
              pointer-events: none;
              transition: all 0.35s ease;
              padding: 6px;
            }
            .back-to-top-btn.visible {
              opacity: 0.75;
              transform: translateY(0);
              pointer-events: auto;
            }
            .back-to-top-btn:hover {
              opacity: 1;
              transform: translateY(-4px);
            }

            ::placeholder {
              color: var(--text) !important;
              opacity: 0.55 !important;
            }

            @media (max-width: 768px) {
              .hero-top-text {
                margin-top: 1.5rem !important;
                margin-bottom: -4rem !important;
              }  
            
              .header-section {
                padding-top: ${MOBILE_HEADER_TOP_PADDING} !important;
                padding-left: 1.25rem !important;
                padding-right: 1.25rem !important;
              }

              .hero-lily-container {
                width: 100% !important;
                height: ${MOBILE_HERO_LILY_HEIGHT} !important;
                margin: 0 !important;
                overflow: visible !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
              }

              .hero-lily-container svg {
                width: ${MOBILE_HERO_LILY_WIDTH} !important; 
                max-width: ${MOBILE_HERO_LILY_WIDTH} !important; 
                min-width: ${MOBILE_HERO_LILY_WIDTH} !important; 
                height: auto !important;
                flex-shrink: 0 !important;
                transform: translateX(${MOBILE_HERO_LILY_X_OFFSET}) !important;
              }

              .hero-lily-container > div {
                transition: opacity ${MOBILE_LILY_FLIP_SPEED} ease-in-out !important;
              }

              .bottom-text-block {
                margin-top: 0.5rem !important;
                padding: 0 0.5rem;
                /* Controls the normal paragraph text at the bottom */
                font-size: 1.1rem !important; 
              }

              /* Controls the bold "Schön, dass du..." headline */
              .bottom-text-block p:first-child {
                font-size: 1.6rem !important; 
              }

              /* Controls the bullet point list items */
              .bottom-text-block .intro-ul li {
                font-size: 1rem !important; 
              }

              .timeline-wrapper {
                margin-top: ${MOBILE_TIMELINE_TOP_GAP} !important;
              }
              .timeline-container {
                display: flex !important;
                flex-direction: column !important;
                padding: 1rem 1.25rem 3rem 1.25rem !important;
              }
              .desktop-timeline-line {
                display: none !important;
              }

              .timeline-block, .timeline-block-reverse {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: none !important;
                flex-direction: column !important;
                margin-bottom: 4rem !important;
                justify-content: center !important;
                align-items: center !important;
                text-align: center !important;
                min-height: auto !important;
                padding: 0 !important;
              }
              
              .timeline-content {
                width: 100% !important;
                padding: 0 !important;
                text-align: center !important;
                margin-bottom: 0 !important;
                order: 2 !important; 
              }
              .timeline-lily-wrapper {
                position: relative !important;
                left: auto !important;
                top: auto !important;
                transform: rotate(var(--lily-rot, 0deg)) !important;
                margin-bottom: 1.5rem !important;
                order: 1 !important;
              }

              .kosten-list, .methoden-list {
                gap: 0.75rem;
                margin-top: 1.5rem;
              }
              .kosten-item, .methoden-item {
                flex-direction: row;
                justify-content: flex-start;
                text-align: left;
                background: rgba(208, 214, 202, 0.4);
                padding: 1.2rem;
                border-radius: 20px;
                gap: 1rem;
              }
              .kosten-item {
                flex-direction: row-reverse;
                justify-content: flex-end;
              }
              .kosten-item-text, .methoden-item-text {
                align-items: flex-start;
              }
              .kosten-item-icon, .methoden-item-icon {
                background: transparent;
                padding: 0;
                width: 28px;
                height: 28px;
              }

              .contact-card {
                width: 92% !important;
                padding: ${MOBILE_CONTACT_CARD_PADDING} !important;
                margin: 0 auto 3.5rem auto !important;
                border-radius: 24px !important;
              }
              .contact-card h3 {
                font-size: 1.15rem !important;
                margin-bottom: 1.8rem !important;
              }
              .contact-card h2 {
                font-size: 1.25rem !important;
              }
              .contact-card form {
                gap: 1.4rem !important;
              }
              .contact-toggle-group button {
                flex: 1;
                padding: 0.45rem 0.8rem !important;
                font-size: 0.85rem !important;
              }
              .back-to-top-btn {
                bottom: 1.25rem;
                right: 1.25rem;
              }
            }
          `}
        </style>
      </Helmet>

      {/* ======================================================== */}
      {/* HEADER SECTION                                           */}
      {/* ======================================================== */}
      <section
        className="header-section"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: TOP_SCREEN_OFFSET,
          paddingBottom: "2vh",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          textAlign: "center",
        }}
      >
        <div className="hero-lily-container">
          {/* CLOSED LILY */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isScrolled ? 0 : 1,
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <svg
              id="waterlily_closed"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 300"
            >
              <g id="lily_closed" data-name="lily closed">
                <path
                  fill="var(--accent)"
                  d="M120.06,172.19c-30.18-6.35-57.18-25.2-74.22-50.83-2.44-3.68-4.71-7.41-6.64-11.47-.27-.57.08-1.27.7-1.38,24.33-4.52,49.82-6.05,74.02.01,0,0-1.24,1.13-1.24,1.13-2.93-21.71-2.47-44.25,4.38-65.21,2.35-6.95,5.56-13.68,9.89-19.68.32-.45.94-.56,1.39-.23,15.78,11.75,34.3,27.9,42.19,46.25,0,0-1.92.48-1.92.48-.27-3.24-.19-6.37.05-9.54.74-9.46,3.29-18.78,7.57-27.26,5.68-11.34,14.73-20.84,25.43-27.57.36-.23.82-.2,1.14.05,12.72,10.32,23.51,23,31.32,37.4,2.6,4.8,4.75,9.85,6.47,15.05,0,0-1.89-.04-1.89-.04,3.63-8.19,10.01-14.72,17.02-20.1,7.04-5.31,14.99-9.26,23.23-12.21.46-.17.97.02,1.2.44,10.33,18.93,18.61,39.32,21.45,60.82.85,7.17.97,14.51-.36,21.7-.76,3.66-1.51,7.26-3.65,10.49-.77,1.28-2.91,2.84-4.62,1.82-2.35-1.43-2.78-4.36-3-6.82-.67-15.75,13.95-26.87,28.07-29.63,7.11-1.61,14.42-1.94,21.63-1.63.55.01.98.48.96,1.03-1.62,7.95-4.01,15.64-6.79,23.21-8.4,22.16-21.41,44.93-43.55,55.63,0,0-.38-1.9-.38-1.9,19.66,1.58,39.48,6.51,56.15,17.35,5.51,3.67,10.56,8.13,14.62,13.43.33.4.28,1-.11,1.34-22.73,18.91-53.49,26.48-82.64,24.27-9.76-.75-19.43-2.5-28.85-5.11,0,0,1.26-.85,1.26-.85-.99,7.29-2.57,14.39-4.45,21.44-5.76,21.08-14.75,41.55-28.35,58.79-.26.35-.72.47-1.11.32-4.18-1.59-7.95-3.74-11.57-6.2-27.2-18.51-32.86-51.33-26.08-81.72,0,0,1.78.8,1.78.8-1.4,1.75-2.91,3.16-4.5,4.57-17.73,14.95-41.27,20.78-63.87,23.11-8.29.81-16.62,1.05-24.93.9-.55,0-1-.45-.98-1,1.9-8.99,5.24-17.53,9.49-25.64,13.66-26.17,37.72-40.43,67.4-36.13,0,0-.85,1.68-.85,1.68-5.24-5.79-9.6-12.14-13.55-18.77-11.78-19.91-18.45-42.9-18.44-66.08,0-.52.41-.95.92-.97,10.85-.41,21.76,1.91,31.38,6.95,3.2,1.68,6.21,3.74,8.99,6.05,0,0-1.63.58-1.63.58,2.15-11.17,9.84-30.66,23.82-19.75,4.96,3.9,15.25,16.26,12.94,22.88-.77,2.3-3.77,2.83-5.72,1.95-5.49-2.23-7.64-8.78-7.03-14.18.79-7.25,4.89-13.52,9.46-18.92,15.7-18.59,24.33-6.99,24.88,12.6.04,7.09.03,14.44-3.03,21.02-1,2.15-3.85,2.87-5.78,1.66-5.04-3.23-5.73-10.27-3.66-15.39,3.69-8.66,13.25-12.35,21.78-14.24,18.26-3.98,18.51,13.41,14.12,26.1-2.38,6.66-5.3,13.58-10.9,18.2-6.85,5.03-9.98-5.25-8.2-10.47,2.79-8.7,10.76-14.31,18-19.14,5.94-3.77,12.15-6.98,18.61-9.75.56-.25,1.23.15,1.27.76,1.85,24.48,2.38,64.86-12.01,85.35-.37.45-1.04-.03-.72-.52,8.14-12.02,10.1-27.09,11.39-41.27,1.07-14.42.77-28.99-.51-43.38,0,0,1.27.76,1.27.76-10.99,4.9-37.68,18.15-35.66,32.44,3.62,19.12,27.7-28.76,13.24-36.52-5.97-3.25-18.31,1.38-23.57,4.99-2.74,1.89-5.05,4.41-6.27,7.43-1.75,4.17-1.2,10.27,2.76,12.88,1.21.71,2.5.31,3.09-.91,1.49-2.84,1.98-6.44,2.38-9.67.78-8.25,1.05-22.98-5.13-29.06-7.03-5.79-18.72,10.27-21.72,15.77-1.6,2.97-2.8,6.18-3.12,9.46-.52,4.68,1.22,10.21,5.74,12.12,1.2.45,2.65.48,3.16-.84,1.56-5.72-7.92-17.13-12.31-20.55-12.19-9.87-18.76,9.14-20.63,18.54-.12.74-1.08,1.05-1.63.57-2.67-2.22-5.56-4.19-8.64-5.82-9.22-4.85-19.91-7.11-30.29-6.72,0,0,.92-1,.92-1,0,22.81,6.57,45.44,18.17,65.04,3.86,6.51,8.23,12.84,13.27,18.4.68.63.03,1.84-.85,1.68-28.86-4.18-52.08,9.64-65.37,35.09-4.14,7.81-7.38,16.27-9.27,24.89,0,0-.96-1.19-.96-1.19,16.46.3,33.04-1,49.03-5.03,15.57-4.14,31.66-10.56,42.63-22.76.63-.86,2.01-.21,1.78.8-1.76,8.34-2.72,16.85-2.53,25.35.12,21.2,9.91,42.41,27.78,54.31,3.47,2.37,7.23,4.49,11.08,5.95l-1.11.32c17.74-22.74,28.05-50.87,32.38-79.22.06-.61.68-1.01,1.26-.85,9.3,2.58,18.84,4.31,28.46,5.04,2.15.23,5.08.25,7.22.37,26.27.45,53.53-7.15,73.91-24.1,0,0-.11,1.34-.11,1.34-7.89-10.28-19.42-17.14-31.39-21.75-12.09-4.58-25.01-7.33-37.88-8.25-.56-.03-.99-.5-.95-1.06.02-.38.25-.69.57-.84,7.08-3.33,13.37-8.23,18.75-13.94,16.06-17.45,25.24-40.44,30.45-63.31,0,0,.94,1.19.94,1.19-16.7-.8-37.78,2.4-45.61,19.18-1.86,4.39-3.19,10.25-.72,14.53.37.45.69.79,1.24.67,1.95-.93,2.82-3.78,3.54-5.86,2.55-8.45,2.62-17.44,1.58-26.2-2.78-21.16-11.03-41.42-21.19-60.05,0,0,1.2.44,1.2.44-15.76,5.72-31.66,15.53-39.05,31.12-.31.9-1.63.82-1.89-.04-5.02-15.31-14.27-28.95-25.3-40.59-3.7-3.87-7.64-7.6-11.79-10.88,0,0,1.14.05,1.14.05-21.33,13.07-33.74,37.58-32.13,62.47.11,1.13-1.52,1.49-1.92.46-1.95-4.72-4.66-9.15-7.75-13.29-9.38-12.4-21.25-22.88-33.74-32.07,0,0,1.39-.23,1.39-.23-16.28,23.2-17.5,56.12-13.92,83.39.13.7-.58,1.31-1.25,1.12-11.86-3.11-24.22-4.03-36.47-3.85-12.26.23-24.6,1.48-36.61,3.86,0,0,.7-1.38.7-1.38,1.78,3.85,4.02,7.62,6.37,11.24,11.9,18.12,28.69,33.05,48.28,42.4,7.86,3.69,16.12,6.53,24.59,8.48.27.06.45.33.38.61-.06.27-.33.44-.6.39h0Z"
                />
              </g>
            </svg>
          </div>

          {/* OPEN LILY */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isScrolled ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <svg
              id="waterlily_open"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 300"
            >
              <g id="lily_open" data-name="lily open">
                <path
                  fill="#e8e7e389"
                  d="M289.86,163.2c38.31-18.06,49.76-77.96,49.76-77.96-19.04-.86-31.11,3.49-38.48,9.45-1.57-31.82-21.86-66.69-21.86-66.69-32.17,11.45-39.65,31.71-39.65,31.71-10.14-31.27-37.44-51.96-37.44-51.96-37,23.34-32.59,63.41-32.59,63.41-9.24-22.91-41.84-45.81-41.84-45.81-22.9,31.73-14.09,84.13-14.09,84.13-33.04-8.8-73.55,0-73.55,0,0,0,21.72,49.3,80.05,62.2,0,0,6.01,1.36,16.25,2.52h.37c-40.15,10.58-49.5,59.45-49.5,59.45,70.45,1.32,92.48-28.19,92.48-28.19-14.53,69.14,36.99,86.76,36.99,86.76,27.32-34.36,32.59-79.72,32.59-79.72,69.58,19.38,110.54-18.93,110.54-18.93-21.57-28.19-70.02-30.39-70.02-30.39Z"
                />
                <path
                  fill="var(--accent)"
                  d="M120.06,172.19c-30.18-6.35-57.18-25.2-74.22-50.83-2.44-3.68-4.71-7.41-6.64-11.47-.27-.57.08-1.27.7-1.38,24.33-4.52,49.82-6.05,74.02.01,0,0-1.24,1.13-1.24,1.13-2.93-21.71-2.47-44.25,4.38-65.21,2.35-6.95,5.56-13.68,9.89-19.68.32-.45.94-.56,1.39-.23,15.78,11.75,34.3,27.9,42.19,46.25,0,0-1.92.48-1.92.48-.27-3.24-.19-6.37.05-9.54.74-9.46,3.29-18.78,7.57-27.26,5.68-11.34,14.73-20.84,25.43-27.57.36-.23.82-.2,1.14.05,12.72,10.32,23.51,23,31.32,37.4,2.6,4.8,4.75,9.85,6.47,15.05l-1.89-.04c3.63-8.19,10.01-14.72,17.02-20.1,7.04-5.31,14.99-9.26,23.23-12.21.46-.17.97.02,1.2.44,10.33,18.93,18.61,39.32,21.45,60.82.85,7.17.97,14.51-.36,21.7-.76,3.66-1.51,7.26-3.65,10.49-.77,1.28-2.91,2.84-4.62,1.82-2.35-1.43-2.78-4.36-3-6.82-.67-15.75,13.95-26.87,28.07-29.63,7.11-1.61,14.42-1.94,21.63-1.63.55.01.98.48.96,1.03-1.62,7.95-4.01,15.64-6.79,23.21-8.4,22.16-21.41,44.93-43.55,55.63,0,0-.38-1.9-.38-1.9,19.66,1.58,39.48,6.51,56.15,17.35,5.51,3.67,10.56,8.13,14.62,13.43.33.4.28,1-.11,1.34-22.73,18.91-53.49,26.48-82.64,24.27-9.76-.75-19.43-2.5-28.85-5.11,0,0,1.26-.85,1.26-.85-.99,7.29-2.57,14.39-4.45,21.44-5.76,21.08-14.75,41.55-28.35,58.79-.26.35-.72.47-1.11.32-4.18-1.59-7.95-3.74-11.57-6.2-27.2-18.51-32.85-51.33-26.08-81.72,0,0,1.78.8,1.78.8-1.4,1.75-2.91,3.16-4.5,4.57-17.73,14.95-41.27,20.78-63.87,23.11-8.29.81-16.62,1.05-24.93.9-.55,0-1-.45-.98-1,1.9-8.99,5.24-17.53,9.49-25.64,13.66-26.17,37.72-40.43,67.4-36.13,0,0-.85,1.68-.85,1.68-5.24-5.79-9.6-12.14-13.55-18.77-11.78-19.91-18.45-42.9-18.44-66.08,0-.52.41-.95.92-.97,10.85-.41,21.76,1.91,31.38,6.95,3.2,1.68,6.21,3.74,8.99,6.05,0,0-1.63.58-1.63.58,2.15-11.17,9.84-30.66,23.82-19.75,4.96,3.9,15.25,16.26,12.94,22.88-.77,2.3-3.77,2.83-5.72,1.95-5.49-2.23-7.64-8.78-7.03-14.18.79-7.25,4.89-13.52,9.46-18.92,15.7-18.59,24.33-6.99,24.88,12.6.04,7.09.03,14.44-3.03,21.02-1,2.15-3.85,2.87-5.78,1.66-5.04-3.23-5.73-10.27-3.66-15.39,3.69-8.66,13.25-12.35,21.78-14.24,18.26-3.98,18.51,13.41,14.12,26.1-2.38,6.66-5.3,13.58-10.9,18.2-6.85,5.03-9.98-5.25-8.2-10.47,2.79-8.7,10.76-14.31,18-19.14,5.94-3.77,12.15-6.98,18.61-9.75.56-.25,1.23.15,1.27.76,1.85,24.48,2.38,64.86-12.01,85.35-.37.45-1.04-.03-.72-.52,8.14-12.02,10.1-27.09,11.39-41.27,1.07-14.42.77-28.99-.51-43.38,0,0,1.27.76,1.27.76-10.99,4.9-37.68,18.15-35.66,32.44,3.62,19.12,27.7-28.76,13.24-36.52-5.97-3.25-18.31,1.38-23.57,4.99-2.74,1.89-5.05,4.41-6.27,7.43-1.75,4.17-1.2,10.27,2.76,12.88,1.21.71,2.5.31,3.09-.91,1.49-2.84,1.98-6.44,2.38-9.67.78-8.25,1.05-22.98-5.13-29.06-7.03-5.79-18.72,10.27-21.72,15.77-1.6,2.97-2.8,6.18-3.12,9.46-.52,4.68,1.22,10.21,5.74,12.12,1.2.45,2.65.48,3.16-.84,1.56-5.72-7.92-17.13-12.31-20.55-12.19-9.87-18.76,9.14-20.63,18.54-.12.74-1.08,1.05-1.63.57-2.67-2.22-5.56-4.19-8.64-5.82-9.22-4.85-19.91-7.11-30.29-6.72,0,0,.92-1,.92-1,0,22.81,6.57,45.44,18.17,65.04,3.86,6.51,8.23,12.84,13.27,18.4.68.63.03,1.84-.85,1.68-28.86-4.18-52.08,9.64-65.37,35.09-4.14,7.81-7.38,16.27-9.27,24.89,0,0-.96-1.19-.96-1.19,16.46.3,33.04-1,49.03-5.03,15.57-4.14,31.66-10.56,42.63-22.76.63-.86,2.01-.21,1.78.8-1.76,8.34-2.72,16.85-2.53,25.35.12,21.2,9.91,42.41,27.78,54.31,3.47,2.37,7.23,4.49,11.08,5.95l-1.11.32c17.74-22.74,28.05-50.87,32.38-79.22.06-.61.68-1.01,1.26-.85,9.3,2.58,18.84,4.31,28.46,5.04,2.15.23,5.08.25,7.22.37,26.27.45,53.53-7.15,73.91-24.1,0,0-.11,1.34-.11,1.34-7.89-10.28-19.42-17.14-31.39-21.75-12.09-4.58-25.01-7.33-37.88-8.25-.56-.03-.99-.5-.95-1.06.02-.38.25-.69.57-.84,7.08-3.33,13.37-8.23,18.75-13.94,16.06-17.45,25.24-40.44,30.45-63.31,0,0,.94,1.19.94,1.19-16.7-.8-37.78,2.4-45.61,19.18-1.86,4.39-3.19,10.25-.72,14.53.37.45.69.79,1.24.67,1.95-.93,2.82-3.78,3.54-5.86,2.55-8.45,2.62-17.44,1.58-26.2-2.78-21.16-11.03-41.42-21.19-60.05,0,0,1.2.44,1.2.44-15.76,5.72-31.66,15.53-39.05,31.12-.31.9-1.63.82-1.89-.04-5.02-15.31-14.27-28.95-25.3-40.59-3.7-3.87-7.64-7.6-11.79-10.88,0,0,1.14.05,1.14.05-21.33,13.07-33.74,37.58-32.13,62.47.11,1.13-1.52,1.49-1.92.46-1.95-4.72-4.66-9.15-7.75-13.29-9.38-12.4-21.25-22.88-33.74-32.07,0,0,1.39-.23,1.39-.23-16.28,23.2-17.5,56.12-13.92,83.39.13.7-.58,1.31-1.25,1.12-11.86-3.11-24.22-4.03-36.47-3.85-12.26.23-24.6,1.48-36.61,3.86,0,0,.7-1.38.7-1.38,1.78,3.85,4.02,7.62,6.37,11.24,11.9,18.12,28.69,33.05,48.28,42.4,7.86,3.69,16.12,6.53,24.59,8.48.27.06.45.33.38.61-.06.27-.33.44-.6.39h0Z"
                />
              </g>
            </svg>
          </div>
        </div>

        <h1 className={`hero-top-text ${isScrolled ? "scrolled" : ""}`}>
          «Dein Weg zu mehr Klarheit und innerer Stärke»
        </h1>

        <div
          className={`bottom-text-block ${isScrolled ? "scrolled" : ""}`}
          style={{
            width: "100%",
            maxWidth: "700px",
            zIndex: 10,
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          <p
            style={{
              fontWeight: 500,
              marginBottom: "1.5rem",
              fontSize: "1.2rem",
            }}
          >
            Schön, dass du den Weg hierher gefunden hast.
          </p>
          <p style={{ margin: 0 }}>«Du bist hier richtig, wenn du…</p>
          <ul className="intro-ul">
            <li>
              …in einer schwierigen Lebenssituation steckst und Neuorientierung
              suchst.
            </li>
            <li>…dich von destruktiven Denkmustern befreien möchtest.</li>
            <li>
              …deine eigene Berufung und deine Stärken (wieder)finden willst.»
            </li>
          </ul>
          <p style={{ opacity: 0.9 }}>
            Sich Unterstützung zu holen, ist der erste Schritt auf dem Weg zur
            Veränderung. In meiner psychosozialen Beratung begleite ich dich
            dabei, alte Denkmuster aufzubrechen und dein volles Potenzial zu
            entfalten.
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* TIMELINE SECTION                                         */}
      {/* ======================================================== */}
      <div
        className="timeline-wrapper"
        style={{
          marginTop: TIMELINE_TOP_GAP,
          transform: isScrolled ? "translateY(-40px)" : "translateY(0)",
          transition: "transform 0.6s ease-out",
        }}
      >
        <section
          className="timeline-container"
          style={{
            position: "relative",
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "grid",
            gridTemplateRows: "repeat(4, auto)",
            gap: 0,
          }}
        >
          {/* BLOCK 1: Der Ansatz */}
          <div
            className="timeline-block"
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? "translateY(0)" : "translateY(20px)",
              transition: `opacity ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(0)}ms, transform ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(0)}ms`,
            }}
          >
            <TimelineBgCurve reverse={false} />
            <div
              className="timeline-content"
              style={{
                width: "45%",
                paddingRight: "3rem",
                textAlign: "right",
                zIndex: 3,
                padding: "3rem 0",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                Der Ansatz
              </h2>
              <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                In meiner Beratung gehe ich ganz individuell auf deine
                persönlichen Bedürfnisse ein. Sie basiert auf der
                Individualpsychologie nach Alfred Adler und betrachtet den
                Menschen als ganzheitliches Wesen, in dem Körper, Seele und
                Geist untrennbar miteinander verbunden sind. Der Mensch ist als
                Gemeinschaftswesen geschaffen, dessen Denken, Fühlen und Handeln
                stets zielgerichtet ist.
              </p>

              <p
                style={{
                  lineHeight: 1.6,
                  opacity: 0.9,
                  marginBottom: "0.8rem",
                }}
              >
                Gemäss einem Grundsatz von Alfred Adler möchte ich{" "}
                <strong>
                  «mit den Augen des anderen sehen, mit den Ohren des anderen
                  hören und mit dem Herzen des anderen fühlen.»
                </strong>{" "}
                Diese wertschätzende Haltung bildet die Grundlage meiner Arbeit.
              </p>

              {!ansatzExpanded && (
                <button
                  onClick={() => setAnsatzExpanded(true)}
                  className="read-more-btn"
                >
                  Mehr lesen...
                </button>
              )}

              {ansatzExpanded && (
                <div className="expanded-content">
                  <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                    In einer vertrauensvollen und geschützten Atmosphäre begeben
                    wir uns gemeinsam auf eine Entdeckungsreise. Dabei lernst du
                    deine Persönlichkeit besser zu verstehen, entdeckst deine
                    Ressourcen und entwickelst neue Perspektiven. Gemeinsam
                    arbeiten wir daran, deine Stärken bewusst einzusetzen und
                    deinen persönlichen Weg mit mehr Klarheit, Selbstvertrauen
                    und Zuversicht zu gestalten.
                  </p>
                  <button
                    onClick={() => setAnsatzExpanded(false)}
                    className="read-more-btn"
                  >
                    Weniger anzeigen
                  </button>
                </div>
              )}
            </div>
            <TimelineLilyPad rotation={15} xPos="55%" scale={1.08} />
          </div>

          {/* BLOCK 2: Das Ziel */}
          <div
            className="timeline-block timeline-block-reverse"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? "translateY(0)" : "translateY(20px)",
              transition: `opacity ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(1)}ms, transform ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(1)}ms`,
            }}
          >
            <TimelineBgCurve reverse={true} />
            <TimelineLilyPad rotation={-45} xPos="45%" scale={0.88} />
            <div
              className="timeline-content"
              style={{
                width: "45%",
                paddingLeft: "3rem",
                textAlign: "left",
                zIndex: 3,
                padding: "3rem 0",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                Das Ziel
              </h2>
              <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                Ich arbeite stärken-, ressourcen- und lösungsorientiert. Mein
                Ziel ist es, dich dabei zu unterstützen, dein persönliches
                Potenzial zu entfalten und deinen eigenen Weg bewusst und
                authentisch zu leben.
              </p>

              {!zielExpanded && (
                <button
                  onClick={() => setZielExpanded(true)}
                  className="read-more-btn"
                >
                  Mehr lesen...
                </button>
              )}

              {zielExpanded && (
                <div className="expanded-content">
                  <p
                    style={{
                      lineHeight: 1.6,
                      opacity: 0.9,
                      marginBottom: "0.8rem",
                    }}
                  >
                    Gemeinsam arbeiten wir daran, deine Resilienz zu stärken,
                    verborgene Ressourcen zu entdecken und schwierige
                    Lebenssituationen als Chancen für persönliches Wachstum zu
                    nutzen.
                  </p>
                  <p
                    style={{
                      lineHeight: 1.6,
                      opacity: 0.9,
                      marginBottom: "0.8rem",
                    }}
                  >
                    In diesem Prozess lernst du, hinderliche Denk- und
                    Verhaltensmuster zu erkennen und Schritt für Schritt
                    loszulassen. Gleichzeitig entwickelst du neue Sichtweisen,
                    stärkst dein Selbstvertrauen und gewinnst innere Freiheit,
                    neue Handlungsmöglichkeiten und Zuversicht für deinen
                    weiteren Lebensweg.
                  </p>
                  <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                    Mein Anliegen ist es, dass du deine Fähigkeiten neu
                    entdeckst und befähigt wirst, Herausforderungen
                    selbstbewusst und eigenverantwortlich zu begegnen.
                  </p>
                  <button
                    onClick={() => setZielExpanded(false)}
                    className="read-more-btn"
                  >
                    Weniger anzeigen
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BLOCK 3: KOSTEN & RAHMEN */}
          <div
            className="timeline-block"
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? "translateY(0)" : "translateY(20px)",
              transition: `opacity ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(2)}ms, transform ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(2)}ms`,
            }}
          >
            <TimelineBgCurve reverse={false} />
            <div
              className="timeline-content"
              style={{
                width: "45%",
                paddingRight: "3rem",
                textAlign: "right",
                zIndex: 3,
                padding: "3rem 0",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                Kosten & Rahmen
              </h2>
              <div className="kosten-list">
                {kostenItems.map((item, idx) => (
                  <div className="kosten-item" key={idx}>
                    <div className="kosten-item-text">
                      <span className="kosten-item-title">{item.title}</span>
                      <span className="kosten-item-desc">{item.desc}</span>
                    </div>
                    <div className="kosten-item-icon">{item.icon}</div>
                  </div>
                ))}
              </div>
            </div>
            <TimelineLilyPad rotation={75} xPos="55%" scale={1.0} />
          </div>

          {/* BLOCK 4: DIE METHODEN */}
          <div
            className="timeline-block timeline-block-reverse"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? "translateY(0)" : "translateY(20px)",
              transition: `opacity ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(3)}ms, transform ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(3)}ms`,
            }}
          >
            <TimelineBgCurve reverse={true} />
            <TimelineLilyPad rotation={10} xPos="45%" scale={0.92} />
            <div
              className="timeline-content"
              style={{
                width: "45%",
                paddingLeft: "3rem",
                textAlign: "left",
                zIndex: 3,
                padding: "3rem 0",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                Die Methoden
              </h2>
              <p
                style={{
                  lineHeight: 1.6,
                  opacity: 0.9,
                  marginBottom: "0.5rem",
                }}
              >
                In meinen Beratungen verbinde ich bewährte tiefenpsychologische
                sowie gesprächs- und ressourcenorientierte Methoden mit einer
                wertschätzenden und ganzheitlichen Begleitung.
                <br />
                <br />
                Mein methodischer Werkzeugkoffer umfasst unter anderem:
              </p>

              <div className="methoden-list">
                {methodenItems.map((item, idx) => (
                  <div className="methoden-item" key={idx}>
                    <div className="methoden-item-icon">{item.icon}</div>
                    <div className="methoden-item-text">
                      <span className="methoden-item-title">{item.title}</span>
                      <span className="methoden-item-desc">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ACCREDITATION SEAL */}
        <div style={{ textAlign: "center", margin: "1rem auto 4rem auto" }}>
          <img
            src="/acc.png"
            alt="ACC Akkreditierung"
            style={{
              maxWidth: "160px",
              height: "auto",
              display: "inline-block",
            }}
          />
        </div>

        {/* CONTACT FORM SECTION */}
        <section
          id="contact"
          className="contact-card"
          style={{
            padding: "4.5rem 3rem",
            maxWidth: "640px",
            margin: "0 auto 6rem auto",
            backgroundColor: "var(--primary)",
            borderRadius: "32px 24px 36px 28px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(19, 37, 109, 0.08)",
          }}
        >
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 400,
              marginBottom: "3.5rem",
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Werde durch ein neues Mindset frei für ein eigenverantwortliches
            Leben.
          </h3>

          <div style={{ textAlign: "left" }}>
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              Kontakt aufnehmen
            </h2>
            <p
              style={{ marginBottom: "2.5rem", opacity: 0.85, lineHeight: 1.5 }}
            >
              Sende eine unverbindliche Anfrage, um deinen Termin zu
              vereinbaren.
            </p>

            {formStatus.success ? (
              <div
                style={{
                  padding: "2rem",
                  backgroundColor: "rgba(19, 37, 109, 0.08)",
                  borderRadius: "20px",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  Vielen Dank für deine Nachricht!
                </h4>
                <p style={{ margin: 0, opacity: 0.85, fontSize: "1rem" }}>
                  Ich habe deine Anfrage erhalten und werde mich so schnell wie
                  möglich bei dir melden.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2.2rem",
                }}
              >
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={handleInputChange}
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1.5px solid var(--text)",
                      color: "var(--text)",
                      fontSize: "1rem",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      opacity: 0.8,
                    }}
                  >
                    Bevorzugte Kontaktart:
                  </label>
                  <div
                    className="contact-toggle-group"
                    style={{
                      display: "inline-flex",
                      alignSelf: "flex-start",
                      padding: "4px",
                      backgroundColor: "rgba(19, 37, 109, 0.07)",
                      borderRadius: "50px",
                      gap: "4px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setContactMode("email")}
                      style={{
                        padding: "0.5rem 1.4rem",
                        borderRadius: "50px",
                        border: "none",
                        fontSize: "0.9rem",
                        fontWeight: contactMode === "email" ? 600 : 400,
                        backgroundColor:
                          contactMode === "email"
                            ? "var(--text)"
                            : "transparent",
                        color:
                          contactMode === "email"
                            ? "var(--primary)"
                            : "var(--text)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        fontFamily: "inherit",
                      }}
                    >
                      E-Mail
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMode("phone")}
                      style={{
                        padding: "0.5rem 1.4rem",
                        borderRadius: "50px",
                        border: "none",
                        fontSize: "0.9rem",
                        fontWeight: contactMode === "phone" ? 600 : 400,
                        backgroundColor:
                          contactMode === "phone"
                            ? "var(--text)"
                            : "transparent",
                        color:
                          contactMode === "phone"
                            ? "var(--primary)"
                            : "var(--text)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        fontFamily: "inherit",
                      }}
                    >
                      Telefonanruf
                    </button>
                  </div>
                </div>

                <div>
                  {contactMode === "email" ? (
                    <input
                      type="email"
                      name="contactValue"
                      required
                      placeholder="E-Mail-Adresse"
                      value={formData.contactValue}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1.5px solid var(--text)",
                        color: "var(--text)",
                        fontSize: "1rem",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    />
                  ) : (
                    <input
                      type="tel"
                      name="contactValue"
                      required
                      placeholder="Telefonnummer"
                      value={formData.contactValue}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1.5px solid var(--text)",
                        color: "var(--text)",
                        fontSize: "1rem",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    />
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    required
                    placeholder="Deine Nachricht"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "0.6rem 0",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1.5px solid var(--text)",
                      color: "var(--text)",
                      fontSize: "1rem",
                      outline: "none",
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                  ></textarea>
                </div>

                {formStatus.error && (
                  <p
                    style={{ color: "#d9534f", fontSize: "0.9rem", margin: 0 }}
                  >
                    {formStatus.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  style={{
                    marginTop: "0.8rem",
                    padding: "0.9rem 2.4rem",
                    background: "transparent",
                    color: "var(--text)",
                    border: "2px solid var(--text)",
                    borderRadius: "50px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: formStatus.submitting ? "wait" : "pointer",
                    opacity: formStatus.submitting ? 0.6 : 1,
                    transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                    fontFamily: "inherit",
                    alignSelf: "flex-start",
                  }}
                  onMouseOver={(e) => {
                    if (!formStatus.submitting) {
                      e.currentTarget.style.background = "var(--text)";
                      e.currentTarget.style.color = "var(--primary)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!formStatus.submitting) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text)";
                    }
                  }}
                >
                  {formStatus.submitting
                    ? "Wird gesendet..."
                    : "Nachricht senden"}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      <button
        onClick={handleScrollToTop}
        className={`back-to-top-btn ${showBackToTop ? "visible" : ""}`}
        aria-label="Nach oben scrollen"
        title="Nach oben"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="28"
          height="28"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </main>
  );
}

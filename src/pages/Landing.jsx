import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [contactMode, setContactMode] = useState("email");

  // ========================================================
  // FORM STATE & SUBMIT HANDLER (Formspree AJAX)
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

  // ========================================================
  // EASY POSITION & STYLE ADJUSTMENTS
  // ========================================================
  // DESKTOP SCROLL TUNING
  const DESKTOP_SCROLL_MULTIPLIER = 0.4;
  const DESKTOP_SCROLL_EASING = 0.08;

  // DESKTOP SIZES & GAPS
  const TOP_TEXT_SCREEN_OFFSET = "20vh";
  const TOP_TEXT_TO_LILY_GAP = "60px";
  const LILY_TO_BOTTOM_TEXT_GAP = "30px";
  const TIMELINE_TOP_GAP = "8rem";

  const HERO_LILY_SIZE = "1000px";
  const TIMELINE_LILY_SIZE = "60px";

  const TOP_WAVE_FONT_SIZE = "52px";
  const BOTTOM_WAVE_FONT_SIZE = "30px";
  const WAVE_LETTER_SPACING = "4px";

  // ========================================================
  // MOBILE ADJUSTMENTS (Screens <= 768px)
  // ========================================================
  const MOBILE_HEADER_TOP_PADDING = "25vh";

  // *** DIRECT WATERLILY SCALE & POSITION CONTROLS ***
  const MOBILE_HERO_LILY_WIDTH = "140vw";
  const MOBILE_HERO_LILY_HEIGHT = "140px";
  const MOBILE_HERO_LILY_X_OFFSET = "30px";

  // *** MOBILE FLIP TIMING CONTROLS ***
  const MOBILE_SCROLL_FLIP_THRESHOLD = 2;
  const MOBILE_LILY_FLIP_SPEED = "0.25s";

  const MOBILE_TOP_WAVE_HEIGHT = "55px";
  const MOBILE_BOTTOM_WAVE_HEIGHT = "110px";

  const MOBILE_TOP_WAVE_FONT_SIZE = "38px";
  const MOBILE_BOTTOM_WAVE_FONT_SIZE = "38px";
  const MOBILE_WAVE_LETTER_SPACING = "1.5px";

  // *** MOBILE STACK GAP CONTROLS (Waterlily is FIRST on mobile) ***
  const MOBILE_LILY_TO_TOP_TEXT_GAP = "5px";
  const MOBILE_TOP_TO_BOTTOM_TEXT_GAP = "-15px";
  const MOBILE_TIMELINE_TOP_GAP = "2rem";

  // MOBILE CONTACT CARD SIZES
  const MOBILE_CONTACT_CARD_WIDTH = "88%";
  const MOBILE_CONTACT_CARD_MAX_WIDTH = "420px";
  const MOBILE_CONTACT_CARD_PADDING = "2.2rem 1.25rem";

  // ANIMATION SPEEDS & STAGGERING
  const WAVY_LINE_ANIM_SPEED = "3.2s";
  const SECTION_FADE_SPEED = "0.8s";
  const SECTION_STAGGER_STEP = 600;
  const HERO_TEXT_FADE_SPEED = "1.8s";

  const targetScrollY = useRef(0);
  const isAnimatingScroll = useRef(false);
  const touchStartY = useRef(0);

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

      if (currentY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
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
      requestAnimationFrame(smoothScrollLoop);
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
        requestAnimationFrame(smoothScrollLoop);
      }
    };

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    updateScrollState();

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleScrollToTop = () => {
    targetScrollY.current = 0;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getBlockDelay = (index, totalBlocks = 4) => {
    return isScrolled
      ? index * SECTION_STAGGER_STEP
      : (totalBlocks - 1 - index) * SECTION_STAGGER_STEP;
  };

  const seoData = {
    title: "Dina Galizzi | Psychosoziale Beratung",
    description: "Einfühlsame psychosoziale Beratung...",
    canonicalUrl: "https://dinagalizzi.ch/",
  };

  // ========================================================
  // DATA FOR "KOSTEN & RAHMEN" SECTION
  // ========================================================
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
      desc: "Einzelberatung",
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
      desc: "Nach Absprache (z.B. für Studierende oder AHV-Bezüger)",
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
      desc: "Bitte 24h im Voraus. Bei späteren Absagen werden 50% verrechnet (ausser bei Krankheit).",
    },
  ];

  // ========================================================
  // DATA FOR "DIE METHODEN" SECTION
  // ========================================================
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
      title: "Gesprächspsychotherapie",
      desc: "Nach Carl Rogers",
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
      title: "Verhaltenstherapie (REVT)",
      desc: "Rational-Emotiv nach Albert Ellis",
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
      title: "Logotherapie",
      desc: "Nach Victor Frankl",
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
      title: "Kognitive Beratung",
      desc: "Nach A. T. Beck und William Backus",
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
      title: "Systemische & Gestalttherapie",
      desc: "Als ergänzende Ansätze",
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
      desc: "Auf Wunsch",
    },
  ];

  const TimelineLilyPad = ({ rotation = 0, xPos = "50%", scale = 1 }) => {
    const baseSize = parseInt(TIMELINE_LILY_SIZE) || 48;
    const computedSize = `${baseSize * scale}px`;

    return (
      <div
        className="timeline-lily-wrapper"
        style={{
          position: "absolute",
          left: xPos,
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <svg
          viewBox="-8 -8 64 64"
          width={computedSize}
          height={computedSize}
          style={{ overflow: "visible" }}
        >
          <path
            d="M14.77,1.85l7.92,10.96L26.68.5s25.37,5.09,19.9,30.61S4.35,52.38.71,27.77c0,0-3.02-19.37,14.06-25.92Z"
            fill="var(--background)"
            stroke="var(--background)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.77,1.85l7.92,10.96L26.68.5s25.37,5.09,19.9,30.61S4.35,52.38.71,27.77c0,0-3.02-19.37,14.06-25.92Z"
            fill="var(--primary)"
            stroke="var(--primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  return (
    <main
      style={{
        "--text": "#13256d",
        "--background": "#9FB8A3",
        "--primary": "#D0D6CA",
        "--secondary": "#D0CAD6",
        "--accent": "#e3efff",
        "--wavy-font": "'Caveat'",
        backgroundColor: "var(--background)",
        color: "var(--text)",
        fontFamily: "'Satoshi', system-ui, sans-serif",
        minHeight: "100vh",
        fontWeight: 400,
        position: "relative",
      }}
    >
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonicalUrl} />

        {/* Base Font */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />

        {/* Preload and import Google Handwritten Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Pacifico&family=Sacramento&display=swap"
          rel="stylesheet"
        />

        <style>
          {`
            html, #root {
              margin: 0 !important;
              padding: 0 !important;
              background-color: #9FB8A3 !important;
              width: 100% !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
              background-color: #9FB8A3 !important;
              width: 100% !important;
              overflow-x: hidden !important;
              scroll-behavior: auto !important;
            }
            * {
              box-sizing: border-box !important;
            }
            ::-webkit-scrollbar {
              width: 12px;
            }
            ::-webkit-scrollbar-track {
              background: #9FB8A3;
            }
            ::-webkit-scrollbar-thumb {
              background: #13256d;
              border-radius: 10px;
              border: 3px solid #9FB8A3;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #272e6a;
            }

            /* DIRECTIONAL FADE GRADIENT MASKS */
            .top-wave-text {
              mask-image: linear-gradient(to right, #000 0%, #000 35%, transparent 65%, transparent 100%);
              -webkit-mask-image: linear-gradient(to right, #000 0%, #000 35%, transparent 65%, transparent 100%);
              mask-size: 300% 100%;
              -webkit-mask-size: 300% 100%;
              mask-position: 0% 0%;
              -webkit-mask-position: 0% 0%;
              opacity: 1;
              transition: mask-position ${HERO_TEXT_FADE_SPEED} cubic-bezier(0.4, 0, 0.2, 1), 
                          -webkit-mask-position ${HERO_TEXT_FADE_SPEED} cubic-bezier(0.4, 0, 0.2, 1), 
                          opacity ${HERO_TEXT_FADE_SPEED} ease-in-out;
            }

            .top-wave-text.scrolled {
              mask-position: 100% 0%;
              -webkit-mask-position: 100% 0%;
              opacity: 0;
            }

            .bottom-wave-text {
              mask-image: linear-gradient(to right, #000 0%, #000 35%, transparent 65%, transparent 100%);
              -webkit-mask-image: linear-gradient(to right, #000 0%, #000 35%, transparent 65%, transparent 100%);
              mask-size: 300% 100%;
              -webkit-mask-size: 300% 100%;
              mask-position: 100% 0%;
              -webkit-mask-position: 100% 0%;
              opacity: 0;
              transition: mask-position ${HERO_TEXT_FADE_SPEED} cubic-bezier(0.4, 0, 0.2, 1), 
                          -webkit-mask-position ${HERO_TEXT_FADE_SPEED} cubic-bezier(0.4, 0, 0.2, 1), 
                          opacity ${HERO_TEXT_FADE_SPEED} ease-in-out;
            }

            .bottom-wave-text.scrolled {
              mask-position: 0% 0%;
              -webkit-mask-position: 0% 0%;
              opacity: 1;
            }

            /* KOSTEN & RAHMEN STYLED LIST */
            .kosten-list {
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
            .kosten-item-text {
              display: flex;
              flex-direction: column;
              gap: 0.15rem;
            }
            .kosten-item-title {
              font-weight: 600;
              font-size: 1.05rem;
              color: var(--text);
            }
            .kosten-item-desc {
              font-size: 0.95rem;
              opacity: 0.85;
              line-height: 1.4;
            }
            .kosten-item-icon {
              width: 22px;
              height: 22px;
              flex-shrink: 0;
              color: var(--text);
              background: rgba(19, 37, 109, 0.06);
              padding: 10px;
              border-radius: 50%;
              box-sizing: content-box !important;
            }

            /* METHODEN STYLED LIST */
            .methoden-list {
              display: flex;
              flex-direction: column;
              gap: 1.2rem;
              margin-top: 1.5rem;
            }
            .methoden-item {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 1.25rem;
              text-align: left;
            }
            .methoden-item-text {
              display: flex;
              flex-direction: column;
              gap: 0.15rem;
            }
            .methoden-item-title {
              font-weight: 600;
              font-size: 1.05rem;
              color: var(--text);
            }
            .methoden-item-desc {
              font-size: 0.95rem;
              opacity: 0.85;
              line-height: 1.4;
            }
            .methoden-item-icon {
              width: 22px;
              height: 22px;
              flex-shrink: 0;
              color: var(--text);
              background: rgba(19, 37, 109, 0.06);
              padding: 10px;
              border-radius: 50%;
              box-sizing: content-box !important;
            }

            /* BACK TO TOP CHEVRON BUTTON */
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

            .desktop-bottom-wave {
              display: block;
            }
            .mobile-bottom-wave {
              display: none;
            }

            ::placeholder {
              color: var(--text) !important;
              opacity: 0.55 !important;
            }

            /* ======================================================== */
            /* MOBILE RESPONSIVE ADAPTATIONS (<= 768px)                */
            /* ======================================================== */
            @media (max-width: 768px) {
              .header-section {
                padding-top: ${MOBILE_HEADER_TOP_PADDING} !important;
                padding-left: 0.5rem !important;
                padding-right: 0.5rem !important;
              }

              /* 1. MOBILE REORDERING: Waterlily Container is FIRST */
              .hero-lily-container {
                order: 1 !important;
                height: ${MOBILE_HERO_LILY_HEIGHT} !important;
                margin-bottom: ${MOBILE_LILY_TO_TOP_TEXT_GAP} !important;
                overflow: visible !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                transform: translateX(${MOBILE_HERO_LILY_X_OFFSET}) !important;
              }

              /* Scales the Waterlily SVG directly on mobile */
              .hero-lily-container svg {
                width: ${MOBILE_HERO_LILY_WIDTH} !important;
                max-width: none !important;
                flex-shrink: 0 !important;
              }

              /* Instant opacity transition on mobile so the lily opens right in front of user */
              .hero-lily-container > div {
                transition: opacity ${MOBILE_LILY_FLIP_SPEED} ease-in-out !important;
              }

              /* 2. Top Wavy Text ("Du bist...") is SECOND */
              .top-wave-container {
                order: 2 !important;
                height: ${MOBILE_TOP_WAVE_HEIGHT} !important;
                margin-bottom: ${MOBILE_TOP_TO_BOTTOM_TEXT_GAP} !important;
              }

              /* 3. Bottom Wavy Text (English Quote) is THIRD */
              .bottom-wave-container {
                order: 3 !important;
                height: ${MOBILE_BOTTOM_WAVE_HEIGHT} !important;
                margin-top: 0px !important;
              }

              .top-wave-text text {
                font-size: ${MOBILE_TOP_WAVE_FONT_SIZE} !important;
                letter-spacing: ${MOBILE_WAVE_LETTER_SPACING} !important;
              }

              .bottom-wave-text text {
                font-size: ${MOBILE_BOTTOM_WAVE_FONT_SIZE} !important;
                letter-spacing: ${MOBILE_WAVE_LETTER_SPACING} !important;
              }

              .desktop-bottom-wave {
                display: none !important;
              }
              .mobile-bottom-wave {
                display: block !important;
              }

              /* 4. Distance to First Timeline Item */
              .timeline-wrapper {
                margin-top: ${MOBILE_TIMELINE_TOP_GAP} !important;
              }

              /* Mobile Override to normal flex column stacking */
              .timeline-container {
                display: flex !important;
                flex-direction: column !important;
                padding: 1rem 1rem 3rem 1rem !important;
              }

              .timeline-bg-line {
                display: none !important;
              }

              /* Show timeline blocks immediately on mobile */
              .timeline-block,
              .timeline-block-reverse {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: none !important;
                flex-direction: column !important;
                margin-bottom: 4rem !important;
                justify-content: center !important;
                align-items: center !important;
                text-align: center !important;
                min-height: auto !important;
              }

              .timeline-content {
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                text-align: center !important;
                margin-bottom: 0 !important;
                order: 2 !important;
              }

              .timeline-lily-wrapper {
                position: relative !important;
                left: auto !important;
                transform: rotate(var(--lily-rot, 0deg)) !important;
                order: 1 !important;
                margin-bottom: 1.25rem !important;
              }

              /* Mobile Kosten List Card Styles */
              .kosten-list {
                gap: 0.75rem;
                margin-top: 1.5rem;
              }
              .kosten-item {
                flex-direction: row-reverse;
                justify-content: flex-end;
                text-align: left;
                background: rgba(208, 214, 202, 0.4);
                padding: 1.2rem;
                border-radius: 20px;
                gap: 1rem;
              }
              .kosten-item-text {
                align-items: flex-start;
              }
              .kosten-item-icon {
                background: transparent;
                padding: 0;
                width: 28px;
                height: 28px;
              }

              /* Mobile Methoden List Card Styles */
              .methoden-list {
                gap: 0.75rem;
                margin-top: 1.5rem;
              }
              .methoden-item {
                flex-direction: row;
                justify-content: flex-start;
                text-align: left;
                background: rgba(208, 214, 202, 0.4);
                padding: 1.2rem;
                border-radius: 20px;
                gap: 1rem;
              }
              .methoden-item-text {
                align-items: flex-start;
              }
              .methoden-item-icon {
                background: transparent;
                padding: 0;
                width: 28px;
                height: 28px;
              }

              /* Narrower, Elegant Contact Form Card on Mobile */
              .contact-card {
                width: ${MOBILE_CONTACT_CARD_WIDTH} !important;
                max-width: ${MOBILE_CONTACT_CARD_MAX_WIDTH} !important;
                padding: ${MOBILE_CONTACT_CARD_PADDING} !important;
                margin: 0 auto 3.5rem auto !important;
                border-radius: 24px !important;
              }

              .contact-card h3 {
                font-size: 1.15rem !important;
                margin-bottom: 1.8rem !important;
                line-height: 1.4 !important;
              }

              .contact-card h2 {
                font-size: 1.25rem !important;
              }

              .contact-card p {
                font-size: 0.9rem !important;
                margin-bottom: 1.5rem !important;
              }

              .contact-card form {
                gap: 1.4rem !important;
              }

              .contact-toggle-group {
                width: 100%;
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
          paddingTop: TOP_TEXT_SCREEN_OFFSET,
          paddingBottom: "2vh",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          textAlign: "center",
        }}
      >
        {/* Top Wave Text */}
        <div
          className={`top-wave-text top-wave-container ${isScrolled ? "scrolled" : ""}`}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "800px",
            height: "100px",
            marginBottom: TOP_TEXT_TO_LILY_GAP,
            zIndex: 10,
          }}
        >
          <svg
            viewBox="0 0 1000 120"
            width="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <path
              id="wavyPathTop"
              d="M 0,80 Q 250,20 500,80 T 1000,80"
              fill="transparent"
            />
            <text
              fill="var(--text)"
              fontFamily="var(--wavy-font)"
              fontWeight="500"
              style={{
                fontSize: TOP_WAVE_FONT_SIZE,
                letterSpacing: WAVE_LETTER_SPACING,
              }}
            >
              <textPath
                href="#wavyPathTop"
                startOffset="50%"
                textAnchor="middle"
              >
                Du bist was du denkst.
              </textPath>
            </text>
          </svg>
        </div>

        {/* Central Waterlily */}
        <div
          className="hero-lily-container"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: HERO_LILY_SIZE,
            height: "230px",
            zIndex: 2,
          }}
        >
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
              viewBox="0 0 800 300"
              width="100%"
            >
              <g id="lily_closed" data-name="lily closed">
                <path
                  fill="none"
                  stroke="var(--secondary)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M188.39,155.55l26.84-9.08-13.42,20.47s116.56,6.37,92.02-23.18-176.91-15.84-105.45,11.78h0Z"
                />
                <path
                  fill="none"
                  stroke="var(--secondary)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M318.81,148.51s-45.2-22.59-54.46-50.99c0,0,11.59-2.9,37.08,0,0,0-15.06-27.23-9.85-49.83,0,0,37.08-1.16,50.99,21.44,0,0,.58-34.18,23.18-39.4,0,0,16.8,9.27,22.59,35.34,0,0,17.38-11,36.5-19.7,0,0,5.51,75.18-15.45,72.86-7.06-.78,12.17-21.15,50.99-20.28,0,0,3.77,48.96-72.14,62.87,0,0-91.3,21.29-57.55-85.46,0,0,42,30.28,32.88,39.98-5.11,5.43-15.79-33.46,27.08-38.67,0,0,16.51,16.37,4.06,60.4-12.45,44.04-33.65-57.28-64.75,2.9-29.12,56.34,161.36-19.7,224.51,53.16,0,0-36.65-10.43-70.98-7.53,0,0,26.65,16.66,21.59,23.18-5.07,6.51-195.79,11.88-116.84-47.95"
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
              viewBox="0 0 800 300"
              width="100%"
            >
              <g id="lily_open" data-name="lily open">
                <path
                  fill="none"
                  stroke="var(--secondary)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M316.48,138.42s-50.69-24.91-59.1-42.87c0,0,26.65-5.79,48.38,0,0,0-5.79-34.47,9.27-55.34,0,0,21.44,15.06,27.52,30.13,0,0-2.9-26.36,21.44-41.71,0,0,17.96,13.61,24.63,34.18,0,0,4.92-13.33,26.08-20.86,0,0,18.54,31.87,13.61,54.75-4.92,22.89-18.83-19.12,26.08-17.1,0,0-7.53,39.4-32.73,51.28,0,0,31.87,1.45,46.06,19.99,0,0-26.94,25.2-72.71,12.45,0,0-3.47,29.84-21.44,52.44,0,0-33.89-11.59-24.33-57.07,0,0-14.49,19.41-60.83,18.54,0,0,8.69-45.48,49.83-39.98,0,0-20.86-21.73-20.86-55.34,0,0,14.77-1.16,26.08,8.4,0,0,4.92-26.65,19.12-7.82,14.2,18.83-15.35,11,2.61-10.14,17.96-21.15,17.1,19.12,12.75,22.02s-12.17-13.61,9.56-18.25c21.72-4.63,2.02,38.53-2.61,26.65s23.47-23.47,23.47-23.47c0,0,4.06,39.98-7.53,55.91,0,0,23.47,44.61,66.92,40.27,43.45-4.35-38.24-34.78-38.24,40.27,0,84.11,184.44,68.95,147.46-19.41-34.72-82.94-120.81-26.94-78.51-8.11s-57.99-44.23-56.49,29.55c.27,13.18,14.05,67.06,101.68,27.81,47.22-21.15,31.87-46.35,90.97-39.4s41.43-14.49,90.1-6.37c48.67,8.11,58.52,2.61,58.52,2.61"
                />
                <path
                  fill="none"
                  stroke="var(--secondary)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M188.39,155.75l26.84-9.08-13.42,20.47s116.56,6.37,92.02-23.18c-24.53-29.55-176.91-15.84-105.45,11.78Z"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Bottom Wave Text */}
        <div
          className={`bottom-wave-text bottom-wave-container ${isScrolled ? "scrolled" : ""}`}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "800px",
            height: "120px",
            marginTop: LILY_TO_BOTTOM_TEXT_GAP,
            zIndex: 10,
          }}
        >
          {/* DESKTOP SINGLE-LINE WAVE SVG */}
          <svg
            className="desktop-bottom-wave"
            viewBox="0 0 1000 200"
            width="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <path
              id="wavyPathBottomDesktop"
              d="M 0,100 Q 250,160 500,100 T 1000,100"
              fill="transparent"
            />
            <text
              fill="var(--text)"
              fontFamily="var(--wavy-font)"
              fontWeight="500"
              style={{
                fontSize: BOTTOM_WAVE_FONT_SIZE,
                letterSpacing: WAVE_LETTER_SPACING,
              }}
            >
              <textPath
                href="#wavyPathBottomDesktop"
                startOffset="50%"
                textAnchor="middle"
              >
                Anyone can find the dirt in someone. Be the one that finds the
                gold.
              </textPath>
            </text>
          </svg>

          {/* MOBILE 2-LINE STACKED WAVE SVG */}
          <svg
            className="mobile-bottom-wave"
            viewBox="0 0 1000 220"
            width="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <path
              id="wavyPathBottomMobile1"
              d="M 0,60 Q 250,110 500,60 T 1000,60"
              fill="transparent"
            />
            <path
              id="wavyPathBottomMobile2"
              d="M 0,150 Q 250,200 500,150 T 1000,150"
              fill="transparent"
            />
            <text
              fill="var(--text)"
              fontFamily="var(--wavy-font)"
              fontWeight="500"
            >
              <textPath
                href="#wavyPathBottomMobile1"
                startOffset="50%"
                textAnchor="middle"
              >
                Anyone can find the dirt in someone.
              </textPath>
            </text>
            <text
              fill="var(--text)"
              fontFamily="var(--wavy-font)"
              fontWeight="500"
            >
              <textPath
                href="#wavyPathBottomMobile2"
                startOffset="50%"
                textAnchor="middle"
              >
                Be the one that finds the gold.
              </textPath>
            </text>
          </svg>
        </div>
      </section>

      {/* ======================================================== */}
      {/* GLIDING CONTENT WRAPPER                                  */}
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
            gridTemplateRows: "repeat(4, 1fr)",
          }}
        >
          {/* Animated SVG Curve */}
          <div
            className="timeline-bg-line"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <svg
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              viewBox="0 0 100 1000"
              style={{ overflow: "visible" }}
            >
              <path
                d="M 50,0 
                   C 50,62.5 58,62.5 58,125 
                   C 58,250 42,250 42,375 
                   C 42,500 58,500 58,625 
                   C 58,750 42,750 42,875 
                   C 42,950 50,970 50,1000"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1.5"
                opacity="0.4"
                strokeDasharray="3000"
                strokeDashoffset={isScrolled ? "0" : "3000"}
                vectorEffect="non-scaling-stroke"
                style={{
                  transition: `stroke-dashoffset ${WAVY_LINE_ANIM_SPEED} cubic-bezier(0.25, 1, 0.5, 1)`,
                }}
              />
            </svg>
          </div>

          {/* BLOCK 1 */}
          <div
            className="timeline-block"
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              minHeight: "350px",
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? "translateY(0)" : "translateY(20px)",
              transition: `opacity ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(0)}ms, transform ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(0)}ms`,
            }}
          >
            <div
              className="timeline-content"
              style={{
                width: "45%",
                paddingRight: "3rem",
                textAlign: "right",
                zIndex: 3,
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
                Jeder Mensch ist einzigartig. In meiner psychosozialen Beratung
                gehe ich ganz individuell auf deine persönlichen Bedürfnisse
                ein. Mein Ansatz basiert auf der Individualpsychologie nach
                Alfred Adler und betrachtet den Menschen als ganzheitliches
                Wesen, in dem Körper, Seele und Geist untrennbar verbunden sind.
                Gemäss dem Grundsatz von Adler möchte ich mit den Augen des
                anderen sehen, mit den Ohren hören und mit dem Herzen fühlen.
                Gemeinsam begeben wir uns auf eine spannende Entdeckungsreise,
                um deine Persönlichkeit besser zu verstehen und deine Stärken
                sinnvoll einzusetzen.
              </p>
            </div>
            <TimelineLilyPad rotation={15} xPos="58%" scale={1.08} />
          </div>

          {/* BLOCK 2 */}
          <div
            className="timeline-block timeline-block-reverse"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              minHeight: "350px",
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? "translateY(0)" : "translateY(20px)",
              transition: `opacity ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(1)}ms, transform ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(1)}ms`,
            }}
          >
            <TimelineLilyPad rotation={-45} xPos="42%" scale={0.88} />
            <div
              className="timeline-content"
              style={{
                width: "45%",
                paddingLeft: "3rem",
                textAlign: "left",
                zIndex: 3,
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
                Mein Ziel ist es, dir zu helfen, deine Berufung zu finden und
                dein volles Potenzial freizusetzen. Wir arbeiten daran, deine
                Resilienz aufzubauen, neue Stärken zu entdecken und schwierige
                Lebenssituationen als Chance zum Wachstum zu nutzen. Du lernst,
                destruktive Denkmuster abzulegen und durch ein erneuertes
                Mindset befreit und mit neuer Zuversicht deinen Lebensweg zu
                gestalten.
              </p>
            </div>
          </div>

          {/* BLOCK 3: KOSTEN & RAHMEN */}
          <div
            className="timeline-block"
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              minHeight: "350px",
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? "translateY(0)" : "translateY(20px)",
              transition: `opacity ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(2)}ms, transform ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(2)}ms`,
            }}
          >
            <div
              className="timeline-content"
              style={{
                width: "45%",
                paddingRight: "3rem",
                textAlign: "right",
                zIndex: 3,
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
            <TimelineLilyPad rotation={75} xPos="58%" scale={1.0} />
          </div>

          {/* BLOCK 4: DIE METHODEN */}
          <div
            className="timeline-block timeline-block-reverse"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              minHeight: "350px",
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? "translateY(0)" : "translateY(20px)",
              transition: `opacity ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(3)}ms, transform ${SECTION_FADE_SPEED} ease-out ${getBlockDelay(3)}ms`,
            }}
          >
            <TimelineLilyPad rotation={10} xPos="42%" scale={0.92} />
            <div
              className="timeline-content"
              style={{
                width: "45%",
                paddingLeft: "3rem",
                textAlign: "left",
                zIndex: 3,
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
                In den Sitzungen wende ich bewährte tiefenpsychologische und
                gesprächstherapeutische Methoden an. Mein Werkzeugkoffer
                umfasst:
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

        {/* CONTACT FORM SECTION */}
        <section
          id="contact"
          className="contact-card"
          style={{
            padding: "4.5rem 3rem",
            maxWidth: "640px",
            margin: "4rem auto 6rem auto",
            backgroundColor: "var(--primary)",
            borderRadius: "32px 24px 36px 28px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(19, 37, 109, 0.04)",
          }}
        >
          {/* Key Quote Heading */}
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

            {/* FORMSPREE FORM (WORKS IN OPERA & ALL BROWSERS) */}
            {formStatus.success ? (
              /* IN-PAGE SUCCESS MESSAGE (NO REDIRECT) */
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
                {/* HONEYPOT SPAM TRAP (Invisible to humans, catches bots) */}
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={handleInputChange}
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Name Input */}
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

                {/* Preferred Contact Mode Options */}
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
                            ? "var(--background)"
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
                            ? "var(--background)"
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

                {/* Dynamic Email or Phone Input */}
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

                {/* Message Input */}
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

                {/* Submit Button */}
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
                      e.currentTarget.style.color = "var(--background)";
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

      {/* Floating Back-To-Top Chevron Button */}
      <button
        onClick={handleScrollToTop}
        className={`back-to-top-btn ${showBackToTop ? "visible" : ""}`}
        aria-label="Nach oben scrollen"
        title="Nach oben"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </main>
  );
}

import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [contactMode, setContactMode] = useState("email"); // "email" | "phone"

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

  const TOP_WAVE_FONT_SIZE = "24px";
  const BOTTOM_WAVE_FONT_SIZE = "24px";
  const WAVE_LETTER_SPACING = "4px";

  // ========================================================
  // MOBILE ADJUSTMENTS (Screens <= 768px)
  // Edit these values to adjust mobile hero sizes & gaps!
  // ========================================================
  const MOBILE_HEADER_TOP_PADDING = "25vh"; // Distance from top of screen to Waterlily Icon

  // *** DIRECT WATERLILY SCALE & POSITION CONTROLS ***
  const MOBILE_HERO_LILY_WIDTH = "140vw"; // Width scale of waterlily
  const MOBILE_HERO_LILY_HEIGHT = "140px"; // Height slot reserved for waterlily container
  const MOBILE_HERO_LILY_X_OFFSET = "30px"; // Horizontal shift (e.g. "-20px", "15px", "3vw")

  // *** MOBILE FLIP TIMING CONTROLS ***
  const MOBILE_SCROLL_FLIP_THRESHOLD = 2; // Trigger threshold in px
  const MOBILE_LILY_FLIP_SPEED = "0.25s"; // Opacity fade speed on mobile (instant flip)

  const MOBILE_TOP_WAVE_HEIGHT = "55px"; // Height of top wavy text container
  const MOBILE_BOTTOM_WAVE_HEIGHT = "110px"; // Height of bottom wavy text container

  const MOBILE_TOP_WAVE_FONT_SIZE = "38px"; // Font size for top wavy text
  const MOBILE_BOTTOM_WAVE_FONT_SIZE = "38px"; // Font size for bottom 2-line wavy text
  const MOBILE_WAVE_LETTER_SPACING = "1.5px"; // Letter spacing for wavy text

  // *** MOBILE STACK GAP CONTROLS (Waterlily is FIRST on mobile) ***
  const MOBILE_LILY_TO_TOP_TEXT_GAP = "5px"; // 1. Gap: Waterlily -> Top Wavy Text ("Du bist...")
  const MOBILE_TOP_TO_BOTTOM_TEXT_GAP = "-15px"; // 2. Gap: Top Wavy Text -> Bottom English Quote
  const MOBILE_TIMELINE_TOP_GAP = "2rem"; // 3. Gap: Bottom English Quote -> First Timeline Item

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

    const handleNativeScroll = () => {
      if (!isAnimatingScroll.current) {
        targetScrollY.current = window.scrollY;
      }

      const isMobile = window.innerWidth <= 768;
      const threshold = isMobile ? MOBILE_SCROLL_FLIP_THRESHOLD : 20;

      // Fixes desktop reverse scroll: seamlessly toggles back when scrolling above threshold
      if (window.scrollY > threshold) {
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

    // INSTANT TOUCH-DRAG DETECTION FOR MOBILE
    const handleTouchStart = (e) => {
      if (window.innerWidth <= 768 && e.touches.length > 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.innerWidth <= 768 && e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const dragDistance = touchStartY.current - currentY; // positive = dragging finger UP (scrolling down)

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

      if (!isAnimatingScroll.current) {
        isAnimatingScroll.current = true;
        requestAnimationFrame(smoothScrollLoop);
      }
    };

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

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
    description:
      "Einfühlsame psychosoziale Beratung für persönliche Entwicklung, Veränderung und persönliches Wachstum. Vereinbare dein Erstgespräch.",
    canonicalUrl: "https://[YOUR_GITHUB_USERNAME].github.io/dina/",
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
            strokeWidth="8"
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
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
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

              .timeline-container {
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
              fontFamily="'Satoshi', sans-serif"
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
              fontFamily="'Satoshi', sans-serif"
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
              fontFamily="'Satoshi', sans-serif"
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
              fontFamily="'Satoshi', sans-serif"
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
            padding: "2rem 2rem 6rem 2rem",
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
            >
              <path
                d="M 50,0 
                   C 50,62.5 58,62.5 58,125 
                   C 58,250 42,250 42,375 
                   C 42,500 58,500 58,625 
                   C 58,750 42,750 42,875 
                   C 42,950 50,970 50,1000"
                fill="none"
                stroke="var(--text)"
                strokeWidth="1.5"
                opacity="0.4"
                strokeDasharray="1400"
                strokeDashoffset={isScrolled ? "0" : "1400"}
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
              marginBottom: "8rem",
              position: "relative",
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
                [ Platzhalter für deinen Ansatz. Beschreibe, wie du mit
                Klient*innen arbeitest, um Wachstum und Entwicklung in einem
                geschützten Rahmen zu fördern. ]
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
              marginBottom: "8rem",
              position: "relative",
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
                [ Platzhalter für das Ziel. Beschreibe die Ergebnisse, die du
                anstrebst, und was Klient*innen in der Beratung erwarten können.
                ]
              </p>
            </div>
          </div>

          {/* BLOCK 3 */}
          <div
            className="timeline-block"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8rem",
              position: "relative",
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
              <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                [ Platzhalter für die Kosten. Transparenz bezüglich Honorar,
                Abrechnung und organisatorischen Rahmenbedingungen. ]
              </p>
            </div>
            <TimelineLilyPad rotation={75} xPos="58%" scale={1.0} />
          </div>

          {/* BLOCK 4 */}
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
              <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                [ Platzhalter für die Methoden. Nenne spezifische
                Beratungsansätze und Werkzeuge, die du in deiner Praxis
                verwendest. ]
              </p>
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
            margin: "0 auto 6rem auto",
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
              Sende eine Nachricht, um dein unverbindliches Erstgespräch zu
              vereinbaren.
            </p>

            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2.2rem",
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  placeholder="Name"
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
                  style={{ fontSize: "0.88rem", fontWeight: 500, opacity: 0.8 }}
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
                        contactMode === "email" ? "var(--text)" : "transparent",
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
                        contactMode === "phone" ? "var(--text)" : "transparent",
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
                    placeholder="E-Mail-Adresse"
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
                    placeholder="Telefonnummer"
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
                  placeholder="Deine Nachricht"
                  rows="3"
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

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  marginTop: "0.8rem",
                  padding: "0.9rem 2.4rem",
                  background: "transparent",
                  color: "var(--text)",
                  border: "2px solid var(--text)",
                  borderRadius: "50px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                  fontFamily: "inherit",
                  alignSelf: "flex-start",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "var(--text)";
                  e.currentTarget.style.color = "var(--background)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text)";
                }}
              >
                Nachricht senden
              </button>
            </form>
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

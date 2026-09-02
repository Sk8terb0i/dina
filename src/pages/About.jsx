import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function About() {
  const seoData = {
    title: "Über mich | Dina Galizzi Psychosoziale Beratung",
    description: "Erfahre mehr über meine Qualifikationen...",
    canonicalUrl: "https://dinagalizzi.ch/about",
  };

  // Scroll to top immediately on mount to prevent the "scroll lock" issue
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const WavyDivider = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "4rem 0",
        opacity: 0.3,
      }}
    >
      <svg
        width="120"
        height="16"
        viewBox="0 0 120 16"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M0 8 Q 15 0 30 8 T 60 8 T 90 8 T 120 8" />
      </svg>
    </div>
  );

  return (
    <main
      style={{
        "--text": "#13256d",
        "--background-solid": "#68B2AD",
        "--primary": "#D0D6CA",
        "--secondary": "#9FB8A3",
        "--accent": "#e3efff",
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
              background: linear-gradient(180deg, #A1D4C6 0%, #68B2AD 50%, #3B8F92 100%) !important;
              width: 100% !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
              background: transparent !important;
              width: 100% !important;
              overflow-x: hidden !important;
              scroll-behavior: auto !important;
            }
            * {
              box-sizing: border-box !important;
            }
            
            .about-container {
              max-width: 1100px;
              margin: 0 auto;
              padding: 8rem 2rem 6rem 2rem;
            }

            .main-title {
              font-size: 2.2rem;
              font-weight: 500;
              letter-spacing: -0.01em;
              margin-bottom: 2rem;
              color: var(--text);
              text-align: left;
            }

            .intro-grid {
              display: grid;
              grid-template-columns: 1fr 2fr;
              gap: 4rem;
              align-items: stretch;
            }
            
            .img-wrapper {
              width: 100%;
              height: 100%;
            }

            .dina-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 16px;
            }

            .intro-text p {
              font-size: 1.15rem;
              line-height: 1.7;
              opacity: 0.9;
              margin-bottom: 1rem;
            }
            .intro-text p:last-child {
              margin-bottom: 0;
            }

            .features-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 2.5rem;
              margin: 2rem 0;
            }

            .feature-card {
              background-color: var(--primary);
              padding: 3.5rem 2.5rem;
              box-shadow: 0 10px 30px rgba(19, 37, 109, 0.04);
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            }

            .feature-card:nth-child(1) {
              border-radius: 32px 24px 36px 28px;
            }
            .feature-card:nth-child(2) {
              border-radius: 24px 36px 28px 32px;
            }

            .feature-header {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1.25rem;
            }

            .feature-icon {
              color: var(--text);
              opacity: 0.85;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .feature-card h2 {
              font-size: 1.4rem;
              font-weight: 600;
              margin: 0;
            }

            .feature-card p {
              font-size: 1.05rem;
              line-height: 1.6;
              opacity: 0.9;
              margin-bottom: 1rem;
            }
            .feature-card p:last-child {
              margin-bottom: 0;
            }

            .cv-section {
              padding: 2rem 0;
              max-width: 900px;
              margin: 0 auto;
            }

            .cv-section h2 {
              font-size: 1.4rem;
              font-weight: 600;
              margin-bottom: 2.5rem;
              text-align: center;
              letter-spacing: -0.01em;
            }

            .cv-list {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
              text-align: center;
            }

            .cv-text {
              font-size: 1rem;
              line-height: 1.6;
              font-weight: 400;
              opacity: 0.9;
            }

            /* --- MOBILE OVERRIDES --- */
            @media (max-width: 768px) {
              .about-container {
                padding: 6rem 1.25rem 4rem 1.25rem;
              }

              .main-title {
                font-size: 1.6rem;
                text-align: left;
                margin-bottom: 1.25rem;
              }

              .intro-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
              }

              .dina-img {
                height: auto;
                max-height: 400px;
              }

              .intro-text p {
                font-size: 0.95rem;
                line-height: 1.6;
                text-align: left;
                hyphens: manual;
                -webkit-hyphens: manual;
              }

              .features-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
              }

              .feature-card {
                padding: 2rem 1.5rem;
                align-items: flex-start;
              }

              .feature-header {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                margin-bottom: 1rem;
              }

              .feature-icon svg {
                width: 20px;
                height: 20px;
              }

              .feature-card h2 {
                font-size: 1.25rem;
                line-height: 1;
              }

              .feature-card p {
                font-size: 0.95rem;
                line-height: 1.6;
                text-align: left;
                hyphens: manual;
                -webkit-hyphens: manual;
              }

              .cv-section h2 {
                font-size: 1.25rem;
                margin-bottom: 1.5rem;
              }

              .cv-list {
                gap: 1rem;
              }

              .cv-text {
                font-size: 0.95rem;
              }
            }
          `}
        </style>
      </Helmet>

      <div className="about-container">
        <h1 className="main-title">Hallo, ich bin Dina Galizzi.</h1>
        <section className="intro-grid">
          <div className="img-wrapper">
            <img src="/dina.jpeg" alt="Dina Galizzi" className="dina-img" />
          </div>
          <div className="intro-text">
            <p>
              Ich bin verheiratet und Mutter von drei erwachsenen Söhnen.
              Ursprünglich komme ich aus Indonesien, aber bin in der Schweiz
              aufgewachsen. Bevor ich mich zur psychosozialen Beraterin
              ausbilden liess, arbeitete ich als Kauffrau in verschiedenen
              Bereichen des internationalen Handels. Nach meiner Heirat widmete
              ich mich während vieler Jahre schwerpunktmässig meiner Familie.
            </p>
            <p>
              Die unterschiedlichen Lebensphasen und Erfahrungen haben mein
              Verständnis für die vielfältigen Herausforderungen des Lebens
              vertieft. Sie ermöglichen es mir heute, Menschen mit
              Lebenserfahrung, Wertschätzung und Einfühlungsvermögen zu
              begegnen.
            </p>
          </div>
        </section>

        <WavyDivider />

        <section className="features-grid">
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h2>Meine Motivation</h2>
            </div>
            <p>
              Es fasziniert mich, Menschen ein Stück auf ihrem Lebensweg
              begleiten zu dürfen. Es erfüllt mich mit Freude zu erleben, wie
              Menschen aufblühen, neue Seiten ihrer Persönlichkeit entdecken,
              innere Freiheit gewinnen und mit neuer Hoffnung ihren Weg
              weitergehen.
            </p>
            <p>
              Ich bin überzeugt, dass jeder Mensch wertvoll ist und die
              Fähigkeit besitzt, sich weiterzuentwickeln und zu wachsen.
              Menschen in diesem Prozess begleiten zu dürfen, empfinde ich als
              grosses Privileg.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                </svg>
              </div>
              <h2>Ausgleich im Alltag</h2>
            </div>
            <p>
              In meiner Freizeit finde ich Freude und Erholung in der Musik,
              beim Lesen, Kochen, Backen und Reisen. Vor Kurzem habe ich zudem
              das Töpfern für mich entdeckt. Dabei habe ich einen neuen Zugang
              zu meiner Kreativität gefunden. Den Ton mit den eigenen Händen zu
              formen, bereitet mir grosse Freude und schenkt mir Ruhe.
            </p>
            <p>
              Ebenso geniesse ich die Gemeinschaft mit Menschen, sei es bei
              fröhlichen Begegnungen oder bei tiefgehenden Gesprächen. Solche
              Momente bereichern mich und erfüllen mich immer wieder aufs Neue.
              Ich bin überzeugt, dass echte Beziehungen, gegenseitige
              Wertschätzung und aufrichtiges Interesse am Mitmenschen eine
              wichtige Grundlage für persönliches Wachstum und ein erfülltes
              Leben sind.
            </p>
          </div>
        </section>

        <WavyDivider />

        <section className="cv-section">
          <h2>Ausbildung & Qualifikationen</h2>
          <div className="cv-list">
            <div className="cv-text">
              ACC-akkreditierte psychosoziale Beraterin
            </div>
            <div className="cv-text">
              Beraterin für Persönlichkeitsentwicklung und Sozialkompetenz auf
              individualpsychologischer Basis (ICL)
            </div>
            <div className="cv-text">Beratende Seelsorgerin (ICL)</div>
            <div className="cv-text">Kauffrau (KVZ/EFZ)</div>
          </div>
        </section>
      </div>
    </main>
  );
}

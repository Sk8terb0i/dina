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

  const DinaPortraitSVG = () => (
    <svg
      viewBox="0 0 161.72 192.99"
      style={{ width: "100%", height: "auto", color: "var(--text)" }}
    >
      <path
        fill="currentColor"
        d="M78.14,107.8c-3.34.7-10.32,1.88-12.86,2.57,3.3,3.08,27-3.9,17.32,3.99-.79.89-7.95,2.9-4.68,3.08,9.19-.1,13.56-9.29,17.16-5.39.39-2.21,2.9-5.35,1.31-7.35-1.34-1.8-2.18-3.1-4.24-1.04.26,6.96-9.48,2.16-14.02,4.14Z"
      />
      <path
        fill="currentColor"
        d="M49.98,98.97c9.17-16.7-15.16,3.93-2.91,13.71,3.56,2.14-3.54-10.65,2.91-13.71Z"
      />
      <path
        fill="currentColor"
        d="M56.72,110.66c7.73-4.92-7.01-.72-7.42.2,6.33,2.82,12.77,11.6,7.42-.2Z"
      />
      <path
        fill="currentColor"
        d="M159.89,90.06c-.84-1.45-7.6-3.37-6.1-5.07.65-.62,2.97-1.06,2.71-1.99-7.72-2.43-5.84-3.58-4.98-10.04-8.44,10.93.84-21.5-8.89-27.8-6.94-7.96-14.43-17.1-20.52-25.98C88.6-20.65,27.49,6.82,17.3,53.46c-8.7,9.76,4.63,8.67-11.96,13.02.23,1.13,4.6.86,3.48,2.71-2.69,11.07-13.79,25.54-6.22,35.85.84-1.97-1.99-10.15,3.02-5.94.71,3.21,3.95,9.64,2.2,12.34-4.04.31.94,6.38.85,8.3.62,1.39-3.63,2.81-1.44,3.64,3.48,2.57,6.11-6.81,6.27-2.63-.23,2.74,2.81.02,1.68,2.78-.57,2.22-1.98,4.63-1.97,6.88,3.31,10.73-2.06,10.27,5.22,6.81,1.4.34,1.85,2.1,2.29,3.32.76,2.28,1.29-2.06,6.08,1.51,1.41.05-1.12-1.7-.95-2.3,2.16-1.55,8.02,1.74,9.74,4.03,8.8,2.74-2.93,8.64-1.33,14.27-.01,1.32-.4,3.33,1.02.96,2.83-4.54,14.1-21.49,14.42-11.52,5.51-3.83.01-14.7-6.48-19.64-11-8.72-7.4-15.74-11.78-2.68-2.35,3.01-2.33,14.28-7.57,10.87-2.65-3.93,3.6-10.29,6.35-13.25,9.85-13.99-7.23-33.09,4.09-44.79,1.19-1.57,2.97-7.11,3.41-2.17,1.38.05,4.69-1.1,6.74-1.47,2.48-1.32,13.64,3.69,12.7-.15-1.54-9.31-12.68-2.47-17.98-2.2-1.27-2.21,2.16-3.94-3.22-2.76,6.15-2.06,11.05-6.81,18.44-4.55,4.99,1-4.03-3.71-4.67-4.59-.28-5.93,3-12.58,3.31-18.96,6.25-21.96,40.52-17.28,44.36,1.36-3.17,4.86,6.44,5.87,5.65,10.05-.09.98-.73,3.05-1.79,1.53-6.16-5.14,4.02,8.02-1.19,5.71-9.26-5.55-35.87,3.43-22.81,5.96,6.32-1.8,18.64-5.26,22.29-.16-3.01,4.74-5.09.27-11.57,1.12-3.77,1.26-7.07-1.37-9.53,2.9-5.37,4.47-1.41,5.05,2.86,3.03,1.29-.96,2.63-2.33,4.14-.91,3.01,2.58,3.92-.33,6.73-.54,8.57,6.68,11.48-4.89,10.4,9.73,2.2-3.17,3.66-18.43,5.16-9.31-.08,1.64.74,1.89,2.15,2.41,2.01,4.26-1.16,11.25-1.08,16.57-.1,10.45-17.96,11.92.85,16.3.99-1.52,3.42-3.28,3.58-.13-.26,13.14-15.36,18.76-24.03,26.9-5.96,3.24-13.19,5.57-19.88,6.52-2.06.5,1.22,1.95,1.88,3.02.12,7.84,17.15-.47,22.37,4.75.68.34-6.23,5.08-2.88,4.12,7-1.92,11.73-9.21,18.04-11.59,1.57,2.66,3.99,3.69,6.8,4.39,7.94,5.08,19.54,2.38,6.55,12.78-9.02,9.18-22.55,18.04-33.74,24.15-1.91.3-1.37,1.65-1.19,2.88-3.11.79-9.44-2.77-6.82,2.73-.17.63-.94.73-1.52.67-5.31-3.52-15.31-.58-19.21,4.39,26.23,3.97,46.3-16.62,67.31-27.92,5.01-1.65,13.6-.4,16.71-4.44,5.3-6.54,9.72,8.15,14.9-1.78-.34-4.58-6.91-5.32-9.71-6.26,3.95-2.09-1.81-4.6-3.17-6.91,4.15-12.34-7.22-14.05,11.2-12.07-8.26-5.65,3.01-10.99,2.28-17.58-6.29-13,7.29-17.2.75-25.46Z"
      />
      <path
        fill="currentColor"
        d="M59.02,68.55c-2.17-2.18-15.62-4.59-12.33-2.5,3.8.75,7.79,1.21,10.5,4.19,6.19,12.79-4.68,21.43-17.2,20.87,1.67.72,7.92,0,10.07.2,6.04.56,11.14-10,10.77-18.01-1.52-3.66,7.4-4.21,8.7-2.55,1.64,6.09-.68,12.57,6.92,15.14,18.71,13.37-7.22,9.29-9.91,15.7,6.21,4.76,15.63-5.39,23.51-3.9,4.65,1.43-5.8-6.41-6.11-7.33.79-1.49,8.2-.54,10.2-1.31-7.79-1.15-15.65,0-19.46-7.4-2.19-2.08.42-1.44.79-2.99-5.17-1.97-3.66-8.57-.94-11.83-4.04,1.75-10.92,2.1-15.52,1.72Z"
      />
    </svg>
  );

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
              max-width: 900px;
              margin: 0 auto;
              padding: 8rem 2rem 6rem 2rem;
            }

            .intro-grid {
              display: grid;
              grid-template-columns: 1fr 2fr;
              gap: 4rem;
              align-items: center;
            }
            
            .svg-wrapper {
              width: 100%;
              max-width: 200px;
              margin: 0 auto;
            }

            .intro-text h1 {
              font-size: 2.2rem;
              font-weight: 500;
              letter-spacing: -0.01em;
              margin-bottom: 1.25rem;
              color: var(--text);
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

            .feature-icon {
              margin-bottom: 1.25rem;
              color: var(--primary);
              opacity: 1;
              background-color: var(--text);
              width: 48px;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .feature-card h2 {
              font-size: 1.4rem;
              font-weight: 600;
              margin-bottom: 1rem;
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

            @media (max-width: 768px) {
              .about-container {
                padding: 8rem 1.25rem 4rem 1.25rem;
              }

              .intro-grid {
                grid-template-columns: 1fr;
                gap: 2.5rem;
                text-align: center;
              }

              .svg-wrapper {
                max-width: 160px;
              }

              .intro-text h1 {
                font-size: 1.8rem;
              }
              .intro-text p {
                font-size: 1.05rem;
              }

              .features-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
              }

              .feature-card {
                padding: 2.5rem 1.5rem;
                align-items: center;
                text-align: center;
              }

              .cv-section h2 {
                font-size: 1.35rem;
                margin-bottom: 2rem;
              }

              .cv-list {
                gap: 1.25rem;
              }

              .cv-text {
                font-size: 1.05rem;
              }
            }
          `}
        </style>
      </Helmet>

      <div className="about-container">
        <section className="intro-grid">
          <div className="svg-wrapper">
            <DinaPortraitSVG />
          </div>
          <div className="intro-text">
            <h1>Hallo, ich bin Dina Galizzi.</h1>
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
            <div className="feature-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h2>Meine Motivation</h2>
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
            <div className="feature-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </div>
            <h2>Ausgleich im Alltag</h2>
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

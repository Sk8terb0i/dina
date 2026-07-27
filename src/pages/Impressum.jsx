import { Helmet } from "react-helmet-async";

export default function Impressum() {
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
        <title>Impressum | Dina Galizzi Psychosoziale Beratung</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <style>
        {`
          /* GLOBAL RESETS TO FIX THE WHITE BORDER */
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
          }
          * {
            box-sizing: border-box !important;
          }

          /* PAGE SPECIFIC STYLES */
          .legal-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 12rem 2rem 6rem 2rem; /* Increased top padding to clear header */
          }

          .legal-container h1 {
            font-size: 2.2rem;
            font-weight: 600;
            margin-bottom: 3rem;
            letter-spacing: -0.01em;
          }

          .legal-section {
            margin-bottom: 3rem;
          }

          .legal-section h2 {
            font-size: 1.35rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .legal-section p, 
          .legal-section address {
            font-size: 1.1rem;
            line-height: 1.65;
            opacity: 0.9;
            font-style: normal;
            margin: 0 0 1rem 0;
          }

          .legal-section a {
            color: inherit;
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 4px;
          }

          @media (max-width: 768px) {
            .legal-container {
              padding: 8rem 1.5rem 4rem 1.5rem;
            }
            .legal-container h1 {
              font-size: 1.8rem;
              margin-bottom: 2rem;
            }
            .legal-section h2 {
              font-size: 1.2rem;
            }
            .legal-section p, 
            .legal-section address {
              font-size: 1rem;
            }
          }
        `}
      </style>

      <div className="legal-container">
        <h1>Impressum</h1>

        <div className="legal-section">
          <h2>Verantwortlich für den Inhalt</h2>
          <address>
            <strong>Dina Galizzi</strong>
            <br />
            Psychosoziale Beratung
            <br />
            Breitenstrasse 2c
            <br />
            5621 Zufikon AG
          </address>
        </div>

        <div className="legal-section">
          <h2>Kontakt</h2>
          <p>
            E-Mail:{" "}
            <a href="mailto:dina.galizzi@bluewin.ch">dina.galizzi@bluewin.ch</a>
          </p>
        </div>

        <div className="legal-section">
          <h2>Allgemeiner Haftungsausschluss für Online-Inhalte</h2>
          <p>
            Die Inhalte der Website der Beraterin werden mit grösstmöglicher
            Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität
            der bereitgestellten Inhalte wird keine Gewähr übernommen.
          </p>
          <p>
            Die Nutzung der Website erfolgt auf eigene Gefahr. Für Inhalte
            verlinkter externer Seiten wird keine Verantwortung übernommen. Für
            den Inhalt der verlinkten Seiten sind ausschliesslich deren
            Betreiber verantwortlich.
          </p>
        </div>
      </div>
    </main>
  );
}

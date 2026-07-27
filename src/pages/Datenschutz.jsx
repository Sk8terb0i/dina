import { Helmet } from "react-helmet-async";

export default function Datenschutz() {
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
        <title>
          Datenschutzerklärung | Dina Galizzi Psychosoziale Beratung
        </title>
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
            margin-bottom: 3.5rem;
          }

          .legal-section h2 {
            font-size: 1.35rem;
            font-weight: 600;
            margin-bottom: 1.25rem;
          }

          .legal-section p, 
          .legal-section address {
            font-size: 1.1rem;
            line-height: 1.65;
            opacity: 0.9;
            font-style: normal;
            margin: 0 0 1rem 0;
          }

          .legal-section ul {
            font-size: 1.1rem;
            line-height: 1.65;
            opacity: 0.9;
            margin: 0 0 1rem 0;
            padding-left: 1.5rem;
          }

          .legal-section li {
            margin-bottom: 0.5rem;
          }

          .legal-section a {
            color: inherit;
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 4px;
          }

          hr {
            border: none;
            border-top: 1px solid rgba(19, 37, 109, 0.15);
            margin: 3rem 0;
          }

          @media (max-width: 768px) {
            .legal-container {
              padding: 8rem 1.5rem 4rem 1.5rem;
            }
            .legal-container h1 {
              font-size: 1.8rem;
              margin-bottom: 2rem;
            }
            .legal-section {
              margin-bottom: 2.5rem;
            }
            .legal-section h2 {
              font-size: 1.2rem;
            }
            .legal-section p, 
            .legal-section ul,
            .legal-section address {
              font-size: 1rem;
            }
          }
        `}
      </style>

      <div className="legal-container">
        <h1>Datenschutzerklärung</h1>

        <div className="legal-section">
          <h2>Verantwortlich gem. DSGVO Art. 13 Abs. 1 lit. a:</h2>
          <address>
            Dina Galizzi
            <br />
            Breitenstrasse 2c
            <br />
            5621 Zufikon AG
            <br />
            Tel.: <a href="tel:+41764201207">+41 76 420 12 07</a>
            <br />
            E-Mail:{" "}
            <a href="mailto:kontakt@dinagalizzi.ch">kontakt@dinagalizzi.ch</a>
          </address>
        </div>

        <hr />

        <div className="legal-section">
          <h2>Zwecke der Datenverarbeitung</h2>
          <p>
            Die Beraterin verarbeitet personenbezogene Daten ausschliesslich im
            Einklang mit den gesetzlichen Datenschutzvorgaben (insbesondere
            DSGVO Art. 6 Abs. 1 lit. a, b, c, f). Die Verarbeitung erfolgt zu
            folgenden Zwecken:
          </p>
          <ul>
            <li>
              Verwaltung von Klient:innendaten (Name, Adresse, Kontakt,
              Beginn/Ende der Beratung)
            </li>
            <li>Abrechnung und Buchhaltung (Honorar, Bankdaten, Quittungen)</li>
            <li>
              Erfüllung gesetzlicher Pflichten (z. B. steuerrechtliche
              Aufbewahrungspflichten)
            </li>
            <li>
              Interne Dokumentation und Qualitätssicherung (keine Aufzeichnungen
              von Gesprächen)
            </li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>Weitergabe an Dritte</h2>
          <p>
            Personenbezogene Daten werden{" "}
            <strong>nicht an Dritte weitergegeben</strong>, es sei denn:
          </p>
          <ul>
            <li>im Rahmen von Supervision in anonymisierter Form</li>
            <li>
              an externe Dienstleistende (z. B. Buchhaltung, Cloud-Anbietende),
              die sich vertraglich zur Einhaltung der DSGVO verpflichtet haben
            </li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>Aufbewahrungsdauer</h2>
          <p>
            Daten werden bis zu{" "}
            <strong>10 Jahre nach Beendigung der Beratung</strong> gespeichert.
            Auf Wunsch können Daten vorzeitig gelöscht oder ausgehändigt werden,
            sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen. In
            diesem Fall erfolgt eine Sperrung bis zur Löschung.
          </p>
        </div>

        <div className="legal-section">
          <h2>Rechte der betroffenen Person</h2>
          <p>Klient:innen haben jederzeit das Recht:</p>
          <ul>
            <li>auf Auskunft über gespeicherte Daten</li>
            <li>auf Berichtigung oder Löschung der Daten</li>
            <li>der Datenverarbeitung zu widersprechen</li>
            <li>
              sich bei der Datenschutzaufsichtsbehörde zu beschweren:
              <br />
              <strong>
                Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter
              </strong>
              <br />
              Feldeggweg 1, CH-3003 Bern
            </li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>Änderung der Datenschutzerklärung</h2>
          <p>
            Die Beraterin behält sich vor, diese Datenschutzerklärung
            anzupassen, z. B. bei Gesetzesänderungen oder neuen Leistungen. Es
            gilt jeweils die aktuelle Fassung zum Zeitpunkt der Nutzung.
          </p>
        </div>
      </div>
    </main>
  );
}

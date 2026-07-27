import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <style>
        {`
          .site-footer {
            padding: 2rem 1.5rem;
            border-top: 1px solid rgba(19, 37, 109, 0.1);
            font-family: 'Satoshi', system-ui, sans-serif;
            color: var(--text, #13256d);
            background-color: var(--background, #9FB8A3);
            font-size: 0.9rem;
          }

          .footer-container {
            max-width: 1000px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }

          .footer-links {
            display: flex;
            gap: 1.5rem;
          }

          .footer-link {
            color: inherit;
            text-decoration: none;
            opacity: 0.75;
            transition: opacity 0.2s ease;
          }

          .footer-link:hover {
            opacity: 1;
            text-decoration: underline;
          }

          .footer-text {
            opacity: 0.75;
          }

          .footer-credit {
            opacity: 0.5;
            font-size: 0.8rem;
            text-align: center;
            margin-top: 0.5rem;
          }

          .footer-credit a {
            color: inherit;
            text-decoration: none;
            transition: opacity 0.2s ease;
          }

          .footer-credit a:hover {
            opacity: 1;
            text-decoration: underline;
          }

          /* Desktop layout */
          @media (min-width: 768px) {
            .site-footer {
              padding: 2.5rem 2rem;
            }
            .footer-container {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
            .footer-credit {
              margin-top: 0;
              text-align: right;
            }
          }
        `}
      </style>

      <div className="footer-container">
        <div className="footer-text">&copy; {currentYear} Dina Galizzi</div>

        <nav className="footer-links">
          <Link to="/impressum" className="footer-link">
            Impressum
          </Link>
          <Link to="/datenschutz" className="footer-link">
            Datenschutz
          </Link>
        </nav>

        <div className="footer-credit">
          Webdesign by{" "}
          <a
            href="https://www.streaming-web.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eon Web & Streaming
          </a>
        </div>
      </div>
    </footer>
  );
}

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function About() {
  // ========================================================
  // SEO PLACEHOLDERS - EASY TO REPLACE LATER
  // ========================================================
  const seoData = {
    title: "About Dina | Licensed Marriage & Family Therapist",
    description:
      "Learn more about Dina's qualifications, clinical background, and therapeutic approach for individuals and couples.",
    canonicalUrl: "https://[YOUR_GITHUB_USERNAME].github.io/dina/about",
  };

  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        maxW: "800px",
        margin: "0 auto",
      }}
    >
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <link rel="canonical" href={seoData.canonicalUrl} />
      </Helmet>

      <h1>About Dina</h1>
      <p style={{ color: "#555", fontSize: "1.1rem" }}>
        This is the About Me Page. It has its own unique SEO title and meta
        description tag for search engines.
      </p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#f4f4f5",
          borderRadius: "8px",
        }}
      >
        <p>
          <strong>Page Verification:</strong> About page status is active.
        </p>
        <Link to="/" style={{ color: "#0284c7", fontWeight: "bold" }}>
          &larr; Back to Home Page
        </Link>
      </div>
    </main>
  );
}

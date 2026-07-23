import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Landing() {
  // ========================================================
  // SEO PLACEHOLDERS - EASY TO REPLACE LATER
  // ========================================================
  const seoData = {
    title: "Dina Therapy | Licensed Therapist & Counselor in [Your City]",
    description:
      "Compassionate therapy for anxiety, trauma, and personal growth. Book your free initial phone consultation with Dina today.",
    canonicalUrl: "https://[YOUR_GITHUB_USERNAME].github.io/dina/",
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Dina Therapy",
    description: seoData.description,
    url: seoData.canonicalUrl,
    telephone: "+1-555-019-2831",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Healing Way, Suite 100",
      addressLocality: "Your City",
      addressRegion: "CA",
      postalCode: "90210",
      addressCountry: "US",
    },
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
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <h1>Welcome to Dina Therapy</h1>
      <p style={{ color: "#555", fontSize: "1.1rem" }}>
        This is the Landing Page. Google search engine crawlers will index this
        page with the local business metadata above.
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
          <strong>Page Verification:</strong> Home page status is active.
        </p>
        <Link to="/about" style={{ color: "#0284c7", fontWeight: "bold" }}>
          View About Me Page &rarr;
        </Link>
      </div>
    </main>
  );
}

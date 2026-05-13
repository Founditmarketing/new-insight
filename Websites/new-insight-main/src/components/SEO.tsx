import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: string;
  structuredData?: object;
}

const BASE_URL = 'https://new-insight.vercel.app';

export function SEO({ title, description, canonical, ogImage, type = 'website', structuredData }: SEOProps) {
  const fullTitle = title.includes('Insight Insurance') ? title : `${title} | Insight Insurance`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const image = ogImage || `${BASE_URL}/images/og-default.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content="Insight Insurance" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Geo */}
      <meta name="geo.region" content="US-LA" />
      <meta name="geo.placename" content="Ponchatoula, Louisiana" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

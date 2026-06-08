// Insight Insurance — JSON-LD Structured Data for SEO

export const locations = [
  {
    name: 'Insight Insurance - Alexandria',
    address: '5215 B Jackson St, Alexandria, LA 71303',
    phone: '(318) 561-8000',
    lat: 31.3113,
    lng: -92.4451,
  },
  {
    name: 'Insight Insurance - Ponchatoula',
    address: '1133 Hwy 51, Suite 105, Ponchatoula, LA 70454',
    phone: '(985) 242-4300',
    lat: 30.4388,
    lng: -90.4415,
  },
  {
    name: 'Insight Insurance - Slidell',
    address: '1352 7th St, Slidell, LA 70458',
    phone: '(985) 643-3304',
    lat: 30.2752,
    lng: -89.7811,
  },
];

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: 'Insight Insurance',
    url: 'https://insighthelps.com',
    logo: 'https://insighthelps.com/images/og-default.png',
    description: 'Independent insurance agency serving Ponchatoula, Slidell, and Alexandria, Louisiana. We shop 50+ carriers to find the right coverage at a fair price.',
    email: 'support@insighthelps.com',
    foundingDate: '2000',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 5, maxValue: 15 },
    areaServed: [
      { '@type': 'City', name: 'Alexandria', containedInPlace: { '@type': 'State', name: 'Louisiana' } },
      { '@type': 'City', name: 'Ponchatoula', containedInPlace: { '@type': 'State', name: 'Louisiana' } },
      { '@type': 'City', name: 'Slidell', containedInPlace: { '@type': 'State', name: 'Louisiana' } },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Insurance Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Insurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Auto Insurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Insurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flood Insurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Life Insurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Marine Insurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Surety Bonds' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Umbrella / Excess Liability' } },
      ],
    },
    location: locations.map((loc) => ({
      '@type': 'LocalBusiness',
      name: loc.name,
      telephone: loc.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.address.split(',')[0],
        addressLocality: loc.address.split(',')[1]?.trim().split(' ')[0],
        addressRegion: 'LA',
        postalCode: loc.address.match(/\d{5}/)?.[0],
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: loc.lat, longitude: loc.lng },
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
      bestRating: '5',
    },
  };
}

export function getLocalBusinessSchema(locationIndex: number) {
  const loc = locations[locationIndex];
  if (!loc) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: loc.name,
    telephone: loc.phone,
    email: 'support@insighthelps.com',
    url: 'https://insighthelps.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address.split(',')[0],
      addressLocality: loc.address.split(',')[1]?.trim().split(' ')[0],
      addressRegion: 'LA',
      postalCode: loc.address.match(/\d{5}/)?.[0],
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: loc.lat, longitude: loc.lng },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://insighthelps.com${item.url}`,
    })),
  };
}

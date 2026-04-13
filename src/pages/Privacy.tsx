import { SEO } from '../components/SEO';

export function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Insight Insurance privacy policy. Learn how we collect, use, and protect your personal information."
        canonical="/privacy"
      />

      <div className="bg-paper min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 prose prose-lg prose-ink">
          <h1 className="text-4xl font-bold text-ink tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-ink/50 text-sm font-medium mb-12">Last updated: April 2026</p>

          <h2>Information We Collect</h2>
          <p>
            When you contact us for a quote, file a claim, or use our website, we may collect personal 
            information including your name, email address, phone number, physical address, and details 
            about your insurance needs. We collect this information only when you voluntarily provide it.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use your personal information to:</p>
          <ul>
            <li>Provide insurance quotes and policy recommendations</li>
            <li>Process and manage your insurance policies</li>
            <li>Communicate with you about your coverage</li>
            <li>Assist with claims processing</li>
            <li>Improve our services and website experience</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with insurance 
            carriers for the purpose of obtaining quotes and processing policies, as well as with 
            service providers who assist in our business operations. All partners are bound by 
            confidentiality agreements.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal 
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You may also 
            opt out of marketing communications at any time. To exercise these rights, contact us at{' '}
            <a href="mailto:support@insighthelps.com" className="text-accent hover:underline">
              support@insighthelps.com
            </a>.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website uses cookies to improve your browsing experience and analyze site traffic. 
            You can control cookie settings through your browser preferences.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us at:<br />
            <strong>Insight Insurance</strong><br />
            5215 B Jackson St, Alexandria, LA 71303<br />
            <a href="tel:3185618000" className="text-accent hover:underline">(318) 561-8000</a><br />
            <a href="mailto:support@insighthelps.com" className="text-accent hover:underline">
              support@insighthelps.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

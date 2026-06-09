import { SEO } from '../components/SEO';

export function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Insight Insurance terms of service. Information about using our website and services."
        canonical="/terms"
      />

      <div className="bg-paper min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 prose prose-lg prose-ink">
          <h1 className="text-4xl font-bold text-ink tracking-tight mb-2">Terms of Service</h1>
          <p className="text-ink/50 text-sm font-medium mb-12">Last updated: April 2026</p>

          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the Insight Insurance website, you agree to be bound by these 
            Terms of Service. If you do not agree with any part of these terms, you may not use our website.
          </p>

          <h2>Services</h2>
          <p>
            Insight Insurance is an independent insurance agency licensed in the state of Louisiana. 
            We provide insurance quoting, policy placement, and claims assistance services. Our website 
            provides general information about insurance products and allows you to request quotes and 
            contact our team.
          </p>

          <h2>No Guarantee of Coverage</h2>
          <p>
            Information provided on this website is for general informational purposes only and does 
            not constitute an insurance policy, binder, or guarantee of coverage. All coverage is 
            subject to the terms, conditions, and exclusions of the actual policy issued by the 
            insurance carrier.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            While we strive to provide accurate and up-to-date information, we make no warranties 
            or representations about the completeness or accuracy of the content on this website. 
            Insurance products, rates, and availability are subject to change without notice.
          </p>

          <h2>User Responsibilities</h2>
          <p>When using our website and services, you agree to:</p>
          <ul>
            <li>Provide accurate and truthful information when requesting quotes</li>
            <li>Not use the website for any unlawful purpose</li>
            <li>Not attempt to gain unauthorized access to any part of the website</li>
            <li>Not interfere with the proper functioning of the website</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and design elements, is the 
            property of Insight Insurance and is protected by copyright and trademark laws.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Insight Insurance shall not be liable for any direct, indirect, incidental, or consequential 
            damages arising from your use of this website or reliance on any information provided herein.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the State of 
            Louisiana, without regard to its conflict of law provisions.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us:<br />
            <a href="mailto:support@insighthelps.com" className="text-accent hover:underline">
              support@insighthelps.com
            </a><br />
            <a href="tel:3185618000" className="text-accent hover:underline">(318) 561-8000</a>
          </p>
        </div>
      </div>
    </>
  );
}

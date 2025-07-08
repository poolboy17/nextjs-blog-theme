
import { getGlobalData } from '../utils/global-data';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import SEO from '../components/SEO';

export default function Privacy({ globalData }) {
  return (
    <Layout>
      <SEO title={`Privacy Policy - ${globalData.name}`} description="Privacy Policy for Scambytes360" />
      <Header name={globalData.name} />
      <main className="w-full max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            <strong>Last updated:</strong> January 2025
          </p>

          <h2>Information We Collect</h2>
          <p>
            Scambytes360 is committed to protecting your privacy. We collect minimal information necessary to provide our cybersecurity education services:
          </p>
          <ul>
            <li><strong>Analytics Data:</strong> We use privacy-focused analytics to understand how visitors use our site</li>
            <li><strong>Contact Information:</strong> Only when you voluntarily contact us through our contact form</li>
            <li><strong>Cookies:</strong> We use essential cookies for site functionality and theme preferences</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>Any information collected is used solely to:</p>
          <ul>
            <li>Improve our cybersecurity educational content</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Analyze site usage to enhance user experience</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to read their privacy policies.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our contact page.
          </p>
        </div>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const globalData = getGlobalData();
  return { props: { globalData } };
}

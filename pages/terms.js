
import { getGlobalData } from '../utils/global-data';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import SEO from '../components/SEO';

export default function Terms({ globalData }) {
  return (
    <Layout>
      <SEO title={`Terms of Service - ${globalData.name}`} description="Terms of Service for Scambytes360" />
      <Header name={globalData.name} />
      <main className="w-full max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            <strong>Last updated:</strong> January 2025
          </p>

          <h2>Agreement to Terms</h2>
          <p>
            By accessing and using Scambytes360, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily access the materials on Scambytes360 for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2>Educational Purpose</h2>
          <p>
            Scambytes360 provides cybersecurity education and scam prevention information. While we strive for accuracy, this information is for educational purposes only and should not be considered as professional security advice for specific situations.
          </p>

          <h2>Disclaimer</h2>
          <p>
            The materials on Scambytes360 are provided on an 'as is' basis. Scambytes360 makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>Limitations</h2>
          <p>
            In no event shall Scambytes360 or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Scambytes360's website.
          </p>

          <h2>Accuracy of Materials</h2>
          <p>
            The materials appearing on Scambytes360 could include technical, typographical, or photographic errors. Scambytes360 does not warrant that any of the materials on its website are accurate, complete, or current.
          </p>

          <h2>Links</h2>
          <p>
            Scambytes360 has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Scambytes360 of the site.
          </p>

          <h2>Modifications</h2>
          <p>
            Scambytes360 may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
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

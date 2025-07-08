
import { useState } from 'react';
import { getGlobalData } from '../utils/global-data';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import SEO from '../components/SEO';

export default function Contact({ globalData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Create mailto link as the primary contact method
    const subject = encodeURIComponent(`${formData.subject} - Contact from ${formData.name}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
    `);
    
    const mailtoLink = `mailto:contact@scambytes360.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    setStatus('sent');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Layout>
      <SEO title={`Contact Us - ${globalData.name}`} description="Get in touch with Scambytes360 for cybersecurity questions and support" />
      <Header name={globalData.name} />
      <main className="w-full max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Have questions about cybersecurity, need help identifying a potential scam, or want to report suspicious activity? We're here to help protect you online.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">🛡️ Scam Reports</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  Report suspicious emails, websites, or phone calls to help protect others in our community.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">💡 Security Questions</h3>
                <p className="text-sm text-green-700 dark:text-green-400">
                  Need advice on protecting your devices, data, or online accounts? We can point you in the right direction.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">📝 Content Suggestions</h3>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  Have ideas for topics you'd like us to cover? We welcome suggestions for future articles.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">⚠️ Emergency Security Issues</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                If you believe you're actively being scammed or your accounts are compromised, contact your bank, local authorities, or relevant service providers immediately.
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                >
                  <option value="">Select a topic</option>
                  <option value="Scam Report">Report a Scam</option>
                  <option value="Security Question">Security Question</option>
                  <option value="Content Suggestion">Content Suggestion</option>
                  <option value="Website Feedback">Website Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                  placeholder="Please provide as much detail as possible..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {status === 'sending' ? 'Opening Email Client...' : 'Send Message'}
              </button>

              {status === 'sent' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
                  Your email client should have opened with your message. If it didn't, please send your message directly to: contact@scambytes360.com
                </div>
              )}
            </form>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              <p>
                * This form will open your default email client. We use this method to ensure your privacy and security.
              </p>
              <p className="mt-2">
                <strong>Direct Email:</strong> contact@scambytes360.com
              </p>
            </div>
          </div>
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

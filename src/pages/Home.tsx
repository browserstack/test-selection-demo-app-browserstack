import React from 'react';
import { ArrowRight, Shield, Zap, AlertTriangle, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Home: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Stable UI targets',
      description: 'Predictable IDs, roles, and data hooks across forms, tables, and cards.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Full flow coverage',
      description: 'Login, catalog, checkout, and dashboards mirror common commerce journeys.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Tool agnostic',
      description: 'Plug into Selenium, Playwright, Cypress, Appium, or any grid without code changes.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" id="hero-title">
              BrowserStack Demo Playground
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto" id="hero-subtitle">
              A BrowserStack-ready storefront and dashboard you can reuse for demos, docs, onboarding, and regression testing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/scenarios"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                id="primary-cta"
              >
                Preview Screens
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Catalog Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simple overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything in this BrowserStack sandbox mirrors a modern commerce stack so you can demonstrate login, search, cart, checkout, and storytelling surfaces in one place.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(feature => (
              <div key={feature.title} className="border border-gray-100 rounded-xl p-6 text-center shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Use it for any test story</h2>
          <p className="text-xl mb-8 text-blue-100">
            Spin it up for proofs of concept, onboarding workshops, conference demos, or regression runs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/scenarios"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Tour the Screens
            </Link>
            <button
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              onClick={() => {
                if (user) {
                  navigate('/products');
                } else {
                  navigate('/login');
                }
              }}
            >
              Open the Demo
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

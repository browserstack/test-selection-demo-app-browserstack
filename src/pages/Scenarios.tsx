import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Zap, Share2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import ProgressBar from '../components/ui/ProgressBar';
import { toast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';

const Scenarios: React.FC = () => {
  const [toggleState, setToggleState] = useState(false);
  const [progressValue, setProgressValue] = useState(45);
  const toastStyles = 'border-2 shadow-lg rounded-lg px-4 py-3 font-semibold transition-all duration-200 bg-blue-100 border-blue-300 text-blue-800';

  return (
    <div className="min-h-screen py-8">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Scenarios</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use these widgets to stage common UI behaviours with predictable state so your tooling stays focused on the story.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Form Field Target</h3>
                <p className="text-gray-600">Demonstrate how your flows handle predictable customer reference fields.</p>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="static-id-field" className="text-sm font-medium text-gray-600">Customer reference</label>
              <input
                type="text"
                id="static-id-field"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all border-gray-300 focus:ring-blue-500"
                placeholder="e.g. ORD-2025-001"
              />
              <p className="text-xs text-gray-500">Use it to show how your scripts store and reuse customer references.</p>
            </div>
          </Card>

          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nested Layout</h3>
                <p className="text-gray-600">Demonstrate XPath/CSS adjustments when DOM structure evolves.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">Current structure:</span>
                <span
                  className="font-mono px-2 py-1 rounded break-all whitespace-pre-wrap bg-gray-100 text-gray-700"
                  style={{ wordBreak: 'break-all', maxWidth: '100%' }}
                >
                  //div[@id='xpath-form']/section/input
                </span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div id="xpath-form" className="bg-white rounded-lg p-4 flex flex-col gap-2">
                  <section className="flex flex-col gap-2">
                    <input type="text" id="xpath-input" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Nested input" />
                  </section>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Notification Button</h3>
                <p className="text-gray-600">Trigger lightweight notifications to show how your tooling tracks user feedback.</p>
              </div>
            </div>
            <div className="space-y-4">
              <button
                title="Submit"
                className="w-full py-3 px-4 rounded-lg font-medium transition-all bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => toast({
                  title: 'Demo notification',
                  description: 'Content Description button clicked!',
                  className: toastStyles,
                  duration: 500
                })}
              >
                Submit
              </button>
            </div>
          </Card>

          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Clipboard Share</h3>
                <p className="text-gray-600">Illustrate how your tests validate copy-to-clipboard interactions.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-700" id="share-link">
                https://demo-app.local/scenario
              </div>
              <button
                className="w-full py-3 px-4 rounded-lg font-medium transition-all bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  const text = document.getElementById('share-link')?.textContent?.trim();
                  if (text) {
                    navigator.clipboard.writeText(text).then(() => {
                      toast({
                        title: 'Link copied',
                        description: 'The scenario URL is ready to share.',
                        className: toastStyles,
                        duration: 3000
                      });
                    });
                  }
                }}
              >
                Copy share link
              </button>
            </div>
          </Card>

          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Feature Toggle</h3>
                <p className="text-gray-600">Show how feature switches impact layout and behavior in real time.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="feature-toggle"
                    id="toggle-label"
                    className="text-sm font-medium text-gray-700"
                  >
                    Enable Feature
                  </label>
                  <p className="text-xs text-gray-500">Toggle this feature on/off</p>
                </div>
                <button
                  onClick={() => setToggleState(!toggleState)}
                  id="feature-toggle-btn"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    toggleState ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      toggleState ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>

          <Card className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Progress Indicators</h3>
                <p className="text-gray-600">Drive visual state machines or polling logic.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span
                    className="text-sm font-medium text-gray-700"
                    id="progress-text"
                  >
                    Upload Progress
                  </span>
                  <span className="text-sm text-gray-500">{progressValue}%</span>
                </div>
                <ProgressBar value={progressValue} />
              </div>

              <div className="flex gap-2 w-full">
                {[25, 50, 75, 100].map((value) => (
                  <button
                    key={value}
                    id={`progress-btn-${value}`}
                    onClick={() => setProgressValue(value)}
                    className="flex-1 py-2 px-2 text-sm rounded-lg font-medium transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    {value}%
                  </button>
                ))}
              </div>

              <div className={`p-4 rounded-lg transition-all ${
                progressValue === 100
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                <p
                  id="progress-status-id"
                  className={`text-sm font-medium ${
                    progressValue === 100
                      ? 'text-green-700'
                      : 'text-gray-700'
                  }`}
                >
                  Status: {progressValue === 100 ? 'Complete' : 'In Progress'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Spacer to keep breathing room at the bottom */}
        <div className="mt-16" />
      </div>
    </div>
  );
};

export default Scenarios;

import React, { useState } from 'react';
import { Sparkles, Zap, BookOpen, Brain } from 'lucide-react';
import CodeInput from './components/CodeInput';
import ExplanationOutput from './components/ExplanationOutput';
import ExampleCodeCard from './components/ExampleCodeCard';
import { explainCode } from './utils/openai';
import { exampleCodes } from './data/examples';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleExplainCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to explain');
      return;
    }

    setIsLoading(true);
    setError(null);
    setExplanation('');

    try {
      const result = await explainCode(code, language);
      setExplanation(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyExplanation = async () => {
    try {
      await navigator.clipboard.writeText(explanation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleSelectExample = (exampleCode: string, exampleLanguage: string) => {
    setCode(exampleCode);
    setLanguage(exampleLanguage);
    setExplanation('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Code Explainer
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Paste any code snippet and get a clear, beginner-friendly explanation powered by AI
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <CodeInput
              code={code}
              language={language}
              onCodeChange={setCode}
              onLanguageChange={setLanguage}
              disabled={isLoading}
            />
            
            <div className="flex justify-center">
              <button
                onClick={handleExplainCode}
                disabled={isLoading || !code.trim()}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Zap className="w-5 h-5" />
                <span className="text-lg">Explain Code</span>
              </button>
            </div>
          </div>

          <ExplanationOutput
            explanation={explanation}
            isLoading={isLoading}
            error={error}
            onCopy={handleCopyExplanation}
            copied={copied}
          />
        </div>

        {/* Example Code Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <BookOpen className="w-6 h-6 text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-800">Try These Examples</h2>
            </div>
            <p className="text-gray-600">
              Click on any example below to load it into the code editor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exampleCodes.map((example, index) => (
              <ExampleCodeCard
                key={index}
                example={example}
                onSelect={handleSelectExample}
              />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Why Use AI Code Explainer?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Smart Analysis</h4>
              <p className="text-gray-600">
                Powered by GPT-4 to provide accurate and detailed explanations of your code
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Beginner Friendly</h4>
              <p className="text-gray-600">
                Explanations are written in plain English, perfect for learning programming
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Multiple Languages</h4>
              <p className="text-gray-600">
                Support for Python, JavaScript, Java, C++, and many other programming languages
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built with React, TypeScript, and OpenAI GPT-4
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
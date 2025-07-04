import React from 'react';
import { Brain, Copy, CheckCircle, AlertCircle } from 'lucide-react';

interface ExplanationOutputProps {
  explanation: string;
  isLoading: boolean;
  error: string | null;
  onCopy: () => void;
  copied: boolean;
}

export default function ExplanationOutput({ explanation, isLoading, error, onCopy, copied }: ExplanationOutputProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">AI Explanation</h3>
          </div>
          {explanation && !isLoading && !error && (
            <button
              onClick={onCopy}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
              </div>
              <p className="text-gray-600 font-medium">Analyzing your code...</p>
              <p className="text-gray-500 text-sm mt-1">This may take a few seconds</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {explanation && !isLoading && !error && (
          <div className="prose prose-gray max-w-none">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {explanation}
              </div>
            </div>
          </div>
        )}
        
        {!explanation && !isLoading && !error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">Ready to explain your code</p>
            <p className="text-gray-500 text-sm mt-1">Enter some code above and click "Explain Code" to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
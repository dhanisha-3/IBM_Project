import React from 'react';
import { ExampleCode } from '../types';
import { Code, ArrowRight } from 'lucide-react';

interface ExampleCodeCardProps {
  example: ExampleCode;
  onSelect: (code: string, language: string) => void;
}

export default function ExampleCodeCard({ example, onSelect }: ExampleCodeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
         onClick={() => onSelect(example.code, example.language)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <Code className="w-4 h-4 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800">{example.title}</h4>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{example.description}</p>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {example.language}
            </span>
          </div>
          <pre className="text-xs text-gray-700 overflow-hidden">
            <code className="line-clamp-4">{example.code.slice(0, 120)}...</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
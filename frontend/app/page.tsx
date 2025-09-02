'use client';

import Link from 'next/link';
import "./globals.css";
import { Sparkles, FileText, Zap, Shield, Users, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">FormAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powered by AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Create Forms with
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Natural Language
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Describe the form you want in plain English, and our AI will generate it instantly. 
              No more complex form builders or coding required.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Start Creating Forms</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FormAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform the way you create forms with AI-powered automation and intelligent design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Generation</h3>
              <p className="text-gray-600">
                Simply describe your form in natural language and watch as AI creates the perfect form structure with appropriate fields and validation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate complex forms in seconds, not hours. Our AI understands context and creates forms that match your exact requirements.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Fields</h3>
              <p className="text-gray-600">
                Automatically detects field types, adds validation rules, and suggests the best input methods for each piece of information.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Reliable</h3>
              <p className="text-gray-600">
                Built with enterprise-grade security. All form submissions are encrypted and stored safely with proper access controls.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Collaboration</h3>
              <p className="text-gray-600">
                Share forms with your team, collaborate on designs, and manage submissions together in one centralized platform.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-green-50 border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Integration</h3>
              <p className="text-gray-600">
                Embed forms anywhere, integrate with your existing tools, and export data in multiple formats for seamless workflow integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Form Creation?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already creating forms faster and smarter with AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">FormAI</span>
          </div>
          <p className="text-gray-400 mb-6">
            The future of form creation is here. Powered by artificial intelligence.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            <span>© 2026 FormAI by Abhinav Saxena . All rights reserved.</span>
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

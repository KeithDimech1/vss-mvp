'use client';

import { useState, useEffect } from 'react';
import {
  researchSources,
  aiTools,
  promptTemplates,
  aiIntegrationProposals,
  trackingMetrics,
  type AITool,
  type PromptTemplate,
  type AIIntegrationProposal
} from '@/lib/data-extraction-research';

interface ResearchClientProps {
  language: 'en' | 'es';
}

export default function ResearchClient({ language: initialLanguage }: ResearchClientProps) {
  const [language, setLanguage] = useState<'en' | 'es'>(initialLanguage);
  const [activeTab, setActiveTab] = useState<'questions' | 'research'>('questions');
  const [expandedProposal, setExpandedProposal] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(true);

  // Research questions state
  const [researchAnswers, setResearchAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  });

  // Load existing research answers on mount
  useEffect(() => {
    const loadResearchAnswers = async () => {
      try {
        const response = await fetch('/api/data-extraction/research?processId=data-extraction-2025');
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.answers) {
            setResearchAnswers(result.data.answers);
          }
        }
      } catch (error) {
        console.error('Error loading research answers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResearchAnswers();
  }, []);

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'es' : 'en');
  };

  const copyPrompt = async (promptId: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedPrompt(promptId);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const handleSaveResearchAnswers = async () => {
    setSaving(true);
    setSaveStatus('idle');

    try {
      const response = await fetch('/api/data-extraction/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          processId: 'data-extraction-2025',
          answers: researchAnswers,
          language
        })
      });

      if (!response.ok) throw new Error('Failed to save');

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving research answers:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setSaving(false);
    }
  };

  const translations = {
    title: {
      en: 'AI-Powered Data Extraction',
      es: 'Extracción de Datos con IA'
    },
    subtitle: {
      en: 'Transform your geological data extraction workflow with AI',
      es: 'Transforma tu flujo de trabajo de extracción de datos geológicos con IA'
    },
    tabs: {
      questions: { en: 'Questions for Juan', es: 'Preguntas para Juan' },
      research: { en: 'Research Findings', es: 'Hallazgos de Investigación' }
    },
    toggleLang: { en: 'Español', es: 'English' }
  };

  const t = (key: keyof typeof translations) => translations[key][language];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1B4332]">{t('title')}</h1>
          <p className="mt-2 text-gray-600">{t('subtitle')}</p>
        </div>
        <button
          onClick={toggleLanguage}
          className="px-6 py-3 bg-gradient-to-r from-[#C9A961] to-[#1B4332] text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
        >
          {t('toggleLang')}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {(['questions', 'research'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#1B4332] to-[#2D5A45] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {translations.tabs[tab][language]}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span>📚</span>
              {language === 'en' ? 'Key Research Sources' : 'Fuentes de Investigación Clave'}
            </h2>
            <p className="text-blue-800 mb-4">
              {language === 'en'
                ? 'All recommendations below are based on peer-reviewed research and industry best practices from 2024-2025.'
                : 'Todas las recomendaciones a continuación se basan en investigación revisada por pares y mejores prácticas de la industria de 2024-2025.'}
            </p>
          </div>

          {researchSources.filter(source =>
            source.title === "Geology AI: Trending Tools for Exploration Teams" ||
            source.title === "Extracting Data from Maps: AI for Critical Mineral Assessment" ||
            source.title === "Extracting Accurate Materials Data from Research Papers with LLMs"
          ).map((source, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1B4332] mb-2">{source.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {source.organization}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {source.year}
                    </span>
                  </div>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1B4332] text-white rounded-lg hover:bg-[#2D5A45] transition-colors flex items-center gap-2"
                >
                  <span>{language === 'en' ? 'Read' : 'Leer'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">
                  {language === 'en' ? 'Key Findings:' : 'Hallazgos Clave:'}
                </h4>
                <ul className="space-y-2">
                  {source.keyFindings.map((finding, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#C9A961] font-bold mt-1">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
            <h2 className="text-2xl font-bold text-orange-900 mb-2">
              {language === 'en' ? 'AI Implementation Questions for Juan' : 'Preguntas de Implementación de IA para Juan'}
            </h2>
            <p className="text-orange-800">
              {language === 'en'
                ? 'Help us understand where AI could have the biggest impact on your extraction workflow. Your answers will guide our implementation strategy.'
                : 'Ayúdanos a entender dónde la IA podría tener el mayor impacto en tu flujo de trabajo de extracción. Tus respuestas guiarán nuestra estrategia de implementación.'}
            </p>
          </div>

          {/* Question 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">1️⃣</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#1B4332] mb-2">
                  {language === 'en'
                    ? 'Which extraction step takes the most time and causes the most frustration?'
                    : '¿Qué paso de extracción toma más tiempo y causa más frustración?'}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {language === 'en'
                    ? 'Think about the 8 steps you reviewed: Source ID, Acquisition, Assessment, Planning, Extraction, QC, Loading, Documentation'
                    : 'Piensa en los 8 pasos que revisaste: ID de fuente, Adquisición, Evaluación, Planificación, Extracción, QC, Carga, Documentación'}
                </p>
                <textarea
                  value={researchAnswers.q1}
                  onChange={(e) => setResearchAnswers({...researchAnswers, q1: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
                  rows={4}
                  placeholder={language === 'en'
                    ? 'Example: "Data Extraction (Step 5) takes 60% of my time because I have to manually copy-paste values from PDFs into spreadsheets..."'
                    : 'Ejemplo: "La Extracción de Datos (Paso 5) toma el 60% de mi tiempo porque tengo que copiar y pegar manualmente valores de PDFs a hojas de cálculo..."'}
                />
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">2️⃣</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#1B4332] mb-2">
                  {language === 'en'
                    ? 'Can you describe a specific example where AI could help you extract data faster?'
                    : '¿Puedes describir un ejemplo específico donde la IA podría ayudarte a extraer datos más rápido?'}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {language === 'en'
                    ? 'Be as specific as possible: What type of document? What data are you extracting? What makes it slow?'
                    : 'Sé lo más específico posible: ¿Qué tipo de documento? ¿Qué datos estás extrayendo? ¿Qué lo hace lento?'}
                </p>
                <textarea
                  value={researchAnswers.q2}
                  onChange={(e) => setResearchAnswers({...researchAnswers, q2: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
                  rows={5}
                  placeholder={language === 'en'
                    ? 'Example: "I often work with USGS mineral reports (50-100 pages PDFs). They have tables with sample IDs, depths, and Au/Cu values. Currently I read through the whole report to find tables, then manually enter each row. If AI could extract all table data automatically and format it as CSV, that would save me 2-3 hours per report."'
                    : 'Ejemplo: "A menudo trabajo con informes minerales de USGS (PDFs de 50-100 páginas). Tienen tablas con IDs de muestra, profundidades y valores de Au/Cu. Actualmente leo todo el informe para encontrar tablas, luego ingreso manualmente cada fila. Si la IA pudiera extraer todos los datos de la tabla automáticamente y formatearlos como CSV, eso me ahorraría 2-3 horas por informe."'}
                />
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">3️⃣</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#1B4332] mb-2">
                  {language === 'en'
                    ? 'What concerns do you have about using AI for data extraction?'
                    : '¿Qué preocupaciones tienes sobre usar IA para extracción de datos?'}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {language === 'en'
                    ? 'Common concerns: accuracy, learning curve, cost, data privacy, job security. What worries you most?'
                    : 'Preocupaciones comunes: precisión, curva de aprendizaje, costo, privacidad de datos, seguridad laboral. ¿Qué te preocupa más?'}
                </p>
                <textarea
                  value={researchAnswers.q3}
                  onChange={(e) => setResearchAnswers({...researchAnswers, q3: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
                  rows={4}
                  placeholder={language === 'en'
                    ? 'Be honest about your concerns. We want to address them in the implementation plan...'
                    : 'Sé honesto sobre tus preocupaciones. Queremos abordarlas en el plan de implementación...'}
                />
              </div>
            </div>
          </div>

          {/* Question 4 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">4️⃣</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#1B4332] mb-2">
                  {language === 'en'
                    ? 'If you could design the perfect AI-assisted extraction workflow, what would it look like?'
                    : 'Si pudieras diseñar el flujo de trabajo de extracción asistido por IA perfecto, ¿cómo sería?'}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {language === 'en'
                    ? 'Dream big! Describe your ideal workflow from receiving a document to having clean data in the database.'
                    : '¡Sueña en grande! Describe tu flujo de trabajo ideal desde recibir un documento hasta tener datos limpios en la base de datos.'}
                </p>
                <textarea
                  value={researchAnswers.q4}
                  onChange={(e) => setResearchAnswers({...researchAnswers, q4: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
                  rows={6}
                  placeholder={language === 'en'
                    ? 'Example: "1. Upload PDF to platform. 2. AI automatically identifies all tables and extracts data. 3. AI suggests which database fields each column maps to. 4. I review and approve the mapping. 5. Data loads automatically with validation checks. 6. AI generates documentation summary. Total time: 15 minutes instead of 3 hours."'
                    : 'Ejemplo: "1. Subir PDF a la plataforma. 2. La IA identifica automáticamente todas las tablas y extrae datos. 3. La IA sugiere a qué campos de base de datos se mapea cada columna. 4. Reviso y apruebo el mapeo. 5. Los datos se cargan automáticamente con verificaciones de validación. 6. La IA genera resumen de documentación. Tiempo total: 15 minutos en lugar de 3 horas."'}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="sticky bottom-0 bg-gradient-to-r from-white to-gray-50 p-6 rounded-xl shadow-2xl">
            <button
              onClick={handleSaveResearchAnswers}
              disabled={saving}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#1B4332] to-[#C9A961] text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {saving && (
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {saveStatus === 'success' && !saving && (
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {saveStatus === 'error' && !saving && (
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span>
                {saving && (language === 'en' ? 'Saving...' : 'Guardando...')}
                {!saving && saveStatus === 'success' && (language === 'en' ? 'Saved!' : '¡Guardado!')}
                {!saving && saveStatus === 'error' && (language === 'en' ? 'Error - Try Again' : 'Error - Inténtalo de Nuevo')}
                {!saving && saveStatus === 'idle' && (language === 'en' ? 'Save My Responses' : 'Guardar Mis Respuestas')}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
        <a
          href="/data-extraction/process"
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {language === 'en' ? 'Back to Process Visualization' : 'Volver a Visualización de Proceso'}
        </a>
        <a
          href="/data-extraction/questions"
          className="px-6 py-3 bg-gradient-to-r from-[#1B4332] to-[#C9A961] text-white rounded-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center gap-2 hover:-translate-y-1"
        >
          {language === 'en' ? 'View Detailed Questions' : 'Ver Preguntas Detalladas'}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </a>
      </div>
    </div>
  );
}

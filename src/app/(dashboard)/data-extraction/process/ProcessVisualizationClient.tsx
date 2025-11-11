'use client';

import { useState, useEffect } from 'react';
import { dataExtractionSteps, type ProcessStep } from '@/lib/data-extraction-metadata';

interface ProcessVisualizationClientProps {
  userId: string;
  processId: string;
  existingFeedbacks: any[];
  language: 'en' | 'es';
}

export default function ProcessVisualizationClient({
  userId,
  processId,
  existingFeedbacks,
  language: initialLanguage
}: ProcessVisualizationClientProps) {
  const [language, setLanguage] = useState<'en' | 'es'>(initialLanguage);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<Record<string, 'saved' | 'saving' | 'error'>>({});

  // Load existing feedbacks
  useEffect(() => {
    const feedbackMap: Record<string, any> = {};
    existingFeedbacks.forEach((fb: any) => {
      feedbackMap[fb.stepId] = {
        isCorrect: fb.isCorrect,
        questionAnswers: fb.questionAnswers || {},
        comments: fb.comments || ''
      };
    });
    setFeedbacks(feedbackMap);
  }, [existingFeedbacks]);

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'es' : 'en');
  };

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const updateFeedback = (stepId: string, field: string, value: any) => {
    setFeedbacks(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [field]: value
      }
    }));
  };

  const updateQuestionAnswer = (stepId: string, questionIndex: number, value: string) => {
    setFeedbacks(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        questionAnswers: {
          ...prev[stepId]?.questionAnswers,
          [`q${questionIndex}`]: value
        }
      }
    }));
  };

  const saveFeedback = async (stepId: string) => {
    setSaveStatus(prev => ({ ...prev, [stepId]: 'saving' }));

    try {
      const response = await fetch('/api/data-extraction/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          processId,
          stepId,
          ...feedbacks[stepId],
          language
        })
      });

      if (response.ok) {
        setSaveStatus(prev => ({ ...prev, [stepId]: 'saved' }));
        setTimeout(() => {
          setSaveStatus(prev => {
            const newStatus = { ...prev };
            delete newStatus[stepId];
            return newStatus;
          });
        }, 2000);
      } else {
        setSaveStatus(prev => ({ ...prev, [stepId]: 'error' }));
      }
    } catch (error) {
      setSaveStatus(prev => ({ ...prev, [stepId]: 'error' }));
    }
  };

  const translations = {
    title: {
      en: 'LithoData Extraction Process - Interactive Review',
      es: 'Proceso de Extracción LithoData - Revisión Interactiva'
    },
    subtitle: {
      en: 'Review and provide feedback on each step of the data extraction workflow',
      es: 'Revisa y proporciona retroalimentación sobre cada paso del flujo de trabajo de extracción de datos'
    },
    toggleLang: {
      en: 'Español',
      es: 'English'
    },
    overview: {
      en: 'Process Overview',
      es: 'Resumen del Proceso'
    },
    clickToExpand: {
      en: 'Click any step to expand and provide feedback',
      es: 'Haz clic en cualquier paso para expandir y proporcionar retroalimentación'
    },
    inputs: {
      en: 'Inputs',
      es: 'Entradas'
    },
    outputs: {
      en: 'Outputs',
      es: 'Salidas'
    },
    tools: {
      en: 'Tools Used',
      es: 'Herramientas Utilizadas'
    },
    team: {
      en: 'Team Members',
      es: 'Miembros del Equipo'
    },
    estimatedTime: {
      en: 'Estimated Time',
      es: 'Tiempo Estimado'
    },
    questions: {
      en: 'Quick Questions',
      es: 'Preguntas Rápidas'
    },
    feedback: {
      en: 'Your Feedback',
      es: 'Tu Retroalimentación'
    },
    isCorrect: {
      en: 'Does this step description sound correct?',
      es: '¿Esta descripción del paso suena correcta?'
    },
    yes: {
      en: 'Yes, accurate',
      es: 'Sí, precisa'
    },
    mostly: {
      en: 'Mostly, with some notes',
      es: 'Mayormente, con algunas notas'
    },
    no: {
      en: 'No, needs corrections',
      es: 'No, necesita correcciones'
    },
    comments: {
      en: 'Comments and clarifications (max 400 words):',
      es: 'Comentarios y aclaraciones (máximo 400 palabras):'
    },
    commentsPlaceholder: {
      en: 'Please provide any corrections, clarifications, or additional details about this step...',
      es: 'Por favor proporciona cualquier corrección, aclaración o detalle adicional sobre este paso...'
    },
    answerPlaceholder: {
      en: 'Please provide your answer here...',
      es: 'Por favor proporciona tu respuesta aquí...'
    },
    save: {
      en: 'Save Feedback',
      es: 'Guardar Retroalimentación'
    },
    saved: {
      en: 'Saved ✓',
      es: 'Guardado ✓'
    },
    saving: {
      en: 'Saving...',
      es: 'Guardando...'
    },
    error: {
      en: 'Error saving',
      es: 'Error al guardar'
    },
    wordCount: {
      en: 'words',
      es: 'palabras'
    },
    nextPage: {
      en: 'Continue to Detailed Questions →',
      es: 'Continuar a Preguntas Detalladas →'
    }
  };

  const t = (key: keyof typeof translations) => translations[key][language];

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Language Toggle */}
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

      {/* Process Overview */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2D5A45] rounded-xl shadow-xl p-6 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-2">{t('overview')}</h2>
        <p className="text-[#F5E6D3]">{t('clickToExpand')}</p>
      </div>

      {/* Flowchart - Visual Process Flow */}
      <div className="space-y-6 mb-8">
        {dataExtractionSteps.map((step, index) => (
          <div key={step.id}>
            {/* Step Card */}
            <div
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-8 ${
                expandedStep === step.id
                  ? 'border-[#C9A961] ring-2 ring-[#C9A961]/30'
                  : 'border-[#1B4332]'
              }`}
              onClick={() => toggleStep(step.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Step Number and Icon */}
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#1B4332] to-[#C9A961] rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-md">
                        {step.icon}
                      </div>
                      <div className="mt-2 text-xs font-bold text-[#C9A961]">
                        STEP {step.stepNumber}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#1B4332] mb-2">
                        {step.title[language]}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description[language]}
                      </p>

                      {/* Metadata Pills */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          ⏱️ {step.estimatedTime}
                        </span>
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                          👥 {step.team.join(', ')}
                        </span>
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <div className="ml-4">
                      <svg
                        className={`w-8 h-8 text-[#C9A961] transition-transform duration-300 ${
                          expandedStep === step.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedStep === step.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                    {/* Technical Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Inputs */}
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                          <span>📥</span> {t('inputs')}
                        </h4>
                        <ul className="space-y-1 text-sm text-green-800">
                          {step.inputs.map((input, i) => (
                            <li key={i}>• {input}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Tools */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                          <span>🛠️</span> {t('tools')}
                        </h4>
                        <ul className="space-y-1 text-sm text-blue-800">
                          {step.tools.map((tool, i) => (
                            <li key={i}>• {tool}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Outputs */}
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                          <span>📤</span> {t('outputs')}
                        </h4>
                        <ul className="space-y-1 text-sm text-orange-800">
                          {step.outputs.map((output, i) => (
                            <li key={i}>• {output}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Quick Questions with Answer Boxes */}
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                        <span>❓</span> {t('questions')}
                      </h4>
                      <div className="space-y-4">
                        {step.questions.map((q, i) => (
                          <div key={i} className="bg-white rounded-lg p-3">
                            <div className="flex items-start gap-2 mb-2">
                              <span className="font-bold text-yellow-900">{i + 1}.</span>
                              <span className="text-sm text-yellow-900 font-medium">{q[language]}</span>
                            </div>
                            <textarea
                              value={feedbacks[step.id]?.questionAnswers?.[`q${i}`] || ''}
                              onChange={(e) => updateQuestionAnswer(step.id, i, e.target.value)}
                              placeholder={t('answerPlaceholder')}
                              rows={3}
                              className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feedback Form */}
                    <div className="bg-gradient-to-r from-[#F5E6D3]/30 to-[#C9A961]/10 rounded-xl p-6 border-2 border-[#C9A961]/30">
                      <h4 className="font-bold text-[#1B4332] text-xl mb-4 flex items-center gap-2">
                        <span>💬</span> {t('feedback')}
                      </h4>

                      {/* Correctness Radio */}
                      <div className="mb-4">
                        <label className="block font-medium text-gray-700 mb-2">
                          {t('isCorrect')}
                        </label>
                        <div className="space-y-2">
                          {[
                            { value: true, label: t('yes'), color: 'green' },
                            { value: null, label: t('mostly'), color: 'yellow' },
                            { value: false, label: t('no'), color: 'red' }
                          ].map(option => (
                            <label
                              key={String(option.value)}
                              className="flex items-center space-x-3 cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="radio"
                                name={`correct-${step.id}`}
                                checked={feedbacks[step.id]?.isCorrect === option.value}
                                onChange={() =>
                                  updateFeedback(step.id, 'isCorrect', option.value)
                                }
                                className="w-5 h-5"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span className="text-gray-700">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Comments Textarea - Only show if "Mostly" (null) or "No" (false) is selected */}
                      {(feedbacks[step.id]?.isCorrect === null || feedbacks[step.id]?.isCorrect === false) && (
                        <div className="mb-4">
                          <label className="block font-medium text-gray-700 mb-2">
                            {t('comments')}
                          </label>
                          <textarea
                            value={feedbacks[step.id]?.comments || ''}
                            onChange={(e) =>
                              updateFeedback(step.id, 'comments', e.target.value)
                            }
                            placeholder={t('commentsPlaceholder')}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="mt-1 text-xs text-gray-500 text-right">
                            {getWordCount(feedbacks[step.id]?.comments || '')} {t('wordCount')} / 400
                          </div>
                        </div>
                      )}

                      {/* Save Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveFeedback(step.id);
                        }}
                        disabled={saveStatus[step.id] === 'saving'}
                        className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                          saveStatus[step.id] === 'saved'
                            ? 'bg-green-500 text-white'
                            : saveStatus[step.id] === 'error'
                            ? 'bg-red-500 text-white'
                            : 'bg-gradient-to-r from-[#C9A961] to-[#1B4332] text-white hover:shadow-lg'
                        }`}
                      >
                        {saveStatus[step.id] === 'saving'
                          ? t('saving')
                          : saveStatus[step.id] === 'saved'
                          ? t('saved')
                          : saveStatus[step.id] === 'error'
                          ? t('error')
                          : t('save')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Connector Arrow (except for last step) */}
            {index < dataExtractionSteps.length - 1 && (
              <div className="flex justify-center py-4">
                <div className="text-[#C9A961] text-4xl">↓</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
        <a
          href="/data-extraction/questions"
          className="px-8 py-4 bg-gradient-to-r from-[#1B4332] to-[#C9A961] text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg flex items-center gap-3 hover:-translate-y-1"
        >
          {language === 'en' ? 'Detailed Questions' : 'Preguntas Detalladas'}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <a
          href="/data-extraction/research"
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg flex items-center gap-3 hover:-translate-y-1"
        >
          {language === 'en' ? 'Research & AI Integration' : 'Investigación e IA'}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </a>
      </div>
    </div>
  );
}

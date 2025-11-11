'use client';

import { useState, useEffect } from 'react';
import {
  diagnosticQuestions,
  getQuestionsByCategory,
  getTotalQuestions,
  getRequiredQuestionsCount,
  type DiagnosticQuestion
} from '@/lib/data-extraction-metadata';

interface QuestionsClientProps {
  userId: string;
  processId: string;
  existingResponses: any;
  existingWorkspaceLinks: any[];
  language: 'en' | 'es';
}

export default function QuestionsClient({
  userId,
  processId,
  existingResponses,
  existingWorkspaceLinks,
  language: initialLanguage
}: QuestionsClientProps) {
  const [language, setLanguage] = useState<'en' | 'es'>(initialLanguage);
  const [responses, setResponses] = useState<Record<string, any>>(existingResponses || {});
  const [workspaceLinks, setWorkspaceLinks] = useState<any[]>(existingWorkspaceLinks || []);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const questionsByCategory = getQuestionsByCategory();
  const totalQuestions = getTotalQuestions();
  const requiredQuestions = getRequiredQuestionsCount();
  const answeredCount = Object.keys(responses).filter(k => responses[k] != null && responses[k] !== '').length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'es' : 'en');
  };

  const updateResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const saveAllResponses = async () => {
    setSaveStatus('saving');

    try {
      const response = await fetch('/api/data-extraction/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          processId,
          responses,
          language
        })
      });

      if (response.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      setSaveStatus('error');
    }
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(responses).length > 0) {
        saveAllResponses();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [responses]);

  const translations = {
    title: {
      en: 'Detailed Diagnostic Questions',
      es: 'Preguntas de Diagnóstico Detalladas'
    },
    subtitle: {
      en: 'Help us understand your extraction workflow in depth',
      es: 'Ayúdanos a comprender tu flujo de trabajo de extracción en profundidad'
    },
    progress: {
      en: 'Progress',
      es: 'Progreso'
    },
    questionsAnswered: {
      en: 'questions answered',
      es: 'preguntas respondidas'
    },
    required: {
      en: 'required',
      es: 'requeridas'
    },
    workspaceLinks: {
      en: 'Google Workspace / Workbench Links',
      es: 'Enlaces de Google Workspace / Workbench'
    },
    addLink: {
      en: 'Add Link',
      es: 'Agregar Enlace'
    },
    linkLabel: {
      en: 'Label',
      es: 'Etiqueta'
    },
    linkUrl: {
      en: 'URL',
      es: 'URL'
    },
    remove: {
      en: 'Remove',
      es: 'Eliminar'
    },
    save: {
      en: 'Save All Responses',
      es: 'Guardar Todas las Respuestas'
    },
    saving: {
      en: 'Saving...',
      es: 'Guardando...'
    },
    saved: {
      en: 'Saved ✓',
      es: 'Guardado ✓'
    },
    error: {
      en: 'Error saving',
      es: 'Error al guardar'
    },
    backToProcess: {
      en: '← Back to Process Visualization',
      es: '← Volver a Visualización de Proceso'
    },
    optional: {
      en: 'Optional',
      es: 'Opcional'
    },
    toggleLang: {
      en: 'Español',
      es: 'English'
    }
  };

  const t = (key: keyof typeof translations) => translations[key][language];

  const renderQuestion = (q: DiagnosticQuestion) => {
    const value = responses[q.id];

    switch (q.type) {
      case 'text':
      case 'url':
        return (
          <input
            type={q.type === 'url' ? 'url' : 'text'}
            value={value || ''}
            onChange={(e) => updateResponse(q.id, e.target.value)}
            placeholder={q.placeholder?.[language]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => updateResponse(q.id, e.target.value)}
            placeholder={q.placeholder?.[language]}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
          />
        );

      case 'rating':
        return (
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => (
              <button
                key={rating}
                onClick={() => updateResponse(q.id, rating)}
                className={`w-12 h-12 rounded-lg font-bold transition-all duration-200 ${
                  value === rating
                    ? 'bg-[#C9A961] text-white scale-110 shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        );

      case 'multipleChoice':
        return (
          <div className="space-y-2">
            {q.options?.map(option => (
              <label
                key={typeof option === 'string' ? option : option.value}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name={q.id}
                  checked={value === (typeof option === 'string' ? option : option.value)}
                  onChange={() =>
                    updateResponse(q.id, typeof option === 'string' ? option : option.value)
                  }
                  className="w-5 h-5"
                />
                <span className="text-gray-700">
                  {typeof option === 'string' ? option : option.label[language]}
                </span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        const checkedValues = value || [];
        return (
          <div className="space-y-2">
            {q.options?.map(option => {
              const optValue = typeof option === 'string' ? option : option.value;
              const optLabel = typeof option === 'string' ? option : option.label[language];
              return (
                <label
                  key={optValue}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checkedValues.includes(optValue)}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...checkedValues, optValue]
                        : checkedValues.filter((v: string) => v !== optValue);
                      updateResponse(q.id, newValues);
                    }}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700">{optLabel}</span>
                </label>
              );
            })}
          </div>
        );

      case 'ranking':
        const rankedItems = value || [];
        const unrankedItems = (q.options || []).filter(
          opt => !rankedItems.includes(typeof opt === 'string' ? opt : opt.value)
        );

        const handleDragStart = (e: React.DragEvent, index: number) => {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', index.toString());
        };

        const handleDragOver = (e: React.DragEvent) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        };

        const handleDrop = (e: React.DragEvent, dropIndex: number) => {
          e.preventDefault();
          const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
          if (dragIndex === dropIndex) return;

          const newRanked = [...rankedItems];
          const [removed] = newRanked.splice(dragIndex, 1);
          newRanked.splice(dropIndex, 0, removed);
          updateResponse(q.id, newRanked);
        };

        return (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h5 className="font-bold text-green-900 mb-2">
                {language === 'en' ? 'Ranked (drag to reorder):' : 'Clasificado (arrastra para reordenar):'}
              </h5>
              {rankedItems.length === 0 ? (
                <p className="text-green-700 text-sm italic">
                  {language === 'en' ? 'Click items below to rank them' : 'Haz clic en los elementos a continuación para clasificarlos'}
                </p>
              ) : (
                <div className="space-y-2">
                  {rankedItems.map((itemValue: string, index: number) => {
                    const option = (q.options || []).find(
                      opt => (typeof opt === 'string' ? opt : opt.value) === itemValue
                    );
                    const label = typeof option === 'string' ? option : option?.label[language];
                    return (
                      <div
                        key={itemValue}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className="flex items-center justify-between bg-white p-3 rounded shadow-sm cursor-move hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center flex-1">
                          <span className="font-bold text-[#C9A961] mr-3">{index + 1}.</span>
                          <span className="flex-1">{label}</span>
                        </div>
                        <button
                          onClick={() => {
                            const newRanked = rankedItems.filter((v: string) => v !== itemValue);
                            updateResponse(q.id, newRanked);
                          }}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {unrankedItems.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-bold text-gray-700 mb-2">
                  {language === 'en' ? 'Available options:' : 'Opciones disponibles:'}
                </h5>
                <div className="space-y-2">
                  {unrankedItems.map(option => {
                    const optValue = typeof option === 'string' ? option : option.value;
                    const optLabel = typeof option === 'string' ? option : option.label[language];
                    return (
                      <button
                        key={optValue}
                        onClick={() => {
                          updateResponse(q.id, [...rankedItems, optValue]);
                        }}
                        className="w-full text-left p-3 bg-white rounded shadow-sm hover:shadow-md transition-shadow"
                      >
                        {optLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      case 'rankingWithTime':
        const rankedWithTimeItems = (value?.ranking || []) as string[];
        const timeEstimates = (value?.timeEstimates || {}) as Record<string, string>;
        const unrankedWithTimeItems = (q.options || []).filter(
          opt => !rankedWithTimeItems.includes(typeof opt === 'string' ? opt : opt.value)
        );

        const handleDragStartWithTime = (e: React.DragEvent, index: number) => {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', index.toString());
        };

        const handleDragOverWithTime = (e: React.DragEvent) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        };

        const handleDropWithTime = (e: React.DragEvent, dropIndex: number) => {
          e.preventDefault();
          const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
          if (dragIndex === dropIndex) return;

          const newRanked = [...rankedWithTimeItems];
          const [removed] = newRanked.splice(dragIndex, 1);
          newRanked.splice(dropIndex, 0, removed);
          updateResponse(q.id, { ranking: newRanked, timeEstimates });
        };

        return (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h5 className="font-bold text-green-900 mb-2">
                {language === 'en' ? 'Ranked (drag to reorder):' : 'Clasificado (arrastra para reordenar):'}
              </h5>
              {rankedWithTimeItems.length === 0 ? (
                <p className="text-green-700 text-sm italic">
                  {language === 'en' ? 'Click items below to rank them' : 'Haz clic en los elementos a continuación para clasificarlos'}
                </p>
              ) : (
                <div className="space-y-3">
                  {rankedWithTimeItems.map((itemValue: string, index: number) => {
                    const option = (q.options || []).find(
                      opt => (typeof opt === 'string' ? opt : opt.value) === itemValue
                    );
                    const label = typeof option === 'string' ? option : option?.label?.[language];
                    const timePrompt = typeof option === 'string' ? '' : option?.timePrompt?.[language] || '';
                    return (
                      <div
                        key={itemValue}
                        draggable
                        onDragStart={(e) => handleDragStartWithTime(e, index)}
                        onDragOver={handleDragOverWithTime}
                        onDrop={(e) => handleDropWithTime(e, index)}
                        className="bg-white p-3 rounded shadow-sm space-y-2 cursor-move hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1">
                            <span className="font-bold text-[#C9A961] mr-3">{index + 1}.</span>
                            <span className="flex-1">{label}</span>
                          </div>
                          <button
                            onClick={() => {
                              const newRanked = rankedWithTimeItems.filter((v: string) => v !== itemValue);
                              const newTimeEstimates = { ...timeEstimates };
                              delete newTimeEstimates[itemValue];
                              updateResponse(q.id, { ranking: newRanked, timeEstimates: newTimeEstimates });
                            }}
                            className="text-red-500 hover:text-red-700 ml-3"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="flex items-center gap-2 ml-8">
                          <label className="text-sm text-gray-600 min-w-[80px]">{timePrompt}:</label>
                          <input
                            type="text"
                            value={timeEstimates[itemValue] || ''}
                            onChange={(e) => {
                              const newTimeEstimates = { ...timeEstimates, [itemValue]: e.target.value };
                              updateResponse(q.id, { ranking: rankedWithTimeItems, timeEstimates: newTimeEstimates });
                            }}
                            placeholder={language === 'en' ? 'e.g., 2-4 hours' : 'ej., 2-4 horas'}
                            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {unrankedWithTimeItems.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-bold text-gray-700 mb-2">
                  {language === 'en' ? 'Available options:' : 'Opciones disponibles:'}
                </h5>
                <div className="space-y-2">
                  {unrankedWithTimeItems.map(option => {
                    const optValue = typeof option === 'string' ? option : option.value;
                    const optLabel = typeof option === 'string' ? option : option.label[language];
                    return (
                      <button
                        key={optValue}
                        onClick={() => {
                          updateResponse(q.id, { ranking: [...rankedWithTimeItems, optValue], timeEstimates });
                        }}
                        className="w-full text-left p-3 bg-white rounded shadow-sm hover:shadow-md transition-shadow"
                      >
                        {optLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );

      case 'multiLink':
        const links = (value || []) as Array<{ url: string; description: string }>;

        return (
          <div className="space-y-4">
            {/* Description */}
            {q.description && (
              <p className="text-sm text-gray-600 mb-4">
                {q.description[language]}
              </p>
            )}

            {/* Existing Links */}
            {links.length > 0 && (
              <div className="space-y-3">
                {links.map((link, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...links];
                            newLinks[index] = { ...link, url: e.target.value };
                            updateResponse(q.id, newLinks);
                          }}
                          placeholder={language === 'en' ? 'https://...' : 'https://...'}
                          className="w-full px-3 py-2 text-sm border border-blue-300 rounded focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
                        />
                        <textarea
                          value={link.description}
                          onChange={(e) => {
                            const newLinks = [...links];
                            newLinks[index] = { ...link, description: e.target.value };
                            updateResponse(q.id, newLinks);
                          }}
                          placeholder={language === 'en' ? 'Brief description of what this link contains...' : 'Breve descripción de lo que contiene este enlace...'}
                          rows={2}
                          className="w-full px-3 py-2 text-sm border border-blue-300 rounded focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const newLinks = links.filter((_, i) => i !== index);
                          updateResponse(q.id, newLinks);
                        }}
                        className="text-red-500 hover:text-red-700 mt-1"
                        title={language === 'en' ? 'Remove link' : 'Eliminar enlace'}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Link Button */}
            <button
              onClick={() => {
                const newLinks = [...links, { url: '', description: '' }];
                updateResponse(q.id, newLinks);
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span>
              {language === 'en' ? 'Add Link' : 'Agregar Enlace'}
            </button>
          </div>
        );

      default:
        return <div>Unsupported question type: {q.type}</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
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

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-[#1B4332]">{t('progress')}</span>
          <span className="text-sm text-gray-600">
            {answeredCount} / {totalQuestions} {t('questionsAnswered')} ({requiredQuestions} {t('required')})
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-[#1B4332] to-[#C9A961] h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Questions by Category */}
      {questionsByCategory.map((categoryGroup, catIndex) => (
        <div key={catIndex} className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-[#1B4332] mb-6 border-b-2 border-[#C9A961] pb-3">
            {categoryGroup.category}
          </h2>

          <div className="space-y-8">
            {categoryGroup.questions.map((q, qIndex) => (
              <div key={q.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                <div className="mb-3">
                  <label className="block font-medium text-gray-900 text-lg mb-1">
                    {qIndex + 1}. {q.question[language]}
                    {!q.required && (
                      <span className="ml-2 text-sm text-gray-500 font-normal">
                        ({t('optional')})
                      </span>
                    )}
                    {q.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {q.helpText && (
                    <p className="text-sm text-gray-500 mt-1">{q.helpText[language]}</p>
                  )}
                </div>
                {renderQuestion(q)}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Save Button */}
      <div className="sticky bottom-0 bg-gradient-to-r from-white to-gray-50 p-6 rounded-xl shadow-2xl mb-8">
        <button
          onClick={saveAllResponses}
          disabled={saveStatus === 'saving'}
          className={`w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            saveStatus === 'saved'
              ? 'bg-green-500 text-white'
              : saveStatus === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-gradient-to-r from-[#1B4332] to-[#C9A961] text-white hover:shadow-2xl hover:-translate-y-1'
          }`}
        >
          {saveStatus === 'saving'
            ? t('saving')
            : saveStatus === 'saved'
            ? t('saved')
            : saveStatus === 'error'
            ? t('error')
            : t('save')}
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <a
          href="/data-extraction/process"
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('backToProcess')}
        </a>
        <a
          href="/data-extraction/research"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-2xl transition-all duration-300 font-bold flex items-center gap-3 hover:-translate-y-1"
        >
          {language === 'en' ? 'Research & AI Integration' : 'Investigación e IA'}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}

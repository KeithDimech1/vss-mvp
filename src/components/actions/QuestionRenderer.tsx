'use client';

import React from 'react';
import { ActionQuestion } from '@/lib/actions/types';

interface QuestionRendererProps {
  question: ActionQuestion;
  value: any;
  onChange: (questionId: string, value: any) => void;
  responses: Record<string, any>; // All responses for conditional logic
}

export default function QuestionRenderer({
  question,
  value,
  onChange,
  responses
}: QuestionRendererProps) {
  // Check if question should be shown based on conditional logic
  if (question.conditionalOn) {
    const responseValue = responses[question.conditionalOn.questionId];
    const conditionValue = question.conditionalOn.value;

    let conditionMet = false;

    // If condition value is an array, check if response matches any value in the array
    if (Array.isArray(conditionValue)) {
      conditionMet = conditionValue.includes(responseValue);
    }
    // If response is an array, check if it includes the condition value
    else if (Array.isArray(responseValue)) {
      conditionMet = responseValue.includes(conditionValue);
    }
    // Simple equality check
    else {
      conditionMet = responseValue === conditionValue;
    }

    if (!conditionMet) {
      return null; // Don't render if condition not met
    }
  }

  const handleChange = (newValue: any) => {
    onChange(question.id, newValue);
  };

  // Render section header if this is the first question in a section
  const renderSection = () => {
    if (question.section) {
      return (
        <div className="col-span-full mb-4 mt-8 first:mt-0">
          <h3 className="text-2xl font-bold text-[#1B4332] border-b-2 border-[#C9A961] pb-2">
            {question.section}
          </h3>
        </div>
      );
    }
    return null;
  };

  // Render question label
  const renderLabel = () => {
    // For 'info' type, don't render a label since the content is the display itself
    if (question.type === 'info') {
      return null;
    }

    return (
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
        {question.helpText && (
          <span className="block text-xs font-normal text-gray-500 mt-1">
            {question.helpText}
          </span>
        )}
      </label>
    );
  };

  // Render input based on type
  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <div>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={question.placeholder}
              maxLength={question.maxLength}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
              required={question.required}
            />
            {question.maxLength && (
              <div className="text-xs text-gray-500 mt-1 text-right">
                {(value || '').length} / {question.maxLength} characters
              </div>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div>
            <textarea
              value={value || ''}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={question.placeholder}
              rows={question.rows || 3}
              maxLength={question.maxLength}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent resize-y"
              required={question.required}
            />
            {question.maxLength && (
              <div className="text-xs text-gray-500 mt-1 text-right">
                {(value || '').length} / {question.maxLength} characters
              </div>
            )}
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value ? parseFloat(e.target.value) : '')}
            placeholder={question.placeholder}
            min={question.min}
            max={question.max}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
            required={question.required}
          />
        );

      case 'currency':
        return (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={value || ''}
              onChange={(e) => handleChange(e.target.value ? parseFloat(e.target.value) : '')}
              placeholder={question.placeholder}
              min={question.min || 0}
              max={question.max}
              className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
              required={question.required}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">USD</span>
            </div>
          </div>
        );

      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
            required={question.required}
          />
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              const optionDescription = typeof option === 'object' ? option.description : undefined;

              return (
                <label
                  key={optionValue}
                  className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-[#F5E6D3]/30 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={optionValue}
                    checked={value === optionValue}
                    onChange={(e) => handleChange(e.target.value)}
                    className="mt-1 h-4 w-4 text-[#C9A961] border-gray-300 focus:ring-[#C9A961]"
                    required={question.required}
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">{optionLabel}</span>
                    {optionDescription && (
                      <p className="text-xs text-gray-500 mt-1">{optionDescription}</p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        );

      case 'checkbox':
        const currentValues = Array.isArray(value) ? value : [];
        const maxSelections = question.maxSelections;
        const selectionLimitReached = Boolean(maxSelections && currentValues.length >= maxSelections);

        return (
          <div className="space-y-2">
            {maxSelections && (
              <div className="text-sm text-gray-600 mb-3">
                Select up to {maxSelections} options ({currentValues.length}/{maxSelections} selected)
              </div>
            )}
            {question.options?.map((option) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              const optionDescription = typeof option === 'object' ? option.description : undefined;
              const isChecked = currentValues.includes(optionValue);
              const isDisabled = !isChecked && selectionLimitReached;

              return (
                <label
                  key={optionValue}
                  className={`flex items-start p-3 border border-gray-200 rounded-lg transition-colors ${
                    isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F5E6D3]/30 cursor-pointer'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={optionValue}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...currentValues, optionValue]
                        : currentValues.filter((v: string) => v !== optionValue);
                      handleChange(newValues);
                    }}
                    className="mt-1 h-4 w-4 text-[#C9A961] border-gray-300 rounded focus:ring-[#C9A961] disabled:opacity-50"
                  />
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">{optionLabel}</span>
                    {optionDescription && (
                      <p className="text-xs text-gray-500 mt-1">{optionDescription}</p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        );

      case 'dropdown':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent"
            required={question.required}
          >
            <option value="">-- Select --</option>
            {question.options?.map((option) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;

              return (
                <option key={optionValue} value={optionValue}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
        );

      case 'info':
        // Parse the helpText to create a structured display
        const parseInfoText = (text: string) => {
          if (!text) return null;

          // Split by double asterisk headers (e.g., **LithoSurfer FREE**)
          const sections = text.split(/\*\*(.*?)\*\*/g).filter(s => s.trim());

          return (
            <div className="space-y-4">
              {sections.map((section, idx) => {
                const lines = section.trim().split('\n').filter(l => l.trim());

                // If this is a header (odd index after split)
                if (idx % 2 === 1) {
                  return (
                    <div key={idx} className="font-bold text-base text-[#1B4332] mt-4 first:mt-0">
                      {section.trim()}
                    </div>
                  );
                }

                // This is content (even index after split)
                return (
                  <div key={idx} className="space-y-1">
                    {lines.map((line, lineIdx) => {
                      const trimmedLine = line.trim();

                      // Skip empty lines
                      if (!trimmedLine) return null;

                      // If it starts with bullet point
                      if (trimmedLine.startsWith('•')) {
                        return (
                          <div key={lineIdx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-[#C9A961] mt-0.5">•</span>
                            <span>{trimmedLine.substring(1).trim()}</span>
                          </div>
                        );
                      }

                      // Regular text
                      return (
                        <div key={lineIdx} className="text-sm text-gray-700">
                          {trimmedLine}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        };

        return (
          <div className="bg-gradient-to-r from-blue-50 to-[#C9A961]/10 border border-[#C9A961]/40 rounded-lg p-6 shadow-sm">
            {parseInfoText(question.helpText || '')}
          </div>
        );

      case 'data_inventory_matrix':
        const regions = [
          'Antarctica', 'Oceania', 'South America', 'Africa', 'Arabia',
          'Asia', 'North America', 'Europe', 'Central Asia'
        ];
        const dataTypes = question.options || [];
        const matrixValue = value || {};

        return (
          <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-300 text-sm" style={{ minWidth: '1200px' }}>
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 sticky left-0 bg-gray-100" style={{ minWidth: '180px' }}>
                    Data Type / Region
                  </th>
                  {regions.map((region) => (
                    <th key={region} className="border border-gray-300 px-2 py-2 font-semibold text-gray-700" style={{ minWidth: '120px' }}>
                      {region}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataTypes.map((dataType: any) => {
                  const dataTypeLabel = typeof dataType === 'string' ? dataType : dataType.label;
                  const dataTypeValue = typeof dataType === 'string' ? dataType : dataType.value;

                  return (
                    <tr key={dataTypeValue} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-medium text-gray-800 sticky left-0 bg-white">
                        {dataTypeLabel}
                      </td>
                      {regions.map((region) => {
                        const cellValue = matrixValue[dataTypeValue]?.[region] || '';

                        return (
                          <td key={region} className="border border-gray-300 px-2 py-1">
                            <input
                              type="number"
                              value={cellValue}
                              onChange={(e) => {
                                const newMatrix = { ...matrixValue };
                                if (!newMatrix[dataTypeValue]) {
                                  newMatrix[dataTypeValue] = {};
                                }
                                newMatrix[dataTypeValue][region] = e.target.value ? parseInt(e.target.value) : '';
                                handleChange(newMatrix);
                              }}
                              placeholder={question.placeholder || '0'}
                              min="0"
                              className="w-full px-2 py-1 border-none focus:ring-2 focus:ring-[#C9A961] rounded text-center"
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-2 text-xs text-gray-500 italic">
              Enter the number of samples/records for each data type in each region. Leave blank if no data available.
            </div>
          </div>
        );

      case 'implementation_table':
        const rows = Array.isArray(value) ? value : [{ change: '', time: '' }];

        return (
          <div className="space-y-3">
            <div className="grid grid-cols-[2fr_1fr_auto] gap-3 items-start">
              <div className="text-sm font-semibold text-gray-700">Changes Required</div>
              <div className="text-sm font-semibold text-gray-700">Estimated Time</div>
              <div className="w-10"></div>
            </div>

            {rows.map((row: any, idx: number) => (
              <div key={idx} className="grid grid-cols-[2fr_1fr_auto] gap-3 items-start">
                <textarea
                  value={row.change || ''}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[idx] = { ...newRows[idx], change: e.target.value };
                    handleChange(newRows);
                  }}
                  placeholder={question.placeholder}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent resize-y text-sm"
                />

                <select
                  value={row.time || ''}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[idx] = { ...newRows[idx], time: e.target.value };
                    handleChange(newRows);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent text-sm"
                >
                  <option value="">-- Select --</option>
                  {question.options?.map((option) => {
                    const optionValue = typeof option === 'string' ? option : option.value;
                    const optionLabel = typeof option === 'string' ? option : option.label;
                    return (
                      <option key={optionValue} value={optionValue}>
                        {optionLabel}
                      </option>
                    );
                  })}
                </select>

                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newRows = rows.filter((_: any, i: number) => i !== idx);
                      handleChange(newRows);
                    }}
                    className="w-10 h-10 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove row"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                const newRows = [...rows, { change: '', time: '' }];
                handleChange(newRows);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#C9A961] hover:bg-[#F5E6D3]/30 rounded-lg transition-colors border border-[#C9A961]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add More
            </button>
          </div>
        );

      case 'ranking':
        const rankedItems = Array.isArray(value) ? value : [];
        const availableOptions = question.options || [];
        const rankingLimit = question.rankingLimit || availableOptions.length;

        // Get unranked options
        const unrankedOptions = availableOptions.filter(opt => {
          const optVal = typeof opt === 'string' ? opt : opt.value;
          return !rankedItems.includes(optVal);
        });

        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Drag to reorder your top {rankingLimit} choices (1 = highest priority)
            </div>

            {/* Ranked items */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-700 mb-2">Your Rankings:</div>
              {rankedItems.slice(0, rankingLimit).map((item: string, index: number) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 bg-[#F5E6D3]/40 border-2 border-[#C9A961] rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-[#C9A961] text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 text-sm font-medium text-gray-900">{item}</div>
                  <div className="flex gap-1">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newRanked = [...rankedItems];
                          [newRanked[index], newRanked[index - 1]] = [newRanked[index - 1], newRanked[index]];
                          handleChange(newRanked);
                        }}
                        className="p-1 hover:bg-white rounded"
                        title="Move up"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                    )}
                    {index < rankedItems.length - 1 && index < rankingLimit - 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newRanked = [...rankedItems];
                          [newRanked[index], newRanked[index + 1]] = [newRanked[index + 1], newRanked[index]];
                          handleChange(newRanked);
                        }}
                        className="p-1 hover:bg-white rounded"
                        title="Move down"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const newRanked = rankedItems.filter((_: string, i: number) => i !== index);
                        handleChange(newRanked);
                      }}
                      className="p-1 hover:bg-red-50 rounded text-red-600"
                      title="Remove"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              {rankedItems.length === 0 && (
                <div className="text-sm text-gray-500 italic p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  Select items below to rank them
                </div>
              )}
            </div>

            {/* Available options */}
            {unrankedOptions.length > 0 && rankedItems.length < rankingLimit && (
              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-700 mb-2">Available Options:</div>
                {unrankedOptions.map((option) => {
                  const optVal = typeof option === 'string' ? option : option.value;
                  const optLabel = typeof option === 'string' ? option : option.label;

                  return (
                    <button
                      key={optVal}
                      type="button"
                      onClick={() => {
                        handleChange([...rankedItems, optVal]);
                      }}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-[#F5E6D3]/30 transition-colors"
                    >
                      <span className="text-sm text-gray-900">{optLabel}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'rating':
        const ratingScale = question.ratingScale || 5;
        const ratingOptions = question.options || [];
        const ratingValues = value || {};

        return (
          <div className="space-y-4">
            {ratingOptions.map((option: any) => {
              const optVal = typeof option === 'string' ? option : option.value;
              const optLabel = typeof option === 'string' ? option : option.label;
              const currentRating = ratingValues[optVal] || 0;

              return (
                <div key={optVal} className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900 mb-3">{optLabel}</div>
                  <div className="flex items-center gap-2">
                    {[...Array(ratingScale)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <button
                          key={ratingValue}
                          type="button"
                          onClick={() => {
                            const newRatings = { ...ratingValues, [optVal]: ratingValue };
                            handleChange(newRatings);
                          }}
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-colors ${
                            ratingValue <= currentRating
                              ? 'bg-[#C9A961] border-[#C9A961] text-white'
                              : 'border-gray-300 text-gray-400 hover:border-[#C9A961] hover:text-[#C9A961]'
                          }`}
                        >
                          {ratingValue}
                        </button>
                      );
                    })}
                    <span className="ml-3 text-sm text-gray-600">
                      {currentRating > 0 ? `${currentRating} / ${ratingScale}` : 'Not rated'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'selectable_tags':
        const currentValue = value || '';
        const selectedTags = currentValue
          .split(',')
          .map((t: string) => t.trim())
          .filter((t: string) => t);

        const toggleTag = (tag: string) => {
          let newTags: string[];
          if (selectedTags.includes(tag)) {
            // Remove tag
            newTags = selectedTags.filter((t: string) => t !== tag);
          } else {
            // Add tag
            newTags = [...selectedTags, tag];
          }
          // Join back to comma-separated string
          handleChange(newTags.join(', '));
        };

        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Click tags to select features:
            </p>
            <div className="flex flex-wrap gap-2">
              {question.options?.map((option) => {
                const optionLabel = typeof option === 'string' ? option : option.label || option.value;
                const isSelected = selectedTags.includes(optionLabel);

                return (
                  <button
                    key={optionLabel}
                    type="button"
                    onClick={() => toggleTag(optionLabel)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-[#1B4332] text-white hover:bg-[#2D5F4A]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    {optionLabel}
                    {isSelected && <span className="ml-1">✓</span>}
                  </button>
                );
              })}
            </div>
            <div className="mt-3">
              <textarea
                value={currentValue}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Selected features will appear here (or you can type manually)"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A961] focus:border-transparent resize-y text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can also manually edit the text above if needed.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-red-500">
            Unsupported question type: {question.type}
          </div>
        );
    }
  };

  return (
    <>
      {renderSection()}
      <div className="mb-6">
        {renderLabel()}
        {renderInput()}
      </div>
    </>
  );
}

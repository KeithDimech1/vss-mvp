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
    const conditionMet = responses[question.conditionalOn.questionId] === question.conditionalOn.value ||
      (Array.isArray(responses[question.conditionalOn.questionId]) &&
        responses[question.conditionalOn.questionId]?.includes(question.conditionalOn.value));

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
          <h3 className="text-2xl font-bold text-[#2C3E7C] border-b-2 border-[#0D8BFF] pb-2">
            {question.section}
          </h3>
        </div>
      );
    }
    return null;
  };

  // Render question label
  const renderLabel = () => (
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

  // Render input based on type
  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D8BFF] focus:border-transparent"
            required={question.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={question.placeholder}
            rows={question.rows || 3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D8BFF] focus:border-transparent resize-y"
            required={question.required}
          />
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D8BFF] focus:border-transparent"
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
              className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D8BFF] focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D8BFF] focus:border-transparent"
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
                  className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={optionValue}
                    checked={value === optionValue}
                    onChange={(e) => handleChange(e.target.value)}
                    className="mt-1 h-4 w-4 text-[#0D8BFF] border-gray-300 focus:ring-[#0D8BFF]"
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
        return (
          <div className="space-y-2">
            {question.options?.map((option) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              const optionDescription = typeof option === 'object' ? option.description : undefined;

              return (
                <label
                  key={optionValue}
                  className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    value={optionValue}
                    checked={currentValues.includes(optionValue)}
                    onChange={(e) => {
                      const newValues = e.target.checked
                        ? [...currentValues, optionValue]
                        : currentValues.filter((v: string) => v !== optionValue);
                      handleChange(newValues);
                    }}
                    className="mt-1 h-4 w-4 text-[#0D8BFF] border-gray-300 rounded focus:ring-[#0D8BFF]"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D8BFF] focus:border-transparent"
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

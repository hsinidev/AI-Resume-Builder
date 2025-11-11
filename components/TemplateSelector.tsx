import React from 'react';
import { templates as templateList } from '../lib/templateData.ts';

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplateId, onSelectTemplate }) => {
  return (
    <div className="p-4 bg-black/30 rounded-lg shadow-2xl border border-gray-800">
      <h3 className="text-lg font-bold mb-3 text-gold">Choose a Template</h3>
      <div className="grid grid-cols-4 gap-4 max-h-80 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#FFD700 #374151' }}>
        {templateList.map(template => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`p-2 rounded-md transition-all duration-200 border-2 ${
              selectedTemplateId === template.id
                ? 'border-gold bg-gold/20'
                : 'border-gray-600 bg-gray-800 hover:border-gold'
            }`}
            aria-label={`Select template ${template.name}`}
          >
            <img src={template.svgUrl} alt={template.name} className="w-full h-auto rounded-sm" />
            <span className="block text-xs mt-2 text-gray-300 truncate">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
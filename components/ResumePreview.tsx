import React from 'react';
import type { ResumeData } from '../types.ts';
import { templates as templateComponents } from '../lib/templates.tsx';
import { templates as templateDataList } from '../lib/templateData.ts';

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: string;
  forwardedRef: React.Ref<HTMLDivElement>;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, templateId, forwardedRef }) => {
  const templateInfo = templateDataList.find(t => t.id === templateId) || templateDataList[0];
  const TemplateComponent = templateComponents[templateInfo.componentName] || Object.values(templateComponents)[0];
  
  return (
    <div className="p-6 bg-black/30 rounded-lg shadow-2xl border border-gray-800 sticky top-24 resume-content-wrapper">
      <h2 className="text-2xl font-bold mb-4 text-gold text-center no-print">Resume Preview</h2>
      <div className="overflow-hidden">
        <div 
          ref={forwardedRef}
          className="resume-content bg-white text-black p-8 aspect-[8.5/11] w-full max-w-4xl mx-auto overflow-y-auto shadow-lg origin-top"
          style={{ transform: 'scale(0.95)' }}
        >
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;

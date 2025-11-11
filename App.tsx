import React, { useState, useRef } from 'react';
import Layout from './components/Layout.tsx';
import ResumeForm from './components/ResumeForm.tsx';
import ResumePreview from './components/ResumePreview.tsx';
import TemplateSelector from './components/TemplateSelector.tsx';
import SeoArticle from './components/SeoArticle.tsx';
import { generatePdf } from './lib/pdfGenerator.ts';
import type { ResumeData } from './types.ts';
import { templates as templateList } from './lib/templateData.ts';

const initialResumeData: ResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    title: 'Senior Software Engineer',
    email: 'jane.doe@example.com',
    phone: '123-456-7890',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/janedoe',
  },
  summary: 'Innovative Senior Software Engineer with 8+ years of experience in developing scalable web applications and leading cross-functional teams. Proficient in JavaScript, React, and Node.js. Passionate about creating elegant user experiences and solving complex problems.',
  experience: [
    {
      id: crypto.randomUUID(),
      company: 'Tech Solutions Inc.',
      title: 'Senior Software Engineer',
      startDate: 'Jan 2018',
      endDate: 'Present',
      bullets: [
        'Led the development of a new customer-facing analytics dashboard, resulting in a 20% increase in user engagement.',
        'Mentored a team of 4 junior engineers, fostering a culture of collaboration and continuous learning.',
        'Optimized application performance, reducing page load times by 30% through code splitting and caching strategies.',
      ],
    },
    {
      id: crypto.randomUUID(),
      company: 'Web Innovators',
      title: 'Software Engineer',
      startDate: 'Jun 2015',
      endDate: 'Dec 2017',
      bullets: [
        'Developed and maintained features for a large-scale e-commerce platform using React and Redux.',
        'Collaborated with designers and product managers to translate requirements into technical specifications.',
      ],
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: 'Sep 2011',
      endDate: 'May 2015',
    },
  ],
  skills: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 'Express', 'SQL', 'NoSQL', 'Docker', 'AWS', 'Agile Methodologies'],
};


const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templateList[0].id);
  const resumePreviewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    generatePdf(resumeData);
    window.print();
  };


  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Print-specific styles to isolate the resume preview */}
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute !important;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              overflow: visible;
            }
            .resume-content-wrapper {
              border: none !important;
              padding: 0 !important;
              box-shadow: none !important;
              transform: scale(1) !important;
            }
            .resume-content {
               box-shadow: none !important;
               margin: 0 !important;
               height: 100% !important;
               width: 100% !important;
               max-width: 100% !important;
               aspect-ratio: auto !important;
               overflow: visible !important;
               padding: 0 !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>

        <div className="text-center mb-12 no-print">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-gold tracking-wide">
            Craft Your Professional Resume
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Fill in your details, choose a template, and generate a polished, professional resume in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6 no-print">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            <TemplateSelector selectedTemplateId={selectedTemplateId} onSelectTemplate={setSelectedTemplateId} />
            <div className="p-4 bg-black/30 rounded-lg shadow-2xl border border-gray-800">
               <button 
                onClick={handleDownloadPdf}
                className="w-full bg-gold text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-300 text-lg"
              >
                Download as PDF
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">This will open your browser's print dialog. Choose "Save as PDF" as the destination.</p>
            </div>
          </div>
          <div className="print-area">
            <ResumePreview 
              resumeData={resumeData} 
              templateId={selectedTemplateId} 
              forwardedRef={resumePreviewRef} 
            />
          </div>
        </div>
        
        <div className="mt-20 p-8 bg-black/30 rounded-lg shadow-2xl border border-gray-800 no-print">
          <SeoArticle />
        </div>
      </div>
    </Layout>
  );
};

export default App;

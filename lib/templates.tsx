import React from 'react';
import type { ResumeData, Experience, Education } from '../types.ts';

export interface TemplateProps {
  data: ResumeData;
}

export type TemplateComponent = React.FC<TemplateProps>;

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <section className={`mb-4 ${className}`}>
    <h2 className="text-sm font-bold tracking-widest uppercase border-b border-gray-300 pb-1 mb-2">{title}</h2>
    <div className="text-xs">{children}</div>
  </section>
);

const ExperienceItem: React.FC<{ item: Experience }> = ({ item }) => (
    <div className="mb-3">
        <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-sm">{item.title}</h3>
            <p className="text-xs text-gray-600">{item.startDate} - {item.endDate}</p>
        </div>
        <p className="text-sm italic">{item.company}</p>
        <ul className="list-disc pl-4 mt-1 text-xs space-y-1">
            {item.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
            ))}
        </ul>
    </div>
);

const EducationItem: React.FC<{ item: Education }> = ({ item }) => (
    <div className="mb-2">
        <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-sm">{item.school}</h3>
            <p className="text-xs text-gray-600">{item.startDate} - {item.endDate}</p>
        </div>
        <p className="text-sm italic">{item.degree}</p>
    </div>
);

// Template 1: Classic
const ClassicTemplate: TemplateComponent = ({ data }) => {
  const { personalInfo, summary, experience, education, skills } = data;
  return (
    <div className="text-gray-800" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
        <header className="text-center mb-4">
            <h1 className="text-2xl font-bold uppercase tracking-widest">{personalInfo.name}</h1>
            <p className="text-sm">{personalInfo.title}</p>
            <div className="text-xs flex justify-center flex-wrap gap-x-4 mt-1">
                <span>{personalInfo.email}</span>
                <span>{personalInfo.phone}</span>
                <span>{personalInfo.location}</span>
                {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            </div>
        </header>

        <Section title="Summary">
            <p>{summary}</p>
        </Section>

        <Section title="Experience">
            {experience.map(item => <ExperienceItem key={item.id} item={item} />)}
        </Section>

        <Section title="Education">
            {education.map(item => <EducationItem key={item.id} item={item} />)}
        </Section>

        <Section title="Skills">
            <p>{skills.join(' | ')}</p>
        </Section>
    </div>
  );
};

// Template 2: Modern
const ModernTemplate: TemplateComponent = ({ data }) => {
    const { personalInfo, summary, experience, education, skills } = data;
    return (
      <div className="text-gray-800 flex" style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}>
        <aside className="w-1/3 bg-gray-100 p-4 mr-4">
            <h1 className="text-2xl font-bold text-gray-900">{personalInfo.name}</h1>
            <p className="text-sm font-light mb-4">{personalInfo.title}</p>
            
            <div className="text-xs space-y-2">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1">Contact</h3>
                <p>{personalInfo.email}</p>
                <p>{personalInfo.phone}</p>
                <p>{personalInfo.location}</p>
                {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
            </div>

            <div className="text-xs space-y-2 mt-4">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1">Education</h3>
                {education.map(item => (
                    <div key={item.id} className="mt-1">
                        <h4 className="font-semibold">{item.degree}</h4>
                        <p className="text-gray-700">{item.school}</p>
                        <p className="text-gray-500 text-[10px]">{item.startDate} - {item.endDate}</p>
                    </div>
                ))}
            </div>

            <div className="text-xs space-y-1 mt-4">
                <h3 className="font-bold uppercase tracking-wider border-b pb-1">Skills</h3>
                {skills.map(skill => <p key={skill}>{skill}</p>)}
            </div>
        </aside>

        <main className="w-2/3 p-4">
            <Section title="Summary">
                <p>{summary}</p>
            </Section>
            
            <Section title="Experience">
                {experience.map(item => <ExperienceItem key={item.id} item={item} />)}
            </Section>
        </main>
      </div>
    );
};

// Template 3: Corporate
const CorporateTemplate: TemplateComponent = ({ data }) => {
    const { personalInfo, summary, experience, education, skills } = data;
    return (
      <div className="text-gray-800" style={{ fontFamily: "'Calibri', 'Arial', sans-serif" }}>
          <header className="mb-4 pb-2 border-b-2 border-gray-600">
              <h1 className="text-3xl font-bold text-gray-800">{personalInfo.name}</h1>
              <p className="text-md text-gray-600">{personalInfo.title}</p>
          </header>
          <div className="text-xs flex justify-between mb-4 border-b pb-2">
              <span>{personalInfo.email}</span>
              <span>{personalInfo.phone}</span>
              <span>{personalInfo.location}</span>
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          </div>
  
          <Section title="Professional Summary">
              <p>{summary}</p>
          </Section>
  
          <Section title="Work Experience">
              {experience.map(item => <ExperienceItem key={item.id} item={item} />)}
          </Section>
  
          <Section title="Education">
              {education.map(item => <EducationItem key={item.id} item={item} />)}
          </Section>
  
          <Section title="Core Competencies">
              <div className="flex flex-wrap">
                  {skills.map(skill => <span key={skill} className="bg-gray-200 text-gray-700 text-[10px] px-2 py-1 rounded-full mr-2 mb-2">{skill}</span>)}
              </div>
          </Section>
      </div>
    );
};

// Template 4: Creative
const CreativeTemplate: TemplateComponent = ({ data }) => {
    const { personalInfo, summary, experience, education, skills } = data;
    return (
      <div className="text-gray-800 grid grid-cols-3 gap-6" style={{ fontFamily: "'Verdana', 'Geneva', sans-serif" }}>
        <div className="col-span-3 text-center bg-teal-700 text-white p-4">
            <h1 className="text-2xl font-bold tracking-wider">{personalInfo.name}</h1>
            <p className="text-sm">{personalInfo.title}</p>
        </div>

        <div className="col-span-1 text-xs">
            <Section title="Contact">
                <p>{personalInfo.email}</p>
                <p>{personalInfo.phone}</p>
                <p>{personalInfo.location}</p>
                {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
            </Section>
            <Section title="Skills">
                <ul className="list-disc pl-4 space-y-1">
                    {skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
            </Section>
            <Section title="Education">
                {education.map(item => (
                     <div key={item.id} className="mt-1">
                        <h4 className="font-semibold">{item.degree}</h4>
                        <p className="text-gray-700">{item.school}</p>
                        <p className="text-gray-500 text-[10px]">{item.startDate} - {item.endDate}</p>
                    </div>
                ))}
            </Section>
        </div>

        <div className="col-span-2">
            <Section title="Profile">
                <p>{summary}</p>
            </Section>
            <Section title="Experience">
                {experience.map(item => <ExperienceItem key={item.id} item={item} />)}
            </Section>
        </div>
      </div>
    );
};
  
export const templates: Record<string, TemplateComponent> = {
  Classic: ClassicTemplate,
  Modern: ModernTemplate,
  Corporate: CorporateTemplate,
  Creative: CreativeTemplate,
};

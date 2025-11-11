import React, { useState } from 'react';
import type { ResumeData, Experience, Education } from '../types.ts';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

type Section = 'Personal' | 'Summary' | 'Experience' | 'Education' | 'Skills' | '';

const FormSection: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }> = ({ title, children, isOpen, onToggle }) => (
  <div className="border border-gray-700 rounded-lg mb-4 bg-black/20 backdrop-blur-sm">
    <button onClick={onToggle} className="w-full text-left p-4 font-bold text-lg flex justify-between items-center">
      {title}
      <span>{isOpen ? '−' : '+'}</span>
    </button>
    {isOpen && <div className="p-4 border-t border-gray-700">{children}</div>}
  </div>
);

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
  const [openSection, setOpenSection] = useState<Section>('Personal');

  const handleToggle = (section: Section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const handleChange = <T extends keyof ResumeData['personalInfo']>(
    section: 'personalInfo',
    field: T,
    value: ResumeData['personalInfo'][T]
  ) => {
    setResumeData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSimpleChange = (field: 'summary', value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setResumeData(prev => ({ ...prev, skills }));
  };
  
  // Experience handlers
  const handleExperienceChange = (id: string, field: keyof Omit<Experience, 'id' | 'bullets'>, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp),
    }));
  };

  const handleBulletChange = (expId: string, bulletIndex: number, value: string) => {
    setResumeData(prev => ({
        ...prev,
        experience: prev.experience.map(exp => {
            if (exp.id === expId) {
                const newBullets = [...exp.bullets];
                newBullets[bulletIndex] = value;
                return { ...exp, bullets: newBullets };
            }
            return exp;
        }),
    }));
  };

  const addExperience = () => {
    const newExp: Experience = { id: crypto.randomUUID(), company: '', title: '', startDate: '', endDate: '', bullets: [''] };
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  const addBullet = (expId: string) => {
      setResumeData(prev => ({
          ...prev,
          experience: prev.experience.map(exp => exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp)
      }));
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
      setResumeData(prev => ({
          ...prev,
          experience: prev.experience.map(exp => {
              if (exp.id === expId) {
                  return { ...exp, bullets: exp.bullets.filter((_, i) => i !== bulletIndex) };
              }
              return exp;
          })
      }));
  };


  // Education handlers
  const handleEducationChange = (id: string, field: keyof Omit<Education, 'id'>, value: string) => {
    setResumeData(prev => ({
        ...prev,
        education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu),
    }));
  };
  
  const addEducation = () => {
    const newEdu: Education = { id: crypto.randomUUID(), school: '', degree: '', startDate: '', endDate: '' };
    setResumeData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };


  const inputClass = "w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gold";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1";

  return (
    <div className="p-6 bg-black/30 rounded-lg shadow-2xl border border-gray-800">
      <FormSection title="Personal Info" isOpen={openSection === 'Personal'} onToggle={() => handleToggle('Personal')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Full Name</label><input type="text" className={inputClass} value={resumeData.personalInfo.name} onChange={e => handleChange('personalInfo', 'name', e.target.value)} /></div>
            <div><label className={labelClass}>Professional Title</label><input type="text" className={inputClass} value={resumeData.personalInfo.title} onChange={e => handleChange('personalInfo', 'title', e.target.value)} /></div>
            <div><label className={labelClass}>Email</label><input type="email" className={inputClass} value={resumeData.personalInfo.email} onChange={e => handleChange('personalInfo', 'email', e.target.value)} /></div>
            <div><label className={labelClass}>Phone</label><input type="tel" className={inputClass} value={resumeData.personalInfo.phone} onChange={e => handleChange('personalInfo', 'phone', e.target.value)} /></div>
            <div><label className={labelClass}>Location</label><input type="text" className={inputClass} value={resumeData.personalInfo.location} onChange={e => handleChange('personalInfo', 'location', e.target.value)} /></div>
            <div><label className={labelClass}>LinkedIn URL</label><input type="text" className={inputClass} value={resumeData.personalInfo.linkedin} onChange={e => handleChange('personalInfo', 'linkedin', e.target.value)} /></div>
        </div>
      </FormSection>
      
      <FormSection title="Summary" isOpen={openSection === 'Summary'} onToggle={() => handleToggle('Summary')}>
        <label className={labelClass}>Professional Summary/Objective</label>
        <textarea className={inputClass} rows={4} value={resumeData.summary} onChange={e => handleSimpleChange('summary', e.target.value)}></textarea>
      </FormSection>

      <FormSection title="Experience" isOpen={openSection === 'Experience'} onToggle={() => handleToggle('Experience')}>
        {resumeData.experience.map(exp => (
          <div key={exp.id} className="p-4 mb-4 border border-gray-600 rounded-lg bg-gray-900/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div><label className={labelClass}>Company</label><input type="text" className={inputClass} value={exp.company} onChange={e => handleExperienceChange(exp.id, 'company', e.target.value)} /></div>
              <div><label className={labelClass}>Title</label><input type="text" className={inputClass} value={exp.title} onChange={e => handleExperienceChange(exp.id, 'title', e.target.value)} /></div>
              <div><label className={labelClass}>Start Date</label><input type="text" className={inputClass} value={exp.startDate} onChange={e => handleExperienceChange(exp.id, 'startDate', e.target.value)} /></div>
              <div><label className={labelClass}>End Date</label><input type="text" className={inputClass} value={exp.endDate} onChange={e => handleExperienceChange(exp.id, 'endDate', e.target.value)} /></div>
            </div>
            <div>
                <label className={labelClass}>Key Responsibilities (Bullet Points)</label>
                {exp.bullets.map((bullet, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input type="text" className={inputClass} value={bullet} onChange={e => handleBulletChange(exp.id, index, e.target.value)} />
                        <button onClick={() => removeBullet(exp.id, index)} className="ml-2 text-red-500 hover:text-red-400 p-1 rounded-full">&times;</button>
                    </div>
                ))}
                <button onClick={() => addBullet(exp.id)} className="text-sm text-gold hover:underline mt-1">+ Add Bullet</button>
            </div>
            <button onClick={() => removeExperience(exp.id)} className="mt-4 text-sm text-red-500 hover:underline">Remove Experience</button>
          </div>
        ))}
        <button onClick={addExperience} className="w-full mt-2 bg-gold/20 text-gold font-semibold py-2 px-4 rounded-md hover:bg-gold/30">Add Experience</button>
      </FormSection>

      <FormSection title="Education" isOpen={openSection === 'Education'} onToggle={() => handleToggle('Education')}>
        {resumeData.education.map(edu => (
          <div key={edu.id} className="p-4 mb-4 border border-gray-600 rounded-lg bg-gray-900/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>School/University</label><input type="text" className={inputClass} value={edu.school} onChange={e => handleEducationChange(edu.id, 'school', e.target.value)} /></div>
              <div><label className={labelClass}>Degree</label><input type="text" className={inputClass} value={edu.degree} onChange={e => handleEducationChange(edu.id, 'degree', e.target.value)} /></div>
              <div><label className={labelClass}>Start Date</label><input type="text" className={inputClass} value={edu.startDate} onChange={e => handleEducationChange(edu.id, 'startDate', e.target.value)} /></div>
              <div><label className={labelClass}>End Date</label><input type="text" className={inputClass} value={edu.endDate} onChange={e => handleEducationChange(edu.id, 'endDate', e.target.value)} /></div>
            </div>
            <button onClick={() => removeEducation(edu.id)} className="mt-4 text-sm text-red-500 hover:underline">Remove Education</button>
          </div>
        ))}
        <button onClick={addEducation} className="w-full mt-2 bg-gold/20 text-gold font-semibold py-2 px-4 rounded-md hover:bg-gold/30">Add Education</button>
      </FormSection>

      <FormSection title="Skills" isOpen={openSection === 'Skills'} onToggle={() => handleToggle('Skills')}>
        <label className={labelClass}>Skills (comma-separated)</label>
        <input type="text" className={inputClass} value={resumeData.skills.join(', ')} onChange={handleSkillsChange} placeholder="e.g., JavaScript, React, Leadership"/>
      </FormSection>
    </div>
  );
};

export default ResumeForm;

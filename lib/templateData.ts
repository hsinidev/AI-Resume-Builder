interface Template {
    id: string;
    name: string;
    svgUrl: string;
    componentName: 'Classic' | 'Modern' | 'Corporate' | 'Creative';
  }
  
  const templateNames = [
    "Executive Clarity", "Modern Minimalist", "Corporate Structure", "Creative Professional",
    "Tech Innovator", "Classic Standard", "Bold Statement", "Elegant Simplicity",
    "Functional Focus", "Strategic Leader", "Data-Driven Analyst", "Junior Achiever",
    "Senior Specialist", "Academic Scholar", "Healthcare Professional", "Sales Guru",
    "Marketing Maven", "Engineering Expert", "Financial Whiz", "Legal Eagle",
    "Consultant's Choice", "Portfolio Showcase", "Developer's Draft", "Designer's Canvas",
    "Manager's Brief", "Researcher's Record", "Educator's Outline", "Project Manager Pro",
    "HR Standard", "Startup Dynamo", "Freelancer Flow", "Artistic Approach",
    "Clean Grid", "Swiss Style", "Corporate Blue", "Goldenrod Accent",
    "Monochrome Modern", "Timeline View", "Sidebar Strength", "Centered Header",
    "Two-Column Tact", "Info-Graphic Style", "Professional Polish", "Entry-Level Edge",
    "Career Changer", "Executive Suite", "The Futurist", "The Traditionalist",
    "The Organizer", "The Influencer", "The Specialist", "The Generalist", "The Visionary",
    "Impactful First", "Structured Success", "Dynamic Display", "Linear Logic",
    "Asymmetric Appeal", "Sleek & Simple", "Bold & Brash", "Subtle & Sophisticated",
    "Graphite Gray", "Ocean Blue", "Forest Green", "Ruby Red", "Professional Peach",
    "Calm Coral", "Tech Teal", "Regal Purple", "The Correspondent", "The Diplomat",
    "The Architect", "The Builder", "The Pioneer", "The Strategist", "The Mentor",
    "The Negotiator", "The Closer", "The Analyst", "The Communicator", "The Innovator",
    "The Accelerator", "The Catalyst", "The Pathfinder", "The Voyager", "The Summit",
    "The Pinnacle", "The Apex", "The Zenith", "The Meridian", "The Keystone", "The Foundation",
    "The Cornerstone", "The Milestone", "The Benchmark", "The Standard", "The Classicist"
  ];
  
  const componentCycle: Array<'Classic' | 'Modern' | 'Corporate' | 'Creative'> = ['Classic', 'Modern', 'Corporate', 'Creative'];
  
  export const templates: Template[] = templateNames.map((name, index) => ({
    id: `template_${index + 1}`,
    name: name,
    svgUrl: `/templates/template_${index + 1}.svg`,
    componentName: componentCycle[index % componentCycle.length],
  }));

import muntajShaanImg from '../assets/muntaj-shaan-poster.png';
import bSquareEngineersImg from '../assets/b-square-engineers-poster.png';
import metallurgyImg from '../assets/metallurgy-poster.png';
import srikrishnaClinicImg from '../assets/srikrishna-clinic-poster.png';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: string[];
  image: string; // we can use abstract generated shapes or beautiful illustrations
  githubUrl: string;
  liveUrl: string;
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  boardOrUniversity: string;
  duration: string;
  score: string;
  details: string[];
}

export interface Certification {
  title: string;
  authority: string;
  iconName: string;
  credentialUrl?: string;
}

export interface Achievement {
  title: string;
  description: string;
  iconName: string;
  date?: string;
}

export interface PhotographyImage {
  id: string;
  category: 'Portrait' | 'Street' | 'Nature' | 'Events' | 'Night';
  title: string;
  settings: string; // E.g., ISO 100, f/1.8, 1/250s
  camera: string; // E.g., Canon EOS 80D, 50mm
  image: string;
}

export const personalInfo = {
  name: "Malla Vishwanth",
  email: "vishwanthmalla1@gmail.com",
  phone: "9492906475",
  address: "Visakhapatnam, Andhra Pradesh, India",
  tagline: "I build modern web applications, explore innovative technologies, and transform ideas into real-world digital experiences through full-stack development, creative design, and problem-solving.",
  roles: [
    "Full Stack Developer",
    "B.Tech CSE Student",
    "Frontend Developer",
    "Photography Enthusiast",
    "3D Printing Enthusiast"
  ],
  socials: {
    github: "https://github.com/vishwanthmalla0324-tech",
    linkedin: "https://www.linkedin.com/in/vishwanth-malla-7b7a76359?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    instagram: "https://www.instagram.com/vishwanth___24?igsh=MTUxYTQ2YThwZnl1OQ==",
    email: "mailto:vishwanthmalla1@gmail.com"
  }
};

export const skillsData: SkillCategory[] = [
  {
    category: "Programming & Web",
    icon: "Code",
    skills: [
      { name: "JavaScript", percentage: 90 },
      { name: "TypeScript", percentage: 80 },
      { name: "React / Vite", percentage: 88 },
      { name: "Tailwind CSS", percentage: 92 },
      { name: "Node.js / Express.js", percentage: 78 },
      { name: "Python", percentage: 82 },
      { name: "HTML / CSS", percentage: 95 },
      { name: "Firebase", percentage: 80 },
      { name: "REST APIs", percentage: 85 }
    ]
  },
  {
    category: "Mobile & Other Tech",
    icon: "Smartphone",
    skills: [
      { name: "Android Development", percentage: 75 },
      { name: "Git & GitHub", percentage: 85 },
      { name: "Responsive Design", percentage: 90 },
      { name: "Firebase Auth & Database", percentage: 80 }
    ]
  },
  {
    category: "3D Printing & CAD",
    icon: "Printer",
    skills: [
      { name: "3D Printing (FDM Setup)", percentage: 90 },
      { name: "Fusion 360 / SolidWorks", percentage: 85 },
      { name: "TinkerCAD", percentage: 95 },
      { name: "Ultimaker Cura / PrusaSlicer", percentage: 90 },
      { name: "Printer Troubleshooting", percentage: 80 }
    ]
  },
  {
    category: "Photography & Creative",
    icon: "Camera",
    skills: [
      { name: "DSLR Manual Settings (Canon/Nikon)", percentage: 88 },
      { name: "Adobe Lightroom", percentage: 92 },
      { name: "Adobe Photoshop", percentage: 85 },
      { name: "Composition & Lighting", percentage: 90 },
      { name: "RAW Image Editing", percentage: 88 }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "muntaj-shaan",
    title: "Muntaj Shaan",
    subtitle: "Creative Showcase",
    description: "An elegant interactive creative web showcase highlighting modern front-end design, high-end typography, and responsive animations.",
    features: [
      "Custom WebGL fluid simulation effects",
      "GSAP smooth scroll layout integrations",
      "High-end responsive layout designs",
      "Minimalist and premium typography hierarchy"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "WebGL", "GSAP"],
    image: muntajShaanImg,
    githubUrl: "https://github.com",
    liveUrl: "https://muntaj-seven.vercel.app/"
  },
  {
    id: "b-square-engineers",
    title: "B-Square Engineers",
    subtitle: "Industrial Portal",
    description: "A modern commercial engineering and manufacturing showcase featuring interactive 3D model loaders and animations.",
    features: [
      "Three.js 3D mechanical CAD object models",
      "Smooth camera scroll-triggered transitions",
      "Contact integration for service queries",
      "Optimized load times and custom loading screen"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Three.js", "WebGL"],
    image: bSquareEngineersImg,
    githubUrl: "https://github.com",
    liveUrl: "https://b-sque.vercel.app/"
  },
  {
    id: "polytechnic-metallurgy",
    title: "METALLURGY — Govt Polytechnic",
    subtitle: "Educational Resources Portal",
    description: "An educational resources and department information portal custom-built for the Department of Metallurgy at Government Polytechnic, Visakhapatnam.",
    features: [
      "Centralized study material repository",
      "Responsive navigation structures",
      "Dynamic campus notice boards",
      "Direct teacher-student contact tools"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Vite"],
    image: metallurgyImg,
    githubUrl: "https://github.com",
    liveUrl: "https://metallutgy-clg1.vercel.app/"
  },
  {
    id: "srikrishna-clinic",
    title: "SRI KRISHNA ORTHOPAEDIC CLINIC",
    subtitle: "Healthcare Patient Portal",
    description: "An interactive patient information portal designed for Sri Krishna Orthopaedic Clinic to showcase medical treatments, coordinates, and hours.",
    features: [
      "Detailed bone and joint health service listings",
      "Patient booking guides and instructions",
      "Google Maps geographical location widget",
      "Interactive consultation contact request forms"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: srikrishnaClinicImg,
    githubUrl: "https://github.com",
    liveUrl: "https://sko-hospital.vercel.app/"
  }
];

export const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Technology in CSE",
    institution: "Dadi Institute of Engineering and Technology (DIET)",
    boardOrUniversity: "JNTUGV (Jawaharlal Nehru Technological University Gurajada, Vizianagaram)",
    duration: "2024 - 2028",
    score: "CGPA: 8.20",
    details: [
      "Currently pursuing Computer Science Engineering.",
      "Consistently maintaining distinction status.",
      "Active participant in technical student clubs and workshops."
    ]
  },
  {
    degree: "Intermediate Education (MPC)",
    institution: "Sri Viswa Junior College",
    boardOrUniversity: "BIEAP (Board of Intermediate Education, Andhra Pradesh)",
    duration: "2022 - 2024",
    score: "Percentage: 85%",
    details: [
      "Specialized in Mathematics, Physics, and Chemistry (MPC).",
      "Developed solid problem-solving and logical reasoning foundations."
    ]
  },
  {
    degree: "SSC (Secondary School Certificate)",
    institution: "Bhashyam High School",
    boardOrUniversity: "BSEAP (Board of Secondary Education, Andhra Pradesh)",
    duration: "Graduated 2022",
    score: "Percentage: 80%",
    details: [
      "Completed school curriculum with a focus on science and mathematics."
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    title: "Python Full Stack Developer Virtual Internship",
    authority: "EduSkills Academy (Oct - Dec 2024)",
    iconName: "FileCode",
    credentialUrl: "/python-full-stack-cert.pdf"
  },
  {
    title: "Google Android Developer Virtual Internship",
    authority: "Google for Developers (Jan - Mar 2025)",
    iconName: "Smartphone",
    credentialUrl: "/android-developer-cert.pdf"
  },
  {
    title: "Web Full Stack Developer Virtual Internship",
    authority: "EduSkills Academy (Apr - Jun 2025)",
    iconName: "Globe",
    credentialUrl: "/web-full-stack-cert.pdf"
  },
  {
    title: "Google AI-ML Virtual Internship",
    authority: "Google for Developers (Jul - Sep 2025)",
    iconName: "Cpu",
    credentialUrl: "/ai-ml-cert.pdf"
  },
  {
    title: "Ethical Hacking Virtual Internship",
    authority: "EduSkills Academy (Oct - Dec 2025)",
    iconName: "ShieldAlert",
    credentialUrl: "/ethical-hacking-cert.pdf"
  }
];

export const achievementsData: Achievement[] = [
  {
    title: "GVP Hackathon Runner-Up",
    description: "Secured the runner-up position at the Gayatri Vidya Parishad Hackathon Event, presenting an innovative software prototype.",
    iconName: "Trophy"
  },
  {
    title: "Consistent Distinction Holder",
    description: "Maintained outstanding academic results across semesters during B.Tech.",
    iconName: "Award"
  },
  {
    title: "Hackathon Finalist",
    description: "Reached the final rounds of the Hackathon contest at Dadi Institute of Engineering and Technology.",
    iconName: "Cpu"
  },
  {
    title: "Technical Quiz Placer",
    description: "Placed 2nd representing the college in technical quiz competitions.",
    iconName: "Trophy"
  },
  {
    title: "Embedded Systems & IoT Workshops",
    description: "Actively participated in hands-on workshops covering IoT device development and PCB Design.",
    iconName: "Zap"
  },
  {
    title: "AMTZ Industrial Training",
    description: "Completed key industrial training and bootcamps at AMTZ (Andhra Pradesh MedTech Zone).",
    iconName: "Building"
  }
];

export const photographyData: PhotographyImage[] = [
  {
    id: "photo-1",
    category: "Portrait",
    title: "Gaze of the Golden Hour",
    settings: "ISO 100, f/1.8, 1/200s",
    camera: "Canon EOS 80D, 50mm",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "photo-2",
    category: "Street",
    title: "Midnight Shadows",
    settings: "ISO 1600, f/2.8, 1/60s",
    camera: "Nikon D7500, 35mm",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "photo-3",
    category: "Nature",
    title: "Mist in the Valley",
    settings: "ISO 200, f/8.0, 1/500s",
    camera: "Canon EOS 80D, 18-135mm",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "photo-4",
    category: "Events",
    title: "Rhythm and Lights",
    settings: "ISO 3200, f/4.0, 1/125s",
    camera: "Nikon D7500, 70-200mm",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "photo-5",
    category: "Night",
    title: "Celestial Trails",
    settings: "ISO 800, f/2.8, 25s",
    camera: "Canon EOS 80D, 11-16mm",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "photo-6",
    category: "Portrait",
    title: "Expressions",
    settings: "ISO 400, f/2.0, 1/160s",
    camera: "Canon EOS 80D, 50mm",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
  }
];

export const statisticsData = [
  { label: "CGPA", value: "8.20", suffix: "" },
  { label: "Projects Developed", value: "10", suffix: "+" },
  { label: "Certifications", value: "3", suffix: "+" },
  { label: "Technologies", value: "20", suffix: "+" },
  { label: "Hackathons", value: "1", suffix: "+" }
];

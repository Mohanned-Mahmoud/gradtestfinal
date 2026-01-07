
export interface Feature {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  status: string;
  features: string[];
  cta: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  modelUrl: string;
  scale: number;
  align: "left" | "center" | "right";
  type?: "standard" | "products" | "features" | "contact";
  position?: [number, number, number];
}

export interface Feature {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  status: string;
  features: string[];
  cta: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  modelUrl: string;
  scale: number;
  align: "left" | "center" | "right";
  type?: "standard" | "products" | "features" | "contact";
  position?: [number, number, number];
}

export const sections: Section[] = [
  {
    id: "home",
    title: "Revolutionary Medical Education Through Technology",
    description: "Welcome to the future of anatomical study. We bridge the gap between theoretical textbooks and clinical practice using high-fidelity 3D rendering and adaptive AI. Experience a learning environment where interactive models, real-time pathology simulation, and AI-powered assessments converge to enhance your medical retention and diagnostic skills by over 40%.",
    modelUrl: "/blood.glb",
    scale: 3.5, 
    align: "center",
    type: "standard"
  },
  {
    id: "learning-features",
    title: "Interactive Learning Ecosystem",
    description: "Gone are the days of static diagrams. Explore our cutting-edge suite designed to transform medical education through immersive visualization. From micro-anatomy of blood cells to systemic physiological responses, our platform utilizes Physically Based Rendering (PBR) to deliver photorealistic textures and lighting, ensuring you learn on the most accurate digital twins available.",
    modelUrl: "/blood.glb", 
    scale: 2.5,
    align: "left",
    type: "features"
  },
  {
    id: "products",
    title: "Our Comprehensive Solutions",
    description: "Discover our full ecosystem of innovative medical education solutions. Whether you are a student needing quick mobile revision, a professor conducting a lecture via the web, or a institution setting up a fully immersive VR simulation lab, we have a tailored platform designed to integrate seamlessly into your curriculum.",
    modelUrl: "/skeleton.glb", 
    scale: 0.3,
    align: "right",
    position: [-2.5, -2, 0],
    type: "products"
  },
  {
    id: "try-features",
    title: "Experience the Technology",
    description: "Don't just read about it—experience our interactive tools firsthand. This sandbox environment allows you to manipulate 3D models in real-time with zero latency. Test the rotation mechanics, explore the deep-zoom capabilities, and interact with our AI assistant to see how it answers complex clinical queries instantly.",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb", 
    scale: 2.5,
    align: "left",
    type: "standard"
  },
  {
    id: "contact",
    title: "Partner With Us",
    description: "Are you representing a medical university, a hospital training program, or an ed-tech investor? We are here to help you integrate MediLearn into your infrastructure. Contact our dedicated support team for API access, bulk licensing, or to request a personalized demonstration of our enterprise capabilities.",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb", 
    scale: 50,
    align: "center",
    type: "contact"
  },
  {
    id: "vr-experience",
    title: "Immersive VR Simulation",
    description: "Step inside the human body with our Meta Quest optimized application. Perform virtual dissections, practice surgical procedures in a risk-free environment, and visualize complex spatial relationships that are impossible to grasp on 2D screens. Supports hand-tracking for intuitive manipulation.",
    modelUrl: "/Quest3.glb",
    scale: 9,
    align: "center"
  },
  {
    id: "ai-mobile",
    title: "AI Pocket Tutor",
    description: "Your medical education never stops. Our mobile application brings the power of a university lab to your pocket. Featuring offline mode for study on the go, AR overlay capabilities, and a personalized AI tutor that adapts quizzes based on your weak points.",
    modelUrl: "/phone.glb",
    scale: 4,
    align: "center"
  }
];

export const interactiveFeatures = [
  {
    title: "High-Fidelity 3D Neurological Models",
    description: "Explore the human brain with unparalleled depth. Functionality includes lobe isolation, synaptic pathway visualization, and Circle of Willis blood flow simulation. Toggle between healthy and pathological states (e.g., stroke, tumor) to visualize clinical impacts."
  },
  {
    title: "Cardiovascular Dynamics Engine",
    description: "Visualize the human heart in motion. Examine the electrical conduction system (SA/AV nodes), observe valve mechanics during systole/diastole, and simulate hemodynamic pressure changes. Includes 4K texture mapping for realistic tissue representation."
  },
  {
    title: "Clinical AI Diagnostic Assistant",
    description: "Get instant, evidence-based answers to complex medical questions. Our AI is trained on PubMed-indexed literature and standard clinical guidelines. It can generate differential diagnoses, explain pathophysiology, and create custom quizzes for active recall."
  }
];

export const products: Product[] = [
  {
    id: "web-demo",
    name: "MediLearn Web Suite",
    description: "The core of our platform, accessible directly from any modern browser without heavy installations.",
    status: "Free Access",
    features: [
      "Full System Anatomy Viewer (Skeletal, Muscular, Nervous)",
      "Cross-Sectional Cutting & Dissection Tools",
      "Cloud-Synced Study Notes & Bookmarks",
      "Multi-Language Support (EN, ES, FR, AR)",
      "Context-Aware Labeling System",
      "Compatible with Chrome, Firefox, Safari & Edge"
    ],
    cta: "Launch Web Portal"
  },
  {
    id: "vr-experience",
    name: "MediLearn XR Pro",
    description: "The ultimate immersive experience for medical schools and simulation centers.",
    status: "Enterprise License",
    features: [
      "1:1 Scale Virtual Cadaver Dissection",
      "Multi-User Classrooms (Professor & Student Mode)",
      "Haptic Feedback Support for Surgical Tools",
      "Procedural Pathology Generation",
      "Optimized for Meta Quest",
    ],
    cta: "Request VR Kit"
  },
  {
    id: "ai-mobile",
    name: "MediLearn Companion App",
    description: "A lightweight, powerful tool designed for quick reference and spaced repetition learning.",
    status: "Available on App Stores",
    features: [
      "Daily Spaced Repetition Quizzes",
      "Voice-Activated Search & Navigation",
      "OCR Scanner for Textbook Diagrams",
      "Seamless Sync with Web Platform"
    ],
    cta: "Get Android App"
  }
];

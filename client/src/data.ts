
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
  rotation?: [number, number, number];
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
  rotation?: [number, number, number];
}

export const sections: Section[] = [
  {
    id: "home",
    title: "Experience Anatomy. Don't Just Memorize It.",
    description: "The first educational platform that fuses high-fidelity Virtual Reality with an intelligent, adaptive AI Tutor. Explore the human body in 3D, master complex concepts with personalized guidance, and bridge the gap between theory and clinical practice.",
    modelUrl: "/blood.glb",
    scale: 3.5, 
    align: "center",
    type: "standard"
  },
  {
    id: "mission",
    title: "Why We Built MediLearn",
    description: "Traditional anatomy education is facing a crisis. Static textbooks cannot capture the complexity of the human body, and physical lab resources are often limited. We believe medical students deserve better than passive memorization. Our mission is to transform learning by combining the immersive power of Virtual Reality with the responsiveness of Artificial Intelligence, turning anatomy from a subject you read about into a world you experience.",
    modelUrl: "anatomy2.glb",
    scale: 2.0,
    align: "center",
    type: "standard",
    position: [0, -1.5, 0]
  },
  {
    id: "learning-features",
    title: "Key Features",
    description: "Step inside a virtual medical environment where anatomy comes to life. Study with a context-aware AI tutor, adaptive learning engine, and assessments that help you grow.",
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
    position: [-3.5, -2, 0],
    type: "products"
  },
  {
    id: "ecosystem",
    title: "Learn Anywhere, Anytime",
    description: "Your learning shouldn't stop when you take off the headset. We have built a unified platform that stays in sync across all your devices. Virtual Reality for deep study sessions, a Mobile Companion to review and chat with the AI tutor, and a Web Portal for quick 3D previews and profile management. Start a session in VR and finish your quiz on your phone—your learning history and difficulty profile travel with you.",
    modelUrl: "/phone.glb",
    scale: 4,
    align: "center",
    type: "standard",
    position: [0, -1.0, 0]
  },
  {
    id: "try-features",
    title: "Your Journey to Mastery",
    description: "Log in and sync your profile. Choose Systems Mode to walk around full-body structures, or Organ Mode to dissect specific organs. Interact and ask the AI Tutor questions, then launch instant quizzes that adapt to your level.",
    modelUrl: "anatomy2.glb", 
    scale: 2.5,
    align: "left",
    type: "standard",
    position: [3, -2.5, 0]
  },
  {
    id: "contact",
    title: "Partner With Us",
    description: "Are you representing a medical university, a hospital training program, or an ed-tech investor? We are here to help you integrate MediLearn into your infrastructure. Contact our dedicated support team for API access, bulk licensing, or to request a personalized demonstration of our enterprise capabilities.",
    modelUrl: "logo2.glb", 
    scale: 3,
    align: "center",
    type: "contact",
    rotation: [0, Math.PI, 0]
  },
  {
    id: "vr-experience",
    title: "Immersive VR Simulation",
    description: "Step inside the human body with our Meta Quest optimized application. Perform virtual dissections, practice surgical procedures in a risk-free environment, and visualize complex spatial relationships that are impossible to grasp on 2D screens. Supports hand-tracking for intuitive manipulation.",
    modelUrl: "/Quest3.glb",
    scale: 16,
    align: "left",
    rotation: [0, Math.PI * 2.5, 0],
    position: [4, 0, 0]
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
    title: "True-to-Life Anatomical Visualization",
    description: "Move beyond static diagrams and interact with life-sized models. Switch between Systems Mode and Organ Mode, perform interactive dissection, and peel back body layers with simple gestures."
  },
  {
    title: "Your Personal AI Tutor",
    description: "Voice-first interaction with context-aware explanations. Point to any structure and ask what it does—get step-by-step reasoning tailored to your question."
  },
  {
    title: "Adaptive Learning Engine",
    description: "Dynamic difficulty adjusts in real time based on your performance. Personalized learning paths focus on your weak areas to accelerate mastery."
  },
  {
    title: "Clinical Relevance",
    description: "Link anatomy to real-world medicine with disease associations and diagnostic context. Understand functional implications to build clinical reasoning."
  },
  {
    title: "Smart Assessment & Feedback",
    description: "Contextual quizzes launch instantly from what you are studying. Intelligent remediation explains mistakes and a performance dashboard highlights areas to review."
  }
];

export const products: Product[] = [
  {
    id: "web-demo",
    name: "Web Learning Portal",
    description: "A high-performance dashboard designed for global low-latency access, serving as the central hub for student analytics and content review.",
    status: "Live Deployment",
    features: [
      "Real-time Proficiency Analytics",
      "Cross-Platform Session Sync",
      "Context-Aware Chat Generation",
      "Browser-Based 3D Visualization",
      "Responsive Medical Dashboard",
      "Instant Content Delivery"
    ],
    cta: "Launch Web Portal"
  },
  {
    id: "vr-experience",
    name: "Immersive VR Lab",
    description: "A fully immersive simulation environment optimized for standalone headsets, ensuring high frame rates during complex anatomical rendering.",
    status: "Headset Optimized",
    features: [
      "High-Fidelity Anatomical Rendering",
      "Hand-Tracking & Controller Support",
      "Real-time Collision Detection",
      "Seamless Session Synchronization",
      "Multi-Sensory Learning Environment",
      "Spatial Audio Feedback"
    ],
    cta: "View VR Specs"
  },
  {
    id: "ai-mobile",
    name: "Native Companion App",
    description: "A native mobile experience featuring offline capabilities and a specialized interface for reading complex medical explanations on the go.",
    status: "Mobile Optimized",
    features: [
      "Embedded 3D Model Viewer",
      "Markdown-Formatted Medical Chat",
      "Offline-Capable Architecture",
      "Biometric Authentication Support",
      "Interactive Anatomical Overlays",
      "On-Demand AI Tutoring"
    ],
    cta: "Download App"
  }
];

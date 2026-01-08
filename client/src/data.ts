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

// 2. Optimized Sections Array
// Flow: Hero -> Mission -> Features -> Journey -> Products -> Ecosystem -> Contact
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
    description: "Traditional anatomy education is facing a crisis. Static textbooks cannot capture the complexity of the human body, and physical lab resources are often limited. We believe medical students deserve better than passive memorization. Our mission is to transform learning by combining the immersive power of Virtual Reality with the responsiveness of Artificial Intelligence.",
    modelUrl: "anatomy2.glb", // Using a relevant model for the mission
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
    type: "features" // This renders the interactiveFeatures list
  },
  {
    id: "journey",
    title: "Your Journey to Mastery",
    description: "Log in and sync your profile. Choose Systems Mode to walk around full-body structures, or Organ Mode to dissect specific organs. Interact and ask the AI Tutor questions, then launch instant quizzes that adapt to your level.",
    modelUrl: "anatomy2.glb", 
    scale: 2.5,
    align: "right",
    type: "standard",
    position: [2, -2.5, 0]
  },
  {
    id: "products",
    title: "Our Comprehensive Solutions",
    description: "Discover our full ecosystem. Whether you are a student needing quick mobile revision, or a university setting up a VR lab, we have a tailored platform for you.",
    modelUrl: "/skeleton.glb", 
    scale: 0.35,
    align: "center",
    position: [0, -2, 0],
    type: "products" // This renders the product cards
  },
  {
    id: "ecosystem",
    title: "Learn Anywhere, Anytime",
    description: "Your learning shouldn't stop when you take off the headset. We have built a unified platform that stays in sync across all your devices. Start a session in VR and finish your quiz on your phone—your learning history and difficulty profile travel with you.",
    modelUrl: "/phone.glb",
    scale: 4,
    align: "left",
    type: "standard",
    position: [3, -1.0, 0]
  },
  {
    id: "contact",
    title: "Partner With Us",
    description: "Are you representing a medical university, a hospital training program, or an ed-tech investor? We are here to help you integrate MediLearn into your infrastructure. Contact our dedicated support team for API access and bulk licensing.",
    modelUrl: "logo2.glb", 
    scale: 3,
    align: "center",
    type: "contact",
    rotation: [0, Math.PI, 0]
  }
];

// 3. Updated Interactive Features (Based on Thesis Goals)
export const interactiveFeatures = [
  {
    title: "True-to-Life Visualization",
    description: "Move beyond static diagrams. Switch between Systems Mode and Organ Mode, perform interactive dissection, and peel back body layers with simple gestures."
  },
  {
    title: "Your Personal AI Tutor",
    description: "Voice-first interaction with context-aware explanations. Point to any structure and ask 'What does this do?' to get step-by-step reasoning tailored to you."
  },
  {
    title: "Adaptive Learning Engine",
    description: "The system monitors your progress and adjusts difficulty in real-time. It identifies your weak points and personalizes the curriculum to accelerate mastery."
  },
  {
    title: "Clinical Relevance",
    description: "Link anatomy to real-world medicine. The system explains disease associations and diagnostic contexts while you examine the relevant organs."
  },
  {
    title: "Smart Assessment",
    description: "Launch contextual quizzes instantly. If you make a mistake, the AI intervenes to explain the reasoning, turning errors into learning opportunities."
  }
];

// 4. Products Array (Polished descriptions)
export const products: Product[] = [
  {
    id: "web-demo",
    name: "Web Learning Portal",
    description: "A high-performance dashboard serving as the central hub for student analytics, 3D previews, and content review.",
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
    description: "A fully immersive simulation environment optimized for standalone headsets, allowing for deep anatomical study and virtual dissection.",
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
    description: "A pocket-sized lab featuring offline capabilities, perfect for quick revision and chatting with the AI Tutor on the go.",
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


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
    title: "Revolutionary Medical Education Through Technology",
    description: "The first educational platform that fuses high-fidelity Virtual Reality with an intelligent, adaptive AI Tutor. We are transforming medical education by moving beyond static textbooks and passive memorization. Explore the human body in 3D, master complex concepts, and bridge the gap between theory and clinical practice.",    
    modelUrl: "/blood.glb",
    scale: 3.5, 
    align: "center",
    type: "standard"
  },
  {
    id: "learning-features",
    title: "Interactive Learning Ecosystem",
    description: "Step inside a virtual medical environment where anatomy comes to life. Your journey begins by choosing between Systems Mode for full-body exploration or Organ Mode for deep dissection. As you interact, our context-aware AI Tutor answers your questions in real-time, while the adaptive engine tailors instant quizzes to your proficiency level.",    
    modelUrl: "/blood.glb", 
    scale: 2.5,
    align: "left",
    type: "features"
  },
  {
    id: "products",
    title: "Our Comprehensive Solutions",
    description: "Discover our full ecosystem. Whether you are a student needing quick mobile revision, or a university setting up a VR lab, we have a tailored platform for you.",    
    modelUrl: "/skeleton.glb", 
    scale: 0.3,
    align: "right",
    position: [-3.5, -2, 0],
    type: "products"
  },
  {
    id: "try-features",
    title: "Experience the Technology",
    description: "Don't just read about it—experience our interactive tools firsthand. This sandbox environment allows you to manipulate 3D models in real-time with zero latency. Test the rotation mechanics, explore the deep-zoom capabilities, and interact with our AI assistant to see how it answers complex clinical queries instantly.",
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
    title: "Learn Anywhere, Anytime",
    description: "Your learning shouldn't stop when you take off the headset. We have built a unified platform that stays in sync across all your devices. Start a session in VR and finish your quiz on your phone—your learning history and difficulty profile travel with you.",
    modelUrl: "/phone.glb",
    scale: 4,
    align: "center"
  }
];

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

export const products: Product[] = [
  {
    id: "web-demo",
    name: "Web Learning Portal",
    description: "A high-performance dashboard serving as the central hub for student analytics, 3D previews, and content review.",
    status: "Live Deployment",
    features: [
      "Cross-Platform Session Sync",
      "Context-Aware Chat Generation",
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

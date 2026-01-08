
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
    rotation: [0, Math.PI + Math.PI / 2, 0],
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
    title: "Seamless 3D-Mobile Integration",
    description: "A high-performance bridge connecting the native user interface with the embedded 3D rendering engine. Interacting with anatomical models instantly updates clinical data overlays, while UI controls trigger complex 3D animations in real-time."
  },
  {
    title: "High-Precision Medical AI",
    description: "Powered by a specialized Large Language Model fine-tuned via reinforcement learning. The system delivers clinically accurate answers with a significant increase in diagnostic reasoning capabilities compared to standard baseline models."
  },
  {
    title: "Intelligent Adaptive Curriculum",
    description: "Utilizes advanced probabilistic algorithms to track learning parameters for every topic. The engine dynamically estimates your hidden proficiency level and adjusts the difficulty of questions in real-time to optimize retention."
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

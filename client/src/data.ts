
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
    description: "Experience interactive 3D models and AI-powered learning to enhance your medical knowledge and skills.",
    modelUrl: "/blood.glb",
    scale: 3.5, 
    align: "center",
    type: "standard"
  },
  {
    id: "learning-features",
    title: "Interactive Learning Features",
    description: "Explore our cutting-edge features designed to transform medical education through immersive 3D visualization and AI technology.",
    modelUrl: "/blood.glb", 
    scale: 2.5,
    align: "left",
    type: "features"
  },
  {
    id: "products",
    title: "Our Products",
    description: "Discover our range of innovative medical education solutions designed to enhance learning through interactive technology.",
    modelUrl: "/skeleton.glb", 
    scale: 0.2,
    align: "right",
    // move it abet lower 
    position: [-2, -2, 0],
    
    type: "products"
  },
  {
    id: "try-features",
    title: "Try Our Features",
    description: "Experience our interactive medical education tools firsthand. Explore 3D models and interact with our AI assistant.",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb", 
    scale: 2.5,
    align: "left",
    type: "standard"
  },
  {
    id: "contact",
    title: "Contact Us",
    description: "Have questions or need more information? We're here to help you get the most out of MediLearn.",
    modelUrl: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb", 
    scale: 50,
    align: "center",
    type: "contact"
  },
  {
    id: "vr-experience",
    title: "VR Experience",
    description: "Immersive anatomical exploration in virtual reality.",
    modelUrl: "/Quest3.glb",
    scale: 6,
    align: "center"
  },
  {
    id: "ai-mobile",
    title: "AI Mobile",
    description: "Your AI-powered medical tutor on the go.",
    modelUrl: "/phone.glb",
    scale: 4,
    align: "center"
  }
];

export const interactiveFeatures = [
  {
    title: "3D Brain Model",
    description: "Explore the human brain in interactive 3D. Rotate, zoom, and identify different regions with detailed annotations."
  },
  {
    title: "3D Heart Model",
    description: "Visualize the human heart in detailed 3D. Examine chambers, valves, and blood flow with interactive features."
  },
  {
    title: "Medical AI Chatbot",
    description: "Get instant answers to medical questions with our AI-powered chatbot trained on medical literature."
  }
];

export const products: Product[] = [
  {
    id: "web-demo",
    name: "MediLearn Web Demo",
    description: "Try our interactive tools directly in your browser.",
    status: "Free Demo",
    features: [
      "3D Brain and Heart Viewer",
      "Zoom, Rotate & Explore Tools",
      "Label Hover and Info Panels",
      "Web-Based Chat Assistant",
      "No Installation Needed",
      "Compatible with All Devices"
    ],
    cta: "Try Web Demo"
  },
  {
    id: "vr-experience",
    name: "MediLearn VR Experience",
    description: "Immersive anatomical exploration in virtual reality.",
    status: "Available on request",
    features: [
      "Interactive 3D Organ Disassembly",
      "Controller-Based Navigation",
      "Real-Time Labeling & Highlighting",
      "Oculus Quest 2 / Meta XR Compatible",
      "Voice-Assisted AI Tutor",
      "Ideal for Classrooms & Labs"
    ],
    cta: "Launch VR App"
  },
  {
    id: "ai-mobile",
    name: "MediLearn AI Mobile",
    description: "Your AI-powered medical tutor on the go.",
    status: "Free Download",
    features: [
      "AI Chatbot for Medical Q&A",
      "iOS and Android Support",
      "Contextual Study Recommendations",
      "Medical Condition Explanations",
      "Built for Mobility and Speed"
    ],
    cta: "Download Now"
  }
];

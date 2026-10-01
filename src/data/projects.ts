import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "salba-cdrrmo-rescue-app",
    title: "SALBA CDRRMO Rescue App",
    description:
      "SALBA CDRRMO Rescue App is an emergency management ecosystem connecting citizens, command centers, and rescue responders. It features a civilian mobile app for instant SOS & incident reporting, an AI-powered web dashboard with live GIS unit tracking for smart dispatching, and a responder app for real-time field coordination.",
    features: [
      "AI-Powered Incident Severity Analysis & Smart Dispatching",
      "Civilian Mobile App for Emergency SOS & Incident Reporting",
      "Dedicated Responder Mobile App for On-the-Ground Coordination",
      "Command Center Web Dashboard with Live GIS Mapping & Unit Tracking",
      "Real-Time Tri-Party Coordination (Citizen - Dispatch - Rescuer)",
      "Automated Incident Lifecycle & Emergency Response Analytics",
    ],
    image: "/images/projects/capstone1.png",
    fullImage: "/images/projects/capstone1full.png",
    gallery: [
      "/images/projects/capstone1.png",
      "/images/projects/capstone2.png",
      "/images/projects/capstone3.png",
      "/images/projects/capstone4.png",
      "/images/projects/capstone5.png",
      "/images/projects/capstone6.png",
    ],
    fullGallery: [
      "/images/projects/capstone1full.png",
      "/images/projects/capstone2full.png",
      "/images/projects/capstone3full.png",
      "/images/projects/capstone4full.png",
      "/images/projects/capstone5full.png",
      "/images/projects/capstone6full.png",
    ],
    tags: [
      { name: "React Native", color: "#61DAFB", icon: "/images/Techstack/React.png" },
      { name: "React.js", color: "#61DAFB", icon: "/images/Techstack/React.png" },
      { name: "Node.js", color: "#339933", icon: "/images/Techstack/Node.js.png" },
      { name: "Express.js", color: "#888888", icon: "/images/Techstack/Express.png" },
      { name: "MongoDB", color: "#47A248", icon: "/images/Techstack/MongoDB.png" },
      { name: "Python", color: "#3776AB", icon: "/images/Techstack/Python.png" },
      { name: "JavaScript", color: "#F7DF1E", icon: "/images/Techstack/JavaScript.png" },
    ],
  },
  {
    id: "water-delivery-management-system",
    title: "Water Delivery Management System",
    description:
      "An operational management platform designed to automate water refilling station operations. It integrates a Point-of-Sale (POS) and customer portal with real-time GPS delivery tracking, enabling seamless order dispatching, driver tracking, and inventory management.",
    features: [
      "Automated Point-of-Sale (POS) System",
      "Customer Ordering Portal",
      "Real-time GPS Tracking System",
      "Live Map Dispatching",
      "Inventory Management",
    ],
    image: "/images/projects/proj1_v2.png",
    fullImage: "/images/projects/projpic1.png",
    gallery: [
      "/images/projects/proj1_v2.png",
      "/images/projects/proj2_v3.png",
      "/images/projects/proj3_v2.png",
      "/images/projects/proj4_v2.png",
      "/images/projects/proj5_v2.png",
    ],
    fullGallery: [
      "/images/projects/projpic1.png",
      "/images/projects/projpic2.png",
      "/images/projects/projpic3.png",
      "/images/projects/projpic4.png",
      "/images/projects/projpic5.png",
    ],
    tags: [
      { name: "React", color: "#61DAFB", icon: "/images/Techstack/React.png" },
      { name: "Node.js", color: "#339933", icon: "/images/Techstack/Node.js.png" },
      { name: "Express.js", color: "#888888", icon: "/images/Techstack/Express.png" },
      { name: "MongoDB", color: "#47A248", icon: "/images/Techstack/MongoDB.png" },
      { name: "JavaScript", color: "#F7DF1E", icon: "/images/Techstack/JavaScript.png" },
      { name: "Vite", color: "#646CFF", icon: "/images/Techstack/Vite.js.png" },
    ],
    liveUrl: "https://water-delivery-management-system-one.vercel.app/login",
    codeUrl: "https://github.com/janusezam/Water-Delivery-Management-System",
  },
];

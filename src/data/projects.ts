import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "water-delivery-management-system",
    title: "Water Delivery Management System",
    description:
      "An operational platform designed to automate and digitize water refilling stations. It connects a point-of-sale (POS) and customer ordering portal directly to a real-time GPS tracking system, allowing admins to seamlessly dispatch orders, manage inventory, and track their delivery drivers on a live map.",
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
      { name: "MongoDB", color: "#47A248" },
      { name: "Express.js", color: "#888888" },
      { name: "React", color: "#61DAFB" },
      { name: "Node.js", color: "#339933" },
      { name: "MERN Stack", color: "#2563eb" },
      { name: "GPS Tracking", color: "#E0234E" },
      { name: "POS System", color: "#F59E0B" },
    ],
    liveUrl: "https://water-delivery-management-system-one.vercel.app/login",
    codeUrl: "https://github.com/janusezam/Water-Delivery-Management-System",
  },
];

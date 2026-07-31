import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Water Delivery Management System",
    description:
      "An operational platform designed to automate and digitize water refilling stations. It connects a point-of-sale (POS) and customer ordering portal directly to a real-time GPS tracking system, allowing admins to seamlessly dispatch orders, manage inventory, and track their delivery drivers on a live map.",
    image: "/images/projects/proj1.png",
    gallery: [
      "/images/projects/proj1.png",
      "/images/projects/proj2.png",
      "/images/projects/proj3.png",
      "/images/projects/proj4.png",
      "/images/projects/proj5.png",
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

import type { SocialLink, ContactMethod } from "@/types";

export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/janus-ezam-tagud-39669243b",
    icon: "linkedin",
    imageIcon: "/images/Techstack/linkedin.png",
    gradientFrom: "#0A66C2",
    gradientTo: "#0077B5",
    handle: "Janus Ezam Tagud",
    hoverWidth: "220px",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/janusminami?stkn=d3R6czVlcjFvcG4z",
    icon: "instagram",
    imageIcon: "/images/Techstack/instagram.png",
    gradientFrom: "#f09433",
    gradientTo: "#bc1888",
    handle: "@janusminami",
    hoverWidth: "190px",
  },
  {
    platform: "GitHub",
    url: "https://github.com/janusezam",
    icon: "github",
    imageIcon: "/images/Techstack/GitHub.png",
    gradientFrom: "#333333",
    gradientTo: "#6e5494",
    handle: "@janusezam",
    hoverWidth: "185px",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/janus.ezam.tagud/",
    icon: "facebook",
    imageIcon: "/images/Techstack/fb.png",
    gradientFrom: "#1877f2",
    gradientTo: "#3b5998",
    handle: "Janus Ezam Tagud",
    hoverWidth: "220px",
  },
];

export const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    value: "janusezam@gmail.com",
    url: "mailto:janusezam@gmail.com",
    icon: "email",
    imageIcon: "/images/Techstack/email.png",
    gradientFrom: "#ea4335",
    gradientTo: "#ff6b6b",
    hoverWidth: "250px",
  },
  {
    label: "Messenger",
    value: "Chat with me",
    url: "https://m.me/janus.ezam.tagud",
    icon: "messenger",
    imageIcon: "/images/Techstack/fb.png",
    gradientFrom: "#00B2FF",
    gradientTo: "#006AFF",
    hoverWidth: "195px",
  },
];

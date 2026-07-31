import type { SocialLink, ContactMethod } from "@/types";

export const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/janusezam",
    icon: "github",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/janus.ezam.tagud/",
    icon: "facebook",
  },
];

export const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    value: "janusezam@gmail.com",
    url: "mailto:janusezam@gmail.com",
    icon: "email",
  },
  {
    label: "Messenger",
    value: "Chat with me",
    url: "https://m.me/janus.ezam.tagud",
    icon: "messenger",
  },
];

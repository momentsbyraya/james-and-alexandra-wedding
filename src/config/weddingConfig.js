// ========================================
// WEDDING INVITATION CONFIGURATION
// ========================================
// This file imports data from JSON files to avoid duplication
// Update the JSON files in src/data/ to modify wedding information

import { couple, venues } from '../data'

export const weddingConfig = {
  // Basic Wedding Information - imported from couple.json
  couple: {
    bride: couple.bride,
    groom: couple.groom,
    together: couple.together
  },

  // Wedding Details - imported from couple.json
  wedding: couple.wedding,

  // Venue Information - imported from venues.json
  venue: venues,

  // RSVP Information
  rsvp: {
    deadline: couple.rsvpDeadline?.date || "",
    email: "",
    phone: "",
    website: couple.rsvpFormUrl || "",
    message: "We have reserved seat/s for you. Please let us know if you can join us on our special day."
  },

  // Theme and Styling
  theme: {
    primaryColor: "forest",
    secondaryColor: "gold",
    accentColor: "gold",
    fontFamily: "serif",
    style: "elegant"
  },

  // Photos and Media
  photos: {
    hero: "/assets/images/hero-couple.jpg",
    gallery: [
      "/assets/images/couple-1.jpg",
      "/assets/images/couple-2.jpg",
      "/assets/images/couple-3.jpg",
      "/assets/images/couple-4.jpg"
    ],
    background: "/assets/images/background-pattern.jpg"
  },

  // Additional Information
  details: {
    hashtag: "#ArjieAndFritzie2026",
    website: "",
    registry: "",
    message: "We're excited to celebrate our special day with you!",
    giftGuide:
      "The most important thing is to have you with us on our special day. No gifts needed or expected. However, if you wish to participate, a monetary gift would be great.",
    covidInfo: "We're following local health guidelines. Please stay home if you're feeling unwell."
  },

  // Social Media
  social: {
    instagram: "",
    facebook: "",
    twitter: ""
  }
};

// Helper function to format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to get time remaining until wedding
export const getTimeUntilWedding = () => {
  const weddingDate = new Date(couple.wedding.date);
  const now = new Date();
  const timeDiff = weddingDate.getTime() - now.getTime();
  
  if (timeDiff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
};

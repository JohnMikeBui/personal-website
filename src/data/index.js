export const PROJECTS = [
  {
    id: "01",
    title: "Shimon",
    category: "Robotics / Human-Computer Interactions",
    year: "2025",
    desc: "Georgia Tech's Famous Marimba Playing Robot Now With Emotion Recognition!",
    src: "/photos/shimon.jpg",
    longDesc:
      "Shimon is Georgia Tech's award-winning marimba-playing robot. This project extends Shimon's capabilities by integrating real-time emotion recognition — allowing the robot to perceive audience reactions and adapt its musical performance accordingly. Using computer vision and deep learning, Shimon can now read facial expressions and respond with changes in tempo, dynamics, and improvisation style.",
    tech: ["Python", "OpenCV", "TensorFlow", "ROS", "C++"],
    links: [
      { label: "GitHub", url: "#" },
    ],
  },
  {
    id: "02",
    title: "SkillSwap",
    category: "iOS / Social",
    year: "2025",
    desc: "Find people with complementary skills and learning interests, then meet up to swap what you know.",
    src: "/photos/skillswap.jpg",
    longDesc:
      "SkillSwap is an iOS app that connects people based on what they know and what they want to learn. The app matches users with complementary skill sets — someone who knows guitar and wants to learn Spanish gets paired with someone who knows Spanish and wants to learn guitar. From there, users can browse profiles, chat, and schedule in-person meetups to exchange knowledge.",
    tech: ["Swift", "SwiftUI", "Firebase", "CoreLocation", "Xcode"],
    links: [
      { label: "GitHub", url: "#" },
    ],
  },
  {
    id: "03",
    title: "ShoeBox AI",
    category: "Mobile / Machine Learning",
    year: "2025",
    desc: "Snap a photo of any shoe and instantly get the name, market price, and similar matches.",
    src: "/photos/shoebox.jpg",
    longDesc:
      "ShoeBox AI lets you point your camera at any sneaker or shoe and immediately identifies it. The app returns the exact model name, current resale and retail pricing, and a curated list of visually similar alternatives. Built on a custom-trained image classification model, ShoeBox AI handles everything from rare sneakers to everyday footwear.",
    tech: ["Python", "PyTorch", "React Native", "FastAPI", "AWS S3"],
    links: [
      { label: "GitHub", url: "#" },
    ],
  },
  {
    id: "04",
    title: "Hooper",
    category: "Embedded Systems / IoT",
    year: "2025",
    desc: "An embedded device that displays live NBA game time, quarter, and scores in real time.",
    src: "/photos/hooper.jpg",
    longDesc:
      "Hooper is a compact embedded device that pulls live NBA game data and displays the current time, quarter, and scores for any active game. Designed to sit on your desk or shelf, it gives you a real-time scoreboard without needing to check your phone. The device syncs with the NBA API over Wi-Fi and updates automatically as the game progresses.",
    tech: ["C++", "Raspberry Pi", "NBA API", "MQTT", "Python"],
    links: [
      { label: "GitHub", url: "#" },
    ],
  },
];

export const EXPERIENCE = [
  { company: "Georgia Tech", role: "Researcher", year: "2025" },
  { company: "SkillSwap", role: "Software Engineer", year: "2025" },
  { company: "Georgia Tech", role: "Software Engineer", year: "Now" },

];

export const SKILLS = [
  "TypeScript", "React", "Node.js", "Python",
  "PostgreSQL", "Docker", "AWS", "GraphQL", "CI/CD", "Git",
];

export const WATCHING = [
  { title: "The Green Mile", year: "1999", color: "#3a5a3a" },
  { title: "Black Swan", year: "2010", color: "#222" },
  { title: "The Peanuts Move", year: "2010", color: "#e8a838" },
  { title: "In the Mood for Love", year: "2000", color: "#6a3a3a" },
];

export const LISTENING = [
  { title: "Apple Pie", artist: "Travis Scott", color: "#8b4513" },
  { title: "Lover Girl", artist: "Laufey", color: "#191970" },
  { title: "vampire", artist: "Olivia Rodrigo", color: "#6b2d5e" },
  { title: "Dirty Diana", artist: "Michael Jackson", color: "#1a1a1a" },
];

export const READING = [
  { title: "IT", author: "Stephen King", color: "#c0392b" },
  { title: "A Game of Thrones", author: "George R.R. Martin", color: "#8b0000" },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", color: "#2c3e6b" },
  { title: "Blood Meridian", author: "Cormac McCarthy", color: "#8b4513" },
];


export const KEYWORDS = [
  {
    id: "basketball",
    label: "basketball player",
    color: "#c84b31",
    bg: "#d4cfc8",
    src: "/photos/basketball.jpg",
  },
  {
    id: "developer",
    label: "software developer",
    color: "#4a7a9b",
    bg: "#c8d0d4",
    src: "/photos/developer.jpg",
  },
  {
    id: "music",
    label: "music lover",
    color: "#7a6a9b",
    bg: "#cec8d4",
    src: "/photos/music.jpeg",
  },
  {
    id: "dogs",
    label: "dog person",
    color: "#7a9b6a",
    bg: "#c8d4c8",
    src: "/photos/dogs.jpg",
  },
];

export const PHOTOS = [
  { id: 1, src: "/photos/grad_photo.jpeg", height: 580, caption: "HIM.", category: "DEGREE BOUND" },
  { id: 2, src: "/photos/play_house.jpeg", height: 400, caption: "DOWN IN ATLANTA.", category: "HOME AWAY" },
  { id: 3, src: "/photos/tamu_football.jpeg", height: 50, caption: "31 - 9.", category: "A&M BLACK OUT" },
  { id: 4, src: "/photos/gt_basketball.jpeg", height: 500, caption: "TOUGH LUCK.", category: "GT HOOPS" },
  { id: 5, src: "/photos/brutalist_design.jpeg", height: 500, caption: "THE BRUTALIST.", category: "UNDERSTANDING DESIGN" },
  { id: 6, src: "/photos/snoopy.jpeg", height: 500, caption: "CHA-YA.", category: "WHERE'S WOODSTOCK?" },
  { id: 7, src: "/photos/dog_japan.jpeg", height: 1, caption: "SHIBA.", category: "KAWAII!" },
  { id: 8, src: "/photos/olympics.jpeg", height: 1, caption: "INSPIRATION.", category: "GO FOR GOLD" },
];

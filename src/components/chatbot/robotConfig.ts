export interface RobotFrame {
  index: number; // -1 for Normal view, 0..11 for sprite sheet movement frames
  label: string;
  shortLabel: string;
  description: string;
  src: string;
  fallbackSrc: string;
}

export const ROBOT_FRAMES: RobotFrame[] = [
  {
    index: -1,
    label: "Normal View",
    shortLabel: "Normal",
    description: "High-resolution default standing robot with headphones and glowing cyan eyes",
    src: "/images/bot/robot-normal-trans.png",
    fallbackSrc: "/images/bot/robot-normal.jpg",
  },
  {
    index: 0,
    label: "Pose 0: Tilt Left & Wink",
    shortLabel: "#0 Tilt L",
    description: "Playful tilt to the left with charming single-eye wink",
    src: "/images/bot/frame_0_trans.png",
    fallbackSrc: "/images/bot/frame_0.png",
  },
  {
    index: 1,
    label: "Pose 1: Starry Sparkle Eyes",
    shortLabel: "#1 Sparkle",
    description: "Excited eyes filled with shimmering stars & glints",
    src: "/images/bot/frame_1_trans.png",
    fallbackSrc: "/images/bot/frame_1.png",
  },
  {
    index: 2,
    label: "Pose 2: Tilt Right",
    shortLabel: "#2 Tilt R",
    description: "Curious tilt towards the right in inquisitive stance",
    src: "/images/bot/frame_2_trans.png",
    fallbackSrc: "/images/bot/frame_2.png",
  },
  {
    index: 3,
    label: "Pose 3: Chill / Sleepy",
    shortLabel: "#3 Chill",
    description: "Relaxed, peaceful sleepy gaze with half-closed eyes",
    src: "/images/bot/frame_3_trans.png",
    fallbackSrc: "/images/bot/frame_3.png",
  },
  {
    index: 4,
    label: "Pose 4: Sassy Anime Tick",
    shortLabel: "#4 Sassy",
    description: "Cheeky side pout with classic anime tick expression",
    src: "/images/bot/frame_4_trans.png",
    fallbackSrc: "/images/bot/frame_4.png",
  },
  {
    index: 5,
    label: "Pose 5: Happy Squint",
    shortLabel: "#5 Happy",
    description: "Bright joyful upward-curved smiling eye screens",
    src: "/images/bot/frame_5_trans.png",
    fallbackSrc: "/images/bot/frame_5.png",
  },
  {
    index: 6,
    label: "Pose 6: Focused Neutral",
    shortLabel: "#6 Neutral",
    description: "Centered, wide attentive eyes focused directly ahead",
    src: "/images/bot/frame_6_trans.png",
    fallbackSrc: "/images/bot/frame_6.png",
  },
  {
    index: 7,
    label: "Pose 7: Dizzy / Shock",
    shortLabel: "#7 Dizzy",
    description: "Dazed narrow line eyes with comical dizzy lean",
    src: "/images/bot/frame_7_trans.png",
    fallbackSrc: "/images/bot/frame_7.png",
  },
  {
    index: 8,
    label: "Pose 8: Side Glance",
    shortLabel: "#8 Glance",
    description: "Pivoted stance looking curiously towards the left side",
    src: "/images/bot/frame_8_trans.png",
    fallbackSrc: "/images/bot/frame_8.png",
  },
  {
    index: 9,
    label: "Pose 9: Lightbulb Idea!",
    shortLabel: "#9 Idea 💡",
    description: "Bright glowing lightbulb icons in eye displays for eureka moment",
    src: "/images/bot/frame_9_trans.png",
    fallbackSrc: "/images/bot/frame_9.png",
  },
  {
    index: 10,
    label: "Pose 10: Confused / Ponder",
    shortLabel: "#10 Ponder",
    description: "Deep thinking tilt with questioning curved eyes",
    src: "/images/bot/frame_10_trans.png",
    fallbackSrc: "/images/bot/frame_10.png",
  },
  {
    index: 11,
    label: "Pose 11: Looking Up Excited",
    shortLabel: "#11 Upward",
    description: "Forward-leaning enthusiastic stance looking upward",
    src: "/images/bot/frame_11_trans.png",
    fallbackSrc: "/images/bot/frame_11.png",
  },
];

export type RobotActionKey =
  | "idle"
  | "walk"
  | "dance"
  | "think"
  | "idea"
  | "happy"
  | "wave"
  | "sleepy"
  | "curious";

export interface RobotAction {
  key: RobotActionKey;
  name: string;
  icon: string;
  sequence: number[]; // Sequence of frame indices (e.g., [0, 2, 0, 2])
  intervalMs: number;
  description: string;
}

export const ROBOT_ACTIONS: Record<RobotActionKey, RobotAction> = {
  idle: {
    key: "idle",
    name: "Calm Idle",
    icon: "🧘",
    sequence: [-1, -1, 6, -1, 0, -1, 2],
    intervalMs: 800,
    description: "Gentle natural breathing stance between normal view and tilts",
  },
  walk: {
    key: "walk",
    name: "Wobble Walk",
    icon: "🚶",
    sequence: [0, 2, 0, 2],
    intervalMs: 280,
    description: "Rhythmic walking motion shifting from left foot to right foot",
  },
  dance: {
    key: "dance",
    name: "Happy Dance",
    icon: "💃",
    sequence: [0, 2, 5, 1, 0, 2, 11, 5],
    intervalMs: 220,
    description: "Energetic celebratory dance groove cycling party frames",
  },
  think: {
    key: "think",
    name: "Thinking / AI Processing",
    icon: "🤔",
    sequence: [6, 8, 10, 8],
    intervalMs: 380,
    description: "Processing questions and searching portfolio records",
  },
  idea: {
    key: "idea",
    name: "Eureka Idea!",
    icon: "💡",
    sequence: [10, 6, 9, 9, 9, 5],
    intervalMs: 350,
    description: "Lightbulb moment displaying glowing idea icons",
  },
  happy: {
    key: "happy",
    name: "Super Joyful",
    icon: "✨",
    sequence: [5, 1, 5, 1],
    intervalMs: 280,
    description: "Cheerful squint and starry eye celebrations",
  },
  wave: {
    key: "wave",
    name: "Greeting Wave",
    icon: "👋",
    sequence: [0, 6, 0, 6, -1],
    intervalMs: 300,
    description: "Warm friendly greeting nodding to visitors",
  },
  sleepy: {
    key: "sleepy",
    name: "Sleepy Rest",
    icon: "😴",
    sequence: [3, 7, 3, 7],
    intervalMs: 650,
    description: "Dozing off after answering many visitor inquiries",
  },
  curious: {
    key: "curious",
    name: "Curious Stance",
    icon: "👀",
    sequence: [8, 11, 8, 11],
    intervalMs: 400,
    description: "Scanning surroundings with eager eyes",
  },
};

export function getFrameByIndex(index: number): RobotFrame {
  const found = ROBOT_FRAMES.find((f) => f.index === index);
  return found || ROBOT_FRAMES[0];
}

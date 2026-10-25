import { site, services, projects, skills, education, certificates } from "@/data/site";
import { RobotActionKey } from "./robotConfig";

export interface BotResponse {
  text: string;
  actionKey?: RobotActionKey;
  targetIndex?: number;
  suggestions?: string[];
  links?: { label: string; url: string; isExternal?: boolean }[];
}

export const INITIAL_SUGGESTIONS = [
  "Who is Widushan?",
  "Show top AI & ML projects",
  "Web & Mobile apps built",
  "Skills & Tech stack",
  "How can I contact or hire him?",
  "Dance for me! 🤖💃",
];

export function getBotReply(userMessage: string): BotResponse {
  const query = userMessage.toLowerCase().trim();

  // 1. Robot Control / Animation Commands
  if (query.includes("dance") || query.includes("dancing") || query.includes("party")) {
    return {
      text: "Woohoo! Let's groove! 🎶💃 Watch me bust some robot moves across the frames!",
      actionKey: "dance",
      suggestions: ["Walk for me", "Got an idea?", "Show all poses", "Who is Widushan?"],
    };
  }

  if (query.includes("walk") || query.includes("walking") || query.includes("step")) {
    return {
      text: "Stepping in style! 🚶 Wobbling left and right using frame indices [0, 2, 0, 2]!",
      actionKey: "walk",
      suggestions: ["Dance for me!", "Give me an idea", "What skills does Widushan have?"],
    };
  }

  if (query.includes("idea") || query.includes("eureka") || query.includes("lightbulb") || query.includes("bulb")) {
    return {
      text: "💡 Ding! Lightbulb eyes activated! Check out frame index 9 — that's when brilliant solutions are born!",
      actionKey: "idea",
      suggestions: ["Show top AI & ML projects", "What can Widushan build?", "Dance for me!"],
    };
  }

  if (query.includes("think") || query.includes("ponder") || query.includes("calculating") || query.includes("processing")) {
    return {
      text: "🤔 Hmm... running neural calculations and indexing database records...",
      actionKey: "think",
      suggestions: ["Show tech stack", "Tell me about education", "How to contact?"],
    };
  }

  if (query.includes("happy") || query.includes("smile") || query.includes("joy") || query.includes("excited")) {
    return {
      text: "Yay! Seeing you here makes my circuits sparkle! ✨ Look at my happy squint (Index #5) and starry eyes (Index #1)!",
      actionKey: "happy",
      suggestions: ["Who is Widushan?", "Show Web & Mobile apps built", "Dance for me!"],
    };
  }

  if (query.includes("sleep") || query.includes("tired") || query.includes("nap") || query.includes("rest") || query.includes("bye")) {
    return {
      text: "😴 Entering low-power standby mode... Zzz (Index #3 & #7). Wake me anytime if you need help exploring the portfolio!",
      actionKey: "sleepy",
      suggestions: ["Wake up! 🤖", "Tell me about Widushan", "Contact info"],
    };
  }

  if (query.includes("wake") || query.includes("hello") || query.includes("hi") || query.includes("hey")) {
    return {
      text: `Hello there! 👋 I'm Widushan's interactive AI robot assistant! I can tell you all about his projects, skills, education, and services — or demonstrate robot movements with frame indexes! What would you like to explore?`,
      actionKey: "wave",
      suggestions: INITIAL_SUGGESTIONS,
    };
  }

  // Check specific index requests: e.g. "index 5", "pose 9", "frame 0", "normal"
  const indexMatch = query.match(/(?:index|pose|frame)\s*#?(-?\d+)/);
  if (indexMatch) {
    const idx = parseInt(indexMatch[1], 10);
    if (idx >= -1 && idx <= 11) {
      return {
        text: `Switched to Frame Index ${idx}! You can also explore all 12 motion frames and Normal view in the Pose Studio drawer above! 🎮`,
        targetIndex: idx,
        suggestions: ["Show Pose Studio", "Dance for me!", "Tell me about Widushan"],
      };
    }
  }

  if (query.includes("normal") || query.includes("default view")) {
    return {
      text: "Reset back to high-resolution Normal View! 🎧 Ready for your next command.",
      targetIndex: -1,
      suggestions: ["Show top AI & ML projects", "Skills & Tech stack", "Dance for me!"],
    };
  }

  if (query.includes("pose") || query.includes("movement") || query.includes("sprite") || query.includes("studio") || query.includes("animate")) {
    return {
      text: "Click the 🎮 **Pose Studio** button in the header bar above to test and scrub through all 12 sprite frames (#0 to #11) or trigger custom motion loops with frame sequences!",
      actionKey: "curious",
      suggestions: ["Dance for me!", "Walk for me", "Got an idea?", "Tell me about Widushan"],
    };
  }

  // 2. Who is Widushan / About
  if (
    query.includes("who is") ||
    query.includes("about") ||
    query.includes("widushan") ||
    query.includes("introduce") ||
    query.includes("background")
  ) {
    return {
      text: `**${site.name}** is an Information & Communication Engineering undergraduate at SLTC Research University in Sri Lanka (2022 - 2026).\n\nHe specializes in:\n• **Full-Stack Web & Mobile Apps** (Next.js, React, MERN, Flutter)\n• **AI, Machine Learning & Deep Learning** (PyTorch, TensorFlow, OpenCV)\n• **Custom AI Agents & Chatbots**\n• **Computer Vision & Automation Solutions**\n\nHe is passionate about creating high-impact real-world tech solutions!`,
      actionKey: "idea",
      suggestions: [
        "Show top AI & ML projects",
        "Web & Mobile apps built",
        "Skills & Tech stack",
        "Download CV",
      ],
      links: [
        { label: "View About Section", url: "#about" },
        { label: "Download CV (PDF)", url: site.cv, isExternal: true },
      ],
    };
  }

  // 3. Projects & Work
  if (query.includes("project") || query.includes("work") || query.includes("portfolio") || query.includes("built")) {
    if (query.includes("ai") || query.includes("ml") || query.includes("machine learning")) {
      const mlProjects = projects.filter((p) => p.category === "ml").slice(0, 4);
      return {
        text: `Here are some of Widushan's standout **AI & Machine Learning** projects:\n\n${mlProjects
          .map((p) => `• **${p.title}**: ${p.description}`)
          .join("\n\n")}`,
        actionKey: "idea",
        suggestions: ["Web & Mobile apps built", "Technical skills", "How to contact?"],
        links: [
          { label: "Explore All Projects", url: "#portfolio" },
          { label: "GitHub Profile", url: site.socials.github, isExternal: true },
        ],
      };
    }

    if (query.includes("web") || query.includes("mobile") || query.includes("app")) {
      const webProjects = projects.filter((p) => p.category === "web" || p.category === "mobile").slice(0, 4);
      return {
        text: `Here are key **Web & Mobile** applications built by Widushan:\n\n${webProjects
          .map((p) => `• **${p.title}**: ${p.description}`)
          .join("\n\n")}`,
        actionKey: "happy",
        suggestions: ["Show top AI & ML projects", "Services offered", "How to contact?"],
        links: [{ label: "View Portfolio Gallery", url: "#portfolio" }],
      };
    }

    return {
      text: `Widushan has built over **29+ projects** spanning AI/ML, Full-stack Web, Mobile (Flutter), and Desktop/Backend systems!\n\nNotable highlights include:\n• **AI Career Coach** (Next.js, LLMs & Agents)\n• **Medical AI Voice Agent** (Voice consultation + LLM)\n• **E-Commerce & LMS Platforms** (MERN Stack)\n• **Computer Vision Applications** (Parkinson Detection, Hand-tracking Drag & Drop, Parking counter)`,
      actionKey: "idea",
      suggestions: ["Show AI/ML projects", "Web & Mobile apps", "What are his skills?"],
      links: [
        { label: "Browse Full Portfolio", url: "#portfolio" },
        { label: "Visit GitHub", url: site.socials.github, isExternal: true },
      ],
    };
  }

  // 4. Skills & Technologies
  if (query.includes("skill") || query.includes("tech") || query.includes("stack") || query.includes("language") || query.includes("tool")) {
    const skillList = skills.map((s) => `• **${s.name}** (${s.level}%)`).join("\n");
    return {
      text: `Here are Widushan's core technical proficiencies:\n\n${skillList}\n\nHe works proficiently across frontend, backend, AI/ML pipelines, databases, and deployment environments!`,
      actionKey: "think",
      suggestions: ["Services offered", "Education & Certifications", "Download CV"],
      links: [{ label: "View Resume Section", url: "#resume" }],
    };
  }

  // 5. Services
  if (query.includes("service") || query.includes("hire") || query.includes("offer") || query.includes("help me with") || query.includes("can you build")) {
    const serviceList = services
      .slice(0, 4)
      .map((s) => `• **${s.title}**`)
      .join("\n");
    return {
      text: `Widushan offers professional development and engineering services:\n\n${serviceList}\n• Programming & Custom Software Development\n\nNeed a custom web app, mobile app, or AI solution? He's open for projects and freelance collaborations!`,
      actionKey: "happy",
      suggestions: ["How to contact?", "View portfolio projects", "Download CV"],
      links: [
        { label: "Explore Services", url: "#services" },
        { label: "Get in Touch", url: "#contact" },
      ],
    };
  }

  // 6. Education & Certifications
  if (query.includes("education") || query.includes("degree") || query.includes("university") || query.includes("study") || query.includes("certificate") || query.includes("cert")) {
    const eduList = education.map((e) => `• **${e.title}** @ ${e.place} (${e.date})`).join("\n");
    return {
      text: `**Education & Academic Background:**\n\n${eduList}\n\n**Key Certifications:**\n• Professional Certificate in Machine Learning (IIT)\n• AI/ML Engineer Stage 1 & 2 (SLIIT)\n• Fine-tuning LLMs (DeepLearning.AI)\n• Python & Web Development (University of Moratuwa)`,
      actionKey: "think",
      suggestions: ["Show technical skills", "Show projects", "Download CV"],
      links: [{ label: "View Credentials", url: "#resume" }],
    };
  }

  // 7. Contact / Hire / Phone / Email
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("whatsapp") ||
    query.includes("linkedin") ||
    query.includes("reach") ||
    query.includes("hire")
  ) {
    return {
      text: `You can connect with Widushan directly through:\n\n• 📧 **Email**: [${site.email}](mailto:${site.email})\n• 📱 **Phone**: [${site.phone}](tel:${site.phoneHref})\n• 💬 **WhatsApp**: Instant chat available\n• 🌐 **Location**: ${site.location}`,
      actionKey: "happy",
      suggestions: ["Message on WhatsApp", "View LinkedIn", "Send a message via Form"],
      links: [
        { label: "Open WhatsApp", url: site.socials.whatsapp, isExternal: true },
        { label: "LinkedIn Profile", url: site.socials.linkedin, isExternal: true },
        { label: "Contact Section", url: "#contact" },
      ],
    };
  }

  // 8. CV / Resume
  if (query.includes("cv") || query.includes("resume") || query.includes("download")) {
    return {
      text: `You can download Widushan's latest Curriculum Vitae (CV) directly as a PDF below, or browse his verified experience and qualifications on this site!`,
      actionKey: "idea",
      suggestions: ["Technical skills", "Education background", "Contact info"],
      links: [
        { label: "📄 Download CV (PDF)", url: site.cv, isExternal: true },
        { label: "View Resume Section", url: "#resume" },
      ],
    };
  }

  // Default fallback response
  return {
    text: `I'm here to help you learn about Widushan's portfolio! You can ask about his **AI/ML projects**, **Web & Mobile apps**, **technical skills**, **education**, or **contact information**.\n\nYou can also tell me to **dance**, **walk**, **think**, or click **Pose Studio** to inspect all 12 robot frame indexes! 🤖`,
    actionKey: "curious",
    suggestions: [
      "Who is Widushan?",
      "Show top AI & ML projects",
      "Skills & Tech stack",
      "Dance for me! 🤖💃",
      "How to contact?",
    ],
  };
}

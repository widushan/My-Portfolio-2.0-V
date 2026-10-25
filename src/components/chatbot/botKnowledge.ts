import { site, services, projects, skills, education, certificates, testimonials } from "@/data/site";
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
  "How can I contact Widushan?",
  "Dance for me! 🤖💃",
];

function hasWord(query: string, word: string): boolean {
  return new RegExp(`\\b${word}\\b`, "i").test(query);
}

function hasAnyWord(query: string, words: string[]): boolean {
  return words.some((w) => new RegExp(`\\b${w}\\b`, "i").test(query));
}

function hasPhrase(query: string, phrase: string): boolean {
  return query.includes(phrase);
}

function hasAnyPhrase(query: string, phrases: string[]): boolean {
  return phrases.some((p) => query.includes(p));
}

export function getBotReply(userMessage: string): BotResponse {
  const query = userMessage.toLowerCase().trim();

  // -------------------------------------------------------------
  // 1. Robot Control / Animation Commands & Poses
  // -------------------------------------------------------------
  if (hasAnyWord(query, ["dance", "dancing", "party", "groove"])) {
    return {
      text: "Woohoo! Let's groove! 🎶💃 Watch me bust some robot moves across the frames!",
      actionKey: "dance",
      suggestions: ["Walk for me", "Got an idea?", "Show all poses", "Who is Widushan?"],
    };
  }

  if (hasAnyWord(query, ["walk", "walking", "step", "steps"])) {
    return {
      text: "Stepping in style! 🚶 Wobbling left and right using frame indices [0, 2, 0, 2]!",
      actionKey: "walk",
      suggestions: ["Dance for me!", "Give me an idea", "What skills does Widushan have?"],
    };
  }

  if (hasAnyWord(query, ["idea", "eureka", "lightbulb", "bulb"])) {
    return {
      text: "💡 Ding! Lightbulb eyes activated! Check out frame index 9 — that's when brilliant solutions are born!",
      actionKey: "idea",
      suggestions: ["Show top AI & ML projects", "What can Widushan build?", "Dance for me!"],
    };
  }

  if (hasAnyWord(query, ["think", "thinking", "ponder", "pondering", "calculating", "calculate", "processing"])) {
    return {
      text: "🤔 Hmm... running neural calculations and indexing database records...",
      actionKey: "think",
      suggestions: ["Show tech stack", "Tell me about education", "How can I contact Widushan?"],
    };
  }

  if (hasAnyWord(query, ["happy", "smile", "smiling", "joy", "excited"])) {
    return {
      text: "Yay! Seeing you here makes my circuits sparkle! ✨ Look at my happy squint (Index #5) and starry eyes (Index #1)!",
      actionKey: "happy",
      suggestions: ["Who is Widushan?", "Show Web & Mobile apps built", "Dance for me!"],
    };
  }

  if (
    hasAnyWord(query, ["sleep", "sleepy", "tired", "nap"]) ||
    hasPhrase(query, "good night") ||
    hasPhrase(query, "go to sleep") ||
    query === "bye" ||
    query === "goodbye"
  ) {
    return {
      text: "😴 Entering low-power standby mode... Zzz (Index #3 & #7). Wake me anytime if you need help exploring the portfolio!",
      actionKey: "sleepy",
      suggestions: ["Wake up! 🤖", "Tell me about Widushan", "How can I contact Widushan?"],
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

  if (hasPhrase(query, "normal") || hasPhrase(query, "default view") || hasPhrase(query, "reset view")) {
    return {
      text: "Reset back to high-resolution Normal View! 🎧 Ready for your next command.",
      targetIndex: -1,
      suggestions: ["Show top AI & ML projects", "Skills & Tech stack", "Dance for me!"],
    };
  }

  if (
    hasAnyWord(query, ["pose", "poses", "movement", "movements", "sprite", "sprites", "studio"]) ||
    hasPhrase(query, "robot movement")
  ) {
    return {
      text: "Click the 🎮 **Studio** button in the header bar above to test and scrub through all 12 sprite frames (#0 to #11) or trigger custom motion loops with frame sequences!",
      actionKey: "curious",
      suggestions: ["Dance for me!", "Walk for me", "Got an idea?", "Tell me about Widushan"],
    };
  }

  // -------------------------------------------------------------
  // 2. Contact / Hire / Phone / Email / Location / WhatsApp / Socials
  // (Evaluated early to ensure "How can I contact Widushan?" routes here!)
  // -------------------------------------------------------------
  const isContactQuery =
    hasAnyPhrase(query, [
      "how can i contact",
      "how to contact",
      "how do i contact",
      "how can i reach",
      "how to reach",
      "how do i reach",
      "how to hire",
      "how can i hire",
      "contact widushan",
      "contact him",
      "contact details",
      "contact info",
      "contact information",
      "get in touch",
      "in touch",
      "reach out",
      "talk to",
      "speak with",
      "phone number",
      "telephone number",
      "mobile number",
      "email address",
      "social media",
      "where do you live",
      "where does he live",
      "where are you located",
      "where is he located",
    ]) ||
    hasAnyWord(query, [
      "contact",
      "email",
      "mail",
      "phone",
      "telephone",
      "mobile",
      "whatsapp",
      "call",
      "hire",
      "hiring",
      "reach",
      "touch",
      "linkedin",
      "socials",
      "address",
      "location",
    ]) ||
    (hasAnyWord(query, ["where", "country", "city"]) &&
      (query.includes("widushan") || query.includes("you") || query.includes("he") || query.includes("live") || query.includes("stay")));

  if (isContactQuery) {
    return {
      text: `You can connect with **${site.name}** directly through:\n\n• 📧 **Email**: [${site.email}](mailto:${site.email})\n• 📱 **Phone**: [${site.phone}](tel:${site.phoneHref})\n• 💬 **WhatsApp**: [Chat on WhatsApp](${site.socials.whatsapp})\n• 🌐 **Location**: ${site.location} (Open for remote & worldwide opportunities)\n• 💼 **LinkedIn**: [Connect on LinkedIn](${site.socials.linkedin})\n• 🐙 **GitHub**: [github.com/widushan](${site.socials.github})\n\nYou can also send a direct message using the **Contact Form** on this website!`,
      actionKey: "happy",
      suggestions: [
        "Open WhatsApp Chat",
        "Send message via Form",
        "Show top AI & ML projects",
        "Download CV",
      ],
      links: [
        { label: "💬 WhatsApp Chat", url: site.socials.whatsapp, isExternal: true },
        { label: "📧 Email Widushan", url: `mailto:${site.email}`, isExternal: true },
        { label: "📱 Call Phone", url: `tel:${site.phoneHref}`, isExternal: true },
        { label: "💼 LinkedIn Profile", url: site.socials.linkedin, isExternal: true },
        { label: "📝 Fill Contact Form", url: "#contact" },
      ],
    };
  }

  // -------------------------------------------------------------
  // 3. CV / Resume / Download
  // -------------------------------------------------------------
  if (
    hasAnyWord(query, ["cv", "resume"]) ||
    hasAnyPhrase(query, ["curriculum vitae", "download cv", "download resume", "view cv", "get cv"])
  ) {
    return {
      text: `You can download **${site.name}'s** latest Curriculum Vitae (CV) directly as a PDF below, or explore his verified experience and qualifications on this site!`,
      actionKey: "idea",
      suggestions: ["Skills & Tech stack", "Show top AI & ML projects", "How can I contact Widushan?"],
      links: [
        { label: "📄 Download CV (PDF)", url: site.cv, isExternal: true },
        { label: "View Resume Section", url: "#resume" },
      ],
    };
  }

  // -------------------------------------------------------------
  // 4. Projects & Work & Portfolio
  // -------------------------------------------------------------
  if (
    hasAnyWord(query, ["project", "projects", "portfolio", "built", "repo", "repos", "repositories", "creations"]) ||
    hasAnyPhrase(query, ["what have you built", "what has he built", "show your work", "show projects", "show work", "show me your work"])
  ) {
    // Specific AI / ML projects
    if (
      hasAnyWord(query, ["ai", "ml", "nlp", "vision", "model", "models"]) ||
      hasAnyPhrase(query, ["machine learning", "deep learning", "computer vision", "artificial intelligence"])
    ) {
      const mlProjects = projects.filter((p) => p.category === "ml").slice(0, 4);
      return {
        text: `Here are some of Widushan's standout **AI & Machine Learning** projects:\n\n${mlProjects
          .map((p) => `• **${p.title}**: ${p.description}`)
          .join("\n\n")}`,
        actionKey: "idea",
        suggestions: ["Web & Mobile apps built", "Skills & Tech stack", "How can I contact Widushan?"],
        links: [
          { label: "Explore All Projects", url: "#portfolio" },
          { label: "GitHub Profile", url: site.socials.github, isExternal: true },
        ],
      };
    }

    // Web & Mobile apps
    if (
      hasAnyWord(query, ["web", "mobile", "flutter", "react", "next", "mern", "app", "apps", "frontend", "backend", "fullstack"])
    ) {
      const webProjects = projects.filter((p) => p.category === "web" || p.category === "mobile").slice(0, 4);
      return {
        text: `Here are key **Web & Mobile** applications built by Widushan:\n\n${webProjects
          .map((p) => `• **${p.title}**: ${p.description}`)
          .join("\n\n")}`,
        actionKey: "happy",
        suggestions: ["Show top AI & ML projects", "Services offered", "How can I contact Widushan?"],
        links: [
          { label: "View Portfolio Gallery", url: "#portfolio" },
          { label: "GitHub Profile", url: site.socials.github, isExternal: true },
        ],
      };
    }

    return {
      text: `Widushan has built over **29+ projects** spanning AI/ML, Full-stack Web, Mobile (Flutter), and Desktop/Backend systems!\n\nNotable highlights include:\n• **AI Career Coach** (Next.js, LLMs & Agents)\n• **Medical AI Voice Agent** (Voice consultation + LLM)\n• **E-Commerce & LMS Platforms** (MERN Stack)\n• **Computer Vision Applications** (Parkinson Detection, Hand-tracking Drag & Drop, Parking counter)`,
      actionKey: "idea",
      suggestions: ["Show AI/ML projects", "Web & Mobile apps", "Skills & Tech stack"],
      links: [
        { label: "Browse Full Portfolio", url: "#portfolio" },
        { label: "Visit GitHub", url: site.socials.github, isExternal: true },
      ],
    };
  }

  // -------------------------------------------------------------
  // 5. Skills & Tech Stack
  // -------------------------------------------------------------
  if (
    hasAnyWord(query, ["skill", "skills", "stack", "technology", "technologies", "framework", "frameworks", "tools", "database", "databases", "proficiency", "proficiencies"]) ||
    hasAnyPhrase(query, ["tech stack", "languages", "programming languages", "what can you code", "what does he know"])
  ) {
    const skillList = skills.map((s) => `• **${s.name}** (${s.level}%)`).join("\n");
    return {
      text: `Here are Widushan's core technical proficiencies:\n\n${skillList}\n\nHe works proficiently across frontend, backend, AI/ML pipelines, databases, and deployment environments!`,
      actionKey: "think",
      suggestions: ["Services offered", "Education & Certifications", "Download CV", "How can I contact Widushan?"],
      links: [{ label: "View Resume Section", url: "#resume" }],
    };
  }

  // -------------------------------------------------------------
  // 6. Services & What can Widushan offer / build
  // -------------------------------------------------------------
  if (
    hasAnyWord(query, ["service", "services", "offer", "offering", "offerings", "pricing", "rate", "rates", "freelance"]) ||
    hasAnyPhrase(query, [
      "what can you do",
      "what can he do",
      "what do you offer",
      "what does he offer",
      "can you build",
      "can he build",
      "help me with",
      "can you make",
    ])
  ) {
    const serviceList = services
      .slice(0, 4)
      .map((s) => `• **${s.title}**`)
      .join("\n");
    return {
      text: `Widushan offers professional development and engineering services:\n\n${serviceList}\n• Programming & Custom Software Development\n\nNeed a custom web app, mobile app, or AI solution? He's open for projects and freelance collaborations!`,
      actionKey: "happy",
      suggestions: ["How can I contact Widushan?", "View portfolio projects", "Download CV"],
      links: [
        { label: "Explore Services", url: "#services" },
        { label: "Get in Touch", url: "#contact" },
      ],
    };
  }

  // -------------------------------------------------------------
  // 7. Education & Certifications
  // -------------------------------------------------------------
  if (
    hasAnyWord(query, [
      "education",
      "degree",
      "degrees",
      "university",
      "sltc",
      "college",
      "undergraduate",
      "study",
      "studied",
      "studies",
      "academic",
      "academics",
      "certificate",
      "certificates",
      "certification",
      "certifications",
      "cert",
      "certs",
      "credentials",
      "gpa",
    ]) ||
    hasAnyPhrase(query, ["where did you study", "where did he study", "educational background", "qualification", "qualifications"])
  ) {
    const eduList = education.map((e) => `• **${e.title}** @ ${e.place} (${e.date})`).join("\n");
    return {
      text: `**Education & Academic Background:**\n\n${eduList}\n\n**Key Certifications:**\n• Professional Certificate in Machine Learning (IIT)\n• AI/ML Engineer Stage 1 & 2 (SLIIT)\n• Fine-tuning LLMs (DeepLearning.AI)\n• Python & Web Development (University of Moratuwa)`,
      actionKey: "think",
      suggestions: ["Show technical skills", "Show top AI & ML projects", "Download CV"],
      links: [{ label: "View Credentials", url: "#resume" }],
    };
  }

  // -------------------------------------------------------------
  // 8. Testimonials & Client Reviews
  // -------------------------------------------------------------
  if (
    hasAnyWord(query, ["review", "reviews", "testimonial", "testimonials", "feedback", "rating", "ratings", "client", "clients"]) ||
    hasAnyPhrase(query, ["client feedback", "what do clients say"])
  ) {
    return {
      text: `Widushan holds a **5.0/5.0 Rating** across international clients for web development, software engineering, and AI solutions!\n\nClients appreciate his fast communication, modern aesthetics, robust code quality, and delivery speed.`,
      actionKey: "happy",
      suggestions: ["How can I contact Widushan?", "Explore Services", "Show top AI & ML projects"],
      links: [
        { label: "Read Client Reviews", url: "#testimonials" },
        { label: "Work With Him", url: "#contact" },
      ],
    };
  }

  // -------------------------------------------------------------
  // 9. Who is Widushan / About / Background
  // (Strict matching so questions like "How can I contact Widushan?" never match here!)
  // -------------------------------------------------------------
  if (
    hasAnyPhrase(query, [
      "who is",
      "who are you",
      "about widushan",
      "about him",
      "about yourself",
      "tell me about yourself",
      "tell me about widushan",
      "tell me about him",
      "introduce yourself",
      "introduce widushan",
      "introduce him",
      "who is he",
      "what is your background",
      "what is his background",
    ]) ||
    hasAnyWord(query, ["bio", "biography", "background", "introduce", "intro", "about"]) ||
    query === "widushan" ||
    query === "widushan?" ||
    query === "capk widushan" ||
    query === "c.a.p.k widushan"
  ) {
    return {
      text: `**${site.name}** is an Information & Communication Engineering undergraduate at SLTC Research University in Sri Lanka (2022 - 2026).\n\nHe specializes in:\n• **Full-Stack Web & Mobile Apps** (Next.js, React, MERN, Flutter)\n• **AI, Machine Learning & Deep Learning** (PyTorch, TensorFlow, OpenCV)\n• **Custom AI Agents & Chatbots**\n• **Computer Vision & Automation Solutions**\n\nHe is passionate about creating high-impact real-world tech solutions!`,
      actionKey: "idea",
      suggestions: [
        "Show top AI & ML projects",
        "Web & Mobile apps built",
        "Skills & Tech stack",
        "How can I contact Widushan?",
      ],
      links: [
        { label: "View About Section", url: "#about" },
        { label: "Download CV (PDF)", url: site.cv, isExternal: true },
      ],
    };
  }

  // -------------------------------------------------------------
  // 10. Greetings (Hello, Hi, Hey, Greetings)
  // -------------------------------------------------------------
  if (
    hasAnyWord(query, ["hello", "hi", "hey", "hola", "halo", "greetings", "sup"]) ||
    hasAnyPhrase(query, ["good morning", "good afternoon", "good evening", "wake up"])
  ) {
    return {
      text: `Hello there! 👋 I'm Widushan's interactive AI assistant! I can tell you all about his projects, skills, education, and services, provide direct contact details, or demonstrate robot movements with frame indexes! What would you like to explore?`,
      actionKey: "wave",
      suggestions: INITIAL_SUGGESTIONS,
    };
  }

  // -------------------------------------------------------------
  // 11. Default Fallback
  // -------------------------------------------------------------
  return {
    text: `I'm here to help you learn about Widushan's portfolio! You can ask about his **AI/ML projects**, **Web & Mobile apps**, **technical skills**, **education**, or **contact information**.\n\nYou can also tell me to **dance**, **walk**, **think**, or click **Studio** to inspect all 12 robot frame indexes! 🤖`,
    actionKey: "curious",
    suggestions: [
      "Who is Widushan?",
      "Show top AI & ML projects",
      "Skills & Tech stack",
      "How can I contact Widushan?",
      "Dance for me! 🤖💃",
    ],
  };
}

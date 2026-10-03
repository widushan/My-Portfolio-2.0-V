// All editable content lives here. Update this file, not the components.

export const site = {
  name: "C.A.P.K Widushan",
  shortName: "Widushan",
  email: "widushanp@gmail.com",
  phone: "076 52 62 304",
  phoneHref: "+94765262304",
  location: "Sri Lanka",
  roles: ["Software Developer", "Web & Mobile Developer", "Content Creator", "AI/ML Developer"],
  intro:
    "I'm C.A.P.K Widushan, an Information & Communication Engineering undergraduate in Sri Lanka. I build full-stack web apps, mobile apps and AI/ML products.",
  cv: "/cv.pdf",
  images: {
    hero: "/images/profile.png",
    about: "/images/about_new.jpg",
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/pasindu-widushan-b9b329397/",
    facebook: "https://www.facebook.com/profile.php?id=100091057737564",
    whatsapp: "https://wa.me/+94765262304",
    github: "https://github.com/widushan",
  },
};

/* ---------------------------------- Services --------------------------------- */

export type ServiceIcon = "layers" | "brain" | "bot" | "scan" | "sparkles" | "code";

export const services: { icon: ServiceIcon; title: string; points: string[] }[] = [
  {
    icon: "layers",
    title: "Full-Stack Web & Mobile App Development",
    points: [
      "MERN Stack e-commerce & dashboard apps.",
      "Cross-platform mobile apps with Flutter.",
      "Full-stack AI-powered web applications.",
      "Responsive, modern UI/UX designs.",
      "Deployment.",
    ],
  },
  {
    icon: "brain",
    title: "AI/ML/DL Model Development & Deployment",
    points: [
      "Disease prediction systems.",
      "Computer Vision solutions.",
      "Time-series forecasting.",
      "Custom model training.",
      "Full model deployment as web apps.",
    ],
  },
  {
    icon: "bot",
    title: "Custom AI Chatbots & AI Agents",
    points: [
      "Medical chatbots with voice + vision.",
      "RAG chatbots.",
      "Personal AI assistants.",
      "Multi-modal agents.",
      "Integration with social media.",
    ],
  },
  {
    icon: "scan",
    title: "Computer Vision & Real-Time Video Processing Apps",
    points: [
      "Face recognition attendance systems.",
      "Hand-gesture virtual mouse / drag-and-drop.",
      "Parking space detection & counting systems.",
      "Real-time object detection & tracking dashboards.",
      "Webcam-based interactive applications.",
    ],
  },
  {
    icon: "sparkles",
    title: "Generative AI & Automation Solutions",
    points: [
      "AI content generators, report writers, news summarizers.",
      "Automated workflow creation using n8n + LLMs.",
      "AI-powered finance trackers.",
      "Image generation + editing tools.",
      "Custom AI agents.",
    ],
  },
  {
    icon: "code",
    title: "Programming & Software Development",
    points: [
      "Python desktop & backend apps.",
      "Java enterprise apps.",
      "Automation scripts & custom tools.",
      "Database-powered solutions.",
      "Clean & deployment-ready code with Git.",
    ],
  },
];

/* ----------------------------------- Resume ---------------------------------- */

export const education = [
  {
    date: "2022 - 2026",
    title: "Bachelor in Information & Communication Engineering",
    place: "SLTC Research University",
    text: "Degree focused on software, databases and networking, with hands-on project work across web, mobile and AI/ML.",
  },
  {
    date: "2024",
    title: "Human Resource Management Certificate Course",
    place: "International Business Studies Campus (IBS Campus)",
    text: "Leadership and management skills for HR and business professionals, with a focus on decision-making, problem-solving and critical thinking.",
  },
  {
    date: "2025",
    title: "Professional Certificate in Machine Learning",
    place: "Informatics Institute of Technology (IIT)",
    text: "Python-based ML covering regression, classification, clustering and neural networks. Applied KNN, SVM, decision trees and K-means with Keras and scikit-learn, plus cloud-based ML tools.",
  },
];

export const experience = [
  {
    date: "2020 - 2021",
    title: "Trainee Assistant Accountant",
    place: "Waguruwela Oil Mills (Pvt) Ltd",
    text: "Calculated total income, total cost and profit for the whole factory. Did data entry and maintained a costing database for the company.",
  },
];

export const skills = [
  { name: "Python", level: 95 },
  { name: "Java", level: 90 },
  { name: "C, C++", level: 75 },
  { name: "MERN Stack & HTML, CSS, JS, PHP", level: 97 },
  { name: "Database Management (MongoDB, MySQL, Vector DBs)", level: 80 },
  { name: "AI & ML/DL", level: 85 },
  { name: "Flutter", level: 75 },
  { name: "Logo Designing", level: 93 },
];

const cert = (file: string, title: string) => ({ src: `/images/webCertificates/${file}`, title });

export const certificates = [
  cert("IIT ML.jpg", "Professional Certificate in Machine Learning"),
  cert("AI ML SLIIT 1.jpg", "AI/ML Engineer - Stage 1 at SLIIT UNI"),
  cert("AI ML SLIIT 2.jpg", "AI/ML Engineer - Stage 2 at SLIIT UNI"),
  cert("ML Python.jpg", "Machine Learning with Simplilearn | SkillUp"),
  cert("AI ML Projects.jpg", "AI/ML Projects with Simplilearn | SkillUp"),
  cert("Python_for_Beginners_E-Certificate_page-0001.jpg", "Python for Beginners at University of Moratuwa"),
  cert("Python_Programming_E-Certificate_page-0001.jpg", "Python Advanced at University of Moratuwa"),
  cert("Java Great Learning.jpg", "Java Programming at Great Learning"),
  cert("Web_Design_for_Beginners_E-Certificate_page.jpg", "Web Design for Beginners at University of Moratuwa"),
  cert("Front-End_Web_Development_E-Certificate_page.jpg", "Front End Web Development at University of Moratuwa"),
  cert("llms.jpg", "Fine-tuning Large Language Models | DeepLearning.AI"),
  cert("hr.jpg", "Human Resource Management Certificate Course at IBS Campus"),
  cert("Foundations_of_Project_Management_E-Certificate.jpg", "Foundations of Project Management at University of Moratuwa"),
  cert("CODEMANIA SLTC_page-0001.jpg", "Codemania at SLTC Research University"),
];

/* --------------------------------- Portfolio --------------------------------- */

export type Category = "web" | "mobile" | "programming" | "ml";

export const categoryLabels: Record<Category, string> = {
  web: "Web",
  mobile: "Mobile",
  programming: "Programming",
  ml: "AI/ML/DL",
};

export type Project = {
  title: string;
  description: string;
  image: string;
  category: Category;
  github?: string;
  live?: string;
};

const gh = (repo: string) => `https://github.com/widushan/${repo}`;
const img = (file: string) => `/images/services/${file}`;

export const projects: Project[] = [
  { title: "AI Career Coach", category: "ml", image: img("career.png"), description: "AI-powered full-stack career guidance platform built with Next.js, LLMs and AI agents.", github: gh("Educational-AI-Agent"), live: "https://educational-ai-agent-xi.vercel.app/" },
  { title: "Medical AI Voice Agent", category: "ml", image: img("voice_doctor.png"), description: "AI-powered voice consultation platform using LLM + voice AI.", github: gh("Medical-AI-Voice-Agent"), live: "https://medical-ai-voice-agent-two.vercel.app/" },
  { title: "AI Travel Planner", category: "ml", image: img("trip.png"), description: "AI-powered full-stack travel planning application built with React and generative AI.", github: gh("AI-Trip-Planner"), live: "https://ai-travel-planner-nine-nu.vercel.app/" },
  { title: "E-Commerce Website", category: "web", image: img("ecom.png"), description: "MERN stack e-commerce project built with React JS.", github: gh("E-commerce-Website"), live: "https://trendzide-frontend.vercel.app/" },
  { title: "Hotel Booking Website", category: "web", image: img("hotel -book.png"), description: "Hotel booking system built with the MERN stack and React.", github: gh("Hotel-Booking-Website"), live: "https://hotel-booking-website-woad.vercel.app/" },
  { title: "LMS Website", category: "web", image: img("lms.png"), description: "Full-stack learning management system (MERN).", github: gh("-LMS-Website"), live: "https://lms-frontend-two-eosin.vercel.app/" },
  { title: "Finance Manager - Django", category: "programming", image: img("finance.png"), description: "A powerful personal finance management web application built with Django.", github: gh("FinanceManager---Django"), live: "https://drive.google.com/file/d/12MDRB-4U71ULJFJssSnTQXenljuWVCVK/view?usp=drive_link" },
  { title: "AI Medical Chatbot", category: "ml", image: img("medical-bot.png"), description: "End-to-end AI healthcare chatbot with vision and voice.", github: gh("Medical-Bot") },
  { title: "Employee Management", category: "programming", image: img("employee.png"), description: "Employee management system in Python with CustomTkinter and MySQL.", github: gh("Employee-Management-System-in-Python") },
  { title: "MediCare System", category: "ml", image: img("medicare.png"), description: "Machine-learning healthcare assistant for medicine recommendations, symptom analysis and health resources.", github: gh("AI-ML-Project---MediCare") },
  { title: "Book Store", category: "mobile", image: img("book.png"), description: "A simple Flutter mobile application for a book store.", github: gh("Mid-Term-Project") },
  { title: "AI Assistant", category: "ml", image: img("ai.png"), description: "Multi-modal assistant with real-time search, automation and conversational abilities, built in Python.", github: gh("AI-Assistant") },
  { title: "Blood Sugar Monitor", category: "programming", image: img("blood.png"), description: "Application that helps users track and manage their blood sugar levels.", github: gh("Blood-Sugar-Monitor---22UG1-0729") },
  { title: "GPA Calculator", category: "mobile", image: img("gpa.png"), description: "Cross-platform GPA calculator built with Flutter for Android, iOS, web and desktop.", github: gh("gpa_calculator") },
  { title: "Hospital Management", category: "programming", image: img("hospital.png"), description: "C# system for hospital operations: patient records, appointments, staff and billing.", github: gh("Hospital-Management-System") },
  { title: "Laptop Price Predictor", category: "ml", image: img("laptop.png"), description: "Web app that predicts laptop prices from selected features using a machine-learning model.", github: gh("Laptop-Price-Predictor") },
  { title: "Parkinson Disease Detection", category: "ml", image: img("drawing.png"), description: "Parkinson's detection from spiral and wave drawings using CNN and DenseNet in Python.", github: gh("Parkinson-Disease-Detection-from-Spiral-and-Wave-Drawings") },
  { title: "Grocery Store Management", category: "programming", image: img("grocery_python.png"), description: "Python Flask and MySQL app to manage products, track orders and run a grocery store.", github: gh("Grocery-Store---Python-project") },
  { title: "Virtual Drag and Drop", category: "ml", image: img("drag.png"), description: "OpenCV and MediaPipe hand tracking that lets you drag virtual rectangles with your index finger.", github: gh("Virtual-Drag-and-Drop") },
  { title: "Banking App - Spring Boot", category: "programming", image: img("bank_java.png"), description: "3-tier full-stack Java banking application built with Spring Boot.", github: gh("Banking-App--Java-Application") },
  { title: "RAG Chat Bot", category: "ml", image: img("rag.png"), description: "RAG chatbot built with Next.js, LangChain.js and OpenAI.", github: gh("RAG-Chat-Bot") },
  { title: "News Research Tool", category: "ml", image: img("news.png"), description: "End-to-end GenAI news research tool using LangChain and OpenAI for fast information retrieval.", github: gh("News-Research-Tool") },
  { title: "AI Resume Matcher", category: "ml", image: img("resume.png"), description: "Matches resumes with job descriptions using NLP and ML. Built with Python, Flask and scikit-learn.", github: gh("AI-Resume-Matcher-App") },
  { title: "Parking Space Counter", category: "ml", image: img("parking.png"), description: "OpenCV image processing with cvzone overlays that shows live parking availability.", github: gh("Parking-Space-Counter") },
  { title: "Job Recruitment With ML", category: "ml", image: img("job.png"), description: "Job placement and HR performance prediction with machine learning in Python.", github: gh("Job-Recruitement-With-Machine-Learing") },
  { title: "Education Recommendation System", category: "ml", image: img("edu.png"), description: "Machine-learning system that recommends studies and career paths.", github: gh("-Education-Recommendation-System") },
  { title: "Stock Trend Prediction", category: "ml", image: img("stock.png"), description: "Stock trend prediction with Python, Flask and LSTM.", github: gh("Stock-Trend-Prediction") },
  { title: "Escape Maker", category: "ml", image: img("escape.png"), description: "Helps people navigate challenging situations with personalized, actionable advice. Built with Lovable and n8n.", github: gh("Escape-Maker") },
  { title: "Heart Disease Prediction", category: "ml", image: img("heart.png"), description: "Heart disease prediction system built with Python and machine learning.", github: gh("Heart-Disease-Prediction") },
];

/* ------------------------------- Testimonials -------------------------------- */
// Add real client feedback here. The section hides itself while this list is empty.
export const testimonials = [
  {
    name: "Anna Smith",
    role: "Client",
    text: "I recently used the services offered on this website,and I'm thrilled with the results. Their team is professional,responsive, and they exceeded my expectations.",
    rating: 5,
    image: "/images/testimonials/p1.PNG",
  },
  {
    name: "John Decay",
    role: "Client",
    text: "I've been a loyal visitor of this website for years. It consistently provides high-quality content and helpful insights. I trust their information.",
    rating: 5,
    image: "/images/testimonials/p2.PNG",
  },
  {
    name: "Selena Dikinson",
    role: "Client",
    text: "This website has connected me with like-minded individuals who share my passions. The forums and community here are welcoming and supportive.",
    rating: 5,
    image: "/images/testimonials/p3.PNG",
  },
  {
    name: "Jenifer Lady",
    role: "Client",
    text: "Our business engaged with this website's services and it had a significant impact on our growth. We couldn't have achieved our goals without their expertise.",
    rating: 5,
    image: "/images/testimonials/p4.PNG",
  },
  {
    name: "Samuel Wilson",
    role: "Client",
    text: "I stumbled upon this website and couldn't be happier. The information and resources here have been a game-changer for me. Thank you!",
    rating: 5,
    image: "/images/testimonials/p5.PNG",
  },
  {
    name: "Olivia Davis",
    role: "Client",
    text: "I recently used the services offered on this website,and I'm thrilled with the results. Their team is professional,responsive, and they exceeded my expectations.",
    rating: 5,
    image: "/images/testimonials/p6.PNG",
  },
  {
    name: "Amelia Harper",
    role: "Client",
    text: "I've been a loyal visitor of this website for years. It consistently provides high-quality content and helpful insights. I trust their information.",
    rating: 5,
    image: "/images/testimonials/p7.PNG",
  },

];
/* ----------------------------------- Nav ------------------------------------ */

export const nav = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  ...(testimonials.length ? [{ id: "testimonials", label: "Reviews" }] : []),
  { id: "contact", label: "Contact" },
];




import { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import profilePic from "./assets/portfolio_profile_pic.png";
import first_Assignment from "./assets/1st-assignment-img.png";
import second_Assignment from "./assets/second-assgnment.png";
import fourth_Assignment from "./assets/fourth-assignment.png";
import midterm_project from "./assets/careconnect.png";
import wineShop from "./assets/wineshop.png";
import fitin from "./assets/fitin.png";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage: string | null;
  fork: boolean;
}

const username = "divyamoma-ctrl";

const liveProjects = [
  {
    keyword: "first-react-assignment-using-usestate",
    title: "React useState Assignment",
    description:
      "A React practice project focused on managing component state and updating the user interface through user interactions.",
    demo: "https://first-react-assignment-using-usestate-ck6fbciu2-divyamoma-ctrl.vercel.app/",
    image: first_Assignment,
    technologies: ["React", "useState", "CSS"],
  },
  {
    keyword: "second-react-assignment-using-useeffect-routing",
    title: "React useEffect & Routing",
    description:
      "A React project demonstrating side effects, API-related workflows and navigation between pages using React Router.",
    demo: "https://second-react-assignment-using-useeffect-routing-ceasbzh2q.vercel.app/",
    image: second_Assignment,
    technologies: ["React", "useEffect", "React Router"],
  },
  {
    keyword: "fourth-react-assignment-using-usere",
    title: "React useReducer & useContext",
    description:
      "A React project demonstrating centralized state management using useReducer and useContext to share and manage data across multiple components.",
    demo: "https://fourth-react-assignment-using-usere.vercel.app/",
    image: fourth_Assignment,
    technologies: [
      "React",
      "TypeScript",
      "useReducer",
      "useContext",
      "Tailwind CSS",
      "Material UI",
    ],
  },
  {
    keyword: "careconnect",
    title: "CareConnect",
    description:
      "A Women & Child Support NGO Platform connecting people with support services, campaigns, volunteering opportunities and emergency assistance.",
    demo: "https://careconnect-mid-project.vercel.app/",
    image: midterm_project,
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Material UI",
      "Appwrite",
      "Redux Toolkit",
    ],
  },

  {
    keyword: "wineshop-html-final-project",
    title: "Wine Shop Website",
    description:
      "A responsive wine shop website showcasing wine collections, product categories, featured drinks, wine regions and editorial content with an elegant layout.",
    demo: "https://wineshop-html-final-project.vercel.app/",
    image: wineShop,
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Responsive Design",
    ],
  },

  {
    keyword: "fitin2",
    title: "Fitin2 - Fitness Website",
    description:
      "A fitness and gym website featuring personal training, group workouts, fitness coaches, membership plans and services to help users achieve their fitness goals.",
    demo: "https://fitin2.vercel.app/",
    image: fitin,
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Responsive Design",
    ],
  },
];

const skills = [
  {
    title: "Frontend Development",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js"],
  },
  {
    title: "UI & State Management",
    items: ["Tailwind CSS", "Material UI", "Redux Toolkit", "TanStack Query"],
  },
  {
    title: "Backend Basics",
    items: ["Node.js", "Express.js", "REST API", "Authentication"],
  },
  {
    title: "Tools & Database",
    items: ["Git", "GitHub", "VS Code", "Postman", "MongoDB", "MySQL"],
  },
];

const education = [
  {
    degree: "Bachelor of Technology",
    subject: "Information Technology",
    institute: "Narula Institute of Technology",
    score: "75%",
  },
  {
    degree: "Higher Secondary",
    subject: "Higher Secondary Education",
    institute: "Bagnan Adarsha Balika Vidyalaya",
    score: "75.40%",
  },
  {
    degree: "Secondary",
    subject: "Secondary Education",
   institute: "Bagnan Adarsha Balika Vidyalaya",
    score: "86.71%",
  },
];

function App() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Project slider states
  const [projectIndex, setProjectIndex] = useState(0);
  const [isProjectHovered, setIsProjectHovered] = useState(false);
  const [withAnimation, setWithAnimation] = useState(true);

  const totalProjects = liveProjects.length;

  // Real index (0 to total-1) used for dots and the counter text
  const displayIndex =
    ((projectIndex % totalProjects) + totalProjects) % totalProjects;

  const nextProject = () => {
    // don't go beyond the cloned slide
    setProjectIndex((previous) =>
      previous >= totalProjects ? previous : previous + 1,
    );
  };

  const previousProject = () => {
    // don't go beyond the cloned slide
    setProjectIndex((previous) => (previous < 0 ? previous : previous - 1));
  };

  // Called when the slide animation finishes
  const handleSliderAnimationComplete = () => {
    if (projectIndex >= totalProjects) {
      // on the clone of the first slide, jump to the real first slide
      setWithAnimation(false);
      setProjectIndex(0);
    } else if (projectIndex < 0) {
      // on the clone of the last slide, jump to the real last slide
      setWithAnimation(false);
      setProjectIndex(totalProjects - 1);
    }
  };

  // Turn animation back on after the silent jump
  useEffect(() => {
    if (!withAnimation) {
      const timeout = setTimeout(() => setWithAnimation(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [withAnimation]);

  // Fetch GitHub repositories
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`,
          {
            params: {
              sort: "updated",
              per_page: 100,
            },
          },
        );

        const publicRepos = response.data.filter(
          (repo: GitHubRepo) => !repo.fork,
        );

        setRepos(publicRepos);
      } catch (err) {
        setError("Unable to load GitHub projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  // Automatic project slider
  useEffect(() => {
    if (isProjectHovered) {
      return;
    }

    const interval = setInterval(() => {
      nextProject();
    }, 5000);

    return () => clearInterval(interval);
  }, [isProjectHovered]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#100F17] text-white selection:bg-violet-500 selection:text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#100F17]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#home" className="text-xl font-bold tracking-tight">
            Divya<span className="text-violet-400">.</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-400 transition hover:text-violet-400"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold transition hover:bg-violet-600 md:block"
          >
            Let's Talk
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-5 border-t border-white/10 bg-[#171522] px-6 py-6 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-violet-400"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-20 pt-32 md:grid-cols-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 flex items-center gap-2 text-sm font-medium tracking-widest text-violet-400">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            HELLO, WELCOME TO MY PORTFOLIO
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Hi, I'm
            <span className="mt-2 block text-violet-400">
              Divyapushpaa Das
            </span>
          </h1>

          <h2 className="mt-5 text-xl font-medium text-gray-300 sm:text-2xl">
            React Frontend Developer
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-400">
            I'm a passionate frontend developer who enjoys building responsive,
            interactive and user-friendly web applications. I love turning ideas
            into meaningful digital experiences using React, JavaScript and
            modern web technologies.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 font-semibold transition hover:bg-violet-600"
            >
              View Projects <ArrowUpRight size={18} />
            </a>

            <a
              href="mailto:divyamoma@gmail.com"
              className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:border-violet-400 hover:text-violet-400"
            >
              Contact Me <Mail size={18} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <a
              href="https://github.com/divyamoma-ctrl"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-gray-400 transition hover:text-violet-400"
            >
              <FaGithub size={23} />
            </a>

            <a
              href="https://www.linkedin.com/in/divyapushpaa-das-673077185/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 transition hover:text-violet-400"
            >
              <FaLinkedin size={23} />
            </a>

            <a
              href="mailto:divyamoma@gmail.com"
              aria-label="Email"
              className="text-gray-400 transition hover:text-violet-400"
            >
              <Mail size={23} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute inset-0 scale-90 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-[#1B1927] p-3 shadow-2xl shadow-violet-900/20">
            <img
              src={profilePic}
              alt="Divyapushpaa Das"
              className="h-[420px] w-full rounded-2xl object-cover object-top"
            />

            <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/10 bg-[#100F17]/90 p-4 backdrop-blur-lg">
              <p className="font-semibold">Divyapushpaa Das</p>
              <p className="mt-1 text-sm text-violet-300">
                React Frontend Developer
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="scroll-mt-24 bg-[#171522] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              Get to know me
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              About Me<span className="text-violet-400">.</span>
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold leading-relaxed text-gray-200">
                Creating responsive and engaging web experiences with modern
                frontend technologies.
              </h3>
            </div>

            <div className="space-y-5 text-base leading-8 text-gray-400">
              <p>
                I am a motivated React Frontend Developer with a strong interest
                in building modern web applications. I enjoy developing clean
                user interfaces and creating responsive experiences for
                different screen sizes.
              </p>

              <p>
                I have practical experience working with React, TypeScript,
                JavaScript, Tailwind CSS and Material UI. I also have an
                understanding of state management, API integration and backend
                fundamentals.
              </p>

              <p>
                I believe in continuous learning, problem-solving and improving
                my development skills through hands-on projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            My technical expertise
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Skills & Technologies<span className="text-violet-400">.</span>
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#171522] p-7 transition hover:border-violet-400/50"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
                    <Code2 size={22} />
                  </div>
                  <h3 className="text-lg font-semibold">{skill.title}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-violet-400 hover:text-violet-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST PROJECTS - INFINITE VERCEL SLIDER */}
      <section id="projects" className="scroll-mt-24 bg-[#171522] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
                Selected work
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Latest Projects<span className="text-violet-400">.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-gray-400">
                Take a look at some of my deployed projects and explore their
                live versions.
              </p>
            </div>

            <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
              {liveProjects.length} Featured Projects
            </span>
          </div>

             {loading && (
            <p className="mt-8 text-sm text-gray-400">Loading repositories...</p>
          )}

          {error && <p className="mt-8 text-sm text-red-400">{error}</p>}

          {/* Slider wrapper: pause autoplay on hover */}
          <div
            className="mt-12"
            onMouseEnter={() => setIsProjectHovered(true)}
            onMouseLeave={() => setIsProjectHovered(false)}
          >
            {/* Navigation buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={previousProject}
                aria-label="Previous project"
                className="rounded-full border border-white/15 p-3 transition hover:border-violet-400 hover:text-violet-400"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextProject}
                aria-label="Next project"
                className="rounded-full border border-white/15 p-3 transition hover:border-violet-400 hover:text-violet-400"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden">
              <motion.div
                animate={{
                  x: `${-(projectIndex + 1) * 100}%`,
                }}
                transition={{
                  duration: withAnimation ? 0.6 : 0,
                  ease: "easeInOut",
                }}
                onAnimationComplete={handleSliderAnimationComplete}
                className="flex"
              >
                {[
                  liveProjects[liveProjects.length - 1],
                  ...liveProjects,
                  liveProjects[0],
                ].map((project, index) => {
                  const matchingRepo = repos.find((repo) =>
                    repo.name.toLowerCase().includes(project.keyword),
                  );

                  return (
                    <div
                      key={`${project.keyword}-${index}`}
                      className="w-full shrink-0 px-1"
                    >
                      <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#100F17] transition hover:border-violet-400/40 lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#252035] via-[#1B1927] to-[#302642] p-6 sm:p-10 lg:min-h-[520px]">
                          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
                          <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-purple-400/10 blur-3xl" />

                          <div className="relative z-10 flex w-full max-w-[850px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#171522] p-3 shadow-2xl sm:p-5">
                            <img
                              src={project.image}
                              alt={`${project.title} website screenshot`}
                              className="max-h-[460px] w-full rounded-lg object-contain object-top transition duration-500 hover:scale-[1.02]"
                            />
                          </div>

                          <div className="absolute bottom-5 left-5 z-20 rounded-full border border-white/10 bg-[#100F17]/90 px-5 py-3 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:bottom-8 sm:left-8">
                            Featured Project
                          </div>
                        </div>

                        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                            Project Overview
                          </p>

                          <h3 className="mt-4 text-2xl font-bold capitalize text-white sm:text-3xl">
                            {project.title}
                          </h3>

                          <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
                            {project.description}
                          </p>

                          <div className="mt-7">
                            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                              Built With
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((technology) => (
                                <span
                                  key={technology}
                                  className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-xs text-violet-200"
                                >
                                  {technology}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                            >
                              Live Demo <ExternalLink size={16} />
                            </a>

                            {matchingRepo && (
                              <a
                                href={matchingRepo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-400 hover:text-violet-400"
                              >
                                <FaGithub size={17} /> GitHub Repository
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {liveProjects.map((project, index) => (
                <button
                  key={project.keyword}
                  onClick={() => setProjectIndex(index)}
                  aria-label={`Go to project ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    displayIndex === index
                      ? "w-8 bg-violet-400"
                      : "w-2.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <p className="mt-3 text-center text-xs text-gray-500">
              Project {displayIndex + 1} of {liveProjects.length}
            </p>
          </div>
        </div>
      </section>

      {/* GITHUB - ALL REPOSITORIES */}
      <section id="github" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-[#171522] px-7 py-12 text-center sm:px-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <FaGithub size={34} />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-violet-400">
              Explore my code
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Find Me on GitHub<span className="text-violet-400">.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Explore all my public repositories, practice assignments,
              experiments and development work in one place.
            </p>

            <a
              href="https://github.com/divyamoma-ctrl?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 font-semibold transition hover:bg-violet-600"
            >
              View All Repositories <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            What I bring to the table
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            What I Can Do<span className="text-violet-400">.</span>
          </h2>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Frontend Development",
                desc: "Building responsive and interactive interfaces using React, TypeScript and modern CSS.",
              },
              {
                title: "UI Development",
                desc: "Creating clean and consistent user interfaces using Tailwind CSS and Material UI.",
              },
              {
                title: "API Integration",
                desc: "Connecting frontend applications with REST APIs and displaying dynamic data.",
              },
              {
                title: "State Management",
                desc: "Managing application state using React Context and Redux Toolkit.",
              },
              {
                title: "Responsive Design",
                desc: "Developing user-friendly layouts that work across mobile, tablet and desktop.",
              },
              {
                title: "Continuous Learning",
                desc: "Exploring modern web technologies and improving through practical projects.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#171522] p-7 transition hover:-translate-y-1 hover:border-violet-400/50"
              >
                <span className="text-sm font-bold text-violet-400">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="scroll-mt-24 bg-[#171522] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            My academic background
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Education<span className="text-violet-400">.</span>
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {education.map((item, index) => (
              <div
                key={item.degree}
                className="rounded-2xl border border-white/10 bg-[#100F17] p-7"
              >
                <span className="text-sm font-semibold text-violet-400">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold">{item.degree}</h3>
                <p className="mt-2 text-sm text-gray-300">{item.subject}</p>
                <p className="mt-4 text-sm text-gray-400">{item.institute}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-sm text-gray-400">Percentage</p>
                  <p className="mt-1 text-2xl font-bold text-violet-400">
                    {item.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-violet-400/20 bg-[#171522] px-7 py-16 text-center sm:px-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
            Have an opportunity?
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
            Let's Build Something
            <span className="block text-violet-400">Together.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-8 text-gray-400">
            I'm open to junior frontend developer opportunities, internships and
            collaborations. Let's connect and create something meaningful.
          </p>

          <a
            href="mailto:divyamoma@gmail.com"
            className="mx-auto mt-9 inline-flex items-center gap-3 rounded-full bg-violet-500 px-7 py-3.5 font-semibold transition hover:bg-violet-600"
          >
            <Mail size={19} /> Get In Touch <ArrowRight size={18} />
          </a>

          <div className="mt-9 flex justify-center gap-6">
            <a
              href="https://github.com/divyamoma-ctrl"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 transition hover:text-violet-400"
            >
              <FaGithub size={25} />
            </a>
            <a
              href="https://www.linkedin.com/in/divyapushpaa-das-673077185/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 transition hover:text-violet-400"
            >
              <FaLinkedin size={25} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row">
          <a href="#home" className="text-lg font-bold">
            Divya<span className="text-violet-400">.</span>
          </a>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Divyapushpaa Das. All rights reserved.
          </p>

          <a
            href="#home"
            className="text-sm text-gray-400 transition hover:text-violet-400"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Command,
  Copy,
  ExternalLink,
  FileText,
  Folder,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { commands, experience, profile, projects, skills } from "./data";

type Entry = {
  id: number;
  input: string;
  command: string;
  args: string[];
  history?: string[];
};
type Theme = "dark" | "light" | "green";
const resumeUrl = `${import.meta.env.BASE_URL}harry-wu-resume.pdf`;
const wordmark = String.raw`██╗  ██╗ █████╗ ██████╗ ██████╗ ██╗   ██╗
██║  ██║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
███████║███████║██████╔╝██████╔╝ ╚████╔╝
██╔══██║██╔══██║██╔══██╗██╔══██╗  ╚██╔╝
██║  ██║██║  ██║██║  ██║██║  ██║   ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝`;

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem("harry-terminal-theme");
    if (saved === "light" || saved === "green") return saved;
  } catch {
    /* Optional browser storage. */
  }
  return "dark";
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}
function SectionTitle({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const draft = useRef("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const output = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const filtered = commands.filter((c) =>
    c.name
      .toLowerCase()
      .startsWith(value.trim().replace(/^\//, "").toLowerCase()),
  );
  const latest = entries.at(-1)?.command ?? "home";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("harry-terminal-theme", theme);
    } catch {
      /* Theme works without persistence. */
    }
  }, [theme]);
  useEffect(() => {
    if (!output.current || !entries.length) return;
    const last = output.current.querySelector<HTMLElement>(
      ".log-entry:last-child",
    );
    if (last)
      output.current.scrollTo({
        top: last.offsetTop - 24,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }, [entries]);
  useEffect(() => {
    if (menuOpen)
      document
        .getElementById(`option-${filtered[selected]?.name}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [menuOpen, selected, value]);
  useEffect(() => {
    const handle = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) &&
        !target.isContentEditable &&
        !event.metaKey &&
        !event.ctrlKey
      ) {
        event.preventDefault();
        input.current?.focus();
        setValue("/");
        setMenuOpen(true);
        setSelected(0);
      }
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "l" &&
        document.activeElement === input.current
      ) {
        event.preventDefault();
        setEntries([]);
        setShowWelcome(false);
        setValue("");
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  function run(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    const [head, ...args] = normalized.slice(1).split(/\s+/);
    const command = head.toLowerCase();
    const newHistory = [...history, normalized];
    setHistory(newHistory);
    setHistoryIndex(-1);
    draft.current = "";
    setValue("");
    setMenuOpen(false);
    setMobileNav(false);
    if (command === "clear") {
      setEntries([]);
      setShowWelcome(false);
    } else if (command === "home") {
      setEntries([]);
      setShowWelcome(true);
      output.current?.scrollTo({ top: 0 });
    } else {
      if (
        command === "theme" &&
        ["dark", "light", "green"].includes(args[0]?.toLowerCase())
      )
        setTheme(args[0].toLowerCase() as Theme);
      setEntries((old) => [
        ...old,
        {
          id: nextId.current++,
          input: normalized,
          command,
          args,
          history: newHistory,
        },
      ]);
    }
    // Keep touch shortcuts from summoning the on-screen keyboard.
    if (window.matchMedia("(pointer: fine)").matches) input.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setMenuOpen(false);
      return;
    }
    if (menuOpen && filtered.length) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setSelected(
          (i) =>
            (i + (event.key === "ArrowDown" ? 1 : -1) + filtered.length) %
            filtered.length,
        );
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        setValue(`/${filtered[selected]?.name ?? filtered[0].name} `);
        setMenuOpen(false);
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        run(`/${filtered[selected]?.name ?? filtered[0].name}`);
        return;
      }
    }
    if (event.key === "Tab" && !value.includes(" ") && filtered.length) {
      event.preventDefault();
      setValue(`/${filtered[0].name} `);
      setMenuOpen(false);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      if (historyIndex === -1) draft.current = value;
      const idx =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(idx);
      setValue(history[idx]);
      setMenuOpen(false);
    }
    if (event.key === "ArrowDown" && historyIndex >= 0) {
      event.preventDefault();
      const idx = historyIndex + 1;
      if (idx >= history.length) {
        setHistoryIndex(-1);
        setValue(draft.current);
      } else {
        setHistoryIndex(idx);
        setValue(history[idx]);
      }
      setMenuOpen(false);
    }
  }

  const cmd = (text: string, label?: ReactNode, className = "text-command") => (
    <button type="button" className={className} onClick={() => run(text)}>
      {label ?? text}
    </button>
  );

  function welcome() {
    return (
      <div className="welcome">
        <div className="boot-line">
          <span className="tiny-square" /> PORTFOLIO INITIALIZED{" "}
          <span className="boot-version">v1.0.0</span>
        </div>
        <div className="hero-name">
          <pre aria-hidden="true">{wordmark}</pre>
          <h1 className="sr-only">Harry Wu</h1>
          <span className="surname" aria-hidden="true">
            WU<span className="name-dot">.</span>
          </span>
        </div>
        <div className="role-line">
          <span>Senior Full-Stack Developer</span>
          <span className="role-secondary">
            <span className="muted">/</span> AI Applications
          </span>
        </div>
        <div className="location">
          <MapPin size={13} />
          <span>Vancouver, BC</span>
          <span className="location-divider">·</span>
          <span className="building-since">
            Building for the web since 2013
          </span>
        </div>
        <p className="intro">
          I build enterprise e-commerce websites and AI-powered applications.
        </p>
        <div className="welcome-metrics">
          <div>
            <strong>
              10<span>+</span>
            </strong>
            <span>years of experience</span>
          </div>
          <div>
            <strong>
              ~3s <span>→</span> ~1s
            </strong>
            <span>cart &amp; checkout response</span>
          </div>
          <div>
            <strong>5</strong>
            <span>developers · technical lead</span>
          </div>
        </div>
        <div className="action-row welcome-actions">
          <a
            className="primary-action"
            href={resumeUrl}
            download="Harry-Wu-Resume.pdf"
          >
            <ArrowDownToLine size={16} /> Download Resume
          </a>
          <a className="secondary-action" href={`mailto:${profile.email}`}>
            <Mail size={16} /> Contact Me
          </a>
        </div>
      </div>
    );
  }

  function renderEntry(entry: Entry): ReactNode {
    const { command, args } = entry;
    if (command === "about")
      return (
        <>
          <SectionTitle eyebrow="01 / INTRODUCTION">
            The person behind the prompt.
          </SectionTitle>
          <p>
            I’m Harry, a full-stack software developer based in Vancouver, BC. I
            have 10+ years of experience delivering customer-facing web
            applications, enterprise commerce platforms, and microservices.
          </p>
          <p>
            My core toolkit spans React, TypeScript, Node.js, PHP/Laravel, and
            AWS. More recently, I’ve been building AI applications with
            Python/FastAPI, retrieval-augmented generation, and
            LangChain/LangGraph workflows.
          </p>
          <p>
            I enjoy connecting the details: thoughtful interfaces, resilient
            backends, and engineering decisions that make a measurable
            difference. I’m also a hands-on technical leader with experience in
            architecture, performance optimization, production reliability, and
            mentoring.
          </p>
          <div className="output-next">
            Follow the work {cmd("/Projects")} <ArrowRight size={13} /> or
            explore {cmd("/Skills")}
          </div>
        </>
      );
    if (command === "skills") {
      const aliases: Record<string, string> = {
        devops: "cloud",
        "ai & automation": "ai",
        database: "data",
      };
      const query = args.join(" ").toLowerCase();
      const shown = query
        ? skills.filter(
            (s) => s.name.toLowerCase() === (aliases[query] ?? query),
          )
        : skills;
      return (
        <>
          <SectionTitle eyebrow="02 / TOOLKIT">
            Tools I build with.
          </SectionTitle>
          <p className="muted">
            A practical toolkit, backed by things I’ve shipped.
          </p>
          {shown.length ? (
            <div className="skill-list">
              {shown.map((s) => (
                <div className="skill-group" key={s.name}>
                  <h3>
                    {s.name}
                    <span>
                      {String(skills.indexOf(s) + 1).padStart(2, "0")}
                    </span>
                  </h3>
                  <div className="tags">
                    {s.tools.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <p>{s.context}</p>
                  {cmd(
                    `/Projects ${s.project}`,
                    <>
                      See it in practice: {s.label} <ArrowUpRight size={12} />
                    </>,
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="error">
              Unknown skill group “{args.join(" ")}”. Choose Frontend, Backend,
              AI, Architecture, Data, or Cloud.
            </p>
          )}
          <div className="output-next">
            Try {cmd("/Skills AI")} or {cmd("/Skills Backend")}
          </div>
        </>
      );
    }
    if (command === "projects") {
      const query = args.join(" ").toLowerCase();
      const detail = projects.find((p) => p.id === query);
      if (query && query !== "--all" && !detail)
        return (
          <p className="error">
            Project “{args.join(" ")}” was not found.{" "}
            {cmd("/Projects --all", "View all projects")}.
          </p>
        );
      return (
        <>
          <SectionTitle eyebrow="03 / SELECTED WORK">
            {detail ? detail.name : "Built to solve real problems."}
          </SectionTitle>
          {!detail && (
            <p className="muted">
              Personal explorations and professional work. Select a project to
              go deeper.
            </p>
          )}
          <div className="projects-list">
            {(detail
              ? [detail]
              : query === "--all"
                ? projects
                : projects.slice(0, 3)
            ).map((p) => (
              <article className="project" key={p.id}>
                <div className="project-number">{p.number}</div>
                <div className="project-body">
                  <span className="eyebrow">{p.type}</span>
                  {!detail && (
                    <h3>
                      {cmd(
                        `/Projects ${p.id}`,
                        <>
                          {p.name}
                          <ArrowUpRight size={16} />
                        </>,
                        "project-title",
                      )}
                    </h3>
                  )}
                  <p>{p.description}</p>
                  {detail && (
                    <ul className="detail-list">
                      {p.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  )}
                  <div className="tags">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="output-next">
            {cmd("/Projects --all", "View all 5 projects")}{" "}
            <ArrowRight size={13} />
            <span>
              Professional work described from my resume; source code is not
              published here.
            </span>
          </div>
        </>
      );
    }
    if (command === "experience")
      return (
        <>
          <SectionTitle eyebrow="04 / EXPERIENCE">
            A decade of building for the web.
          </SectionTitle>
          <div className="timeline">
            {experience.map((e) => (
              <article key={e.company}>
                <span className="eyebrow">{e.period}</span>
                <h3>{e.company}</h3>
                <div className="job-meta">
                  {e.role}
                  {e.place && ` · ${e.place}`}
                </div>
                <p>{e.description}</p>
              </article>
            ))}
          </div>
          <div className="output-next">
            The outcomes {cmd("/Impact")} <ArrowRight size={13} />
          </div>
        </>
      );
    if (command === "impact")
      return (
        <>
          <SectionTitle eyebrow="05 / OUTCOMES">
            Good engineering moves the needle.
          </SectionTitle>
          <div className="impact-list">
            {[
              [
                "67%",
                "faster cart & checkout",
                "Reduced response time from approximately 3 seconds to 1 second by consolidating GraphQL calls and redesigning shared checkout state.",
              ],
              [
                "~20h",
                "saved every week",
                "Automated clearance inventory refreshes with an hourly n8n workflow, replacing repetitive staff work.",
              ],
              [
                "~8,700",
                "products kept in sync",
                "Built event-driven Algolia indexing with Pub/Sub, delta updates, daily full syncs, and automated retries.",
              ],
              [
                "5",
                "developers, one shared direction",
                "Served as hands-on technical lead, balancing approximately 70% architecture and implementation with 30% planning, reviews, mentoring, and release readiness.",
              ],
            ].map(([metric, label, description]) => (
              <div className="impact-row" key={metric}>
                <strong>{metric}</strong>
                <div>
                  <h3>{label}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="footnote">
            Selected outcomes from my work at Trail Appliances.
          </p>
        </>
      );
    if (command === "resume")
      return (
        <>
          <SectionTitle eyebrow="06 / RESUME">
            The full story, in two pages.
          </SectionTitle>
          <p>Full-Stack Software Developer — AI Applications</p>
          <div className="resume-file">
            <FileText size={32} strokeWidth={1.2} />
            <div>
              <strong>Harry Wu — Resume</strong>
              <span>PDF document · 2 pages</span>
            </div>
          </div>
          <div className="action-row">
            <a
              className="primary-action"
              href={resumeUrl}
              download="Harry-Wu-Resume.pdf"
            >
              <ArrowDownToLine size={15} /> Download resume
            </a>
            <a
              className="secondary-action"
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open PDF <ExternalLink size={13} />
            </a>
          </div>
        </>
      );
    if (command === "education")
      return (
        <>
          <SectionTitle eyebrow="07 / LEARNING">
            Foundations & continued learning.
          </SectionTitle>
          <div className="education-list">
            <article>
              <span className="eyebrow">2011 — 2015</span>
              <h3>Bachelor of Computer Science</h3>
              <p>Vancouver Island University · Nanaimo, BC</p>
            </article>
            <article>
              <span className="eyebrow">EARNED JAN 2024</span>
              <h3>AWS Certified Developer Associate</h3>
              <p>Amazon Web Services</p>
            </article>
            <article>
              <span className="eyebrow">JAN 2024</span>
              <h3>Project Management Certificate Program</h3>
              <p>UBC Sauder School of Business</p>
            </article>
          </div>
        </>
      );
    if (command === "contact")
      return (
        <>
          <SectionTitle eyebrow="08 / SAY HELLO">
            Every good project starts with a conversation.
          </SectionTitle>
          <p>
            Have an interesting engineering challenge or a role in mind? Let’s
            connect.
          </p>
          <div className="contact-list">
            <a href={`mailto:${profile.email}`}>
              <Mail size={17} />
              <span>
                <small>EMAIL</small>
                {profile.email}
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={17} />
              <span>
                <small>GITHUB</small>github.com/harrywutech
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={17} />
              <span>
                <small>LINKEDIN</small>linkedin.com/in/harry-wu-hx
              </span>
              <ArrowUpRight size={16} />
            </a>
          </div>
          <CopyEmail />
        </>
      );
    if (command === "help")
      return (
        <>
          <SectionTitle eyebrow="MANUAL / GETTING AROUND">
            A little guidance. A lot to explore.
          </SectionTitle>
          <div className="help-list">
            {commands.map((c) => (
              <div key={c.name}>
                {cmd(`/${c.name}`)}
                <span>{c.description}</span>
              </div>
            ))}
          </div>
          <div className="syntax-examples">
            <span className="eyebrow">GO A LITTLE DEEPER</span>
            {cmd("/Skills AI")}
            {cmd("/Projects interview-platform")}
            {cmd("/Projects --all")}
            {cmd("/Theme light")}
          </div>
          <div className="keyboard-help">
            <span>
              <kbd>Tab</kbd> autocomplete
            </span>
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> command history
            </span>
            <span>
              <kbd>Esc</kbd> close menu
            </span>
            <span>
              <kbd>Ctrl/Cmd</kbd>
              <kbd>L</kbd> clear focused terminal
            </span>
          </div>
          <p className="footnote">
            Commands are case-insensitive. Click any command to run it.
          </p>
        </>
      );
    if (command === "theme")
      return (
        <>
          <SectionTitle eyebrow="PREFERENCES / APPEARANCE">
            Make yourself at home.
          </SectionTitle>
          {args.length > 0 &&
            !["dark", "light", "green"].includes(args[0].toLowerCase()) && (
              <p className="error">
                Unknown theme. Choose dark, light, or green.
              </p>
            )}
          <p className="muted">
            Current theme: <span className="accent">{theme}</span>. Your
            preference is saved in this browser.
          </p>
          <div className="theme-options">
            {(["dark", "light", "green"] as Theme[]).map((t) => (
              <button
                key={t}
                className={`theme-option ${theme === t ? "chosen" : ""}`}
                onClick={() => run(`/Theme ${t}`)}
              >
                <span className={`theme-swatch ${t}`} />
                {t}
                {theme === t && <Check size={14} />}
              </button>
            ))}
          </div>
        </>
      );
    if (command === "history")
      return (
        <>
          <SectionTitle eyebrow="SESSION / HISTORY">
            Your trail through the terminal.
          </SectionTitle>
          <ol className="history-list">
            {entry.history?.map((h, i) => (
              <li key={`${i}-${h}`}>{cmd(h)}</li>
            ))}
          </ol>
        </>
      );
    const suggestion = commands.find((c) =>
      c.name.toLowerCase().startsWith(command.slice(0, 2)),
    );
    return (
      <div className="unknown-command">
        <p>
          <span className="error">Command not found:</span> {entry.input}
        </p>
        <p className="muted">
          {suggestion ? <>Did you mean {cmd(`/${suggestion.name}`)}? </> : null}
          Type {cmd("/Help")} to see what’s available.
        </p>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => run("/Home")}
          aria-label="Harry Wu — home"
        >
          hw<span>_</span>
        </button>
        <span className="header-label">
          A DEVELOPER’S LITTLE CORNER OF THE INTERNET
        </span>
        <a
          className="github-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={16} />
          <span>GitHub</span>
          <ArrowUpRight size={12} />
        </a>
      </header>
      <main
        className="terminal-window"
        aria-label="Harry Wu interactive portfolio"
      >
        <div className="window-toolbar">
          <div className="window-lights" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="window-title">
            <Terminal size={13} />
            <span>harry@portfolio</span>
            <span className="muted">: ~</span>
          </div>
          <div className="toolbar-actions">
            <span className="shell-label">zsh</span>
            <button
              className="icon-button"
              aria-label={
                theme === "light" ? "Use dark theme" : "Use light theme"
              }
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>
            <button
              className="icon-button mobile-menu-toggle"
              aria-expanded={mobileNav}
              aria-label="Toggle command directory"
              onClick={() => setMobileNav(!mobileNav)}
            >
              {mobileNav ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        <div className="window-body">
          <aside
            className={`sidebar ${mobileNav ? "mobile-open" : ""}`}
            aria-label="Command directory"
          >
            <div className="directory-label">
              <Folder size={13} />
              <span>EXPLORER</span>
            </div>
            <button
              className={`home-link ${latest === "home" ? "active" : ""}`}
              onClick={() => run("/Home")}
            >
              <ChevronRight size={13} />
              <span>~/harry-wu</span>
            </button>
            <div className="nav-group">
              <span className="nav-label">PORTFOLIO</span>
              {commands
                .filter((c) => c.group === "portfolio")
                .map((c, i) => (
                  <button
                    className={`nav-command ${latest === c.name.toLowerCase() ? "active" : ""}`}
                    key={c.name}
                    onClick={() => run(`/${c.name}`)}
                  >
                    <span className="nav-slash">/</span>
                    <span>{c.name}</span>
                    <span className="nav-index">0{i + 1}</span>
                  </button>
                ))}
            </div>
            <div className="nav-group">
              <span className="nav-label">A LITTLE MORE</span>
              {commands
                .filter((c) => c.group === "more")
                .map((c) => (
                  <button
                    className={`nav-command ${latest === c.name.toLowerCase() ? "active" : ""}`}
                    key={c.name}
                    onClick={() => run(`/${c.name}`)}
                  >
                    <span className="nav-slash">/</span>
                    <span>{c.name}</span>
                    {c.name === "Resume" && (
                      <ArrowDownToLine size={12} className="nav-index" />
                    )}
                  </button>
                ))}
            </div>
            <div className="sidebar-bottom">
              <button onClick={() => run("/Help")}>
                <CircleHelp size={14} /> Command guide <kbd>?</kbd>
              </button>
              <div>
                <span className="tiny-square" />
                <span>Made to be explored.</span>
              </div>
            </div>
          </aside>
          <section className="terminal-main" aria-label="Terminal">
            <div
              className="terminal-output"
              ref={output}
              role="region"
              aria-label="Command output"
              tabIndex={0}
            >
              {showWelcome && welcome()}
              {!showWelcome && entries.length === 0 && (
                <div className="cleared">
                  <Terminal size={22} />
                  <p>A fresh start.</p>
                  <span>
                    Type {cmd("/Help")} or {cmd("/Home")} to keep exploring.
                  </span>
                </div>
              )}
              {entries.map((entry) => (
                <section
                  className="log-entry"
                  key={entry.id}
                  aria-label={`Result for ${entry.input}`}
                >
                  <div className="executed-command">
                    <span>harry@portfolio</span>
                    <span className="muted">~</span>
                    <ChevronRight size={14} />
                    <span>{entry.input}</span>
                  </div>
                  <div className="command-result">{renderEntry(entry)}</div>
                </section>
              ))}
            </div>
            <div className="input-area">
              <div className="sr-only" role="status">
                {entries.length
                  ? `Results for ${entries.at(-1)?.input} are available in the Command output region.`
                  : showWelcome
                    ? "Welcome to Harry Wu’s terminal portfolio."
                    : "Terminal cleared."}
              </div>
              {menuOpen && filtered.length > 0 && (
                <div
                  className="command-menu"
                  id="command-options"
                  role="listbox"
                  aria-label="Suggested commands"
                >
                  <div className="menu-heading">
                    COMMANDS <span>↑↓ navigate · ↵ run · tab complete</span>
                  </div>
                  <div className="menu-options">
                    {filtered.map((c, i) => (
                      <button
                        id={`option-${c.name}`}
                        key={c.name}
                        className={selected === i ? "selected" : ""}
                        role="option"
                        aria-selected={selected === i}
                        onMouseDown={(e) => e.preventDefault()}
                        onMouseEnter={() => setSelected(i)}
                        onClick={() => run(`/${c.name}`)}
                      >
                        <span>/{c.name}</span>
                        <span>{c.description}</span>
                        {selected === i && (
                          <span className="menu-enter">↵</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <form
                className="prompt"
                onSubmit={(e) => {
                  e.preventDefault();
                  run(value);
                }}
              >
                <label htmlFor="terminal-input">
                  <span>
                    harry<span className="prompt-host">@portfolio</span>
                  </span>
                  <span className="prompt-path">~</span>
                  <ChevronRight size={16} />
                </label>
                <input
                  id="terminal-input"
                  ref={input}
                  type="text"
                  value={value}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="Type a command or / to explore…"
                  aria-label="Terminal command"
                  role="combobox"
                  aria-expanded={menuOpen && filtered.length > 0}
                  aria-controls="command-options"
                  aria-autocomplete="list"
                  aria-activedescendant={
                    menuOpen && filtered[selected]
                      ? `option-${filtered[selected].name}`
                      : undefined
                  }
                  onChange={(e) => {
                    setValue(e.target.value);
                    setHistoryIndex(-1);
                    setSelected(0);
                    setMenuOpen(
                      e.target.value.startsWith("/") &&
                        !e.target.value.includes(" "),
                    );
                  }}
                  onKeyDown={onKeyDown}
                  onFocus={() => {
                    if (value.startsWith("/") && !value.includes(" "))
                      setMenuOpen(true);
                  }}
                  onBlur={() => setMenuOpen(false)}
                />
                <button
                  className="submit-command"
                  type="submit"
                  aria-label="Run command"
                >
                  <span>enter</span>
                  <span>↵</span>
                </button>
              </form>
              <div className="input-hints">
                <span>
                  <kbd>Tab</kbd> autocomplete{" "}
                  <span className="hint-divider">·</span>
                  <kbd>↑↓</kbd> history
                </span>
                <button
                  type="button"
                  onClick={() => {
                    input.current?.focus();
                    setValue("/");
                    setSelected(0);
                    setMenuOpen(true);
                  }}
                >
                  <Command size={11} /> commands
                </button>
              </div>
            </div>
          </section>
        </div>
        <div className="status-bar">
          <span>
            <span className="status-dot" />
            portfolio<span className="status-branch">/ main</span>
          </span>
          <span>
            <MapPin size={11} /> Vancouver, BC
            <span className="status-separator">│</span>
            <span>UTF-8</span>
            <span className="status-separator">│</span>
            <span>React + TypeScript</span>
          </span>
        </div>
      </main>
      <footer className="site-footer">
        <span>
          © {new Date().getFullYear()} Harry Wu
          <span className="footer-dot">·</span>Built with curiosity.
        </span>
        <span>
          Less clicking. More exploring.<span className="footer-cursor">▌</span>
        </span>
      </footer>
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setFailed(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setFailed(true);
    }
  }
  return (
    <div className="copy-email">
      <button className="secondary-action" onClick={copy}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Email copied" : "Copy email address"}
      </button>
      <span role="status">
        {failed
          ? `Copy manually: ${profile.email}`
          : copied
            ? "Copied to clipboard."
            : ""}
      </span>
    </div>
  );
}

export default App;

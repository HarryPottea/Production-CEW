import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  Instagram,
  Menu,
  X,
  Plus,
  Minus,
  ArrowLeft,
  Sparkles,
  Film,
  GalleryVertical,
  Play,
} from "lucide-react";
import cewLogo from "@/assets/cew-logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import whyAreYouHerePoster from "@/assets/why-are-you-here-poster.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Archive", href: "#archive" },
  { label: "Contact", href: "#contact" },
];

const works = [
  {
    title: "왜 여기 있어요",
    titleKo: "Why Are You Here",
    year: "2024",
    status: "Completed",
    format: "Short Film · 20min",
    image: whyAreYouHerePoster,
    description:
      "고요한 불안과 관계의 균열 속에서 인간의 선택과 존재를 응시하는 20분의 단편 영화.",
    production: "프로덕션 큐",
    distribution: "주식회사 퍼니콘",
    ott: [
      { label: "Wavve", href: "https://www.wavve.com/player/movie?movieid=MV_C901_SG0000205556&autoplay=y" },
      { label: "TVING", href: "https://www.tving.com/contents/M000379698?utm_source=Naver&utm_medium=Organic&utm_campaign=SERP" },
      { label: "WATCHA", href: "https://watcha.com/contents/m5nXPgo" },
    ],
  },
];

const archiveItems = [
  {
    title: "Still Frames",
    desc: "Selected stills that hold the emotional temperature of each work.",
    icon: GalleryVertical,
  },
  {
    title: "Posters & Identity",
    desc: "Poster variations, key visuals, and the typography of each release.",
    icon: Film,
  },
  {
    title: "Behind the Scenes",
    desc: "Production notes, set photography, and fragments from the making process.",
    icon: Sparkles,
  },
];

const team = [
  {
    role: "Director",
    name: "정연찬",
    text: "인간의 내면적 균열과 선택, 그리고 그 사이의 고요한 긴장을 세밀하게 관찰하는 이야기를 만듭니다.",
  },
  {
    role: "Cinematography",
    name: "윤선식",
    text: "빛과 어둠의 경계에서 인물의 감정을 가장 진실되게 담아내는 미학을 추구합니다.",
  },
  {
    role: "Sound",
    name: "김용휘",
    text: "보이지 않는 소리의 층위를 통해 영화적 공간과 정서를 완성합니다.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeWork, setActiveWork] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyContactEmail = async () => {
    try {
      await navigator.clipboard.writeText("j-yeonchan@production-cew.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("메일 주소를 복사해 주세요", "j-yeonchan@production-cew.com");
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-brand-primary font-sans">
      {/* Navigation */}
      <header 
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-8"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          <a href="#top" className="flex items-center">
            <img
              src={cewLogo}
              alt="Production CEW logo"
              className="h-16 w-auto md:h-20 object-contain"
            />
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <button
              type="button"
              onClick={copyContactEmail}
              className="text-sm font-semibold hover:text-white/80 transition-colors"
            >
              Contact Us
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-bg-dark flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="text-3xl font-display font-medium tracking-tight"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={copyContactEmail}
              className="btn-primary mt-4"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {copied && (
        <div className="fixed top-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-white/10 bg-black/85 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur-md">
          메일 주소가 클립보드에 복사되었습니다.
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section id="top" className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Cinematic Image */}
            <img 
              src={heroBg}
              alt="Production CEW hero background" 
              className="w-full h-full object-cover opacity-55 brightness-90 scale-110 blur-[0.5px]"
            />
            
            {/* Atmospheric Blobs */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[150px] animate-pulse delay-700" />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/40 via-transparent to-bg-dark" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_100%)]" />
          </div>
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="relative z-10 text-center max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8 glow-text break-keep">
              We capture the quiet tension of human existence <br />
              and the moments of choice.
            </h1>
            <p className="mx-auto max-w-xl text-lg text-brand-secondary md:text-xl font-light leading-relaxed mb-12">
              우리는 인간 존재의 고요한 긴장과 선택의 순간을 기록합니다. <br />
              Production CEW is a Seoul-based film production founded by three young filmmakers.
            </p>
            <a href="#works" className="btn-primary inline-flex items-center justify-center">
              View Our Works
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Scroll to explore</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-20"
            >
              <div>
                <div className="section-label">About</div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 glow-text">
                  A young film production built around questions, not formulas.
                </h2>
                <p className="text-brand-secondary text-lg leading-relaxed mb-8">
                  프로덕션 큐는 2022년에 설립된 청년 영화사입니다. 우리는 감정의
                  표면을 소비하는 이야기가 아니라, 인간의 내면과 존재의 구조를
                  들여다보는 영화를 만듭니다.
                </p>
                <div className="flex gap-4">
                  <a href="#works" className="btn-primary inline-flex items-center justify-center">View Works</a>
                  <button
                    type="button"
                    onClick={copyContactEmail}
                    className="btn-secondary inline-flex items-center justify-center"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-8">
                  <div className="text-xs uppercase tracking-widest text-white/40 mb-4">Who We Are</div>
                  <p className="text-sm text-brand-secondary leading-relaxed mb-4">
                    We create cinema that questions human existence through image, silence, tension, and the fragile structure of everyday life.
                  </p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    이미지와 침묵, 그 사이의 긴장감. 우리는 일상의 연약한 틈새를 통해 인간 존재의 본질에 질문을 던지는 영화를 지향합니다.
                  </p>
                </div>
                <div className="glass-card p-8">
                  <div className="text-xs uppercase tracking-widest text-white/40 mb-4">Why We Exist</div>
                  <p className="text-sm text-brand-secondary leading-relaxed mb-4">
                    We believe cinema can do more than tell a story. It can observe the quiet fractures of life.
                  </p>
                  <p className="text-sm text-white/60 leading-relaxed">
                    영화는 단순한 서사 그 이상의 가치를 지닌다고 믿습니다. 우리는 삶의 이면에 숨겨진 고요한 균열을 세밀하게 관찰하고 기록합니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-32 px-6 bg-white/[0.01]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="section-label">Team</div>
              <h2 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight glow-text">
                Three filmmakers, <br />
                <span className="text-white/40">one cinematic question.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-10 flex flex-col min-h-[340px]"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-8" />
                  <div className="text-xs text-white/40 mb-2 uppercase tracking-widest">{member.role}</div>
                  <h3 className="text-2xl font-bold mb-4">{member.name}</h3>
                  <p className="text-brand-secondary leading-relaxed text-sm">
                    {member.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Works Section */}
        <section id="works" className="py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="section-label">Works</div>
              <h2 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight glow-text">
                A portfolio of films <span className="text-white/40">shaped by tension, silence, and human contradiction.</span>
              </h2>
            </motion.div>

            <div className="w-full">
              {works.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6 max-w-6xl">
                  {works.map((work, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={`group text-left overflow-hidden rounded-[24px] border transition-all duration-500 ${
                        activeWork === idx
                          ? "bg-white/10 border-white/20"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                      }`}
                    >
                      <button type="button" onClick={() => setActiveWork(idx)} className="block w-full text-left">
                        <div className="aspect-[7/10] overflow-hidden bg-black/30">
                          <img
                            src={work.image}
                            alt={work.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="p-4 md:p-5">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className="bg-white/10 text-white border-white/20">{work.year}</Badge>
                            <Badge className="bg-white/10 text-white border-white/20">{work.format}</Badge>
                          </div>
                          <h3 className="text-xl font-bold mb-1">{work.title}</h3>
                          <p className="text-sm text-white/50 mb-3">{work.titleKo}</p>
                          <p className="text-sm text-brand-secondary leading-relaxed mb-4 line-clamp-3">
                            {work.description}
                          </p>
                          <div className="flex flex-col gap-1.5 text-sm text-white/70">
                            <div><span className="text-white/40">제작</span> {work.production}</div>
                            <div><span className="text-white/40">배급</span> {work.distribution}</div>
                          </div>
                        </div>
                      </button>
                      <div className="px-4 md:px-5 pb-4 md:pb-5">
                        <div className="flex flex-wrap gap-2">
                          {work.ott?.map((platform) => (
                            <a
                              key={platform.label}
                              href={platform.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75 hover:bg-white/10 transition-colors"
                            >
                              {platform.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-20 text-center">
                  <p className="text-xl text-white/40 italic">Portfolio coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Archive Section */}
        <section id="archive" className="py-32 px-6 bg-white/[0.01]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="section-label">Archive</div>
              <h2 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight glow-text">
                More than a filmography — <br />
                <span className="text-white/40">an evolving archive of images, process, and intent.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {archiveItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-10"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                      <Icon className="w-5 h-5 text-white/60" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-brand-secondary leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Perspective Section */}
        <section className="py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 md:p-20 flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="flex-1">
                <div className="section-label">Perspective</div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight glow-text">
                  We believe film is not only a medium of storytelling, but a way of asking.
                </h2>
              </div>
              <div className="flex-1">
                <p className="text-brand-secondary text-lg leading-relaxed">
                  우리는 보여주기 위한 감정보다 존재를 드러내는 순간에 집중합니다.
                  빠르게 소비되는 서사보다 오래 남는 질문을 택합니다. 프로덕션 큐의
                  작업은 완성된 답보다, 인간이 스스로를 바라보게 만드는 여운을
                  지향합니다.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-20"
            >
              <div>
                <div className="section-label">Contact</div>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-12 glow-text">
                  For collaboration, screenings, or festival inquiries.
                </h2>
                <div className="space-y-6">
                  <button type="button" onClick={copyContactEmail} className="w-full flex items-center justify-between p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group text-left">
                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-white/40" />
                      <span>j-yeonchan@production-cew.com</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="https://instagram.com/prod.cew" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-4">
                      <Instagram className="w-5 h-5 text-white/40" />
                      <span>@prod.cew</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              <div className="glass-card p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] -mr-32 -mt-32" />
                <h3 className="text-2xl font-bold mb-12">Production CEW builds cinema that lingers after the screen goes dark.</h3>
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Founded</div>
                    <div className="text-lg">2022</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Team</div>
                    <div className="text-lg">3 Filmmakers</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Focus</div>
                    <div className="text-lg">Human Existence</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Portfolio</div>
                    <div className="text-lg">Films / Archive</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/35 cursor-not-allowed opacity-70"
                    disabled
                    aria-disabled="true"
                    title="준비 중"
                  >
                    <Play className="w-4 h-4" /> Showreel (준비 중)
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/35 cursor-not-allowed opacity-70"
                    disabled
                    aria-disabled="true"
                    title="준비 중"
                  >
                    Download Portfolio (준비 중)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <div className="text-[10px] uppercase tracking-[0.35em] text-white/20">CEW</div>
            <p className="text-2xl md:text-3xl font-display font-semibold leading-tight glow-text">
              Cogito Exist We live
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed break-keep">
              사유하고, 존재하고, 살아가는 인간의 고요한 긴장을 기록합니다.
            </p>
            <p className="text-sm text-white/40 leading-relaxed">
              © 2026 Production CEW. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

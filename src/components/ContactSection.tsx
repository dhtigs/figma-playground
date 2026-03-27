import { useState } from "react";

const socials = [
  { name: "GitHub", url: "https://github.com", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { name: "Twitter", url: "https://twitter.com", icon: "x" },
  { name: "Dribbble", url: "https://dribbble.com", icon: "dribbble" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 px-4 md:px-8 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Left */}
        <div className="flex flex-col justify-between gap-12">
          <div>
            <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tighter text-foreground">
              Let's<br />
              <span className="text-outline">talk.</span>
            </h2>
            <p className="font-mono text-sm text-muted-foreground mt-6 max-w-sm leading-relaxed">
              Got a project in mind, a question, or just want to say hi? Drop me a line and I'll get back to you.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <a
              href="mailto:hello@andyreff.dev"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60"
            >
              hello@andyreff.dev
            </a>

            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.1] hover:scale-110 transition-all duration-300"
                  title={s.name}
                >
                  <img
                    src={`https://cdn.simpleicons.org/${s.icon}/ffffff`}
                    alt={s.name}
                    className="w-4 h-4"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Name
            </label>
            <input
              type="text"
              maxLength={100}
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="bg-transparent border-b border-white/[0.12] py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Your name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              maxLength={255}
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              className="bg-transparent border-b border-white/[0.12] py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Message
            </label>
            <textarea
              maxLength={1000}
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              className="bg-transparent border-b border-white/[0.12] py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
              placeholder="Tell me about your project..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="mt-4 self-start px-8 py-3 bg-foreground text-background font-mono text-sm font-bold tracking-wider uppercase rounded-full hover:scale-105 transition-transform disabled:opacity-60"
          >
            {submitted ? "✓ Sent!" : "Send message →"}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto mt-32 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Andy Reff. All rights reserved.
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          Designed & built with ♥
        </span>
      </div>
    </section>
  );
};

export default ContactSection;

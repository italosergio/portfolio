import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";
import { useLanguage } from "~/lib/LanguageContext";

const links = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    description: "+55 88 99469-3031",
    href: "https://wa.me/5588994693031",
    color: "bg-[#25D366] hover:bg-[#20BA5A]",
  },
  {
    icon: Mail,
    label: "Email",
    description: "italosergio1@gmail.com",
    href: "mailto:italosergio1@gmail.com",
    color: "bg-[#0891B2] hover:bg-[#0E7490]",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    description: "/in/italosergio",
    href: "https://www.linkedin.com/in/italosergio/",
    color: "bg-[#0A66C2] hover:bg-[#004182]",
  },
  {
    icon: Github,
    label: "GitHub",
    description: "italosergio",
    href: "https://github.com/italosergio",
    color: "bg-[#24292e] hover:bg-[#1a1e22]",
  },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contato" aria-labelledby="contact-title" className="relative py-20 md:py-32 px-4 bg-[#F9FAFB] dark:bg-[#1E293B]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-block px-4 py-2 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#0B5D1E] dark:text-[#10B981]">
              {t.contact.tag}
            </span>
          </div>
          <h2 id="contact-title" className="text-4xl md:text-5xl font-bold text-[#1F2937] dark:text-white mb-4">
            {t.contact.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} - ${link.description} (abre em nova aba)`}
              className="group p-6 bg-white dark:bg-[#0F172A] rounded-sm shadow-lg hover:shadow-xl transition-all text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${link.color} text-white rounded-sm mb-4`}>
                <link.icon className="w-6 h-6" />
              </div>
              <div className="font-bold text-[#1F2937] dark:text-white mb-1">{link.label}</div>
              <div className="text-xs text-[#6B7280] dark:text-[#94A3B8]">{link.description}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

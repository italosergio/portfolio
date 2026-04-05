import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";
import { useLanguage } from "~/lib/LanguageContext";

const links = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    description: "+55 88 99469-3031",
    detail: "Resposta rápida",
    href: "https://wa.me/5588994693031",
    color: "bg-[#25D366]",
    hoverColor: "hover:border-[#25D366]",
  },
  {
    icon: Mail,
    label: "Email",
    description: "italosergio1@gmail.com",
    detail: "Para propostas e parcerias",
    href: "mailto:italosergio1@gmail.com",
    color: "bg-[#0891B2]",
    hoverColor: "hover:border-[#0891B2]",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    description: "/in/italosergio",
    detail: "Networking profissional",
    href: "https://www.linkedin.com/in/italosergio/",
    color: "bg-[#0A66C2]",
    hoverColor: "hover:border-[#0A66C2]",
  },
  {
    icon: Github,
    label: "GitHub",
    description: "italosergio",
    detail: "Código aberto e projetos",
    href: "https://github.com/italosergio",
    color: "bg-[#24292e]",
    hoverColor: "hover:border-[#24292e]",
  },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contato" aria-labelledby="contact-title" className="relative py-20 md:py-32 px-4">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
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

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} - ${link.description} (abre em nova aba)`}
              className={`group flex items-center gap-5 p-6 bg-white dark:bg-[#0F172A] rounded-sm shadow-lg hover:shadow-xl border-2 border-transparent ${link.hoverColor} transition-all`}
            >
              <div className={`flex items-center justify-center w-14 h-14 ${link.color} text-white rounded-sm shrink-0`}>
                <link.icon className="w-7 h-7" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg text-[#1F2937] dark:text-white">{link.label}</div>
                <div className="text-sm text-[#6B7280] dark:text-[#94A3B8]">{link.description}</div>
                <div className="text-xs text-[#9CA3AF] dark:text-[#64748B] mt-1">{link.detail}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

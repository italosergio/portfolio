import { Mail, Linkedin, Github, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/5588994693031?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contato" aria-labelledby="contact-title" className="relative py-20 md:py-32 px-4 bg-white dark:bg-[#0F172A]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block px-4 py-2 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#0B5D1E] dark:text-[#10B981]">
              Vamos Conversar
            </span>
          </div>
          <h2 id="contact-title" className="text-4xl md:text-5xl font-bold text-[#1F2937] dark:text-white mb-4">
            Pronto para criar ou desenvolver algo com propósito?
          </h2>
        </div>

        {/* Links de Contato */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-2xl mx-auto px-4" role="list" aria-label="Links de contato">
          {/* WhatsApp - Backend */}
          <a
            href="https://wa.me/5588994693031"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-back-only contact-btn-whatsapp flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="WhatsApp - Italo Sergio (abre em nova aba)"
          >
            <MessageCircle className="w-7 h-7" aria-hidden="true" />
          </a>
          {/* Email - Backend */}
          <a
            href="mailto:italo@linuxmail.org"
            className="theme-back-only contact-btn-email flex items-center justify-center w-16 h-16 bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Email - italo@linuxmail.org"
          >
            <Mail className="w-7 h-7" aria-hidden="true" />
          </a>
          {/* LinkedIn - Backend */}
          <a
            href="https://www.linkedin.com/in/italosergio/"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-back-only contact-btn-linkedin flex items-center justify-center w-16 h-16 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="LinkedIn - Italo Sergio (abre em nova aba)"
          >
            <Linkedin className="w-7 h-7" aria-hidden="true" />
          </a>
          {/* GitHub - Backend */}
          <a
            href="https://github.com/italosergio"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-back-only contact-btn-github flex items-center justify-center w-16 h-16 bg-[#24292e] hover:bg-[#1a1e22] text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="GitHub - Italo Sergio (abre em nova aba)"
          >
            <Github className="w-7 h-7" aria-hidden="true" />
          </a>

          {/* WhatsApp - Frontend */}
          <a
            href="https://wa.me/5588994693031"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-front-only group relative overflow-hidden px-3 py-2 !bg-[#4ADE80] hover:!bg-[#22C55E] !text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-row items-center gap-1.5 whitespace-nowrap"
            aria-label="WhatsApp - Italo Sergio (abre em nova aba)"
          >
            <MessageCircle className="!text-white" strokeWidth={2} aria-hidden="true" />
          </a>

          {/* Email - Frontend */}
          <a
            href="mailto:italo@linuxmail.org"
            className="theme-front-only group relative overflow-hidden px-3 py-2 !bg-[#F87171] hover:!bg-[#EF4444] !text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-row items-center gap-1.5 whitespace-nowrap"
            aria-label="Email - italo@linuxmail.org"
          >
            <Mail className="!text-white" strokeWidth={2} aria-hidden="true" />
          </a>

          {/* LinkedIn - Frontend */}
          <a
            href="https://www.linkedin.com/in/italosergio/"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-front-only group relative overflow-hidden px-3 py-2 !bg-[#3B82F6] hover:!bg-[#2563EB] !text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-row items-center gap-1.5 whitespace-nowrap"
            aria-label="LinkedIn - Italo Sergio (abre em nova aba)"
          >
            <Linkedin className="!text-white" strokeWidth={2} aria-hidden="true" />
          </a>

          {/* GitHub - Frontend */}
          <a
            href="https://github.com/italosergio"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-front-only group relative overflow-hidden px-3 py-2 !bg-black hover:!bg-gray-900 !text-white !border-2 !border-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-row items-center gap-1.5 whitespace-nowrap"
            aria-label="GitHub - Italo Sergio (abre em nova aba)"
          >
            <Github className="!text-white" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        {/* Formulário de Contato */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulário de contato">
            <label htmlFor="message" className="sr-only">Mensagem</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Sua mensagem"
              rows={4}
              required
              aria-required="true"
              aria-describedby="message-help"
              className="w-full px-4 py-3 bg-white dark:bg-[#1E293B] border-2 border-[#D1D5DB] dark:border-[#374151] rounded-lg text-[#1F2937] dark:text-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0B5D1E] dark:focus:border-[#10B981] focus:ring-2 focus:ring-[#0B5D1E]/20 dark:focus:ring-[#10B981]/20 transition-all resize-none shadow-sm"
            />
            <span id="message-help" className="sr-only">Digite sua mensagem para entrar em contato via WhatsApp</span>
            <button
              type="submit"
              aria-label="Enviar mensagem via WhatsApp"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] !text-white rounded-lg transition-all font-medium shadow-lg hover:shadow-xl"
            >
              <Send className="!text-white" aria-hidden="true" />
              <span className="!text-white">Enviar via WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

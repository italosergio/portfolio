import { Leaf, Bike, Database, Target } from "lucide-react";

export default function About() {
  return (
    <section id="sobre" aria-labelledby="about-title" className="about-section relative py-20 md:py-32 px-4 overflow-hidden bg-[#F9FAFB] dark:bg-[#1E293B]">
      {/* Grid Pixelado - Azul Ciano */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Elementos geométricos de fundo - Verde e Azul */}
      <div className="absolute top-20 right-0 w-48 md:w-72 h-48 md:h-72 bg-[#10B981]/10 dark:bg-[#10B981]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 md:w-96 h-64 md:h-96 bg-[#06B6D4]/10 dark:bg-[#22D3EE]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Layout Assimétrico */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Lado Esquerdo - Foto com efeito */}
          <div className="relative order-2 md:order-1">
            <div className="relative">
              {/* Borda pixelada/glitch */}
              <div className="about-photo-border absolute -inset-4 bg-gradient-to-r from-[#0B5D1E] to-[#06B6D4] rounded-sm opacity-20 blur-xl" />
              <div className="relative aspect-square rounded-sm overflow-hidden shadow-2xl">
                <img
                  src="/profile.webp"
                  alt="Italo Sergio - Desenvolvedor Full Stack"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Elemento decorativo */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-[#0B5D1E] dark:border-[#10B981] rounded-sm" />
            </div>
          </div>

          {/* Lado Direito - Texto em camadas */}
          <div className="relative order-1 md:order-2 space-y-6">
            {/* Tag */}
            <div className="inline-block px-4 py-2 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 rounded-full">
              <span className="text-sm font-medium text-[#0B5D1E] dark:text-[#10B981]">
                Sobre Mim
              </span>
            </div>

            {/* Título */}
            <h2 id="about-title" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-[#1F2937] dark:text-white">
                Desenvolvedor com Propósito
              </span>
            </h2>

            {/* Descrição */}
            <div className="space-y-4 text-lg text-[#6B7280] dark:text-[#94A3B8]">
              <p>
                5 anos de experiência em <strong className="text-[#0B5D1E] dark:text-[#10B981]">desenvolvimento de plataformas</strong> que transformam dados públicos em ferramentas para políticas públicas sustentáveis.
              </p>
              <p>
                Especializado em <strong className="text-[#0B5D1E] dark:text-[#10B981]">mapas interativos, visualização de dados e acessibilidade</strong>, atuando com movimentos e organizações focados em mobilidade urbana e impacto social.
              </p>
            </div>

            {/* Valores */}
            <div className="grid grid-cols-2 gap-4 pt-6" role="list" aria-label="Valores principais">
              <div className="about-card p-4 bg-white dark:bg-[#0F172A] rounded-sm shadow-lg" role="listitem">
                <Leaf className="w-8 h-8 mb-2 text-[#0B5D1E] dark:text-[#10B981]" aria-hidden="true" />
                <div className="font-bold text-[#1F2937] dark:text-white">Sustentabilidade</div>
              </div>
              <div className="about-card p-4 bg-white dark:bg-[#0F172A] rounded-sm shadow-lg" role="listitem">
                <Bike className="w-8 h-8 mb-2 text-[#0B5D1E] dark:text-[#10B981]" aria-hidden="true" />
                <div className="font-bold text-[#1F2937] dark:text-white">Ativismo</div>
              </div>
              <div className="about-card p-4 bg-white dark:bg-[#0F172A] rounded-sm shadow-lg" role="listitem">
                <Database className="w-8 h-8 mb-2 text-[#0B5D1E] dark:text-[#10B981]" aria-hidden="true" />
                <div className="font-bold text-[#1F2937] dark:text-white">Dados Públicos</div>
              </div>
              <div className="about-card p-4 bg-white dark:bg-[#0F172A] rounded-sm shadow-lg" role="listitem">
                <Target className="w-8 h-8 mb-2 text-[#0B5D1E] dark:text-[#10B981]" aria-hidden="true" />
                <div className="font-bold text-[#1F2937] dark:text-white">Impacto Social</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

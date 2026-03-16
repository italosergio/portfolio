const skills = {
  frontend: ["React", "Remix", "Next.js", "TypeScript", "Tailwind CSS", "React Router"],
  backend: ["Node.js", "Express", "APIs REST", "Integração de dados", "Banco de dados", "Autenticação"],
  devops: ["Docker", "Vercel", "GitHub Actions", "Deploy", "CI/CD", "Infraestrutura"],
  qualidade: ["Testes Unitários", "Testes de Integração", "Code Review", "Debugging", "Documentação"],
  data: ["APIs de Dados Abertos", "Visualização de dados", "Mapas interativos"],
  metodologias: ["Metodologias Ágeis", "Sprints", "Trabalho em Grupo", "Colaboração"],
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-20 md:py-32 px-4 bg-[#F9FAFB] dark:bg-[#1E293B]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#0B5D1E] dark:text-[#10B981]">
              Habilidades
            </span>
          </div>
          <h2 id="skills-title" className="text-4xl md:text-5xl font-bold text-[#1F2937] dark:text-white mb-4">
            Stack Tecnológico
          </h2>
        </div>

        {/* Grid de Skills */}
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="p-6 bg-white dark:bg-[#0F172A] rounded-sm shadow-lg"
            >
              <h3 className="text-xl font-bold text-[#1F2937] dark:text-white mb-4 capitalize">
                {category === "frontend" && "Frontend"}
                {category === "backend" && "Backend"}
                {category === "devops" && "DevOps"}
                {category === "qualidade" && "Qualidade"}
                {category === "data" && "Dados"}
                {category === "metodologias" && "Metodologias"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 text-[#0B5D1E] dark:text-[#10B981] rounded-sm text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

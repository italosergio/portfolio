# AI Memory - Boas Práticas do Projeto

> Este arquivo serve como memória para assistentes de IA durante o desenvolvimento.
> Adicione aqui padrões, decisões e boas práticas adotadas no projeto.

## Convenções de Código

### Nomenclatura
- **Componentes**: PascalCase (ex: `HeroSection.tsx`)
- **Arquivos utilitários**: camelCase (ex: `formatDate.ts`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `API_BASE_URL`)
- **CSS classes**: Tailwind utility classes

### Estrutura de Componentes
```typescript
// Padrão de componente funcional
export default function ComponentName() {
  // 1. Hooks
  // 2. Funções auxiliares
  // 3. Return JSX
  return (
    <div>
      {/* Conteúdo */}
    </div>
  );
}
```

### TypeScript
- Sempre tipar props de componentes
- Usar `type` para props, `interface` para objetos complexos
- Evitar `any`, preferir `unknown` quando necessário

## Organização de Arquivos

### Rotas
- Arquivos de rota em `app/routes/`
- Usar nomenclatura do React Router v7
- Exemplo: `app/routes/projetos.tsx` → `/projetos`

### Componentes
- Componentes reutilizáveis em `app/components/`
- Componentes específicos de rota junto com a rota

### Estilos
- **Mobile First**: Sempre desenvolver pensando mobile primeiro
- Priorizar Tailwind classes
- CSS customizado apenas quando necessário em `app.css`
- Usar variáveis CSS para temas
- **Ícones**: Usar APENAS Lucide React - nunca SVG inline ou outras bibliotecas

### Paleta de Cores
- **Primary**: #0B5D1E (Verde floresta escuro) + #10B981 (Verde sustentável)
- **Secondary**: #06B6D4 (Azul ciano) + #0891B2 (Azul ciano escuro)
- **Neutral**: Branco (#FFFFFF) + Cinzas (#F9FAFB, #6B7280, #1F2937)
- **Accent**: #34D399 (Verde menta)
- **Dark Mode**: #0F172A (bg) + #1E293B (surface)
- **Tema**: Claro e escuro (toggle)

### Tipografia
- **Display**: Bitcount Single (títulos, estilo pixelado)
- **Body**: Karla (corpo de texto, UI)
- **Combinação**: Tech + Legibilidade

### Elementos Visuais
- **Bordas**: 3px arredondadas (rounded-sm)
- **Sombras**: Pronunciadas (shadow-lg, shadow-xl, shadow-2xl)
- **Espaçamento**: Médio (escala padrão Tailwind)
- **Ícones**: Lucide React

## Git e Versionamento

### Commits
- Mensagens em português
- Formato: `tipo: descrição curta`
- Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Branches
- `main`: produção
- `develop`: desenvolvimento
- `feature/nome`: novas funcionalidades
- `fix/nome`: correções

## Deploy

### Vercel
- Deploy automático do branch `main`
- Preview deploys para PRs
- Variáveis de ambiente no dashboard Vercel

## Performance

### Otimizações
- Lazy loading de imagens
- Code splitting por rota (automático no React Router)
- Minimizar re-renders desnecessários

## Acessibilidade

### Checklist
- [ ] Usar tags semânticas HTML
- [ ] Alt text em todas as imagens
- [ ] Contraste adequado de cores
- [ ] Navegação por teclado funcional
- [ ] ARIA labels quando necessário

## Identidade Visual

### Personalidade
- **Criativo e Inovador**: Design não convencional, layouts assimétricos
- **Sustentável**: Verde como cor principal, mensagem de propósito
- **Profissional**: Equilibrado para ativismo + mercado corporativo

### Sentimento
- **Admiração**: Design impactante e memorável
- **Confiança**: Profissionalismo e qualidade técnica
- **Carência/Propósito**: Conexão com causas sociais e sustentabilidade

### Estilo Visual
- **Minimalista Pixelado**: Inspiração em portfolios backend simples
- **Tech + Natureza**: Combinação de elementos tecnológicos com sustentabilidade
- **Grid Pixelado**: Elementos de fundo sutis
- **Glitch Effects**: Micro-animações em logo e imagens

## Internacionalização
- Suporte para PT e EN
- Estrutura preparada para i18n

## Decisões Arquiteturais

### Por que SPA?
- Simplicidade de deploy no Vercel
- Não há necessidade de SEO dinâmico (portfolio estático)
- Melhor experiência de navegação (sem reloads)

### Por que React Router v7?
- Framework moderno e performático
- Baseado em Vite (build rápido)
- Suporte nativo a TypeScript
- File-based routing

---

## Notas de Desenvolvimento

### 2025-01-23 - Setup Inicial
- Projeto configurado com React Router v7
- TailwindCSS 4 integrado
- Deploy configurado no Vercel (modo SPA)
- Repositórios antigos mesclados preservando histórico

### 2025-01-23 - Identidade Visual Definida
- **Personalidade**: Criativo, inovador, sustentável
- **Estilo**: Minimalista pixelado (inspiração backend portfolios)
- **Paleta**: Verde floresta (#0B5D1E) + Azul ciano (#06B6D4) + acentos
- **Tipografia**: Bitcount Single (títulos) + Karla (corpo)
- **REGRA IMPORTANTE**: Nunca misturar Bitcount Single e Karla no mesmo elemento ou frase. Cada elemento deve usar apenas uma fonte.
- **Elementos**: Bordas 3px, sombras pronunciadas, espaçamento médio
- **Ícones**: Lucide React
- **Público**: Movimentos ativistas + empresas/freelance
- **Mensagem**: Inovação com propósito sustentável
- Mobile First como abordagem principal
- Tema claro/escuro implementado
- i18n PT/EN planejado

---

**Última atualização**: 2025-01-23

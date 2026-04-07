# AI Memory - Boas Práticas do Projeto

> Este arquivo serve como memória para assistentes de IA durante o desenvolvimento.
> Adicione aqui padrões, decisões e boas práticas adotadas no projeto.

## Regras de Desenvolvimento

- **Nunca usar emoticons/emojis** em textos de UI (toasts, labels, tags, placeholders). Sempre usar texto limpo com icones Lucide quando necessario.
- **Versionamento semver v3.X.Y** — ver processos CDRV e CDGV na secao "Git e Versionamento". CDGV e o padrao.
- **Modais devem bloquear scroll da pagina** — ao abrir modal, setar `document.body.style.overflow = "hidden"` e restaurar ao fechar. Scroll deve funcionar apenas dentro do modal.

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

### CDRV — Commit Detalhado por Responsabilidade e Versionamento

Processo padrao de commit do projeto. **SEMPRE** seguir esta ordem:

1. **Agrupar mudancas por responsabilidade** — cada commit deve conter apenas arquivos relacionados a uma unica responsabilidade (ex: componente novo, lib, integracao, docs)
2. **Commits detalhados** — mensagem com titulo conventional commit + corpo listando cada mudanca relevante
3. **Ultimo commit: versionamento** — OBRIGATORIO, sempre o ultimo commit da sequencia, contendo:
   - Bump de `version` no `package.json`
   - Bump de `APP_VERSION` em `app/components/VersionBadge.tsx`
   - Nova entrada no array `changelog` do VersionBadge com data, versao e descricao resumida que cubra TODAS as mudancas da sequencia
   - Mensagem: `chore: bump version to X.Y.Z`

### CDGV — Commit Detalhado Granular Versionado (PREFERIDO)

Variante granular do CDRV. **Usar por padrao** salvo instrucao contraria.

Diferenca do CDRV: em vez de agrupar por responsabilidade, cada mudanca individual vira um commit separado. Mais commits, mais granularidade, mais versoes no historico.

1. **Um commit por mudanca individual** — cada funcionalidade, fix, ajuste ou melhoria pontual e um commit isolado, mesmo que sejam do mesmo arquivo ou componente
2. **Commits detalhados** — mensagem com titulo conventional commit + corpo explicando a mudanca especifica
3. **Ultimo commit: versionamento** — OBRIGATORIO, mesmo regras do CDRV
   - Cada commit da sequencia gera uma entrada individual no changelog do VersionBadge
   - Se a sequencia tem 5 commits, o changelog ganha 5 novas versoes (cada uma com seu PATCH/MINOR)

Regras de versao (semver):
- **PATCH** (3.3.X): fixes, melhorias pontuais, ajustes de UI
- **MINOR** (3.X.0): funcionalidades novas significativas
- **MAJOR** (X.0.0): redesign total

**IMPORTANTE — Erros a evitar:**
- **NUNCA commitar sem versionar** — nao importa se o CDRV/CDGV ainda nao existia, se houve commits, deve haver bump. Sem excecao.
- **A versao deve refletir TUDO que entrou** — analisar todos os commits da sequencia pra decidir se e PATCH, MINOR ou MAJOR. Se tem feat novo significativo, e MINOR no minimo.
- **O changelog deve descrever o conjunto** — nao apenas o ultimo fix, mas todas as mudancas desde a ultima versao.

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

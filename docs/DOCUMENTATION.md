# Documentação Geral do Portfolio

## 1. Visão Geral

Portfolio pessoal desenvolvido para apresentar projetos, habilidades e experiências profissionais.

## 2. Arquitetura

### 2.1 Tipo de Aplicação
- **SPA (Single Page Application)** - Aplicação de página única
- **Client-Side Rendering** - Renderização no lado do cliente

### 2.2 Estrutura de Pastas
```
portfolio_v2/
├── app/                    # Código fonte da aplicação
│   ├── routes/            # Rotas da aplicação
│   ├── welcome/           # Componentes de boas-vindas
│   ├── root.tsx           # Componente raiz
│   ├── routes.ts          # Configuração de rotas
│   └── app.css            # Estilos globais
├── public/                # Arquivos estáticos
├── docs/                  # Documentação do projeto
├── build/                 # Build de produção (gerado)
└── vercel.json            # Configuração de deploy
```

## 3. Stack Tecnológica

### 3.1 Framework e Bibliotecas Core
- **React Router v7.12.0** - Framework principal (baseado em React)
- **React 19.2.3** - Biblioteca UI
- **TypeScript 5.9.2** - Linguagem de programação

### 3.2 Build Tools
- **Vite 7.1.7** - Build tool e dev server
- **@react-router/dev** - Ferramentas de desenvolvimento

### 3.3 Estilização
- **TailwindCSS 4.1.13** - Framework CSS utility-first
- **@tailwindcss/vite** - Plugin Vite para Tailwind

### 3.4 Utilitários
- **isbot** - Detecção de bots
- **vite-tsconfig-paths** - Suporte a path aliases

## 4. Configurações

### 4.1 React Router Config
```typescript
{
  ssr: false  // Modo SPA (sem server-side rendering)
}
```

### 4.2 Vite Config
- Plugin TailwindCSS
- Plugin React Router
- Plugin TSConfig Paths

### 4.3 Deploy
- **Plataforma**: Vercel
- **Configuração**: Rewrite de todas as rotas para `/index.html`

## 5. Scripts Disponíveis

```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Gera build de produção
npm run start      # Inicia servidor de produção
npm run typecheck  # Verifica tipos TypeScript
```

## 6. Fontes
- **Bitcount Single** - Títulos (estilo pixelado/display)
- **Karla** - Corpo de texto (sans-serif legível)

## 7. Navegadores Suportados
- Navegadores modernos com suporte a ES6+
- Chrome, Firefox, Safari, Edge (versões recentes)

## 8. Estrutura do Portfolio

### 8.1 Seções
1. **Hero** - Minimalista, elegante e impactante
2. **Sobre Mim** - Layout inovador (não convencional) com imagem e texto
3. **Projetos** - Grid com filtros por tecnologia
4. **Habilidades/Skills** - Principais tecnologias 2025 (React Router, Remix, Next, TypeScript, Frontend, Backend, DevOps)
5. **Comentários** - Carousel com nome da empresa, comentário e autor
6. **Contato** - Seção simples e intuitiva com formulário funcional

### 8.2 Design System

#### Identidade Visual
- **Personalidade**: Criativo, inovador, sustentável
- **Sentimento**: Admiração, confiança e carência (propósito)
- **Estilo**: Minimalista pixelado com propósito sustentável
- **Público**: Movimentos ativistas + empresas/freelance

#### Paleta de Cores
```css
/* Tema Claro */
--primary: #0B5D1E        /* Verde floresta escuro */
--primary-light: #10B981  /* Verde sustentável */
--secondary: #06B6D4      /* Azul ciano (piscina) */
--secondary-dark: #0891B2 /* Azul ciano escuro */
--neutral-white: #FFFFFF  /* Branco puro */
--neutral-light: #F9FAFB  /* Cinza muito claro */
--neutral: #6B7280        /* Cinza médio */
--neutral-dark: #1F2937   /* Cinza escuro */
--accent: #34D399         /* Verde menta (destaque) */

/* Tema Escuro */
--dark-bg: #0F172A        /* Azul escuro profundo */
--dark-surface: #1E293B   /* Azul escuro médio */
--dark-primary: #10B981   /* Verde brilhante */
--dark-secondary: #22D3EE /* Azul ciano brilhante */
```

#### Tipografia
- **Display/Títulos**: Bitcount Single (Google Fonts)
  - Peso: 400-900
  - Uso: H1, H2, H3, elementos de destaque
  - Estilo: Pixelado, tech, inovador
  
- **Corpo**: Karla (Google Fonts)
  - Peso: 200-800
  - Uso: Parágrafos, textos corridos, UI
  - Estilo: Limpo, legível, profissional

#### Elementos Visuais
- **Bordas**: 3px arredondadas (rounded-sm no Tailwind)
- **Sombras**: Pronunciadas para profundidade
  - `shadow-lg`: Elementos principais
  - `shadow-xl`: Cards em destaque
  - `shadow-2xl`: Modais e overlays
- **Espaçamento**: Médio (escala padrão Tailwind)
- **Ícones**: Lucide React (outline style)
- **Imagens**: Fotos reais + ilustrações quando necessário

### 8.3 Animações
- **Hover**: Transições suaves (duration-300)
- **Header**: 
  - Inicia transparente com backdrop-blur
  - Logo com animação ao scroll
  - Transição suave para fundo sólido
- **Transições**: Entre seções (fade, slide)
- **Micro-interações**: Botões, cards, links
- **Estilo**: Sutis mas perceptíveis, reforçando o tema tech/pixelado

### 8.4 Responsividade
- **Abordagem**: Mobile First
- **Breakpoints**: Mobile, Tablet, Desktop
- Design otimizado para todos os dispositivos

### 8.5 Funcionalidades

#### Formulário de Contato
- Email de envio: `italo@linuxmail.org`
- Validação de campos
- Feedback visual de envio

#### Filtros de Projetos
- Filtrar por tecnologia
- Transições suaves entre filtros

#### Internacionalização
- Português (PT)
- Inglês (EN)
- Toggle de idioma no header

### 8.6 Gerenciamento de Conteúdo
- **Atual**: Dados hardcoded
- **Futuro**: Estrutura preparada para integração com CMS nativo

## 9. Header/Navbar
- Inicia transparente na seção Hero (backdrop-blur)
- Navbar sempre visível
- Logo com animação ao scroll (efeito pixelado/glitch sutil)
- Muda de aparência ao sair da seção Hero (fundo sólido)
- Toggle de tema (claro/escuro)
- Toggle de idioma (PT/EN)

## 10. Seção Hero
- **Estilo**: Minimalista, elegante, impactante
- **Elementos**:
  - Grid pixelado animado no fundo (sutil)
  - Gradiente verde → azul (tema sustentabilidade + tech)
  - Título com fonte Bitcount Single
  - CTA claro e direto
  - Scroll indicator animado
- **Mensagem**: Inovação + propósito sustentável

## 11. Seção Sobre Mim (Layout Inovador)
- **Conceito**: Layout assimétrico/diagonal
- **Elementos**:
  - Foto com borda pixelada/glitch effect
  - Texto em camadas sobrepostas
  - Elementos geométricos de fundo
  - Destaque para valores: sustentabilidade, inovação, impacto social
- **Não convencional**: Quebra de grid tradicional

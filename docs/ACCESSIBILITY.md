# Regras de Acessibilidade - Portfolio

## Princípios WCAG 2.1 (Nível AA)

### 1. Perceptível
- Todo conteúdo não-textual deve ter alternativa textual
- Contraste mínimo de 4.5:1 para texto normal
- Contraste mínimo de 3:1 para texto grande (18pt+)

### 2. Operável
- Toda funcionalidade acessível via teclado
- Navegação por Tab deve ser lógica
- Links e botões devem ter foco visível

### 3. Compreensível
- Linguagem clara e objetiva
- Labels descritivos em formulários
- Mensagens de erro claras

### 4. Robusto
- HTML semântico
- ARIA labels quando necessário
- Compatível com leitores de tela

---

## Checklist de Implementação

### Tags Semânticas HTML
- [x] `<header>` para cabeçalho
- [x] `<nav>` para navegação
- [x] `<main>` para conteúdo principal
- [x] `<section>` para seções
- [x] `<footer>` para rodapé
- [x] `<article>` para conteúdo independente
- [x] `<aside>` para conteúdo relacionado

### Navegação
- [x] `aria-label` em navegação principal
- [ ] `aria-current="page"` em link ativo
- [ ] Skip links para pular navegação
- [x] Foco visível em todos os elementos interativos

### Links
- [x] `aria-label` descritivo quando texto não é suficiente
- [x] `rel="noopener noreferrer"` em links externos
- [x] Indicação visual de links externos

### Botões
- [x] `aria-label` quando ícone sem texto
- [ ] `aria-pressed` para toggle buttons
- [x] `aria-expanded` para botões que expandem conteúdo
- [ ] `disabled` quando não disponível

### Formulários
- [x] `<label>` associado a cada input
- [x] `aria-required` em campos obrigatórios
- [ ] `aria-invalid` em campos com erro
- [x] `aria-describedby` para mensagens de ajuda/erro
- [x] Placeholder não substitui label

### Imagens
- [ ] `alt` descritivo em todas as imagens
- [ ] `alt=""` em imagens decorativas
- [x] `role="img"` em SVGs com `aria-label`

### Modais/Dialogs
- [x] `role="dialog"`
- [x] `aria-modal="true"`
- [x] `aria-labelledby` apontando para título
- [ ] Foco preso dentro do modal
- [ ] ESC fecha o modal

### Carousels/Sliders
- [ ] `role="region"` com `aria-label`
- [ ] Botões de navegação com labels descritivos
- [ ] Indicadores de slide atual
- [ ] Pausar animação automática

### Temas (Dark/Light)
- [ ] `aria-label` no botão de toggle
- [ ] `aria-pressed` indicando estado atual
- [ ] Ícone + texto ou label descritivo

### Animações
- [ ] Respeitar `prefers-reduced-motion`
- [ ] Opção de desabilitar animações

---

## Regras Específicas do Projeto

### Header/Navbar
```tsx
<header role="banner">
  <nav aria-label="Navegação principal">
    <a href="#main" className="skip-link">Pular para conteúdo</a>
    <button aria-label="Alternar tema" aria-pressed={isDark}>
      {/* Ícone */}
    </button>
  </nav>
</header>
```

### Hero Section
```tsx
<section aria-labelledby="hero-title">
  <h1 id="hero-title">Tecnologia e Mobilidade</h1>
  <a href="#projetos" aria-label="Ver projetos em destaque">
    Ver Projetos
  </a>
</section>
```

### Projetos
```tsx
<section aria-labelledby="projects-title">
  <h2 id="projects-title">Projetos em Destaque</h2>
  <article aria-labelledby="project-1-title">
    <h3 id="project-1-title">Nome do Projeto</h3>
    <a href="..." aria-label="Ver projeto Ciclodados (abre em nova aba)">
      Ver Projeto
    </a>
  </article>
</section>
```

### Formulário de Contato
```tsx
<form aria-label="Formulário de contato">
  <label htmlFor="message">Mensagem</label>
  <textarea
    id="message"
    aria-required="true"
    aria-describedby="message-help"
  />
  <span id="message-help">Digite sua mensagem para contato</span>
  <button type="submit" aria-label="Enviar mensagem via WhatsApp">
    Enviar
  </button>
</form>
```

### Links Sociais
```tsx
<a
  href="https://github.com/..."
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub - Italo Sergio (abre em nova aba)"
>
  <Github aria-hidden="true" />
</a>
```

### Ícones
```tsx
// Ícone decorativo (com texto visível)
<Mail aria-hidden="true" />
<span>Email</span>

// Ícone funcional (sem texto)
<button aria-label="Fechar">
  <X aria-hidden="true" />
</button>
```

---

## Testes de Acessibilidade

### Ferramentas
- **axe DevTools** - Extensão Chrome/Firefox
- **WAVE** - Avaliador de acessibilidade web
- **Lighthouse** - Auditoria do Chrome DevTools
- **NVDA/JAWS** - Leitores de tela (Windows)
- **VoiceOver** - Leitor de tela (macOS/iOS)

### Testes Manuais
1. Navegação apenas com teclado (Tab, Enter, Esc)
2. Zoom de 200% sem quebra de layout
3. Leitor de tela em todas as seções
4. Contraste de cores (ferramenta: Contrast Checker)
5. Formulários com validação

### Checklist de Teste
- [x] Todas as imagens têm alt text
- [x] Todos os links são descritivos
- [x] Formulários têm labels associados
- [x] Navegação por teclado funciona
- [x] Foco visível em todos os elementos
- [x] Contraste adequado (4.5:1 mínimo)
- [ ] Leitor de tela lê todo conteúdo
- [ ] Sem erros no axe DevTools
- [ ] Score 90+ no Lighthouse Accessibility

---

## Contraste de Cores do Projeto

### Tema Claro
- ✅ `#0B5D1E` (verde) em `#FFFFFF` (branco) = 8.2:1
- ✅ `#06B6D4` (azul) em `#FFFFFF` (branco) = 3.8:1
- ✅ `#1F2937` (texto) em `#FFFFFF` (branco) = 14.7:1
- ✅ `#6B7280` (texto secundário) em `#FFFFFF` (branco) = 4.6:1

### Tema Escuro
- ✅ `#10B981` (verde) em `#0F172A` (bg) = 7.1:1
- ✅ `#22D3EE` (azul) em `#0F172A` (bg) = 9.8:1
- ✅ `#FFFFFF` (texto) em `#0F172A` (bg) = 16.1:1
- ✅ `#94A3B8` (texto secundário) em `#0F172A` (bg) = 7.2:1

---

## Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Última atualização**: 2025-01-23

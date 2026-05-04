# Planejamento — Portfólio de Sites

## Visão Geral

Desenvolvimento de 3 sites de portfólio com foco em qualidade, acessibilidade e responsividade.
Hospedagem prevista no **GitHub Pages**.

**Stack:** Vanilla HTML + CSS + JavaScript  
**Estrutura:** Multi-página  
**Idioma dos arquivos/pastas:** Inglês  
**Idioma do conteúdo:** Inglês (divulgação na Workana — plataforma internacional)  

---

## Sites

### Site 1 — Escritório de Advocacia (`law-firm/`)

**Nome fictício:** Langford & Associates  
**Especialidade:** Corporate Law  
**Tom visual:** Sofisticado, premium, corporativo — fundo escuro no header/hero, claro nas seções internas

#### Identidade Visual

| Papel | Cor | Hex |
|---|---|---|
| Primária (fundo escuro) | Azul contemporâneo | `#0F2340` |
| Secundária (decoração) | Dourado suave | `#C9A84C` |
| Neutro claro (fundos) | Off-white | `#F5F3EE` |
| Texto principal | Cinza escuro | `#1C1C1C` |
| Texto secundário | Cinza médio | `#6B6B6B` |

> ⚠️ O dourado `#C9A84C` não passa WCAG AA sobre fundos claros — usar **apenas como elemento decorativo, bordas e títulos grandes**. Botões CTA usam dourado com texto escuro para garantir contraste.

#### Tipografia (Google Fonts)

| Papel | Fonte | Estilo |
|---|---|---|
| Títulos | **Playfair Display** | Serifada, elegante, clássica |
| Corpo / UI | **Inter** | Sem serifa, legível, moderna |

#### Páginas

| Página | Status | Seções principais |
|---|---|---|
| `index.html` | ✅ Completo | Hero (hero-bg.jpg), Áreas de atuação (6 cards), Diferenciais, CTA Contato |
| `about.html` | ✅ Completo | Page Hero + breadcrumb, Nossa história + grid de stats (20+/500+/98%/12), Valores (3 cards), Advogados (3 cards com foto) |
| `practice-areas.html` | ✅ Completo | Page Hero, 6 seções alternadas (Corporate, M&A, Contracts, Litigation, Compliance, IP), cada com ícone + lista + número decorativo (01–06) |
| `blog.html` | ✅ Completo | Page Hero, card destaque, grid de 3 artigos, CTA Banner |
| `blog-post.html` | ✅ Completo | Page Hero com breadcrumb+autor, corpo do artigo, sidebar (autor, links, CTA), seção Mais Artigos |
| `contact.html` | ✅ Completo | Page Hero, grid 2 colunas (info + mapa / formulário com validação JS acessível) |

#### Imagens utilizadas

| Arquivo | Descrição | Fonte |
|---|---|---|
| `assets/images/hero/hero-bg.jpg` | Sala de reuniões minimalista | Benjamin Child — Unsplash |
| `assets/images/team/attorney-1.jpg` | Homem senior em terno (Richard Langford) | Pexels |
| `assets/images/team/attorney-2.jpg` | Mulher profissional (Margaret Ashford) | Pexels |
| `assets/images/team/attorney-3.jpg` | Homem com óculos (Daniel Grant) | Pexels |

#### Funcionalidades JS (`assets/js/main.js`)

- `loadPartial()` — carrega header/footer via `fetch()`
- `setActiveNav()` — marca link ativo baseado na URL atual
- `initMobileNav()` — menu hamburger com suporte a teclado e Escape
- `setFooterYear()` — ano dinâmico no footer
- `initContactForm()` — validação de formulário com ARIA live regions

#### Internacionalização (`assets/js/i18n.js`)

Suporte a múltiplos idiomas via arquivos JSON, sem dependências externas.

| Item | Detalhe |
|---|---|
| Idiomas disponíveis | Inglês (`en-us`) e Português Brasil (`pt-br`) |
| Arquivos de tradução | `assets/i18n/en-us.json`, `assets/i18n/pt-br.json` |
| Seleção de idioma | Botões com bandeiras no header (🇺🇸 / 🇧🇷), persistidos via `localStorage` |
| Tradução de texto | Atributo `data-i18n="chave"` nos elementos HTML |
| Tradução de atributos | Atributo `data-i18n-attr="atributo:chave"` (ex: `aria-label`, `placeholder`) |
| Idioma padrão | `en-us` (detectado automaticamente pelo navegador) |
| Escopo | Todas as 6 páginas + partials de header e footer |

---

### Site 2 — Escola de Idiomas (`language-school/`)

**Tom visual:** Moderno, jovial, colorido, acolhedor

| Página | Seções principais |
|---|---|
| `index.html` | Hero com CTA, cursos em destaque, depoimentos, professores, parceiros |
| `courses.html` | Cards de idiomas disponíveis, níveis, carga horária, preço |
| `about.html` | História da escola, metodologia, equipe de professores |
| `blog.html` | Listagem de dicas de aprendizado |
| `blog-post.html` | Template de artigo individual |
| `contact.html` | Formulário de matrícula/contato, localização, redes sociais |

---

### Site 3 — Landing Page: Consultoria de Acessibilidade (`a11y-consulting/`)

**Tom visual:** Tech, moderno — a própria página é a vitrine das boas práticas  
**Estrutura:** Single page (landing page)

| Seção | Objetivo |
|---|---|
| Hero | Proposta de valor clara, CTA principal |
| Problema | Por que acessibilidade importa (dados, legislação brasileira) |
| Serviços | Auditoria, correção, treinamento, laudo técnico |
| Como funciona | Processo em etapas (timeline visual) |
| Depoimentos | Prova social |
| Sobre | Quem é o consultor |
| CTA Final + Contato | Formulário ou link para WhatsApp/email |

**Requisitos técnicos obrigatórios:**
- Skip links
- ARIA labels em todos os elementos interativos
- Contraste WCAG AA/AAA
- Totalmente navegável por teclado
- `prefers-reduced-motion` respeitado
- Botão de toggle de alto contraste

---

## Estrutura de Pastas

```
sites/
├── PLANNING.md
├── law-firm/
│   ├── index.html
│   ├── about.html
│   ├── practice-areas.html
│   ├── blog.html
│   ├── blog-post.html
│   ├── contact.html
│   └── assets/
│       ├── css/
│       │   └── style.css
│       ├── js/
│       │   └── main.js
│       └── images/
│           ├── hero/
│           └── team/
│
├── language-school/
│   ├── index.html
│   ├── courses.html
│   ├── about.html
│   ├── blog.html
│   ├── blog-post.html
│   ├── contact.html
│   └── assets/
│       ├── css/
│       │   └── style.css
│       ├── js/
│       │   └── main.js
│       └── images/
│           ├── hero/
│           ├── courses/
│           └── team/
│
└── a11y-consulting/
    ├── index.html
    └── assets/
        ├── css/
        │   └── style.css
        ├── js/
        │   └── main.js
        └── images/
            └── illustrations/
```

---

## Recursos e Bibliotecas

| Recurso | Fonte | Estratégia |
|---|---|---|
| Ícones | Phosphor Icons | CDN externo |
| Fontes | Google Fonts | CDN externo |
| Fotos | Unsplash / Pexels | Baixar e hospedar no projeto |
| Ilustrações SVG | unDraw | Baixar e hospedar no projeto |
| Fotos placeholder (dev) | Picsum Photos | URL direta (apenas durante desenvolvimento) |

**Créditos:** Atribuir nos comentários do HTML e no rodapé de cada site.

---

## Características Gerais (todos os sites)

- Design **moderno** e **responsivo** (mobile-first)
- **Acessibilidade** (WCAG AA no mínimo)
- **SEO** — semântica HTML5, meta tags (title, description, og), headings hierárquicos, alt em imagens
- Menu mobile com hamburger
- Formulário de contato com validação client-side
- Cada site tem identidade visual própria alinhada ao seu nicho

---

## A Definir

### law-firm ✅ CONCLUÍDO

### language-school
- [ ] Nome fictício
- [ ] Paleta de cores
- [ ] Tipografia
- [ ] Seleção de fotos
- [ ] Textos de conteúdo fictício

### a11y-consulting
- [ ] Nome fictício
- [ ] Paleta de cores
- [ ] Tipografia
- [ ] Seleção de ilustrações (unDraw)
- [ ] Textos de conteúdo fictício

### Geral
- [ ] Padrão de mensagens de commit por site (ex: `feat(law-firm): ...`)

---

## Ordem de Desenvolvimento (proposta)

1. `law-firm` — Escritório de Advocacia ✅ **CONCLUÍDO**
2. `language-school` — Escola de Idiomas
3. `a11y-consulting` — Consultoria de Acessibilidade

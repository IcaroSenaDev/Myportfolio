# Icaro Sena — Portfólio

Portfólio pessoal desenvolvido para apresentar minha trajetória, projetos e formas de contato. Construído com HTML, CSS e JavaScript puro, sem frameworks ou build tools. Visual escuro com identidade tech (azul/ciano), pensado para transmitir um perfil profissional voltado a tecnologia.

## Sobre

Sou estudante de Engenharia de Software (UCSAL) e Técnico em Análise e Desenvolvimento de Sistemas (SENAI CIMATEC), atuando como Jovem Aprendiz em TI em Salvador (BA). Tenho experiência prática em suporte técnico e infraestrutura, base em lógica de programação e já trabalhei com HTML, CSS, JavaScript, Java, React e Node.js. Atualmente estou aprofundando conhecimento em Python e Flask para o desenvolvimento de projetos próprios, além de empreender em automação com IA e e-commerce.

**Acesse o portfólio:** [icarosenadev.github.io/Myportfolio](https://icarosenadev.github.io/Myportfolio)

---

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
|---|---|
| HTML5 | Estrutura semântica das páginas |
| CSS3 | Estilização, variáveis de tema, responsividade e media queries |
| JavaScript + jQuery | Menu mobile, scroll spy e modal de seleção de idioma do CV |
| Font Awesome | Ícones de navegação, redes sociais e seções |

---

## Funcionalidades

- **Navegação responsiva** com menu dedicado para dispositivos móveis
- **Destaque automático da seção ativa** no menu conforme o scroll (Intersection Observer)
- **Download do currículo em PT ou EN** via modal de seleção de idioma
- **Paleta de tema centralizada** em variáveis CSS (`:root`) para fácil manutenção
- **Seções principais:**
  - `Início` — apresentação e título profissional
  - `Projetos` — projetos em destaque, incluindo os que estão em desenvolvimento atualmente
  - `Sobre` — trajetória acadêmica e profissional

---

## Estrutura de arquivos

```
Myportfolio/
├── index.html
├── README.md
└── src/
    ├── styles/
    │   ├── styles.css      # importa os demais arquivos CSS, paleta de cores (:root) e estilos globais
    │   ├── header.css      # navbar e menu mobile
    │   ├── home.css        # seção inicial
    │   ├── projeto.css     # cards de projetos
    │   ├── sobre.css       # seção sobre
    │   ├── footer.css      # rodapé e redes sociais
    │   └── cv-modal.css    # modal de seleção de idioma do currículo
    ├── javascript/
    │   └── script.js       # interatividade (menu mobile, scroll spy, modal do CV)
    ├── images/
    │   └── wave.svg         # onda decorativa do rodapé (gradiente azul/ciano)
    └── cv/
        ├── Currículo-IcaroBonfimdeSena.pdf   # versão em português
        └── Icaro_Sena_Resume_EN.pdf           # versão em inglês
```

---

## Paleta de cores

Definida em `src/styles/styles.css`, dentro de `:root`, para fácil ajuste:

| Variável | Uso |
|---|---|
| `--bg-primary` | Fundo principal (quase preto, levemente azulado) |
| `--bg-secondary` | Fundo de seções alternadas |
| `--bg-elevated` | Cards e elementos elevados (modal, project-card) |
| `--accent` | Azul/ciano de destaque (links ativos, ícones, botões) |
| `--text-primary` / `--text-secondary` | Hierarquia de texto |

---

## Como executar localmente

```bash
git clone https://github.com/IcaroSenaDev/Myportfolio.git
cd Myportfolio
```

Em seguida, abra o `index.html` diretamente no navegador, ou use uma extensão como **Live Server** (VS Code) para servir o projeto localmente com recarregamento automático.

---

## Projetos em destaque

### Em desenvolvimento

- **CFSB** — Sistema profissional de gestão de estoque de segurança para equipamentos críticos. Em construção com Python e Flask.
- **Mova IA** — Agência de automação com IA voltada para pequenos negócios locais (barbearias e salões de beleza) em Salvador.

### Concluídos

- **[TCC — Central de Monitoramento IoT](https://lnkd.in/dmbFNsdH)** — Coleta de dados de sensores via ESP32 e módulo NRF24L01, envio em tempo real para banco de dados em nuvem (Supabase) e visualização em dashboard com React.js.
- **[Sistema de Gestão de Estoque (Java)](https://github.com/OsManoDaDS/projetosenai.git)** — Interface gráfica para gerenciamento de estoque, com NetBeans e MySQL.
- **[Comércio Online (Android Studio & Firebase)](https://github.com/IcaroSenaDev/ComercioOnlineDS.git)** — Aplicativo de e-commerce integrado com Firebase.
- **[Landing Page (HTML, CSS, JS)](https://github.com/IcaroSenaDev/projeto-landingpage.git)** — Página inicial responsiva com interação via jQuery.
- **[Bitwave](https://github.com/OsManoDaDS/bitwave.git)** — Aplicação com React, Prisma, MongoDB e Node.js.
- **[Bitwave — Tomada Inteligente](https://github.com/Tomada-Inteligente/dashboard-tomada.git)** — Dashboard de IoT com React, Prisma, MongoDB e Node.js.

---

## Contato

- **WhatsApp:** [Clique aqui](https://wa.me/5571992546793)
- **LinkedIn:** [Icaro Bonfim de Sena](https://www.linkedin.com/in/icaro-bonfim-de-sena)
- **GitHub:** [IcaroSenaDev](https://github.com/IcaroSenaDev)

---

## Licença

Este projeto é de uso pessoal. Sinta-se livre para se inspirar na estrutura, mas evite copiar o conteúdo pessoal (textos, currículo) diretamente.

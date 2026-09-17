# Icaro Sena — Portfólio

Portfólio de Icaro Bonfim de Sena, com identidade em **preto e azul-escuro**, tipografia editorial e uma composição 3D interativa. HTML, CSS e JavaScript nativos; nenhuma dependência de execução ou CDN.

**Endereço do portfólio:** [icarosenadev.github.io/Myportfolio](https://icarosenadev.github.io/Myportfolio)

## Sobre

Estudante de Engenharia de Software na UCSAL (2025–atual) e Técnico em Análise e Desenvolvimento de Sistemas pelo SENAI CIMATEC (2023–2025, concluído). Jovem Aprendiz na área de TI da Global Manutenções e Construções desde julho de 2025, em Salvador. Atua em suporte técnico, hardware, software, inventário de ativos e redes, e desenvolve projetos próprios full stack com Python, Flask, JavaScript e React. Também explora automação com IA e e-commerce.

O currículo `src/cv/Curriculo_Icaro_Bonfim_de_Sena.pdf` é a fonte da atualização profissional. O site inclui experiência, formação, habilidades, cursos complementares e formas de contato. A versão inglesa anterior é mantida e identificada como anterior, sem tradução ou atualização presumida.

## Experiência visual e funcionalidades

- Preto, azul-marinho e azuis de destaque, com variáveis de tema centralizadas.
- Escultura geométrica 3D com faces, camadas e órbitas em CSS; interação com o ponteiro sem biblioteca gráfica.
- Pausa manual, respeito a `prefers-reduced-motion`, pausa fora da tela e quando a aba está oculta.
- Dez projetos renderizados em HTML, com filtros por categoria e contagem anunciada para leitores de tela.
- Menu responsivo e indicação da seção ativa sincronizada entre desktop e celular.
- Currículos em diálogo acessível: foco contido, fechamento por Escape/fundo e retorno do foco.
- Currículo atualizado, versões anteriores e compatibilidade com o antigo endereço quebrado do PDF em português.
- Conteúdo e downloads disponíveis mesmo sem JavaScript.
- Links externos com `noopener noreferrer`, link para pular ao conteúdo e foco visível.

As imagens de capa dos quatro primeiros projetos são **composições conceituais em CSS**, identificadas no site; não são capturas dos produtos. A onda SVG original continua no repositório, embora não seja utilizada pelo novo layout.

## Projetos preservados

1. **CFSB** — Gestão de estoque de segurança para equipamentos críticos, em desenvolvimento. O currículo descreve gestão de fornecedores, notas fiscais, manutenções e solicitações; Flask/SQLAlchemy, JWT, níveis de acesso, auditoria, mais de 180 testes e migração validada SQLite → PostgreSQL com Alembic.
2. **Mova IA** — Agência de automação com IA para pequenos negócios locais (barbearias e salões), em desenvolvimento; automação, IA e n8n.
3. **Bella Massa** — Landing page fictícia de pizzaria, com cardápio, WhatsApp e identidade artesanal. [GitHub](https://github.com/IcaroSenaDev/Pizzaria) · [Demo](https://icarosenadev.github.io/Pizzaria/).
4. **Studio Belà** — Landing page fictícia de salão, com serviços, galeria, equipe e agendamento por WhatsApp. [GitHub](https://github.com/IcaroSenaDev/studio) · [Demo](https://icarosenadev.github.io/studio/).
5. **TCC — Central de Monitoramento IoT** — ESP32, NRF24L01, Wi-Fi, Supabase e dashboard React em tempo real. [Apresentação](https://canva.link/24onia2aqkxjznm) · [Publicação original](https://lnkd.in/dmbFNsdH).
6. **Gestão de Estoque Java** — Interface gráfica, NetBeans e MySQL. [GitHub](https://github.com/OsManoDaDS/projetosenai.git).
7. **Comércio Online** — Java, Android Studio e Firebase. [GitHub](https://github.com/IcaroSenaDev/ComercioOnlineDS.git).
8. **Landing Page** — VS Code, HTML, CSS, JavaScript e jQuery. [GitHub](https://github.com/IcaroSenaDev/projeto-landingpage.git).
9. **Bitwave** — VS Code, React, Prisma, MongoDB e Node.js. [GitHub](https://github.com/OsManoDaDS/bitwave.git).
10. **Bitwave — Tomada Inteligente** — VS Code, React, Prisma, MongoDB e Node.js. [GitHub](https://github.com/Tomada-Inteligente/dashboard-tomada.git).

## Estrutura

```text
index.html                 Conteúdo semântico e metadados
src/styles/                Tema, navegação, início, projetos, trajetória e currículo
src/javascript/script.js   Interações progressivas
src/images/                Favicon e onda SVG original preservada
src/cv/                    PDF atualizado, alias compatível e PDFs anteriores
scripts/                   Servidor local e cópia de distribuição
tests/                     Preservação de conteúdo, links e testes de navegador
```

## Executar e validar

O site pode ser aberto diretamente pelo `index.html` e continua compatível com GitHub Pages na raiz, inclusive sob `/Myportfolio/`. Node.js 20+ é necessário apenas para os comandos de desenvolvimento:

```sh
npm ci
npm start
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

O servidor usa `http://127.0.0.1:4173`. `npm run build` copia a versão estática para `dist/`. Para testar essa distribuição, defina `SERVE_DIST=1`. Para usar um navegador já instalado, defina `BROWSER_CHANNEL=msedge` ou `chrome` antes dos testes. No PowerShell: `$env:BROWSER_CHANNEL='msedge'`.

Os testes de preservação comparam descrições, links e hashes dos PDFs originais com uma referência do commit `7ba5bc6`. Os testes de navegador cobrem filtros, downloads, teclado/modal, menu móvel, 320/390/768/1024/1920 pixels, movimento reduzido, ausência de JavaScript e verificações axe-core WCAG A/AA. Capturas e resultados locais são gravados em `test-results/` (ignorado pelo Git). A análise automatizada não substitui uma avaliação manual completa de acessibilidade.

Formatação: `npx prettier --write index.html "src/**/*.{css,js}" "scripts/*.cjs" "tests/*.cjs"`.

## Contato

- **E-mail:** [icarobonfimdesena5@gmail.com](mailto:icarobonfimdesena5@gmail.com)
- **WhatsApp:** [(71) 99254-6793](https://wa.me/5571992546793)
- **LinkedIn:** [Icaro Bonfim de Sena](https://www.linkedin.com/in/icaro-bonfim-de-sena)
- **GitHub:** [IcaroSenaDev](https://github.com/IcaroSenaDev)

## Licença

Este projeto é de uso pessoal. Sinta-se livre para se inspirar na estrutura, mas evite copiar o conteúdo pessoal (textos, currículo) diretamente.

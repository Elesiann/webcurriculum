const pt = {
  "sections-about": "Algumas coisas sobre mim:",
  "sections-beliefs": "Algumas opiniões que eu defenderia num bar:",
  "sections-work": "Alguns projetos que mantenho por perto:",
  "about-stack":
    "Construo principalmente com TypeScript, React, Next.js, Node.js, PostgreSQL e o que mais o problema pedir.",
  "about-scope":
    "Já trabalhei entre frontend, backend, integrações, billing, observabilidade e sistemas de produto com IA.",
  "about-product":
    "Gosto de ficar perto da decisão de produto, não só do ticket de implementação.",
  "about-craft":
    "Me importo com clareza de produto, disciplina de debugging, infraestrutura chata e interfaces que não fazem o usuário se sentir perdido.",
  "beliefs-requirements": "Requisitos são respostas. Encontre a pergunta primeiro.",
  "beliefs-requirementsA": "Um requisito geralmente é a solução de outra pessoa.",
  "beliefs-requirementsB":
    "Tratar o pedido como final é como construir a coisa errada com precisão.",
  "beliefs-tradeoff":
    "Se você não consegue explicar o trade-off, a decisão ainda não foi tomada.",
  "beliefs-tradeoffA": '"Best practice" não é argumento.',
  "beliefs-tradeoffB": "Se nada ficou pior, provavelmente você evitou a decisão.",
  "beliefs-tradeoffC": "Boa arquitetura escolhe o compromisso de propósito.",
  "beliefs-simple": "Simples é resultado, não ponto de partida.",
  "beliefs-simpleA": "Tirar o trabalho de vista não é remover o trabalho.",
  "beliefs-simpleB":
    "Um processo pode parecer limpo por dentro e piorar a experiência por fora.",
  "beliefs-simpleC": "Simplicidade se mede no loop inteiro.",
  "beliefs-measuring": "Se você não está medindo, está chutando.",
  "beliefs-measuringA": "Gosto sem feedback vira preferência.",
  "beliefs-measuringB": "A realidade é melhor revisora que consenso.",
  "beliefs-measuringC":
    "Se o sistema não consegue explicar o que aconteceu, ele não está pronto.",
  "beliefs-aiProducts": "Produtos de IA ainda precisam ser produtos.",
  "beliefs-aiProductsA": "Boa automação remove trabalho em vez de criar mais ritual.",
  "beliefs-aiProductsB": "Modelos são capacidades, não produtos.",
  "beliefs-aiProductsC":
    "Um modelo inteligente ainda pode ser inútil dentro de um workflow.",
  "beliefs-taste": "Gosto é uma vantagem técnica.",
  "beliefs-tasteA": "Ajuda você a deletar mais cedo.",
  "beliefs-tasteB": "Faz o caminho útil parecer óbvio.",
  "beliefs-tasteC": "Gosto é dizer não antes que o usuário precise dizer.",
  "beliefs-shipping": "Shippar rápido não é digitar rápido.",
  "beliefs-shippingA": "Você aprende mais no mesmo intervalo de tempo.",
  "beliefs-shippingB": "A realidade vota mais cedo.",
  "work-planify":
    "app de finanças domésticas com divisão de gastos, despesas fixas e dashboard analítico.",
  "work-vertice":
    "recomendador brasileiro de cartão de crédito que ranqueia cartões por retorno líquido projetado em 12 meses para um perfil de gasto e investimento.",
  "work-ccCockpit":
    "cockpit local para deixar o trabalho com agentes de código mais visível e fácil de conduzir.",
  "work-scribe":
    "ferramenta para transformar contexto bruto em artefatos escritos mais duráveis.",
  "elsewhere-label": "Por aí:",
  "elsewhere-cv": "Baixar CV",
  "footer-quote": '"Você não pode criar experiência. Você precisa atravessá-la."'
};

const metaPt =
  "Giovani Machado: desenvolvedor de software, pensamento de produto e algumas opiniões sobre construir sistemas úteis.";

const storageKey = "gio-language";
const english = new Map();

function cacheEnglish() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    english.set(element.dataset.i18n, element.textContent);
  });

  const description = document.querySelector('meta[name="description"]');

  if (description) {
    english.set("meta-description", description.getAttribute("content"));
  }
}

function applyLanguage(language) {
  const toggle = document.querySelector("[data-lang-toggle]");
  const cvLink = document.querySelector("[data-cv-link]");
  const description = document.querySelector('meta[name="description"]');

  if (language === "pt") {
    document.documentElement.lang = "pt-BR";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = pt[element.dataset.i18n];

      if (value) {
        element.textContent = value;
      }
    });

    if (description) {
      description.setAttribute("content", metaPt);
    }

    if (toggle) {
      toggle.setAttribute("aria-label", "Switch to English");
      toggle.setAttribute("title", "Switch to English");
    }

    if (cvLink) {
      cvLink.setAttribute("href", "./cv/cv_giovani_machado_correa.pdf");
      cvLink.setAttribute("download", "cv_giovani_machado_correa.pdf");
    }
  } else {
    document.documentElement.lang = "en";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = english.get(element.dataset.i18n);

      if (value) {
        element.textContent = value;
      }
    });

    if (description) {
      description.setAttribute("content", english.get("meta-description"));
    }

    if (toggle) {
      toggle.setAttribute("aria-label", "Switch to Portuguese");
      toggle.setAttribute("title", "Switch to Portuguese");
    }

    if (cvLink) {
      cvLink.setAttribute("href", "./cv/en_cv_giovani_machado_correa.pdf");
      cvLink.setAttribute("download", "en_cv_giovani_machado_correa.pdf");
    }
  }

  localStorage.setItem(storageKey, language);
}

function getInitialLanguage() {
  const stored = localStorage.getItem(storageKey);

  if (stored === "pt" || stored === "en") {
    return stored;
  }

  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  if (browserLanguages.some((language) => language?.toLowerCase().startsWith("pt"))) {
    return "pt";
  }

  return "en";
}

document.addEventListener("DOMContentLoaded", () => {
  cacheEnglish();

  let currentLanguage = getInitialLanguage();
  const toggle = document.querySelector("[data-lang-toggle]");

  applyLanguage(currentLanguage);

  toggle?.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "pt" : "en";
    applyLanguage(currentLanguage);
  });
});

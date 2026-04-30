// Fonte única de verdade dos projetos do portfólio.
// Adicione novos itens aqui — a página /projetos consome esta lista automaticamente.

export const projects = [
  {
    slug: "dog-breeds-classifier",
    title: "Dog Breeds Classifier",
    tagline: "Classificação de 16 raças de cães com Deep Learning (~95% de acurácia).",
    description:
      "Projeto de Visão Computacional construído como TCC do Bootcamp de Aprendizado de Máquina do LAMIA. Usa Transfer Learning (InceptionV3) sobre +5.000 imagens, e expõe um modelo via API REST que pode ser testado diretamente pelo navegador.",
    cover: "/images/charlote.jpg",
    tags: ["Deep Learning", "Computer Vision", "Transfer Learning", "FastAPI", "React"],
    techStack: [
      "Python",
      "TensorFlow",
      "Keras",
      "InceptionV3",
      "FastAPI",
      "React",
      "Tailwind CSS",
      "Docker",
    ],
    metrics: [
      { label: "Acurácia em teste", value: "95%" },
      { label: "Raças suportadas", value: "16" },
      { label: "Imagens", value: "5K+" },
    ],
    links: {
      live: "/projetos/dog-breeds-classifier",
      repo: "https://github.com/VitorEduardoLimaKenor/Dog_Breeds_Classifier",
      api: "https://github.com/VitorEduardoLimaKenor/dogbreeds-api",
    },
    featured: true,
    year: 2025,
  },
];

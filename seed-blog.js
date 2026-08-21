const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const articles = [
    {
      title: "De Dakar à Douala : L'Éclosion de Mosayane 2 Claire",
      slug: "de-dakar-a-douala-leclosion-de-mosayane",
      excerpt: "Découvrez les origines de l'artiste : née au Sénégal de parents camerounais, elle fusionne aujourd'hui les influences pour créer une identité musicale unique.",
      content: "Née un 25 janvier au Sénégal de parents camerounais, Mebonde Delphine, plus connue sous son nom de scène Mosayane 2 Claire, a baigné très tôt dans un univers multiculturel.\n\nInfluencée par son père, elle se découvre une passion pour la musique dès son plus jeune âge. Son parcours professionnel débute véritablement vers 2007. Animée par une soif d'apprendre et de se perfectionner, elle poursuit en parallèle des études en arts du spectacle et en cinématographie.\n\nEn 2017, elle marque un tournant en sortant son premier single, dévoilant au grand jour sa signature musicale : un mélange subtil d'Afro Jazz, de World Music et de Gospel. Armée de sa guitare, qu'elle maîtrise avec virtuosité, Mosayane ne cesse d'explorer et de repousser les frontières de son art.",
      coverImage: "/uploads/484902433_1268858508123492_3441982235380329345_n.jpg",
      publishedAt: new Date("2022-03-10T10:00:00Z"),
    },
    {
      title: "Sur la scène du MASA 2022 et du DOMAF : Une voix sans frontières",
      slug: "scene-masa-2022-domaf-voix-sans-frontieres",
      excerpt: "Retour sur les performances marquantes de Mosayane lors de festivals prestigieux, prouvant son statut grandissant sur la scène africaine.",
      content: "La présence scénique de Mosayane 2 Claire est indéniable, comme en témoignent ses passages remarqués sur plusieurs scènes d'envergure internationale.\n\nEn 2022, elle a illuminé la 12ème édition du Marché des Arts du Spectacle d'Abidjan (MASA), un carrefour incontournable pour les artistes du continent. Sa voix émouvante et son jeu de guitare ont su captiver un public exigeant et diversifié.\n\nAu-delà du MASA, Mosayane s'est également illustrée au Douala Music Art Festival (DOMAF), un événement majeur de la scène camerounaise. Ses invitations au Festival international Kouleur acoustic au Tchad ou encore au FIMAD à Dakar soulignent la portée de sa musique : universelle et fédératrice.",
      coverImage: "/uploads/img-20221214-wa0042.jpg",
      publishedAt: new Date("2023-08-15T14:30:00Z"),
    },
    {
      title: "L'engagement par la musique : Le projet 'I Cry' pour la paix",
      slug: "engagement-musique-projet-i-cry-paix",
      excerpt: "Comment Mosayane utilise sa voix pour porter des messages forts, notamment à travers ses collaborations pour la paix.",
      content: "Si Mosayane 2 Claire brille en solo, elle est également une collaboratrice précieuse et engagée au sein de la scène musicale camerounaise.\n\nElle a souvent prêté sa voix en tant que choriste pour des artistes confirmés, enrichissant leurs morceaux de son timbre unique. Mais c'est dans des projets collectifs porteurs de sens qu'elle révèle toute la profondeur de son engagement.\n\nSa participation remarquée au titre 'I Cry', un vibrant appel à la paix réunissant plusieurs voix influentes, témoigne de sa volonté d'utiliser son art comme un vecteur de changement social. Pour Mosayane, la musique n'est pas seulement un divertissement, c'est une voix sans frontières capable de panser les maux et de rassembler les peuples.",
      coverImage: "/uploads/490359369_1293110735698269_3905139870614160894_n.jpg",
      publishedAt: new Date("2024-01-20T09:15:00Z"),
    }
  ];

  for (const article of articles) {
    await prisma.blogPost.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }
  
  console.log('Blog articles seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

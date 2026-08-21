const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Photos
  const photos = [
    { url: "/uploads/481811831_1260050062337670_8756154185951654481_n.jpg", title: "Mosayane avec sa guitare, robe jaune" },
    { url: "/uploads/484902433_1268858508123492_3441982235380329345_n.jpg", title: "Mosayane, collier rouge" },
    { url: "/uploads/485113089_1268796818129661_3258894131628726203_n.jpg", title: "Mosayane en concert" },
    { url: "/uploads/489817738_1288800069462669_3896681577553211210_n.jpg", title: "Mosayane assise, portrait" },
    { url: "/uploads/489919002_1291524895856853_138888018062974899_n.jpg", title: "Mosayane, pull noir et henné" },
    { url: "/uploads/490359369_1293110735698269_3905139870614160894_n-900a3fb6.jpg", title: "Mosayane et sa guitare, gros plan" },
    { url: "/uploads/617099424_1543373800671960_9151617824419234312_n.jpg", title: "Mosayane en studio, jean et guitare" },
    { url: "/uploads/img-20221214-wa0042.jpg", title: "Portrait officiel de Mosayane 2 Claire" }
  ];

  for (const p of photos) {
    await prisma.photo.create({ data: p });
  }

  // Discographie
  const releases = [
    {
      title: "AFIDI",
      year: "2023",
      cover: "/uploads/AFIDI.webp",
      url: "https://music.apple.com/us/album/afidi-single/1715017684",
      type: "single"
    },
    {
      title: "Lève-Toi et Brille",
      year: "2023",
      cover: "/uploads/lève-toi-et-brille.webp",
      url: "https://music.apple.com/us/album/l%C3%A8ve-toi-et-brille-single/1689251025",
      type: "single"
    },
    {
      title: "Pardonne-Moi",
      year: "2020",
      cover: "/uploads/pardonne-moi.webp",
      url: "https://music.apple.com/us/album/pardonne-moi-single/1533978393",
      type: "single"
    },
    {
      title: "Symphonie Mosayane (Live)",
      year: "2024",
      cover: "/uploads/symphonie-mosayane-live.webp",
      url: "https://music.apple.com/us/album/symphonie-mosayane-live/1770624830",
      type: "album"
    }
  ];

  for (const r of releases) {
    await prisma.release.create({ data: r });
  }

  console.log('Seed extra completed.');
}

main().catch(console.error).finally(() => prisma.$disconnect());

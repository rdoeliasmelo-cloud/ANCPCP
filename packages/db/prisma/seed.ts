import { PrismaClient, RoleName, RoundStatus, ScoringMethod } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles = await Promise.all(
    ["SUPER_ADMIN", "ASSOCIATION_STAFF", "JUDGE", "EXHIBITOR", "PUBLIC"].map((role) =>
      prisma.role.upsert({
        where: { name: role as RoleName },
        update: {},
        create: { name: role as RoleName }
      })
    )
  );

  const judgeRole = roles.find((role) => role.name === "JUDGE")!;

  const judge = await prisma.user.upsert({
    where: { email: "juez1@ancpcp.pe" },
    update: {},
    create: {
      name: "Juez Principal",
      email: "juez1@ancpcp.pe",
      passwordHash: "mocked-password",
      roleId: judgeRole.id
    }
  });

  const event = await prisma.event.create({
    data: {
      name: "Concurso Nacional ANCPCP 2026",
      venue: "Lima",
      startDate: new Date("2026-07-21T09:00:00.000Z"),
      status: "ACTIVE"
    }
  });

  const [cat1, cat2] = await Promise.all([
    prisma.category.create({ data: { eventId: event.id, name: "Potrancas de Bozal", displayOrder: 1 } }),
    prisma.category.create({ data: { eventId: event.id, name: "Capones Montados", displayOrder: 2 } })
  ]);

  const [round1, round2] = await Promise.all([
    prisma.round.create({
      data: { categoryId: cat1.id, name: "Clasificatoria", displayOrder: 1, status: RoundStatus.EVALUATED }
    }),
    prisma.round.create({
      data: { categoryId: cat1.id, name: "Final", displayOrder: 2, status: RoundStatus.IN_TRACK }
    })
  ]);

  await prisma.scoringRule.create({
    data: {
      roundId: round2.id,
      method: ScoringMethod.DROP_HIGHEST_LOWEST,
      tiebreaker: "HIGHEST_SINGLE_SCORE",
      discardHighestLowest: true,
      manualPenaltyEnabled: true
    }
  });

  const [ex1, ex2] = await Promise.all([
    prisma.exhibitor.create({ data: { name: "Hacienda Las Palmas", email: "contacto@laspalmas.pe" } }),
    prisma.exhibitor.create({ data: { name: "Criadero El Paso", email: "admin@elpaso.pe" } })
  ]);

  const [horse1, horse2] = await Promise.all([
    prisma.horse.create({ data: { name: "Lucero de Oro", breedingFarm: "Las Palmas", ownerName: "Ana Ruiz" } }),
    prisma.horse.create({ data: { name: "Reina Morena", breedingFarm: "El Paso", ownerName: "Carlos Vega" } })
  ]);

  const [p1, p2] = await Promise.all([
    prisma.participant.create({
      data: { categoryId: cat1.id, horseId: horse1.id, exhibitorId: ex1.id, entryNumber: 12, status: "IN_COMPETITION" }
    }),
    prisma.participant.create({
      data: { categoryId: cat1.id, horseId: horse2.id, exhibitorId: ex2.id, entryNumber: 14, status: "IN_COMPETITION" }
    })
  ]);

  await prisma.judgeAssignment.create({
    data: {
      judgeId: judge.id,
      categoryId: cat1.id
    }
  });

  await prisma.scoreEntry.createMany({
    data: [
      { roundId: round2.id, participantId: p1.id, judgeId: judge.id, score: 91.2 },
      { roundId: round2.id, participantId: p2.id, judgeId: judge.id, score: 90.5 }
    ]
  });

  console.log("Seed completed:", { eventId: event.id, categoryIds: [cat1.id, cat2.id], roundIds: [round1.id, round2.id] });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

# ANCPCP MVP — Asociación Peruana de Caballos de Paso

MVP full-stack para gestión de concursos, categorías, rondas, jueces, participantes y resultados en vivo.

## Monorepo

```text
packages/
  db/        -> Prisma + PostgreSQL schema + seed
  shared/    -> Tipos de dominio + motor de scoring + servicios compartidos
  web/       -> Next.js 14 (admin + público + API routes)
  mobile/    -> Expo React Native (roles: juez/staff/expositor/público)
```

## Stack

- Web: Next.js 14 + TypeScript + App Router + Tailwind
- Mobile: React Native + Expo + TypeScript
- DB: PostgreSQL + Prisma ORM
- Auth (MVP): login mock por rol (preparado para migrar a NextAuth/JWT)
- Live updates: polling cada 5 segundos en web pública

## Requisitos

- Node.js 20+
- npm 10+
- PostgreSQL 14+

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Configurar base de datos en `packages/db/.env`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/ancpcp"
```

3. Generar cliente Prisma y aplicar migraciones (cuando se creen):

```bash
npm run db:generate
```

4. Cargar seed inicial:

```bash
npm run db:seed
```

## Desarrollo

Web:

```bash
npm run dev:web
```

Mobile:

```bash
npm run dev:mobile
```

## Endpoints MVP

- `POST /api/events` crear evento
- `POST /api/categories` crear categoría
- `POST /api/participants` registrar participante
- `POST /api/scores` guardar puntajes
- `POST /api/results/recalculate` recalcular resultados
- `GET /api/leaderboard?roundId=rnd-2` consultar leaderboard

## Módulos incluidos en primera iteración

- Gestión base de eventos, categorías, rondas y participantes
- Dashboard admin web con indicadores principales
- Vista pública de resultados en vivo (polling 5s)
- App mobile base con navegación y pantallas iniciales
- Motor de scoring configurable y compartido (`@ancpcp/shared`)

## Notas MVP

- Persistencia operativa para web/mobile se simula con `mock-store` compartido para acelerar el MVP UI/API.
- El esquema Prisma sí representa el diseño real de datos para producción.
- Motor de scoring configurable sin fórmula rígida para facilitar adaptación a reglamento oficial ANCPCP.

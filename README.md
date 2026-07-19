# CollectorHub

> A modern collectibles marketplace, community feed, and personal collection manager — built as a React internship assignment.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat&logo=reactrouter)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages & Modules](#pages--modules)
- [Architecture Decisions](#architecture-decisions)
- [Known Limitations](#known-limitations)

---

## Overview

CollectorHub is a single-page application that brings together three core experiences for collectors:

- **Marketplace** — Browse, search, filter, and sort collectible listings
- **Community Feed** — Discover what other collectors are sharing; like and save posts
- **My Collection** — Manage items across Owned, Wishlist, and Selling collections with full persistence

---

## Features

### Marketplace
- Browse a responsive grid of collectible listings
- Search by title (debounced, 300ms)
- Filter by **Category** and **Condition**
- Sort by **Newest**, **Oldest**, **Price Low→High**, **Price High→Low**
- View full product details in a modal (image, description, seller, location, price)
- **Add to Collection** or **Add to Wishlist** — duplicate prevention with toast feedback
- All filters persisted in URL search params (shareable / survives navigation)
- Skeleton loaders while fetching, error state with retry

### Community Feed
- Browse posts in a card grid
- Search by caption (debounced)
- Filter by **Category**
- **Like** and **Save** posts — state persisted in `localStorage`
- Open post detail modal (image, caption, like count, save)
- Filter count shown in header

### My Collection
- Three tabbed collections: **Owned**, **Wishlist**, **Selling**
- Per-tab item counts shown in sidebar badges and tab headers
- Search, filter by Category, sort by date added or estimated value
- **Remove** items with confirmation toast
- **Move between collections** via inline select
- Empty states with contextual guidance
- All state persisted in `localStorage`

### UX & Quality
- Skeleton loaders (not just spinners)
- Error states with retry action
- Empty states differentiated: "nothing exists" vs "no search results"
- Missing image fallback (`🖼️` placeholder)
- Avatar initial fallback when image URL fails
- Toast notifications for all collection mutations
- Keyboard accessible modals (`Escape` to close, `aria-modal`)
- Smooth micro-animations (hover lift, scale, image zoom)

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| UI Framework | React 19 | Assignment requirement |
| Language | TypeScript 6 | Type safety, better DX |
| Build Tool | Vite 8 | Fast HMR, ESM-native |
| Styling | Tailwind CSS v4 | Utility-first, responsive |
| Routing | React Router v7 | SPA navigation + `useSearchParams` |
| Data Fetching | Native `fetch` API | No extra dependency |
| State | Context API + `localStorage` | No Redux needed at this scale |
| Toasts | `react-hot-toast` | Lightweight feedback |
| Icons | `react-icons` | Wide icon selection |
| Linting | oxlint | Fast Rust-based linter |

---

## Project Structure

```
src/
├── api/
│   └── mockapis.ts          # Fetch wrappers for /public/data/*.json
├── components/
│   ├── common/              # Shared UI primitives
│   │   ├── Badge.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Images.tsx       # Image with null/error fallback
│   │   ├── Layout.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Select.tsx
│   │   ├── Sidebar.tsx      # Collapsible nav with collection badges
│   │   └── SkeletonGrid.tsx
│   ├── collection/
│   │   └── CollectionItemCard.tsx
│   ├── feed/
│   │   ├── PostCard.tsx
│   │   └── PostDetailModal.tsx
│   └── Marketplace/
│       ├── ProductCard.tsx
│       └── ProductDetailsModal.tsx
├── context/
│   ├── CollectionContext.tsx     # Owned/Wishlist/Selling CRUD + localStorage
│   └── FeedInteractionsProvider.tsx  # Like/Save state + localStorage
├── hooks/
│   ├── useAsync.ts          # Generic async data fetching with status/error/reload
│   ├── useDebounce.ts       # Value debouncer
│   └── useLocalStorage.ts   # Typed localStorage state
├── pages/
│   ├── Community.tsx
│   ├── Landing.tsx
│   ├── Marketplace.tsx
│   ├── MyCollection.tsx
│   └── NotFound.tsx
├── types/
│   ├── constants.ts         # CATEGORIES, CONDITIONS arrays
│   └── index.ts             # All shared TypeScript types
├── utils/
│   └── formatters.ts        # formatPrice, formatDate, timeAgo
├── App.tsx
├── index.css
└── main.tsx

public/
└── data/
    ├── marketplace.json     # Mock marketplace listings
    └── feed.json            # Mock community posts
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Rupeswarbhainsa777/Collector-Hub.git
cd Collector-Hub

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

---

## Pages & Modules

### `/` — Landing
Hero section with CTA to the Marketplace, plus quick-navigation cards to all three modules.

### `/marketplace` — Marketplace
Full listing browser with search, filter, sort, and a product detail modal.

### `/community` — Community Feed
Post grid with search, category filter, like/save interactions, and a detail modal.

### `/collection` — My Collection
Tabbed collection manager with URL-persisted active tab (`?tab=Owned`), search, filter, sort, remove, and move-between-collections actions.

---

## Architecture Decisions

### URL Search Params for Filters
All search queries, category filters, condition filters, and sort options are stored in URL search params via `useSearchParams`. This means:
- Filters survive navigation (click to detail and back)
- URLs are shareable/bookmarkable
- Browser back/forward works as expected

### Custom `useAsync` Hook
Rather than inline `useEffect` + state, all data fetching goes through a single `useAsync(fn, deps)` hook that returns `{ data, status, error, reload }`. This provides:
- Consistent loading/error/success states
- Race condition prevention via a `cancelled` flag
- A `reload()` callback for retry

### Context + LocalStorage
Collection state and feed interactions (likes/saves) live in React Context but are persisted to `localStorage` via a custom `useLocalStorage` hook. The separation means:
- State is reactive across the whole app (no prop drilling)
- State survives page refresh

---



## License

This project was built as an internship assignment and is not licensed for production use.

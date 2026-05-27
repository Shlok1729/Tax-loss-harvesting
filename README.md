# Tax-Loss Harvesting Dashboard

A responsive, high-performance web dashboard built with **Next.js**, **React**, and **CSS Modules** that allows users to seamlessly simulate tax-loss harvesting for their cryptocurrency portfolios. 

## Features & Implementation Details

- **Interactive Holdings Table:** 
  - Allows users to selectively pick crypto assets to harvest losses.
  - Implements a "View All" / "View Less" collapse mechanism that defaults to showing 4 holdings, enhancing layout density and focus.
  - Checkbox selection with clear visual feedback (highlighting entire rows in the selection color).
  - Dynamic display of "Amount To Sell" when an asset is selected.
  - Rich tooltips that appear on hover, revealing exact, uncompacted human-readable amounts for metrics like price and holdings.
- **Capital Gains Computation Engine:**
  - Real-time recalculation of capital gains (both short-term and long-term) based on user selections.
  - Compares the **"Pre Harvesting"** vs **"After Harvesting"** states cleanly side-by-side.
  - Dynamically computes and displays the estimated tax savings in real time.
- **Robust UI & Aesthetics:**
  - Full Light/Dark mode theming using CSS variables.
  - Fully responsive design scaling perfectly from desktop monitors down to mobile screens.
  - The mobile view dynamically restructures layouts, adapting tables (e.g. hiding extra columns to prevent horizontal overflow constraints) and condensing paddings seamlessly.
  - Uses CSS Modules to completely isolate styles and avoid class name collisions without overhead.
- **Mock APIs & Loading States:**
  - API routes simulating network delay (with Next.js App Router API Routes).
  - Elegant loading spinner and shimmer skeleton UI while fetching initial data.
  - Comprehensive error handling.

## Architecture & State Management Justification

### Why `useState` Instead of `useContext` or `Redux`?

During development, we evaluated whether to integrate a global state management solution like Redux or React's Context API. We ultimately decided to manage state locally using React's built-in `useState` and `useEffect` at the top-level `Dashboard` component. 

Here is the justification for this architectural choice:

1. **Avoids Over-Engineering:** The current application is essentially a Single-Page Application (SPA) dashboard without deep component trees. Adding Redux would introduce unnecessary boilerplate (actions, reducers, store configuration) and complexity that outweighs the benefits for this specific scope.
2. **Performance Optimization:** Context API forces a re-render on all consumer components whenever the context value changes. Because the state (such as checking a single row in the holdings table) updates very frequently, using a single context could result in inefficient re-rendering of the entire application. Managing state locally and passing precise props allows for much more predictable and performant rendering.
3. **Prop-Drilling is Minimal:** The component hierarchy is very flat (`Dashboard` -> `HoldingsTable` & `CapitalGainsCards`). Passing props down a single level is completely manageable, highly readable, and adheres strictly to React's unidirectional data flow principles.

If the application scales to include routing (e.g., separate user profile pages or isolated asset configuration pages) where `Holdings` data is required globally across vastly different component branches, a migration to `useContext` (split effectively) or a lightweight state manager like `Zustand` would be the logical next step.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to interact with the dashboard.

### Pet Adoption Frontend — Mind Map

```mermaid
mindmap
  root((Pet Adoption Frontend))
    Project Structure
      src/
        main.tsx
          ▶ Renders `App` into `#root`
        App.tsx
          ▶ Sets up providers
          ▶ Configures routing
        pages/
          ▶ Index, About, AdoptionProcess, PetCareTips
          ▶ Contact, Support
          ▶ Checkout, ThankYou, PaymentFailed, ServerError, NotFound
        components/
          ▶ Header, ThemeToggle
          ▶ PetCard, AccessoryCard
          ▶ CartDrawer, AdoptionModal, AuthModals
          ui/ (Shadcn UI primitives)
            ▶ button, card, dialog, drawer, input, select, table, tabs, toast, etc.
        contexts/
          ▶ ThemeContext (ThemeProvider)
          ▶ AuthContext (AuthProvider)
          ▶ CartContext (CartProvider)
        hooks/
          ▶ use-mobile
          ▶ use-toast
        lib/
          ▶ utils.ts (helpers)
          ▶ mockData.ts (sample data)
        assets/
          ▶ hero-pets.jpg
      public/
        ▶ robots.txt, placeholder.svg
      Root
        ▶ index.html (mount: #root)
        ▶ index.css / App.css (styles)
        ▶ vite-env.d.ts
    Runtime Providers (App.tsx)
      React Query
        ▶ QueryClientProvider
      Theme
        ▶ ThemeProvider (light/dark)
      Auth
        ▶ AuthProvider (user/session)
      Cart
        ▶ CartProvider (cart state)
      UI Enhancements
        ▶ TooltipProvider
        ▶ Toaster & Sonner (notifications)
    Routing (react-router-dom)
      BrowserRouter
        Routes
          "/" → Index
          "/about" → About
          "/adoption-process" → AdoptionProcess
          "/pet-care-tips" → PetCareTips
          "/contact" → Contact
          "/support" → Support
          "/checkout" → Checkout
          "/thank-you" → ThankYou
          "/payment-failed" → PaymentFailed
          "/server-error" → ServerError
          "*" → NotFound
    Styling & UI
      Tailwind CSS
        ▶ tailwind.config.ts
        ▶ postcss.config.js
      Shadcn UI
        ▶ components/ui/* primitives
    Tooling & Config
      TypeScript
        ▶ tsconfig.json, tsconfig.app.json, tsconfig.node.json
      Vite
        ▶ vite.config.ts
      Linting
        ▶ eslint.config.js
      Package
        ▶ package.json, package-lock.json
```

Notes
- The UI primitives under `components/ui` are grouped for brevity.
- Providers wrap the entire app to enable theme, auth, cart, tooltips, and data fetching.
- Pages are registered as top-level routes in `App.tsx`.

### Pet Adoption Frontend — Package Diagram

```mermaid
flowchart LR
  %% Packages (as subgraphs)
  subgraph Root[Root]
    index_html[index.html]
    vite_config[vite.config.ts]
    tailwind_config[tailwind.config.ts]
    postcss_config[postcss.config.js]
    eslint_config[eslint.config.js]
    tsconfig[tsconfig*.json]
    pkg[package.json]
  end

  subgraph Public[public/]
    robots[robots.txt]
    placeholder[placeholder.svg]
  end

  subgraph Src[src/]
    subgraph Entry[src entry]
      main_tsx[main.tsx]
      index_css[index.css]
      app_css[App.css]
      vite_env[vite-env.d.ts]
    end

    subgraph AppLayer[App layer]
      app_tsx[App.tsx]
    end

    subgraph Pages[pages/]
      page_Index[Index.tsx]
      page_About[About.tsx]
      page_Adoption[AdoptionProcess.tsx]
      page_Tips[PetCareTips.tsx]
      page_Contact[Contact.tsx]
      page_Support[Support.tsx]
      page_Checkout[Checkout.tsx]
      page_ThankYou[ThankYou.tsx]
      page_Failed[PaymentFailed.tsx]
      page_Server[ServerError.tsx]
      page_NotFound[NotFound.tsx]
    end

    subgraph Components[components/]
      header[Header.tsx]
      theme_toggle[ThemeToggle.tsx]
      pet_card[PetCard.tsx]
      accessory_card[AccessoryCard.tsx]
      cart_drawer[CartDrawer.tsx]
      adoption_modal[AdoptionModal.tsx]
      auth_modals[AuthModals.tsx]

      subgraph UI[components/ui/*]
        ui_primitives[Shadcn UI primitives]
      end
    end

    subgraph Contexts[contexts/]
      ctx_theme[ThemeContext.tsx]
      ctx_auth[AuthContext.tsx]
      ctx_cart[CartContext.tsx]
    end

    subgraph Hooks[hooks/]
      hook_mobile[use-mobile.tsx]
      hook_toast[use-toast.ts]
    end

    subgraph Lib[lib/]
      lib_utils[utils.ts]
      lib_mock[mockData.ts]
    end

    subgraph Assets[assets/]
      hero[hero-pets.jpg]
    end
  end

  %% Dependencies
  main_tsx --> app_tsx
  app_tsx --> ctx_theme
  app_tsx --> ctx_auth
  app_tsx --> ctx_cart
  app_tsx --> ui_primitives

  %% Routing from App to Pages
  app_tsx --> page_Index
  app_tsx --> page_About
  app_tsx --> page_Adoption
  app_tsx --> page_Tips
  app_tsx --> page_Contact
  app_tsx --> page_Support
  app_tsx --> page_Checkout
  app_tsx --> page_ThankYou
  app_tsx --> page_Failed
  app_tsx --> page_Server
  app_tsx --> page_NotFound

  %% Pages use Components and Contexts
  Pages --> Components
  Pages --> Contexts
  Pages --> Hooks
  Pages --> Lib

  %% Components depend on UI primitives and Contexts
  Components --> UI
  Components --> Contexts
  Components --> Hooks
  Components --> Lib

  %% Contexts may use Lib
  Contexts --> Lib

  %% Entry uses styles
  Entry --> Assets

  %% Build tooling relationships
  Root --> Src
  Root --> Public
```

Notes
- Subgraphs represent logical packages/folders; arrows indicate primary dependencies.
- `components/ui/*` groups Shadcn UI primitives used across components and `App.tsx` for toasts/tooltips.
- Pages are routed by `App.tsx` and commonly depend on components, contexts, hooks, and lib helpers.

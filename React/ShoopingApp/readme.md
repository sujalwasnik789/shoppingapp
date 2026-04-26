# ShopKit Design System
 
## Overview
 
ShopKit is a production-ready, mobile-responsive e-commerce frontend built with:

- **Framework:** Next.js (App Router)

- **Styling:** Material UI (components + theming)

- **Authentication:** Clerk (middleware-protected routes)

- **Theme:** Dark/Light mode via `next-themes`

- **Data:** FakeStore API (`https://fakestoreapi.com/products`)

- **State:** React Context / Zustand for cart; localStorage for persistence
 
No external Figma link or codebase was attached. This design system was derived from the project brief description. If you have a codebase or Figma file, re-attach it via the Import menu for higher fidelity.
 
---
 
## Products / Surfaces
 
| Surface | Description |

|---|---|

| **Landing Page** (public) | Hero section, responsive nav, auth trigger |

| **Product Listing** (auth-gated) | Grid with sidebar filters, MUI Skeleton loading, heart/cart interactions |

| **Product Details** (auth-gated) | Dynamic route, split desktop layout, sticky mobile CTA |

| **Navbar** | Dark/light toggle, cart counter badge, hamburger drawer on mobile |
 
---
 
## CONTENT FUNDAMENTALS
 
### Tone & Voice

- **Friendly but efficient.** Copy is direct and action-oriented.

- **Second person** ("Your cart", "Find your style") — not first-person brand voice.

- **Title Case** for headings and CTAs. Sentence case for body/descriptions.

- **No emoji** in UI copy — icons are used instead.

- **Numbers are formatted** with commas; prices use `$` prefix (e.g. `$24.99`).

- **Error messages** are human and suggest a fix: "Something went wrong. Try again →"

- **Loading states** use skeleton shimmer — no spinners with text.

- **CTA copy** is imperative and specific: "Add to Cart", "Get Started", "View Details" — never vague like "Click here".

- **Truncation** on product titles at 2 lines max; full title in tooltip/detail page.
 
### Examples

- Hero: *"Shop the latest. Delivered fast."*

- Auth trigger: *"Get Started"* (not "Sign Up" or "Login")

- Empty cart: *"Your cart is empty. Start shopping →"*

- API error: *"Couldn't load products. Try again"*

- Like toggle: no label — icon-only interaction
 
---
 
## VISUAL FOUNDATIONS
 
### Color System

Dual-mode (light/dark). Primary brand color is a deep indigo-blue. Accent is amber for CTAs and highlights. Neutrals are cool gray.
 
| Role | Light Mode | Dark Mode |

|---|---|---|

| Background | `#FAFAFA` | `#0F0F11` |

| Surface (card) | `#FFFFFF` | `#1C1C21` |

| Surface elevated | `#F5F5F5` | `#26262D` |

| Primary | `#3B4FD8` (indigo) | `#6B7FF0` (lighter indigo) |

| Primary hover | `#2D3FB8` | `#8291F5` |

| Accent/CTA | `#F59E0B` (amber) | `#FBBF24` |

| Foreground primary | `#111118` | `#F2F2F7` |

| Foreground secondary | `#5C5C70` | `#9898A8` |

| Foreground muted | `#9898A8` | `#5C5C70` |

| Border | `#E4E4ED` | `#2E2E38` |

| Error | `#DC2626` | `#F87171` |

| Success | `#16A34A` | `#4ADE80` |
 
### Typography

- **Display/Headings:** `Plus Jakarta Sans` (Google Fonts, weights 600/700/800)

- **Body:** `Inter` (Google Fonts, weights 400/500)

- **Mono (prices, codes):** `JetBrains Mono` (Google Fonts, weight 400/600)
 
Scale (px): 12, 14, 16, 18, 20, 24, 32, 40, 56
 
### Spacing Scale (base-4)

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96px`
 
### Corner Radii

- **xs:** 4px — inputs, badges

- **sm:** 8px — chips, tags

- **md:** 12px — cards, modals

- **lg:** 16px — drawers, bottom sheets

- **xl:** 24px — hero sections, featured cards

- **full:** 9999px — pills, avatar badges
 
### Shadows (light mode)

- **sm:** `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)`

- **md:** `0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)`

- **lg:** `0 12px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)`

- In dark mode: shadows replaced with `border: 1px solid var(--border)` + subtle background elevation.
 
### Backgrounds

- **Landing hero:** Full-bleed CSS gradient (`135deg`, indigo → violet, with a subtle mesh noise overlay via SVG filter)

- **Product grid:** Flat background color, no texture

- **Cards:** White/dark surface, no gradients inside cards

- **Modals/drawers:** Blurred backdrop (`backdrop-filter: blur(8px)`)
 
### Animation & Motion

- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard) for most transitions

- **Duration:** 150ms for micro (hover), 250ms for state changes, 350ms for drawers/modals

- **Skeleton:** shimmer animation (`background-position` sweep, 1.5s infinite)

- **Page transitions:** fade + slight upward translate (20px → 0, opacity 0 → 1, 300ms)

- **No bounce** — easing is smooth and professional, not playful

- **Cart badge:** scale pulse on update (scale 1 → 1.25 → 1, 200ms)
 
### Hover & Press States

- **Buttons:** darken background 10%, no scale

- **Cards:** `box-shadow` elevation increase + `translateY(-2px)`, 150ms

- **Icon buttons:** opacity to 0.7

- **Nav links:** underline from left (width 0 → 100%, 200ms)

- **Heart icon:** fill color transition (gray → red), scale 1 → 1.15 → 1
 
### Cards

- Rounded `12px`

- Subtle `1px` border in dark mode; shadow `md` in light mode

- White/dark surface

- Product image fills top 60% of card, object-fit: cover

- No colored left-border accents
 
### Imagery

- Product photos: clean white background (FakeStore API default)

- Hero: abstract gradient, no photography

- Color vibe: cool-neutral with indigo accents

- All images via `next/image` for optimization
 
### Use of Transparency / Blur

- Navbar on scroll: `backdrop-filter: blur(12px)` + semi-transparent background

- Mobile drawer overlay: `rgba(0,0,0,0.5)` scrim

- Bottom sheet modal: same blur treatment
 
---
 
## ICONOGRAPHY
 
Icons sourced from **Lucide React** (`lucide-react` npm package / CDN). Lucide is a clean, consistent 24px stroke-based icon set at 1.5px stroke weight — matches MUI's default icon aesthetic well.
 
Key icons used:

| Icon | Usage |

|---|---|

| `ShoppingCart` | Navbar cart, Add to Cart buttons |

| `Heart` / `HeartFilled` | Product like toggle |

| `Menu` / `X` | Hamburger / close drawer |

| `Sun` / `Moon` | Dark/light toggle |

| `Search` | Search input |

| `ChevronRight` | Breadcrumbs, CTAs |

| `Star` | Product rating |

| `Filter` | Mobile filter trigger |

| `User` / `LogOut` | Auth state in nav |

| `ArrowLeft` | Back navigation |

| `Check` | Cart success feedback |

| `AlertCircle` | Error states |

| `Loader` | Fallback loading (if skeleton not used) |
 
No custom icon font. No PNG icons. No emoji as icons. Unicode not used for icons.
 
CDN: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`
 
---
 
## File Index
 
```

README.md                     ← You are here

SKILL.md                      ← Agent skill definition

colors_and_type.css           ← All CSS custom properties (colors + type)

assets/

  logo.svg                    ← ShopKit wordmark SVG

  hero-gradient.svg           ← Hero mesh gradient background

preview/

  colors-brand.html           ← Brand color swatches

  colors-semantic.html        ← Semantic color tokens (light + dark)

  colors-neutral.html         ← Neutral gray scale

  type-scale.html             ← Type scale specimen

  type-specimens.html         ← Heading / body / mono specimens

  spacing-tokens.html         ← Spacing + radius + shadow tokens

  component-buttons.html      ← Button variants

  component-inputs.html       ← Form input states

  component-cards.html        ← Product card variants

  component-badges.html       ← Badges, chips, tags

  component-nav.html          ← Navbar light + dark

  component-skeleton.html     ← Loading skeleton states

ui_kits/

  ecommerce/

    README.md                 ← UI kit overview

    index.html                ← Full interactive prototype

    Navbar.jsx                ← Responsive nav with cart + dark toggle

    ProductCard.jsx           ← Product card with heart + cart

    ProductGrid.jsx           ← Responsive grid + sidebar filter

    ProductDetail.jsx         ← Split-screen detail layout

    CartDrawer.jsx            ← Slide-in cart panel

    HeroSection.jsx           ← Landing page hero

    AuthModal.jsx             ← Clerk sign-in trigger

    Skeleton.jsx              ← MUI-style skeleton shimmer

```
 
---
 
## Recommended REST API
 
**DummyJSON** — `https://dummyjson.com/products`
 
| Feature | Detail |

|---|---|

| Auth | None required |

| Products | 100+ with images, titles, descriptions, ratings, stock |

| Pagination | `GET /products?limit=20&skip=0` |

| Search | `GET /products/search?q=phone` |

| Categories | `GET /products/categories` |

| Single product | `GET /products/:id` |
 
Replace FakeStore API with DummyJSON — response shape is compatible, just map `product.thumbnail` instead of `product.image`.
 
---
 
## Filters — Implementation Requirements
 
### Filter Types

| Filter | Type | Source |

|---|---|---|

| Category | Multi-select chips | `GET /products/categories` |

| Price Range | Dual-handle slider | `min` / `max` from product list |

| Rating | Star selector (3★+, 4★+, 5★) | `product.rating` |

| Sort By | Dropdown | Client-side sort |

| In Stock | Toggle switch | `product.stock > 0` |
 
### Data Flow

```

Fetch all products → store in state

  → apply filters client-side (no extra API calls)

  → derive filtered list → pass to grid

  → URL sync: update query params on every filter change

    e.g. ?category=smartphones&minPrice=100&rating=4&sort=price-asc

```
 
### URL Query Param Schema

```

?category=smartphones
&minPrice=0
&maxPrice=1000
&rating=4
&inStock=true
&sort=price-asc     // price-asc | price-desc | rating | newest
&page=1
&limit=20

```
 
### Components Needed

- `FilterSidebar.jsx` — desktop sticky sidebar (240px)

- `FilterBottomSheet.jsx` — mobile slide-up drawer

- `PriceRangeSlider.jsx` — dual-handle, MUI Slider base

- `CategoryChips.jsx` — fetched from API, multi-select

- `StarFilter.jsx` — clickable star threshold selector

- `ActiveFilterBar.jsx` — shows applied filters as dismissible pills

- `SortDropdown.jsx` — MUI Select, 4 options

- `useFilters.js` — custom hook: state + URL sync + derived filtered list
 
### State Shape

```js

{

  categories: [],       // string[]

  minPrice: 0,

  maxPrice: 1000,

  rating: null,         // 3 | 4 | 5 | null

  inStock: false,

  sort: 'featured',     // 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

  page: 1,

  limit: 20

}

```
 
---
 
## Sitemap & SEO
 
### Sitemap Structure

```

/                          → Landing page (public)

/products                  → Product listing (auth-gated)

/products/[id]             → Product detail (auth-gated)

/products/[id]/[slug]      → SEO-friendly URL e.g. /products/4/mens-cotton-jacket

/categories                → All categories

/categories/[slug]         → Filtered listing e.g. /categories/electronics

/search                    → Search results (?q=)

/wishlist                  → Saved/liked products (auth-gated)

/cart                      → Cart page (auth-gated)

/checkout                  → Checkout flow (auth-gated)

/checkout/success          → Order confirmation

/account                   → User profile (auth-gated)

/account/orders            → Order history (auth-gated)

/404                       → Not found

/500                       → Server error

```
 
### SEO Implementation (Next.js App Router)

```js

// app/products/[id]/[slug]/page.tsx

export async function generateMetadata({ params }) {

  const product = await fetch(`https://dummyjson.com/products/${params.id}`).then(r => r.json());

  return {

    title: `${product.title} — ShopKit`,

    description: product.description,

    openGraph: {

      title: product.title,

      description: product.description,

      images: [{ url: product.thumbnail }],

    },

    alternates: {

      canonical: `/products/${product.id}/${slugify(product.title)}`,

    },

  };

}

```
 
### SEO Checklist

- [ ] `generateMetadata()` on all public pages

- [ ] `sitemap.ts` auto-generated from product IDs via DummyJSON

- [ ] `robots.txt` — disallow `/checkout`, `/account`, `/cart`

- [ ] Canonical URLs on all product pages

- [ ] `next/image` with `alt` text on every product image

- [ ] Structured data (`application/ld+json`) on product detail:

  - `Product` schema: name, image, price, rating, availability

- [ ] Breadcrumb structured data on listing + detail pages

- [ ] `loading.tsx` / `suspense` boundaries for Core Web Vitals

- [ ] `<link rel="preconnect">` for DummyJSON + Google Fonts

- [ ] Social meta tags (OG + Twitter Card) on all pages

- [ ] Auth-gated pages excluded from sitemap and set `noindex`

 
https://stitch.withgoogle.com/projects/7687803417279933432
Stitch - Design with AI
Stitch generates UIs for mobile and web applications, making design ideation fast and easy.
 
https://stitch.withgoogle.com/projects/2288852865083552477
Stitch - Design with AI
Stitch generates UIs for mobile and web applications, making design ideation fast and easy.
 
 
# ShopKit Design System
## Overview
ShopKit is a production-ready, mobile-responsive e-commerce frontend built with:
- **Framework:** Next.js (App Router)
- **Styling:** Material UI (components + theming)
- **Authentication:** Clerk (middleware-protected routes)
- **Theme:** Dark/Light mode via `next-themes`
- **Data:** FakeStore API (`https://fakestoreapi.com/products`)
- **State:** React Context / Zustand for cart; localStorage for persistence
No external Figma link or codebase was attached. This design system was derived from the project brief description. If you have a codebase or Figma file, re-attach it via the Import menu for higher fidelity.
---
## Products / Surfaces
| Surface | Description |
|---|---|
| **Landing Page** (public) | Hero section, responsive nav, auth trigger |
| **Product Listing** (auth-gated) | Grid with sidebar filters, MUI Skeleton loading, heart/cart interactions |
| **Product Details** (auth-gated) | Dynamic route, split desktop layout, sticky mobile CTA |
| **Navbar** | Dark/light toggle, cart counter badge, hamburger drawer on mobile |
---
## CONTENT FUNDAMENTALS
### Tone & Voice
- **Friendly but efficient.** Copy is direct and action-oriented.
- **Second person** ("Your cart", "Find your style") — not first-person brand voice.
- **Title Case** for headings and CTAs. Sentence case for body/descriptions.
- **No emoji** in UI copy — icons are used instead.
- **Numbers are formatted** with commas; prices use `$` prefix (e.g. `$24.99`).
- **Error messages** are human and suggest a fix: "Something went wrong. Try again →"
- **Loading states** use skeleton shimmer — no spinners with text.
- **CTA copy** is imperative and specific: "Add to Cart", "Get Started", "View Details" — never vague like "Click here".
- **Truncation** on product titles at 2 lines max; full title in tooltip/detail page.
### Examples
- Hero: *"Shop the latest. Delivered fast."*
- Auth trigger: *"Get Started"* (not "Sign Up" or "Login")
- Empty cart: *"Your cart is empty. Start shopping →"*
- API error: *"Couldn't load products. Try again"*
- Like toggle: no label — icon-only interaction
---
## VISUAL FOUNDATIONS
### Color System
Dual-mode (light/dark). Primary brand color is a deep indigo-blue. Accent is amber for CTAs and highlights. Neutrals are cool gray.
| Role | Light Mode | Dark Mode |
|---|---|---|
| Background | `#FAFAFA` | `#0F0F11` |
| Surface (card) | `#FFFFFF` | `#1C1C21` |
| Surface elevated | `#F5F5F5` | `#26262D` |
| Primary | `#3B4FD8` (indigo) | `#6B7FF0` (lighter indigo) |
| Primary hover | `#2D3FB8` | `#8291F5` |
| Accent/CTA | `#F59E0B` (amber) | `#FBBF24` |
| Foreground primary | `#111118` | `#F2F2F7` |
| Foreground secondary | `#5C5C70` | `#9898A8` |
| Foreground muted | `#9898A8` | `#5C5C70` |
| Border | `#E4E4ED` | `#2E2E38` |
| Error | `#DC2626` | `#F87171` |
| Success | `#16A34A` | `#4ADE80` |
### Typography
- **Display/Headings:** `Plus Jakarta Sans` (Google Fonts, weights 600/700/800)
- **Body:** `Inter` (Google Fonts, weights 400/500)
- **Mono (prices, codes):** `JetBrains Mono` (Google Fonts, weight 400/600)
Scale (px): 12, 14, 16, 18, 20, 24, 32, 40, 56
### Spacing Scale (base-4)
`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96px`
### Corner Radii
- **xs:** 4px — inputs, badges
- **sm:** 8px — chips, tags
- **md:** 12px — cards, modals
- **lg:** 16px — drawers, bottom sheets
- **xl:** 24px — hero sections, featured cards
- **full:** 9999px — pills, avatar badges
### Shadows (light mode)
- **sm:** `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)`
- **md:** `0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)`
- **lg:** `0 12px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)`
- In dark mode: shadows replaced with `border: 1px solid var(--border)` + subtle background elevation.
### Backgrounds
- **Landing hero:** Full-bleed CSS gradient (`135deg`, indigo → violet, with a subtle mesh noise overlay via SVG filter)
- **Product grid:** Flat background color, no texture
- **Cards:** White/dark surface, no gradients inside cards
- **Modals/drawers:** Blurred backdrop (`backdrop-filter: blur(8px)`)
### Animation & Motion
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard) for most transitions
- **Duration:** 150ms for micro (hover), 250ms for state changes, 350ms for drawers/modals
- **Skeleton:** shimmer animation (`background-position` sweep, 1.5s infinite)
- **Page transitions:** fade + slight upward translate (20px → 0, opacity 0 → 1, 300ms)
- **No bounce** — easing is smooth and professional, not playful
- **Cart badge:** scale pulse on update (scale 1 → 1.25 → 1, 200ms)
### Hover & Press States
- **Buttons:** darken background 10%, no scale
- **Cards:** `box-shadow` elevation increase + `translateY(-2px)`, 150ms
- **Icon buttons:** opacity to 0.7
- **Nav links:** underline from left (width 0 → 100%, 200ms)
- **Heart icon:** fill color transition (gray → red), scale 1 → 1.15 → 1
### Cards
- Rounded `12px`
- Subtle `1px` border in dark mode; shadow `md` in light mode
- White/dark surface
- Product image fills top 60% of card, object-fit: cover
- No colored left-border accents
### Imagery
- Product photos: clean white background (FakeStore API default)
- Hero: abstract gradient, no photography
- Color vibe: cool-neutral with indigo accents
- All images via `next/image` for optimization
### Use of Transparency / Blur
- Navbar on scroll: `backdrop-filter: blur(12px)` + semi-transparent background
- Mobile drawer overlay: `rgba(0,0,0,0.5)` scrim
- Bottom sheet modal: same blur treatment
---
## ICONOGRAPHY
Icons sourced from **Lucide React** (`lucide-react` npm package / CDN). Lucide is a clean, consistent 24px stroke-based icon set at 1.5px stroke weight — matches MUI's default icon aesthetic well.
Key icons used:
| Icon | Usage |
|---|---|
| `ShoppingCart` | Navbar cart, Add to Cart buttons |
| `Heart` / `HeartFilled` | Product like toggle |
| `Menu` / `X` | Hamburger / close drawer |
| `Sun` / `Moon` | Dark/light toggle |
| `Search` | Search input |
| `ChevronRight` | Breadcrumbs, CTAs |
| `Star` | Product rating |
| `Filter` | Mobile filter trigger |
| `User` / `LogOut` | Auth state in nav |
| `ArrowLeft` | Back navigation |
| `Check` | Cart success feedback |
| `AlertCircle` | Error states |
| `Loader` | Fallback loading (if skeleton not used) |
No custom icon font. No PNG icons. No emoji as icons. Unicode not used for icons.
CDN: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`
---
## File Index
```
README.md                     ← You are here
SKILL.md                      ← Agent skill definition
colors_and_type.css           ← All CSS custom properties (colors + type)
assets/
  logo.svg                    ← ShopKit wordmark SVG
  hero-gradient.svg           ← Hero mesh gradient background
preview/
  colors-brand.html           ← Brand color swatches
  colors-semantic.html        ← Semantic color tokens (light + dark)
  colors-neutral.html         ← Neutral gray scale
  type-scale.html             ← Type scale specimen
  type-specimens.html         ← Heading / body / mono specimens
  spacing-tokens.html         ← Spacing + radius + shadow tokens
  component-buttons.html      ← Button variants
  component-inputs.html       ← Form input states
  component-cards.html        ← Product card variants
  component-badges.html       ← Badges, chips, tags
  component-nav.html          ← Navbar light + dark
  component-skeleton.html     ← Loading skeleton states
ui_kits/
  ecommerce/
    README.md                 ← UI kit overview
    index.html                ← Full interactive prototype
    Navbar.jsx                ← Responsive nav with cart + dark toggle
    ProductCard.jsx           ← Product card with heart + cart
    ProductGrid.jsx           ← Responsive grid + sidebar filter
    ProductDetail.jsx         ← Split-screen detail layout
    CartDrawer.jsx            ← Slide-in cart panel
    HeroSection.jsx           ← Landing page hero
    AuthModal.jsx             ← Clerk sign-in trigger
    Skeleton.jsx              ← MUI-style skeleton shimmer
```
---
## Recommended REST API
**DummyJSON** — `https://dummyjson.com/products`
| Feature | Detail |
|---|---|
| Auth | None required |
| Products | 100+ with images, titles, descriptions, ratings, stock |
| Pagination | `GET /products?limit=20&skip=0` |
| Search | `GET /products/search?q=phone` |
| Categories | `GET /products/categories` |
| Single product | `GET /products/:id` |
Replace FakeStore API with DummyJSON — response shape is compatible, just map `product.thumbnail` instead of `product.image`.
---
## Filters — Implementation Requirements
### Filter Types
| Filter | Type | Source |
|---|---|---|
| Category | Multi-select chips | `GET /products/categories` |
| Price Range | Dual-handle slider | `min` / `max` from product list |
| Rating | Star selector (3★+, 4★+, 5★) | `product.rating` |
| Sort By | Dropdown | Client-side sort |
| In Stock | Toggle switch | `product.stock > 0` |
### Data Flow
```
Fetch all products → store in state
  → apply filters client-side (no extra API calls)
  → derive filtered list → pass to grid
  → URL sync: update query params on every filter change
    e.g. ?category=smartphones&minPrice=100&rating=4&sort=price-asc
```
### URL Query Param Schema
```
?category=smartphones
&minPrice=0
&maxPrice=1000
&rating=4
&inStock=true
&sort=price-asc     // price-asc | price-desc | rating | newest
&page=1
&limit=20
```
### Components Needed
- `FilterSidebar.jsx` — desktop sticky sidebar (240px)
- `FilterBottomSheet.jsx` — mobile slide-up drawer
- `PriceRangeSlider.jsx` — dual-handle, MUI Slider base
- `CategoryChips.jsx` — fetched from API, multi-select
- `StarFilter.jsx` — clickable star threshold selector
- `ActiveFilterBar.jsx` — shows applied filters as dismissible pills
- `SortDropdown.jsx` — MUI Select, 4 options
- `useFilters.js` — custom hook: state + URL sync + derived filtered list
### State Shape
```js
{
  categories: [],       // string[]
  minPrice: 0,
  maxPrice: 1000,
  rating: null,         // 3 | 4 | 5 | null
  inStock: false,
  sort: 'featured',     // 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
  page: 1,
  limit: 20
}
```
---
## Sitemap & SEO
### Sitemap Structure
```
/                          → Landing page (public)
/products                  → Product listing (auth-gated)
/products/[id]             → Product detail (auth-gated)
/products/[id]/[slug]      → SEO-friendly URL e.g. /products/4/mens-cotton-jacket
/categories                → All categories
/categories/[slug]         → Filtered listing e.g. /categories/electronics
/search                    → Search results (?q=)
/wishlist                  → Saved/liked products (auth-gated)
/cart                      → Cart page (auth-gated)
/checkout                  → Checkout flow (auth-gated)
/checkout/success          → Order confirmation
/account                   → User profile (auth-gated)
/account/orders            → Order history (auth-gated)
/404                       → Not found
/500                       → Server error
```
### SEO Implementation (Next.js App Router)
```js
// app/products/[id]/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const product = await fetch(`https://dummyjson.com/products/${params.id}`).then(r => r.json());
  return {
    title: `${product.title} — ShopKit`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.thumbnail }],
    },
    alternates: {
      canonical: `/products/${product.id}/${slugify(product.title)}`,
    },
  };
}
```
### SEO Checklist
- [ ] `generateMetadata()` on all public pages
- [ ] `sitemap.ts` auto-generated from product IDs via DummyJSON
- [ ] `robots.txt` — disallow `/checkout`, `/account`, `/cart`
- [ ] Canonical URLs on all product pages
- [ ] `next/image` with `alt` text on every product image
- [ ] Structured data (`application/ld+json`) on product detail:
  - `Product` schema: name, image, price, rating, availability
- [ ] Breadcrumb structured data on listing + detail pages
- [ ] `loading.tsx` / `suspense` boundaries for Core Web Vitals
- [ ] `<link rel="preconnect">` for DummyJSON + Google Fonts
- [ ] Social meta tags (OG + Twitter Card) on all pages
- [ ] Auth-gated pages excluded from sitemap and set `noindex`
 
 
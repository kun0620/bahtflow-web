# Design System Document

## 1. Overview & Creative North Star: "The Financial Sanctuary"

This design system moves away from the cluttered, high-stress environment of traditional banking apps. Instead, it adopts the **Financial Sanctuary** philosophy—a "High-End Editorial" approach to personal finance. 

The goal is to transform transaction tracking into a serene, intentional experience. We break the "template" look by utilizing heavy vertical whitespace, intentional asymmetry in typography, and a "No-Line" architectural philosophy. Instead of rigid grids and harsh borders, we use tonal layering and soft, glass-like surfaces to create a sense of calm and clarity. This is specifically optimized for the Thai market, balancing the modern efficiency of `Inter` with the cultural legibility of `Sarabun` (or Thai-compatible sans-serifs), ensuring the Thai Baht (฿) is treated with typographic elegance.

---

## 2. Colors

Our palette is rooted in Material Design 3 logic but applied with an editorial lens to avoid a "system-default" feel.

### The Palette
- **Primary & Neutral:** We use `primary` (#3C5661) and `primary_container` (#546E7A) for the general UI and balance-related elements. This "Blue-Grey" provides a professional, stable foundation.
- **Success (Income):** `secondary` (#1B6D24) and its variants represent growth.
- **Error (Expenses):** `tertiary` (#A60B15) and `error` (#BA1A1A) signify outflow.
- **Surface Hierarchy:** Utilizes the `surface_container` tokens (Lowest to Highest) to define depth.

### Core Visual Rules
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface_container_lowest` card should sit atop a `surface_container_low` background. 
*   **The Glass & Gradient Rule:** For main dashboard CTAs (like "Add Transaction"), use a subtle gradient transitioning from `primary` to `primary_container`. For floating navigation or modals, utilize Glassmorphism: apply `surface` colors at 80% opacity with a `backdrop-filter: blur(12px)`.
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of fine paper. 
    *   *Level 0 (Base):* `surface` (#F3FAFF)
    *   *Level 1 (Sections):* `surface_container_low` (#E6F6FF)
    *   *Level 2 (Active Cards):* `surface_container_lowest` (#FFFFFF)

---

## 3. Typography

The system uses a dual-font approach to separate "Data" from "Narrative."

*   **Display & Headlines (Manrope):** Used for large balance displays and section headers. Manrope’s geometric nature gives the Thai Baht (฿) a modern, architectural feel.
    *   `display-lg` (3.5rem): Used for the "Main Balance."
    *   `headline-md` (1.75rem): Used for monthly summaries.
*   **Body & Labels (Inter / Sarabun):** Optimized for high-readability at small sizes.
    *   `title-sm` (1rem): Standard for transaction names.
    *   `body-md` (0.875rem): Secondary metadata (categories, dates).
    *   `label-sm` (0.6875rem): Micro-data (timestamps, currency codes).

**Editorial Note:** Always use tabular numerals (lining figures) for currency to ensure decimals align perfectly in lists, maintaining the professional "Ledger" aesthetic.

---

## 4. Elevation & Depth

We eschew traditional "Drop Shadows" in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface_container_highest` element should be used for the most interactive elements (like a "Scan QR" button), while non-interactive backgrounds stay at `surface_dim`.
*   **Ambient Shadows:** If a floating action button (FAB) or modal requires a shadow, use an extra-diffused blur: `box-shadow: 0 12px 32px rgba(2, 31, 41, 0.06)`. The shadow color must be a tinted version of `on_surface`, never pure black.
*   **The "Ghost Border" Fallback:** In high-density data views where background shifts aren't enough, use a "Ghost Border": `outline_variant` (#C2C7CB) at 15% opacity.
*   **Glassmorphism:** Use semi-transparent `surface_variant` for bottom navigation bars to allow the page content to subtly bleed through, creating a sense of continuity.

---

## 5. Components

### Cards & Lists
*   **Rule:** Forbid divider lines.
*   **Implementation:** Use a `2.5` (0.625rem) or `3` (0.75rem) spacing gap between transaction items. Use a `surface_container_low` background for the list item to separate it from the `surface` background.
*   **Corners:** Apply `md` (0.75rem / 12px) for cards and `xl` (1.5rem) for bottom sheets.

### Buttons
*   **Primary:** `primary` (#3C5661) background with `on_primary` (#FFFFFF) text. Shape: `full` (pill-shaped) for high touch-affordance.
*   **Secondary:** `secondary_container` (#A0F399) with `on_secondary_container` (#217128) for "Add Income."
*   **Tertiary:** `tertiary_container` (#CA2B2A) with `on_tertiary_container` (#FFE6E3) for "Add Expense."

### Input Fields
*   **Styling:** Use the "Filled" style with `surface_container_high` and a bottom-only `outline` indicator that activates on focus. 
*   **Numbers:** Currency inputs should use `display-sm` typography to emphasize the amount being entered.

### Custom Component: The "Baht-Balance" Header
A large, screen-width component using `surface_container_highest`. The balance is centered using `display-lg`, with a subtle `primary_fixed` gradient background to make the "Top-of-Wallet" status feel premium.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical padding. Give the top of a page more breathing room (`spacing-20`) than the sides (`spacing-4`).
*   **Do** use `secondary` (Green) and `tertiary` (Red) sparingly. Only the currency amount should carry the color; the transaction name stays `on_surface`.
*   **Do** integrate the Thai Baht symbol (฿) directly into the input field as a prefix, styled in `outline` color to keep focus on the digits.

### Don’t
*   **Don’t** use 1px dividers to separate transactions. Use white space or a subtle `0.5px` shift in surface tone.
*   **Don’t** use sharp corners. Everything must feel approachable and "soft-touch" (minimum `sm` 4px for tiny chips, `md` 12px for cards).
*   **Don’t** use high-contrast black (#000000). Always use `on_surface` (#021F29) for text to maintain the premium, Blue-Grey tonal depth.
# uidesign.best UI Design Prompt

Generate a UI design based on these specifications:

## Design Aesthetic

**Selected:** Vaporwave
**Description:** Pastel, 80s

AESTHETIC: VAPORWAVE

CORE PRINCIPLE: Nostalgic, surreal, ironic. 80s/90s consumer culture through a dreamlike filter.

IMPLEMENTATION:
├── Color Palette (Signature)
│ └── Pink: #FF71CE, #FF6AD5
│ └── Cyan/Teal: #00F5FF, #01CDFE
│ └── Purple: #B967FF, #8B5CF6
│ └── Use as gradients: linear-gradient(135deg, #FF6AD5, #01CDFE)
│
├── Visual Motifs (Required)
│ └── Greek/Roman marble busts and statues
│ └── Palm trees, sunsets, beaches
│ └── Windows 95/98 UI elements
│ └── Japanese text (aesthetic, not functional)
│ └── Checkerboard floors/grids (perspective)
│ └── Dolphins, geometric shapes
│
├── Effects
│ └── VHS tracking lines, scan distortion
│ └── Chromatic aberration (RGB shift)
│ └── Soft glow on text
│ └── Retro gradients (sunset palette)
│
└── Typography
└── Mix: Pixelated bitmap + wide serif
└── Extra letter-spacing (0.3em+)
└── Japanese: ヴェイパーウェイヴ
└── All caps, centered

DO:
✓ Layer multiple nostalgic elements
✓ Use pink-cyan gradients liberally
✓ Add retro computer UI frames
✓ Create dreamy, surreal compositions

DON'T:
✗ Make it too modern/clean
✗ Use contemporary imagery
✗ Forget the ironic/satirical tone
✗ Skip the signature color palette

## Layout Structure

**Selected:** Full-screen
**Description:** Immersive

LAYOUT: FULL-SCREEN SECTIONS

CORE PRINCIPLE: Each section = one viewport. Immersive slides. Scroll snapping.

IMPLEMENTATION:
├── Container
│ └── scroll-snap-type: y mandatory
│ └── overflow-y: scroll
│ └── height: 100vh
│
├── Sections
│ └── height: 100vh (each section)
│ └── scroll-snap-align: start
│ └── display: flex; align-items: center; justify-content: center
│ └── Content centered within viewport
│
├── Content Composition
│ └── Everything fits without scrolling
│ └── Centered vertically and horizontally
│ └── Large typography fills space
│ └── Images: object-fit: cover (full bleed)
│
├── Navigation
│ └── Dot indicators (fixed position)
│ └── Scroll progress bar
│ └── Section numbers
│ └── Keyboard: up/down arrow support
│
└── Transitions
└── Fade in elements on section enter
└── Parallax layers within sections
└── Smooth scroll-snap behavior
└── Loading states between heavy sections

DO:
✓ Make each section self-contained
✓ Use scroll-snap for precise stops
✓ Add visual navigation indicators
✓ Create dramatic, impactful sections

DON'T:
✗ Put more content than fits in viewport
✗ Make sections feel empty
✗ Forget mobile viewport height issues
✗ Skip loading optimization

## Atmosphere

**Selected:** Monochromatic
**Description:** Single hue

ATMOSPHERE: MONOCHROMATIC

MOOD: Cohesive, focused, brand-forward.

IMPLEMENTATION:
├── Select ONE base hue (e.g., Blue)
├── Derive ALL colors from that hue:
│ └── Background: hue at 95% lightness
│ └── Text: hue at 15% lightness
│ └── Accents: hue at 50% lightness
│ └── Borders: hue at 80% lightness
└── Vary only saturation and lightness

DO: Create visual unity through color restriction
DON'T: Introduce additional hues

## Typography

**Selected:** Monospace
**Description:** Code

TYPOGRAPHY: TECHNICAL MONOSPACE

CORE PRINCIPLE: Fixed-width precision. Every character occupies equal space, creating a grid of text. Technical, raw, engineered aesthetic.

FONT CHOICES:
├── Modern: JetBrains Mono, Fira Code, SF Mono
├── Classic: IBM Plex Mono, Source Code Pro, Roboto Mono
└── Character: Space Mono, Inconsolata, Courier Prime

IMPLEMENTATION:
├── Base Setup
│ └── font-family: "JetBrains Mono", "Fira Code", monospace
│ └── font-size: 14px to 16px (1rem optimum)
│ └── font-weight: 400 (regular) or 500 (medium)
│
├── Spacing Properties
│ └── line-height: 1.6 to 1.8 (generous)
│ └── letter-spacing: 0 (don't adjust—defeats purpose)
│ └── tab-size: 2 or 4
│
├── Ligature Options
│ └── font-feature-settings: "liga" on, "calt" on
│ └── Enables: => -> != === (code ligatures)
│ └── Turn OFF for raw look: font-variant-ligatures: none
│
├── Visual Applications
│ └── Code blocks (obvious)
│ └── Data tables and numbers
│ └── Navigation/menus for industrial feel
│ └── Full UI for "terminal" aesthetic
│
└── Color Pairing
└── Works best with dark backgrounds
└── Primary text: #E2E8F0 on #0F172A
└── Accent: Neon green #39FF14 or cyan #00F3FF

DO:
✓ Use for entire UI (not just code) for consistent aesthetic
✓ Enable ligatures for coding contexts
✓ Pair with dark mode for authenticity
✓ Align numbers and data in columns

DON'T:
✗ Adjust letter-spacing (breaks grid)
✗ Use light weights (reduces legibility)
✗ Mix with decorative fonts
✗ Ignore line-height (dense mono is hard to read)

## Texture & Material

**Selected:** Holographic
**Description:** Rainbow

MATERIAL: HOLOGRAPHIC FOIL

CORE PRINCIPLE: Rainbow metallics. Iridescent surface that shifts colors based on viewing angle. Magical, futuristic, attention-grabbing.

VISUAL PROPERTIES:
├── Color Shift Effect
│ └── Full spectrum transitions
│ └── Colors change with "angle"
│ └── Metallic base with rainbow overlay
│ └── High saturation throughout
│
├── CSS Implementation
│ └── Animated gradient:
│ background: linear-gradient(135deg,
│ #FF6B6B, #FFD93D, #6BCB77,
│ #4D96FF, #9B59B6, #FF6B6B)
│ background-size: 400% 400%
│ animation: holographic 3s ease infinite
│ └── Add metallic shimmer overlay
│ └── Subtle noise for foil texture
│
├── Shimmer Effects
│ └── Moving highlight band
│ └── Sparkle particles (optional)
│ └── Metallic base underneath
│ └── Light streak reflections
│
├── Color Sequence
│ └── Red → Orange → Yellow → Green → Blue → Purple → Red
│ └── Smooth transitions between colors
│ └── Animate on hover or continuously
│
└── Application
└── Use on cards, badges, buttons
└── Works best on dark backgrounds
└── Accent elements, not full backgrounds

CONTEXT: Y2K aesthetics, K-pop, fashion, gaming, festival branding, NFT/crypto.

DO:
✓ Animate color shifts
✓ Use full rainbow spectrum
✓ Add metallic shimmer
✓ Use sparingly for impact

DON'T:
✗ Use static colors (needs movement)
✗ Apply to large areas
✗ Mix with other complex textures
✗ Forget metallic base layer

## UI Component Library

**Selected:** DaisyUI
**Description:** Tailwind Components.

COMPONENT SYSTEM: DAISYUI

CORE PHILOSOPHY: Semantic CSS classes for Tailwind. Write less, ship faster. Themeable and playful.

DESIGN CHARACTERISTICS:
├── Semantic Classes
│ └── class="btn btn-primary"
│ └── class="card"
│ └── class="input input-bordered"
│ └── No utility-only sprawl
│
├── Theme System
│ └── 30+ built-in themes
│ └── data-theme="light" | "dark" | "cupcake"
│ └── CSS variables based
│ └── Easy custom themes
│
├── Color Classes
│ └── btn-primary, btn-secondary
│ └── btn-accent, btn-neutral
│ └── btn-info, btn-success, btn-warning, btn-error
│ └── bg-base-100, bg-base-200, bg-base-300
│
├── Component Modifiers
│ └── Size: btn-xs, btn-sm, btn-md, btn-lg
│ └── Shape: btn-circle, btn-square
│ └── Style: btn-outline, btn-ghost, btn-link
│
├── Layout Helpers
│ └── stack, carousel
│ └── drawer, modal
│ └── artboard for mockups
│
└── Key Components
└── Button: Many variants
└── Card: With figure, body, actions
└── Navbar: Responsive navigation
└── Hero: Marketing sections

DO:
✓ Use semantic class names
✓ Explore built-in themes
✓ Combine with Tailwind utilities
✓ Use the theme generator

DON'T:
✗ Fight the opinionated styles
✗ Ignore theme inheritance
✗ Over-utility when semantic exists

## Color Palette

**Selected:** Cherry
**Description:** undefined

PALETTE: CHERRY BLOSSOM

CORE IDENTITY: Romantic, spring-inspired, Japanese aesthetic. Beauty, weddings, feminine brands. Evokes romance, renewal, delicate beauty.

COLOR ROLES:
├── Background: #FFF1F2 (Soft rose/Rose-50)
│ └── Use for: Main backgrounds
│ └── Like cherry blossom petals
│ └── Delicate, warm pink tint
│
├── Primary: #E11D48 (Vivid rose/Rose-600)
│ └── Use for: Primary CTAs, key accents
│ └── Bold cherry red
│ └── Hover: #BE123C (Rose-700)
│
├── Soft: #FDA4AF (Light pink/Rose-300)
│ └── Use for: Soft backgrounds, accents
│ └── Gentle petal pink
│ └── Cards, highlights, gradients
│
└── Dark: #881337 (Deep rose/Rose-900)
└── Use for: Text, dark elements
└── Rich, romantic depth
└── Alternative to black

IMPLEMENTATION:
├── Petal Gradients
│ └── Hero: linear-gradient(135deg, #FDA4AF 0%, #FFF1F2 100%)
│ └── Button: bg-rose-600 hover:bg-rose-700
│ └── Cards: Soft gradient backgrounds
│
├── Typography
│ └── Headings: #881337 (deep rose)
│ └── Body: #6B7280 (gray-500) or #9F1239 (rose-800)
│ └── Elegant, flowing fonts work best
│ └── Consider Japanese-inspired typography
│
├── Sakura Elements
│ └── Floating petal animations
│ └── Branch illustrations
│ └── Soft, organic shapes
│ └── Watercolor-style effects
│
└── Supporting Colors
└── Leaf green: #22C55E (for contrast)
└── Sky blue: #38BDF8 (optional accent)
└── Gold: #CA8A04 (luxury touch)
└── Keep subtle—pink is hero

DO:
✓ Embrace the romantic aesthetic
✓ Add delicate animations (falling petals)
✓ Use watercolor-style illustrations
✓ Balance pink with neutral text

DON'T:
✗ Make it too saturated/aggressive
✗ Use harsh geometric shapes
✗ Add dark or heavy elements
✗ Forget the "spring" lightness

**Color Palette:**

1. #FFF1F2
2. #E11D48
3. #FDA4AF
4. #881337

---

Generated by [uidesign.best](https://uidesign.best)

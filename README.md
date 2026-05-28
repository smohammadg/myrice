# Prime Rice — HTML Integration Package

## Folder Structure
```
prime-rice/
├── index.html          ← Open in browser to preview
├── css/
│   ├── style.css       ← Main desktop styles
│   └── responsive.css  ← Tablet (≤1024px) & Mobile (≤767px)
├── js/
│   └── main.js         ← All interactions
├── images/             ← Put your product images here
└── README.md
```

## Breakpoints (matches your JPG files)
| Screen       | Width    | Design Reference              |
|--------------|----------|-------------------------------|
| Desktop      | >1024px  | webiste-version-v1.jpeg       |
| Tablet       | ≤1024px  | Tablet-version-v1.jpg         |
| Mobile       | ≤767px   | Mobile-version-v1.jpg         |
| Mobile Hover | ≤767px   | Mobile-version-Hover-v1.jpg   |

## How to Replace Placeholder Images
All `<img>` tags currently use `https://placehold.co/...` URLs.
Replace them with your actual image files:

```html
<!-- BEFORE -->
<img src="https://placehold.co/180x180/fff5e6/c8860a?text=Godawari" alt="Brand Godawari" />

<!-- AFTER (put your image in the images/ folder) -->
<img src="images/godawari-bag.png" alt="Brand Godawari" />
```

## Features Implemented
- ✅ Desktop nav: hover dropdowns (no layout shift on hover/active)
- ✅ Green nav bar with yellow "Home" active pill
- ✅ Phone number on right of nav bar
- ✅ Mobile: header logo + search bar below + hamburger
- ✅ Side nav: dark background, all 6 menu items with dropdown arrows
- ✅ Side nav accordion: tap arrow to expand/collapse sub-items
- ✅ Category slider with prev/next arrows
- ✅ Future Products slider with prev/next arrows
- ✅ Quantity +/− controls
- ✅ Add to Cart feedback animation + badge counter
- ✅ Bulk Orders banner: large image + green card + image card
- ✅ Featured Brands: rice image + green bar with brand logos + dots
- ✅ Best Selling: large featured card + 2×2 grid
- ✅ Agriculture Process: 4-step green section
- ✅ Footer: 3-column with newsletter + social + app badges
- ✅ iOS safe-area (notch/home bar) support
- ✅ Android Chrome compatible
- ✅ Scroll fade-in animations
- ✅ Keyboard accessible navigation

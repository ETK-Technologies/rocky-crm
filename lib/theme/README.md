# Rocky CRM Theming System

A comprehensive, easy-to-use theming system built for Rocky CRM with your brand colors `#F0EAE3` (cream) and `#000000` (black).

## 🎨 Overview

The theming system provides:

- **Multiple theme variants**: Light, Dark, and Cream themes
- **CSS Variables**: Dynamic theme switching
- **React Context**: Easy theme management
- **Utility Classes**: Simple styling approach
- **Component Themes**: Pre-configured component styles

## 🚀 Quick Start

### 1. Basic Usage

The theming system is already set up! Just use the theme classes:

```jsx
// Use theme-aware classes
<div className="theme-bg theme-text">
  <h1 className="theme-text">Hello World</h1>
  <p className="theme-text-secondary">Subtitle text</p>
</div>
```

### 2. Theme Toggle

Add theme switching to your components:

```jsx
import ThemeToggle from "@/components/theme/ThemeToggle";

function MyComponent() {
  return (
    <div>
      <ThemeToggle />
      {/* Your content */}
    </div>
  );
}
```

### 3. Using Theme Hook

Access theme programmatically:

```jsx
import { useTheme } from "@/lib/theme/ThemeProvider";

function MyComponent() {
  const { theme, setTheme, colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.background }}>
      Current theme: {theme}
      <button onClick={() => setTheme("dark")}>Switch to Dark</button>
    </div>
  );
}
```

## 📋 Available Themes

### 1. **Cream Theme** (Default)

- Background: `#F0EAE3` (Your cream color)
- Text: `#000000` (Your black color)
- Perfect for the main brand experience

### 2. **Light Theme**

- Background: `#FFFFFF`
- Text: `#000000`
- Clean, minimal appearance

### 3. **Dark Theme**

- Background: `#000000` (Your black color)
- Text: `#F0EAE3` (Your cream color)
- Modern dark mode experience

## 🎨 Color System

### Theme Variables

```css
:root {
  --theme-background: /* Main background */
  --theme-surface: /* Cards, surfaces */
  --theme-primary: /* Primary accent */
  --theme-secondary: /* Secondary accent */
  --theme-text-primary: /* Main text */
  --theme-text-secondary: /* Secondary text */
  --theme-text-muted: /* Muted text */
  --theme-border: /* Borders */
  --theme-shadow: /* Shadows */
}
```

### Utility Classes

| Class                  | Purpose                   |
| ---------------------- | ------------------------- |
| `theme-bg`             | Background color          |
| `theme-surface`        | Surface/card background   |
| `theme-primary`        | Primary accent background |
| `theme-text`           | Primary text color        |
| `theme-text-secondary` | Secondary text color      |
| `theme-text-muted`     | Muted text color          |
| `theme-border`         | Border color              |
| `theme-shadow`         | Box shadow                |

## 🧩 Component Usage

### Buttons

```jsx
// Use built-in button classes
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>

// Or use theme utilities
<button className="theme-primary theme-text px-4 py-2 rounded">
  Custom Button
</button>
```

### Cards

```jsx
// Use built-in card class
<div className="card p-6 rounded-lg">
  Card content
</div>

// Or use theme utilities
<div className="theme-surface theme-border border rounded-lg p-6">
  Custom card
</div>
```

### Forms

```jsx
<input
  className="input px-3 py-2 rounded border w-full"
  placeholder="Enter text..."
/>
```

## ⚙️ Advanced Usage

### Creating Custom Component Themes

```jsx
import { useTheme, getComponentTheme } from "@/lib/theme";

function MyComponent({ variant = "default" }) {
  const { theme } = useTheme();
  const styles = getComponentTheme("myComponent", variant, theme);

  return (
    <div style={{ backgroundColor: styles.background }}>
      Custom themed component
    </div>
  );
}
```

### Using Theme Utilities

```jsx
import { getThemeColor, isDarkTheme } from "@/lib/theme/utils";

function MyComponent() {
  const primaryColor = getThemeColor("primary.100");
  const isNightMode = isDarkTheme(theme);

  return (
    <div style={{ color: primaryColor }}>
      {isNightMode ? "🌙" : "☀️"} Theme content
    </div>
  );
}
```

## 🎯 Best Practices

### 1. **Use Theme Classes First**

```jsx
// ✅ Good - Uses theme classes
<div className="theme-bg theme-text">Content</div>

// ❌ Avoid - Hard-coded colors
<div className="bg-white text-black">Content</div>
```

### 2. **Consistent Component Styling**

```jsx
// ✅ Good - Consistent with theme
<button className="btn btn-primary">Action</button>

// ❌ Avoid - Custom styling without theme
<button className="bg-blue-500 text-white">Action</button>
```

### 3. **Responsive Theme Design**

```jsx
// ✅ Good - Works with all themes
<div className="theme-surface theme-border border rounded-lg">
  <h3 className="theme-text">Title</h3>
  <p className="theme-text-secondary">Description</p>
</div>
```

### 4. **Loading States**

```jsx
// ✅ Good - Theme-aware loading
if (!mounted) {
  return <div className="theme-surface animate-pulse rounded" />;
}
```

## 🔧 Customization

### Adding New Themes

1. **Update colors.js**:

```jsx
export const THEME_VARIANTS = {
  // ... existing themes
  custom: {
    background: "#your-color",
    surface: "#your-surface",
    // ... other properties
  },
};
```

2. **Update CSS variables** in `globals.css`:

```css
[data-theme="custom"] {
  --theme-background: #your-color;
  /* ... other variables */
}
```

### Adding New Colors

```jsx
// In colors.js
export const COLORS = {
  // ... existing colors
  accent: {
    50: "#lighter",
    500: "#base",
    900: "#darker",
  },
};
```

## 🎪 Examples

### Theme-Aware Card Component

```jsx
function StatsCard({ title, value, icon }) {
  return (
    <div className="card p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="theme-text-muted text-sm font-medium">{title}</p>
          <p className="theme-text text-3xl font-bold">{value}</p>
        </div>
        <div className="theme-text-secondary text-2xl">{icon}</div>
      </div>
    </div>
  );
}
```

### Theme-Aware Navigation

```jsx
function Navigation() {
  return (
    <nav className="theme-surface theme-border border-b">
      <div className="flex items-center justify-between p-4">
        <h1 className="theme-text font-bold">App Name</h1>
        <ThemeToggle />
      </div>
    </nav>
  );
}
```

## 🐛 Troubleshooting

### Theme Not Applying

- Ensure `ThemeProvider` wraps your app
- Check if theme classes are being used
- Verify CSS variables are loaded

### Hydration Mismatch

- Use `mounted` state from `useTheme()`
- Render loading state until mounted

### Missing Styles

- Ensure `globals.css` is imported
- Check if theme classes are defined
- Verify CSS variable names

## 📚 API Reference

### ThemeProvider Props

| Prop           | Type        | Default   | Description   |
| -------------- | ----------- | --------- | ------------- |
| `defaultTheme` | `string`    | `'light'` | Initial theme |
| `children`     | `ReactNode` | -         | App content   |

### useTheme() Returns

| Property      | Type       | Description          |
| ------------- | ---------- | -------------------- |
| `theme`       | `string`   | Current theme name   |
| `themes`      | `string[]` | Available themes     |
| `colors`      | `object`   | Current theme colors |
| `setTheme`    | `function` | Set specific theme   |
| `toggleTheme` | `function` | Cycle through themes |
| `mounted`     | `boolean`  | Hydration status     |

---

**Built with ❤️ for Rocky CRM** 🎨

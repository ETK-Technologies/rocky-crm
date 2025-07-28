# Images Directory

This directory contains all images used in the Rocky CRM application.

## 📁 Directory Structure

```
public/images/
├── logos/           # Company and brand logos
│   ├── rocky-logo.png
│   └── rocky-logo-white.png (if needed)
├── icons/           # UI icons and small graphics
│   ├── dashboard/
│   ├── navigation/
│   └── actions/
├── avatars/         # User profile images
├── backgrounds/      # Background images and patterns
├── illustrations/    # Decorative illustrations
└── placeholders/     # Placeholder images for loading states
```

## 🏷️ Naming Conventions

### File Names

- Use **kebab-case** (lowercase with hyphens)
- Be descriptive and specific
- Include size/version if applicable

### Examples:

- `rocky-logo.png` ✅
- `user-avatar-default.png` ✅
- `dashboard-hero-bg.jpg` ✅
- `rocky_logo.png` ❌ (underscores)
- `RockyLogo.png` ❌ (camelCase)

### Image Types

- **Logos**: `logo-{brand}-{variant}.{ext}`
- **Icons**: `icon-{category}-{name}.{ext}`
- **Avatars**: `avatar-{type}-{size}.{ext}`
- **Backgrounds**: `bg-{purpose}-{variant}.{ext}`

## 📐 Image Optimization

### Formats

- **PNG**: For logos, icons, and images with transparency
- **JPG**: For photographs and complex images
- **SVG**: For scalable icons and simple graphics
- **WebP**: For modern browsers (with fallbacks)

### Sizes

- **Logos**: 200x200px max
- **Icons**: 24x24px, 32x32px, 48x48px
- **Avatars**: 40x40px, 80x80px, 120x120px
- **Backgrounds**: Optimized for web (max 1920px width)

## 🚀 Usage

```javascript
// Import images in components
import rockyLogo from "@/public/images/logos/rocky-logo.png";

// Use in JSX
<img src={rockyLogo} alt="Rocky CRM Logo" />;
```

## 📋 Maintenance

- Keep file sizes under 500KB for optimal performance
- Use appropriate compression for each image type
- Update this README when adding new image categories
- Remove unused images regularly

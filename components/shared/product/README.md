# ProductGallery Component

A comprehensive product image gallery built with Swiper.js for Next.js applications using Sanity CMS.

## Features

- **Main Image Slider**: Full-size image display with navigation arrows
- **Thumbnail Navigation**: Small preview images for quick navigation
- **Zoom Functionality**: Click to zoom in/out on images
- **Fullscreen Mode**: Full-screen image viewing experience
- **Keyboard Navigation**: Use arrow keys and Escape key in fullscreen mode
- **Image Counter**: Shows current image position
- **Responsive Design**: Works on all screen sizes
- **Touch Support**: Swipe gestures on mobile devices
- **Accessibility**: Proper alt text and keyboard navigation

## Installation

The component requires Swiper.js to be installed:

```bash
npm install swiper
```

## Usage

```tsx
import { ProductGallery } from '@/components/shared/product';

interface ProductImage {
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  className?: string;
}

// Example usage
<ProductGallery 
  images={product.gallery}
  productName={product.name}
  className="w-full max-w-2xl"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `images` | `ProductImage[]` | Yes | Array of product images from Sanity |
| `productName` | `string` | Yes | Name of the product for alt text |
| `className` | `string` | No | Additional CSS classes |

## ProductImage Interface

```tsx
interface ProductImage {
  _key: string;           // Unique key for the image
  asset: {
    _ref: string;         // Sanity image reference
    _type: string;        // Asset type (usually "reference")
  };
  alt?: string;           // Alternative text for accessibility
}
```

## Sanity Schema Integration

The component works with the standard Sanity image field structure:

```tsx
// In your Sanity schema
{
  name: 'gallery',
  title: 'Галерея изображений',
  type: 'array',
  of: [
    {
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Альтернативный текст',
        },
      ],
    },
  ],
}
```

## Features in Detail

### Main Slider
- Navigation arrows on left/right
- Pagination dots at the bottom
- Zoom functionality (3x max zoom)
- Click to open fullscreen mode

### Thumbnail Navigation
- Shows 4 thumbnails at a time
- Active thumbnail is highlighted
- Smooth scrolling for more images
- Only shows when there are multiple images

### Fullscreen Mode
- Opens in a modal overlay
- Larger navigation arrows
- Higher zoom ratio (5x max)
- Keyboard shortcuts:
  - `Arrow Left/Right`: Navigate images
  - `Escape`: Close fullscreen
- Click outside to close

### Responsive Behavior
- Mobile: Touch-friendly controls
- Tablet: Optimized layout
- Desktop: Full feature set

## Styling

The component uses Tailwind CSS classes and can be customized with the `className` prop. The main container has these default classes:

```tsx
className="relative"
```

## Keyboard Shortcuts

- **Arrow Left/Right**: Navigate between images
- **Escape**: Close fullscreen mode
- **Zoom In/Out**: Use zoom buttons or mouse wheel

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers with touch support
- Requires CSS Grid and Flexbox support

## Performance

- Images are optimized using Sanity's image URL builder
- Lazy loading for better performance
- Efficient re-rendering with React hooks

## Accessibility

- Proper alt text for all images
- Keyboard navigation support
- Screen reader friendly
- High contrast controls
- Focus management

## Example Implementation

```tsx
// In your product page component
import { ProductGallery } from '@/components/shared/product';

export default function ProductPage({ product }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ProductGallery 
        images={product.gallery}
        productName={product.name}
        className="w-full"
      />
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        {/* Other product details */}
      </div>
    </div>
  );
}
``` 
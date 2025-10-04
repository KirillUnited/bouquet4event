# Navigation Menu Setup Guide

This guide explains how to use the new navigation menu system in Sanity CMS, which supports both internal page references and external links.

## Features

✅ **Internal Page References**: Link directly to pages created in Sanity CMS  
✅ **External Links**: Link to external URLs or internal routes  
✅ **Flexible Navigation**: Support for main navigation and footer navigation  
✅ **Type-Safe**: Full TypeScript support with proper validation  
✅ **User-Friendly**: Rich previews and conditional field visibility  

## Schema Structure

### Navigation Menu Schema
The `navigation-menu` schema includes:

- **Menu Title**: Internal name for organization
- **Menu Items**: Array of navigation items with two types:
  - **Internal Page**: References existing pages in Sanity
  - **External Link**: Manual URL input

### Menu Item Fields
Each menu item has:

- `linkType`: Radio selection between "page" and "external"
- `label`: Display text for the menu item
- `pageReference`: Reference to a Sanity page (when linkType = "page")
- `href`: URL string (when linkType = "external")
- `target`: Boolean for opening in new tab (external links only)
- `description`: Optional description

## Setup Instructions

### 1. Import Sample Content (Optional)
```bash
npx sanity dataset import sample-navigation-content.ndjson
```

This will create:
- Sample pages (About, Contacts, Privacy, Terms)
- Site settings with navigation menus
- Example of mixed internal/external links

### 2. Configure Navigation in Sanity Studio

1. **Go to Site Settings** in Sanity Studio
2. **Navigate to the "Navigation" tab**
3. **Configure Main Navigation**:
   - Add menu items
   - Choose "Внутренняя страница" for pages created in Sanity
   - Choose "Внешняя ссылка" for manual URLs
4. **Configure Footer Navigation**:
   - Add up to 3 footer navigation menus
   - Each menu can have up to 10 items

### 3. Create Pages (if needed)

Before linking to internal pages, ensure they exist:

1. **Create a new Page** in Sanity Studio
2. **Set the title and slug**
3. **Publish the page**
4. **Reference it in navigation menus**

## Usage Examples

### Internal Page Reference
```json
{
  "label": "О нас",
  "linkType": "page",
  "pageReference": {
    "_ref": "about-page-id",
    "_type": "reference"
  }
}
```

### External Link
```json
{
  "label": "Главная",
  "linkType": "external",
  "href": "/",
  "target": false
}
```

## Technical Implementation

### Schema Files
- `sanity/schemas/blocks/shared/navigation-menu.ts` - Navigation menu schema
- `sanity/schemas/documents/siteSettingsType.ts` - Site settings with navigation fields

### Query Files
- `sanity/queries/site.ts` - Updated to fetch page references

### Component Files
- `components/layout/header/index.tsx` - Header component using navigation
- `lib/navigation.ts` - Utility functions for navigation transformation

### Type Definitions
- `types/index.d.ts` - TypeScript types for navigation

## Utility Functions

### `transformNavigationItems()`
Transforms Sanity navigation items to the format expected by components:

```typescript
const navItems = transformNavigationItems(sanityMenuItems);
// Returns: [{ label, href, target }]
```

### `getNavigationItemDisplayName()`
Gets the display name for navigation items:

```typescript
const displayName = getNavigationItemDisplayName(item);
// Returns page title for internal pages, or custom label
```

## Validation Rules

- **Menu Title**: Required for navigation menus
- **Label**: Required for all menu items
- **Page Reference**: Required when linkType = "page"
- **External URL**: Required when linkType = "external"
- **Menu Items**: Maximum 10 per menu
- **Footer Menus**: Maximum 3 footer navigation menus

## Fallback Behavior

The header component includes fallback behavior:
- Uses Sanity navigation when available
- Falls back to hardcoded `NAV_ITEMS` from config
- Ensures navigation always works even without CMS data

## Best Practices

1. **Use Internal References**: Prefer page references over manual URLs when possible
2. **Consistent Naming**: Use clear, descriptive labels for menu items
3. **Limit Items**: Keep navigation menus focused (max 10 items recommended)
4. **Test Links**: Always test navigation links after changes
5. **SEO Considerations**: Use descriptive labels that help with SEO

## Troubleshooting

### Navigation Not Showing
- Check if Site Settings document exists
- Verify navigation data is published
- Check browser console for errors

### Page Links Not Working
- Ensure referenced pages exist and are published
- Verify page slugs are correctly set
- Check if pages have proper slug structure

### External Links Issues
- Verify URL format (include protocol for external sites)
- Check for typos in URLs
- Test links in browser

## Migration from Hardcoded Navigation

If you're migrating from hardcoded navigation:

1. **Export current navigation** from `config/index.ts`
2. **Create corresponding pages** in Sanity if needed
3. **Import navigation data** using the sample file as a template
4. **Test thoroughly** before removing hardcoded fallbacks
5. **Update any custom components** that use navigation data

This system provides a flexible, maintainable way to manage site navigation through Sanity CMS while maintaining backward compatibility.

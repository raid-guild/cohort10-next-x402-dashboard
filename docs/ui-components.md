# UI Components Catalog

This document catalogs all available UI components in the design system. **Always use these components when building features** - do not create custom alternatives unless absolutely necessary.

## For LLM Developer Agents

**IMPORTANT:** When working with an LLM developer agent (like Cursor, GitHub Copilot, ChatGPT, etc.), **always include this document in your prompt context**. This ensures the agent knows what components are available and will use them instead of creating custom alternatives.

### How to Use This Document with LLM Agents

1. **Add to Context:** Include this document when starting a new development session or when building UI features
2. **Reference in Prompts:** Mention "Use components from the UI Components Catalog" in your prompts
3. **Verify Usage:** Check that the agent is using existing components before accepting code suggestions

### Example Prompt Template

When asking an LLM agent to build UI features, use prompts like this:

```
I need to build a [feature description]. 

Please use components from the UI Components Catalog (docs/ui-components.md). 
Always prefer existing components over creating custom ones.

Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Make sure to:
- Import components from @/components/ui/[component-name]
- Follow the design system patterns
- Use the correct variants and props
- Include proper form handling if needed
```

### Example Prompts

**Building a Form:**
```
Build a user registration form with email, password, and terms acceptance.

Use the Form component system from the UI Components Catalog. Include:
- FormField, FormLabel, FormControl, FormMessage for each field
- Input component for email
- Input with type="password" for password
- Checkbox for terms acceptance
- Button for submission

Follow the form patterns shown in the catalog.
```

**Building a Modal:**
```
Create a confirmation dialog that appears when a user tries to delete an item.

Use the Dialog component from the UI Components Catalog with:
- DialogTrigger (as a Button)
- DialogContent with DialogHeader, DialogTitle, DialogDescription
- DialogFooter with Cancel and Confirm buttons

Follow the modal patterns in the catalog.
```

**Building a Data Display:**
```
Create a table showing a list of users with columns: name, email, role, and actions.

Use the Table component from the UI Components Catalog. Include:
- TableHeader with TableHead for each column
- TableBody with TableRow and TableCell for data
- DropdownMenu in the actions column for edit/delete options

Follow the table patterns shown in the catalog.
```

## Import Path

All components are imported from:
```typescript
import { ComponentName } from "@/components/ui/component-name";
```

## Component List

### Form Components

#### **Button** (`button.tsx`)
A versatile button component with multiple variants and sizes.

**Exports:** `Button`, `buttonVariants`

**Variants:**
- `primary` (default): Primary action button with moloch-500 background
- `secondary`: Outlined button with border
- `ghost`: Transparent background button
- `moloch`: Moloch-themed button variant

**Sizes:**
- `default`: Standard size (px-8 py-3)
- `sm`: Small size
- `lg`: Large size
- `icon`: Square icon button (size-10)

**Features:**
- Supports `leftIcon` and `rightIcon` props
- `asChild` prop for composition with other components
- Full keyboard and focus accessibility
- Disabled states

**Use when:** You need any button, action trigger, or clickable element.

---

#### **Input** (`input.tsx`)
Text input field with consistent styling and focus states.

**Exports:** `Input`

**Features:**
- Consistent border and focus ring styling
- Placeholder text support
- File input support
- Disabled states
- Type-safe with all standard HTML input attributes

**Use when:** You need single-line text input, email, password, number, or file inputs.

---

#### **Textarea** (`textarea.tsx`)
Multi-line text input component.

**Exports:** `Textarea`

**Features:**
- Minimum height of 80px
- Same styling as Input for consistency
- Auto-resize support via standard textarea attributes

**Use when:** You need multi-line text input for longer content.

---

#### **Label** (`label.tsx`)
Form label component with error state support.

**Exports:** `Label`

**Features:**
- Integrates with form validation
- Error state styling (red text when error present)
- Accessibility support with proper HTML label semantics

**Use when:** You need labels for form fields.

---

#### **Checkbox** (`checkbox.tsx`)
Checkbox input component built on Radix UI.

**Exports:** `Checkbox`

**Features:**
- Accessible keyboard navigation
- Check icon indicator
- Customizable checked/unchecked states
- Disabled states

**Use when:** You need single or multiple selection checkboxes.

---

#### **Switch** (`switch.tsx`)
Toggle switch component for on/off states.

**Exports:** `Switch`

**Features:**
- Animated toggle transition
- Accessible keyboard support
- Dark mode support
- Disabled states

**Use when:** You need a toggle switch for boolean settings or preferences.

---

#### **RadioGroup** (`radio-group.tsx`)
Radio button group for single selection from multiple options.

**Exports:** `RadioGroup`, `RadioGroupItem`

**Features:**
- Single selection enforced
- Accessible keyboard navigation
- Visual indicator for selected state
- Grouped layout support

**Use when:** You need single selection from multiple options.

---

#### **Select** (`select.tsx`)
Dropdown select component with search and grouping support.

**Exports:** `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`

**Features:**
- Searchable dropdown
- Grouped options
- Scrollable lists with scroll buttons
- Keyboard navigation
- Portal rendering for proper z-index

**Use when:** You need a dropdown selection from a list of options.

---

#### **Combobox** (`combobox.tsx`)
Searchable combobox component that combines input and select functionality.

**Exports:** `Combobox`, `ComboboxInput`, `ComboboxList`, `ComboboxItem`, etc.

**Features:**
- Type-to-search functionality
- Keyboard navigation
- Customizable filtering
- Command palette style interface

**Use when:** You need a searchable dropdown with type-ahead functionality.

---

#### **Multiselect** (`multiselect.tsx`)
Advanced multi-select component with tags, search, and async support.

**Exports:** `MultipleSelector`, `useDebounce`

**Features:**
- Multiple selection with badge display
- Async search support
- Debounced search
- Creatable options
- Grouped options
- Max selection limit
- Loading and empty states
- Clear all functionality

**Use when:** You need to select multiple items from a list with search capabilities.

---

#### **Form** (`form.tsx`)
Complete form system built on React Hook Form.

**Exports:** `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`, `RequiredFieldIndicator`

**Features:**
- React Hook Form integration
- Automatic validation state management
- Error message display
- Required field indicators
- Accessibility attributes
- Field-level error handling

**Use when:** You need to build any form with validation.

---

### Layout & Structure Components

#### **Card** (`card.tsx`)
Container component for grouping related content.

**Exports:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

**Composition:**
- `Card`: Main container
- `CardHeader`: Header section with title and description
- `CardTitle`: Main heading
- `CardDescription`: Supporting text
- `CardContent`: Main content area
- `CardFooter`: Footer section for actions

**Use when:** You need to group related content in a contained, visually distinct area.

---

#### **Tabs** (`tabs.tsx`)
Tabbed interface for organizing content into panels.

**Exports:** `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

**Features:**
- Keyboard navigation
- Accessible ARIA attributes
- Animated transitions
- Controlled and uncontrolled modes

**Use when:** You need to organize content into multiple panels accessible via tabs.

---

#### **Accordion** (`accordion.tsx`)
Collapsible content sections.

**Exports:** `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`

**Features:**
- Expandable/collapsible sections
- Animated transitions
- Keyboard navigation
- Single or multiple open items

**Use when:** You need collapsible sections of content (FAQs, details, etc.).

---

#### **Separator** (if exists)
Visual divider between content sections.

**Use when:** You need to visually separate content areas.

---

### Overlay & Modal Components

#### **Dialog** (`dialog.tsx`)
Modal dialog component for focused interactions.

**Exports:** `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogOverlay`, `DialogPortal`

**Features:**
- Focus trap
- Backdrop overlay
- Close button
- Keyboard escape to close
- Portal rendering
- Animated open/close

**Use when:** You need modal dialogs, confirmations, or focused content overlays.

---

#### **Sheet** (`sheet.tsx`)
Slide-out panel component (mobile drawer style).

**Exports:** `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetClose`, `SheetOverlay`, `SheetPortal`

**Variants:**
- `top`: Slides from top
- `bottom`: Slides from bottom
- `left`: Slides from left (default)
- `right`: Slides from right

**Features:**
- Slide animations
- Responsive sizing
- Backdrop overlay
- Portal rendering

**Use when:** You need a slide-out panel (mobile menu, sidebars, detail views).

---

#### **Drawer** (`drawer.tsx`)
Mobile-optimized drawer component.

**Exports:** `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, `DrawerClose`, `DrawerOverlay`, `DrawerPortal`

**Features:**
- Mobile-first design
- Touch gestures
- Bottom sheet style on mobile
- Responsive behavior

**Use when:** You need mobile-optimized drawers or bottom sheets.

---

#### **Popover** (`popover.tsx`)
Popover component for contextual information.

**Exports:** `Popover`, `PopoverTrigger`, `PopoverContent`

**Features:**
- Position-aware rendering
- Click outside to close
- Portal rendering
- Animated transitions

**Use when:** You need contextual popups, tooltips with rich content, or dropdown menus.

---

#### **Tooltip** (`tooltip.tsx`)
Tooltip component for hover information.

**Exports:** `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`

**Features:**
- Hover-triggered
- Position-aware
- Accessible
- Configurable delay
- Arrow indicator

**Use when:** You need to show additional information on hover.

---

#### **HoverCard** (`hover-card.tsx`)
Rich content tooltip that appears on hover.

**Exports:** `HoverCard`, `HoverCardTrigger`, `HoverCardContent`

**Features:**
- Rich content support (not just text)
- Hover-triggered
- Position-aware

**Use when:** You need to show rich content (images, formatted text) on hover.

---

### Navigation Components

#### **DropdownMenu** (`dropdown-menu.tsx`)
Dropdown menu component for actions and navigation.

**Exports:** `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuGroup`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`, `DropdownMenuRadioGroup`, `DropdownMenuCheckboxItem`, `DropdownMenuShortcut`, `DropdownMenuPortal`

**Features:**
- Nested submenus
- Radio groups
- Checkbox items
- Keyboard shortcuts display
- Separators
- Icons support

**Use when:** You need context menus, action menus, or navigation dropdowns.

---

#### **Menubar** (`menubar.tsx`)
Application menu bar component.

**Exports:** Multiple menubar components

**Features:**
- Multi-level navigation
- Keyboard navigation
- Menu groups
- Separators

**Use when:** You need application-level menu bars (File, Edit, View, etc.).

---

#### **NavigationMenu** (`navigation-menu.tsx`)
Navigation menu component for site navigation.

**Exports:** Navigation menu components

**Features:**
- Multi-level navigation
- Mega menu support
- Keyboard navigation
- Active state management

**Use when:** You need main site navigation menus.

---

#### **Breadcrumb** (`breadcrumb.tsx`)
Breadcrumb navigation component.

**Exports:** `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`

**Features:**
- Hierarchical navigation display
- Separator customization
- Ellipsis for long paths
- Link support

**Use when:** You need to show navigation hierarchy or current page location.

---

#### **Pagination** (`pagination.tsx`)
Pagination component for navigating through pages.

**Exports:** `Pagination`, `PaginationContent`, `PaginationEllipsis`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious`

**Features:**
- Previous/Next buttons
- Page number display
- Ellipsis for large page counts
- Keyboard navigation

**Use when:** You need to paginate through content or data.

---

### Data Display Components

#### **Table** (`table.tsx`)
Table component for displaying tabular data.

**Exports:** `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`

**Features:**
- Semantic HTML structure
- Hover states
- Selected row states
- Caption support
- Responsive wrapper

**Use when:** You need to display tabular data.

---

#### **DataTable** (`data-table.tsx`)
Enhanced table component with sorting, filtering, and pagination.

**Exports:** Data table components

**Features:**
- Column sorting
- Filtering
- Pagination integration
- Selection
- Column visibility

**Use when:** You need advanced table functionality with sorting and filtering.

---

#### **Badge** (`badge.tsx`)
Badge component for labels, tags, and status indicators.

**Exports:** `Badge`, `badgeVariants`

**Variants:**
- `default`: Primary badge
- `secondary`: Secondary badge
- `destructive`: Error/destructive badge
- `outline`: Outlined badge
- `moloch`: Moloch-themed badge
- `scroll`: Scroll-themed badge

**Use when:** You need labels, tags, status indicators, or small informational badges.

---

#### **Skeleton** (`skeleton.tsx`)
Loading skeleton component for content placeholders.

**Exports:** `Skeleton`

**Features:**
- Pulse animation
- Customizable size
- Placeholder content

**Use when:** You need loading states or content placeholders.

---

#### **Progress** (`progress.tsx`)
Progress bar component.

**Exports:** `ProgressBar`

**Features:**
- Animated progress indication
- Value-based display
- Customizable styling

**Use when:** You need to show progress, completion status, or loading progress.

---

### Interactive Components

#### **Slider** (`slider.tsx`)
Range slider component for numeric input.

**Exports:** `Slider`

**Features:**
- Single or range values
- Keyboard navigation
- Accessible
- Customizable steps

**Use when:** You need numeric input via dragging (volume, price range, etc.).

---

#### **Toggle** (`toggle.tsx`)
Toggle button component for on/off states.

**Exports:** `Toggle`

**Features:**
- Pressed/unpressed states
- Icon support
- Keyboard accessible

**Use when:** You need toggle buttons (toolbar buttons, filter toggles, etc.).

---

#### **Calendar** (`calendar.tsx`)
Calendar component for date selection.

**Exports:** Calendar components

**Features:**
- Date selection
- Month/year navigation
- Range selection support
- Keyboard navigation
- Localization support

**Use when:** You need date selection or calendar display.

---

#### **DatePicker** (`date-picker.tsx`)
Date picker component combining input and calendar.

**Exports:** Date picker components

**Features:**
- Input field with calendar popup
- Date formatting
- Validation
- Keyboard input support

**Use when:** You need date input with calendar picker.

---

#### **Carousel** (`carousel.tsx`)
Carousel/slider component for image or content slideshows.

**Exports:** Carousel components

**Features:**
- Auto-play support
- Navigation arrows
- Dot indicators
- Touch/swipe support
- Keyboard navigation

**Use when:** You need image carousels, content sliders, or testimonials.

---

### Utility Components

#### **ScrollArea** (`scroll-area.tsx`)
Custom scrollable area component.

**Exports:** `ScrollArea`, `ScrollAreaViewport`, `ScrollAreaScrollbar`, `ScrollAreaThumb`, `ScrollAreaCorner`

**Features:**
- Custom scrollbar styling
- Cross-browser consistency
- Smooth scrolling

**Use when:** You need custom-styled scrollbars or consistent scrolling behavior.

---

#### **Command** (`command.tsx`)
Command palette component (Cmd+K style).

**Exports:** `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`

**Features:**
- Search functionality
- Keyboard navigation
- Grouping
- Shortcuts display
- Empty states

**Use when:** You need command palettes, search interfaces, or quick actions.

---

#### **Kbd** (`kbd.tsx`)
Keyboard key indicator component.

**Exports:** `Kbd`

**Features:**
- Keyboard key styling
- Multiple key combinations

**Use when:** You need to display keyboard shortcuts or key combinations.

---

#### **Item** (`item.tsx`)
Generic item component (likely for lists or menus).

**Exports:** Item components

**Use when:** You need consistent item styling in lists or menus.

---

#### **Sidebar** (`sidebar.tsx`)
Sidebar navigation component.

**Exports:** Sidebar components

**Features:**
- Collapsible
- Responsive
- Navigation support

**Use when:** You need sidebar navigation or side panels.

---

### Specialized Components

#### **Wizard** (`wizard.tsx`)
Multi-step wizard/stepper component.

**Exports:** `Wizard`, `WizardStep`

**Features:**
- Step-by-step navigation
- Progress indication
- Step validation
- Back/forward navigation
- Completion callback
- Summary view

**Use when:** You need multi-step forms, onboarding flows, or guided processes.

---

#### **Chart** (`chart.tsx`)
Chart component wrapper (likely for Recharts or similar).

**Exports:** Chart components

**Use when:** You need data visualization charts.

---

## Component Patterns & Best Practices

### 1. Always Use Existing Components
- **Never** create custom alternatives to these components
- If a component doesn't exist, check if a combination of existing components solves the need
- If truly needed, create new components following the same patterns

### 2. Composition Over Customization
- Most components are composable (Card, Form, Dialog, etc.)
- Use component composition rather than creating variants
- Combine components to create new patterns

### 3. Form Handling
- **Always** use the `Form` component system for any form
- Use `FormField`, `FormLabel`, `FormControl`, `FormMessage` together
- Leverage React Hook Form integration

### 4. Accessibility
- All components are built with accessibility in mind
- Use semantic HTML components
- Maintain keyboard navigation
- Include proper ARIA attributes

### 5. Styling
- Components use Tailwind CSS with custom design tokens
- Use `cn()` utility for conditional classes
- Follow the design system color palette (moloch, scroll, etc.)
- Components have consistent focus states and transitions

### 6. State Management
- Use controlled components when possible
- Leverage component state management (Dialog, Sheet, etc.)
- Integrate with React Hook Form for forms

### 7. Responsive Design
- Components are responsive by default
- Use responsive variants when available
- Test on mobile and desktop

## Dependencies

Most components are built on:
- **Radix UI**: Headless UI primitives for accessibility
- **React Hook Form**: Form state management
- **Class Variance Authority (CVA)**: Variant management
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

## Component Examples

Example implementations are available in:
```
src/components/examples/
```

Each component has a corresponding example file showing usage patterns.

## When to Create New Components

Only create new components when:
1. No existing component or combination solves the need
2. The pattern will be reused multiple times
3. It follows the same patterns as existing components
4. It integrates with the design system

## Import Examples

```typescript
// Single component
import { Button } from "@/components/ui/button";

// Multiple components from same file
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Form components
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Dialog/Modal
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
```

---

## Design Tokens & Theme

### Color Palette

The design system uses three main color families:

#### Moloch (Warm Reds)
- `moloch-100` through `moloch-800`
- Primary brand color: `moloch-500` (#bd482d)
- Use for: Primary actions, accents, highlights
- Tailwind classes: `bg-moloch-500`, `text-moloch-800`, `border-moloch-400`, etc.

#### Scroll (Warm Yellows)
- `scroll-100` through `scroll-800`
- Primary brand color: `scroll-500` (#b5a22c)
- Use for: Backgrounds, secondary elements
- Tailwind classes: `bg-scroll-100`, `text-scroll-600`, etc.

#### Neutral (Grays)
- `neutral-100` through `neutral-800`
- Plus `neutral-white` and `neutral-black`
- Use for: Text, borders, muted elements
- Tailwind classes: `bg-neutral-100`, `text-neutral-800`, etc.

### Semantic Colors

Components use semantic color tokens:
- `background`: Page background (scroll-100 in light theme)
- `foreground`: Primary text (moloch-800 in light theme)
- `primary`: Primary actions (moloch-500)
- `secondary`: Secondary elements
- `muted`: Muted backgrounds and text
- `accent`: Accent colors
- `destructive`: Error/destructive actions
- `border`: Border colors
- `ring`: Focus ring color (moloch-500)

### Typography

#### Typography Classes

Use these utility classes for consistent typography:

**Display:**
- `type-display-lg`: 80px, line-height 1.1
- `type-display-md`: 60px, line-height 1.2
- `type-display-sm`: 48px, line-height 1.2

**Headings:**
- `type-heading-lg`: 36px, line-height 1.2
- `type-heading-md`: 28px, line-height 1.3
- `type-heading-sm`: 20px, line-height 1.4

**Body:**
- `type-body-lg`: 20px, line-height 1.4
- `type-body-base`: 16px, line-height 1.6 (default)
- `type-body-sm`: 12px, line-height 1.6

**Labels:**
- `type-label`: Uppercase with letter spacing (4-8%)

**Font Families:**
- `font-display`: Display font (Mazius Display)
- `font-body`: Body font (EB Garamond)
- `font-mono`: Monospace font

### Spacing & Layout

**Container:**
- Use `container-custom` for consistent max-width and padding
- Max width: 1280px (80rem)
- Responsive padding: 4px mobile, 16px desktop

**Grid:**
- Use `grid-custom` for responsive grid layouts
- 4 columns (mobile) → 12 columns (desktop)
- Column width: 92px (5.75rem)
- Gap: 16px (1rem)

**Border Radius:**
- Base radius: `--radius` (0.625rem)
- Variants: `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`

### Focus States

All interactive components have consistent focus states:
- Focus ring: `ring-2 ring-moloch-500 ring-offset-2`
- Use `focus-visible:` prefix for keyboard focus only
- Never remove focus indicators

---

## Common Component Combinations

### Form with Validation
```typescript
<Form {...form}>
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input {...field} type="email" />
        </FormControl>
        <FormDescription>Enter your email address</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

### Modal with Form
```typescript
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <Form>...</Form>
    <DialogFooter>
      <Button variant="secondary">Cancel</Button>
      <Button>Submit</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Card with Actions
```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Table with Actions
```typescript
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Item</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">...</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## Quick Reference

### Most Used Components
1. **Button** - All clickable actions
2. **Input** - Text inputs
3. **Form** - Form handling
4. **Card** - Content containers
5. **Dialog** - Modals
6. **Table** - Data display
7. **Badge** - Labels and status
8. **Select** - Dropdowns
9. **Tabs** - Content organization
10. **Tooltip** - Hover information

### Component Selection Guide

**Need to...**
- **Collect user input?** → Use `Form`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`
- **Show a modal?** → Use `Dialog` (desktop) or `Sheet`/`Drawer` (mobile)
- **Display data?** → Use `Table` or `DataTable`
- **Organize content?** → Use `Card`, `Tabs`, `Accordion`
- **Show status?** → Use `Badge`, `Progress`
- **Navigate?** → Use `Breadcrumb`, `Pagination`, `NavigationMenu`
- **Show actions?** → Use `DropdownMenu`, `Button`
- **Guide users?** → Use `Wizard`, `Tooltip`, `HoverCard`
- **Multi-select?** → Use `Multiselect` or `Checkbox` group
- **Date selection?** → Use `DatePicker` or `Calendar`

### Accessibility Checklist

When using components, ensure:
- ✅ All form inputs have labels (`FormLabel` or `Label`)
- ✅ Error messages are displayed (`FormMessage`)
- ✅ Focus states are visible
- ✅ Keyboard navigation works
- ✅ ARIA attributes are present (handled by Radix UI)
- ✅ Color contrast meets WCAG standards
- ✅ Screen reader text is provided where needed

---

**Last Updated:** Generated from component analysis
**Total Components:** 42+ UI components available


# Rocky CRM UI Components

Reusable UI components built with your brand colors `#F0EAE3` (cream) and `#000000` (black).

## 🚀 Quick Start

```jsx
import { Button, Input, Card, Notification } from "@/components/ui";
```

## 📋 Components

### Button

```jsx
// Primary button (cream background, black text)
<Button variant="primary" size="md">
  Save Changes
</Button>

// Secondary button (white background, gray text)
<Button variant="secondary" size="lg">
  Cancel
</Button>

// With loading state
<Button variant="primary" loading={true}>
  Saving...
</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="success">Success</Button>
<Button variant="error">Error</Button>
<Button variant="warning">Warning</Button>
```

### Input

```jsx
// Basic input
<Input
  label="Email"
  placeholder="Enter your email"
  type="email"
/>

// With error
<Input
  label="Password"
  type="password"
  error="Password is required"
  required
/>

// With helper text
<Input
  label="Username"
  helperText="Must be at least 3 characters"
/>

// Different variants
<Input variant="default" />
<Input variant="filled" />

// Different sizes
<Input size="sm" />
<Input size="md" />
<Input size="lg" />
```

### Card

```jsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui';

// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// With components
<Card>
  <CardHeader>
    <CardTitle>Dashboard Stats</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Your content here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Different variants
<Card variant="default">Default Card</Card>
<Card variant="surface">Surface Card (cream bg)</Card>
<Card variant="elevated">Elevated Card</Card>
<Card variant="outlined">Outlined Card</Card>

// Clickable card
<Card onClick={() => console.log('clicked')} hover>
  Clickable Card
</Card>
```

### Notification

```jsx
// Direct usage
<Notification
  type="success"
  title="Success!"
  message="Your changes have been saved."
/>;

// Using the hook (recommended)
function MyComponent() {
  const { showSuccess, showError, NotificationContainer } = useNotification();

  const handleSave = () => {
    showSuccess("Saved!", "Your data has been saved successfully.");
  };

  return (
    <div>
      <Button onClick={handleSave}>Save</Button>
      <NotificationContainer />
    </div>
  );
}

// Different types
showSuccess("Title", "Message");
showError("Title", "Message");
showWarning("Title", "Message");
showInfo("Title", "Message");
```

## 🎨 Color System

The components use these color classes from your brand:

### Primary Colors (Cream)

- `primary-50`: `#FEFCFA` (lightest)
- `primary-100`: `#F0EAE3` (main cream)
- `primary-200`: `#E6D9CF`
- ...

### Secondary Colors (Black/Gray)

- `secondary-50`: `#F9F9F9` (lightest)
- `secondary-900`: `#000000` (main black)
- ...

## 💡 Usage Examples

### Login Form

```jsx
function LoginForm() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input label="Email" type="email" required />
        <Input label="Password" type="password" required />
      </CardContent>
      <CardFooter>
        <Button variant="primary" className="w-full">
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Dashboard Stats

```jsx
function StatsCard({ title, value, icon }) {
  return (
    <Card variant="surface">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary-600">{title}</p>
          <p className="text-2xl font-bold text-secondary-900">{value}</p>
        </div>
        <div className="text-secondary-500 text-xl">{icon}</div>
      </div>
    </Card>
  );
}
```

### Action Buttons

```jsx
function ActionButtons() {
  const { showSuccess } = useNotification();

  return (
    <div className="flex space-x-2">
      <Button
        variant="primary"
        onClick={() => showSuccess("Saved!", "Data saved successfully")}
      >
        Save
      </Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="outline">Delete</Button>
    </div>
  );
}
```

## 🎯 Props Reference

### Button Props

| Prop       | Type      | Default   | Description          |
| ---------- | --------- | --------- | -------------------- |
| `variant`  | `string`  | `primary` | Button style variant |
| `size`     | `string`  | `md`      | Button size          |
| `disabled` | `boolean` | `false`   | Disable button       |
| `loading`  | `boolean` | `false`   | Show loading state   |

### Input Props

| Prop         | Type     | Default   | Description         |
| ------------ | -------- | --------- | ------------------- |
| `label`      | `string` | -         | Input label         |
| `error`      | `string` | -         | Error message       |
| `helperText` | `string` | -         | Helper text         |
| `variant`    | `string` | `default` | Input style variant |
| `size`       | `string` | `md`      | Input size          |

### Card Props

| Prop      | Type      | Default   | Description          |
| --------- | --------- | --------- | -------------------- |
| `variant` | `string`  | `default` | Card style variant   |
| `padding` | `string`  | `md`      | Card padding         |
| `hover`   | `boolean` | `false`   | Enable hover effects |

---

**Built with ❤️ using your brand colors** 🎨

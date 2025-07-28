# Rocky CRM - Frontend

A modern Customer Relationship Management (CRM) system built with Next.js 15 and designed to work with a Laravel backend.

## 🚀 Features

- **Modern UI/UX**: Built with Tailwind CSS for a clean, responsive design
- **Authentication**: Secure login/logout with JWT token management
- **API Integration**: Structured API client for Laravel backend communication
- **Form Validation**: Comprehensive validation utilities
- **Data Formatting**: Utilities for dates, currency, and other data types
- **Custom Hooks**: Reusable React hooks for API calls and form handling
- **Responsive Design**: Mobile-first approach with responsive navigation

## 📁 Project Structure

```
rocky-crm/
├── app/                          # Next.js App Router
│   ├── dashboard/                # Dashboard pages
│   │   ├── layout.js            # Dashboard layout with navigation
│   │   └── page.js              # Main dashboard
│   ├── login/                   # Authentication
│   │   └── page.js              # Login page
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Home page
├── lib/                         # Utility libraries
│   ├── api/                     # API configuration
│   │   ├── client.js            # API client with auth
│   │   └── config.js            # API endpoints and config
│   ├── services/                # Service layer
│   │   ├── authService.js       # Authentication service
│   │   ├── customerService.js   # Customer management
│   │   └── leadService.js       # Lead management
│   ├── hooks/                   # Custom React hooks
│   │   └── useApi.js            # API call hooks
│   └── utils/                   # Utility functions
│       ├── validation.js        # Form validation
│       └── formatting.js        # Data formatting
├── public/                      # Static assets
├── env.example                  # Environment variables template
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Laravel backend running on `http://localhost:8000`

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the environment template and configure your Laravel API settings:

```bash
cp env.example .env.local
```

Edit `.env.local` with your Laravel backend configuration:

```env
# Laravel CRM API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_API_VERSION=v1

# Authentication
NEXT_PUBLIC_AUTH_ENDPOINT=/auth
NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT=/auth/refresh

# API Timeout
NEXT_PUBLIC_API_TIMEOUT=30000

# Development Settings
NODE_ENV=development
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 API Integration

### Laravel Backend Requirements

Your Laravel backend should provide the following API endpoints:

#### Authentication

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/user` - Get current user

#### Customers

- `GET /api/v1/customers` - List customers
- `POST /api/v1/customers` - Create customer
- `GET /api/v1/customers/{id}` - Get customer
- `PUT /api/v1/customers/{id}` - Update customer
- `DELETE /api/v1/customers/{id}` - Delete customer

#### Leads

- `GET /api/v1/leads` - List leads
- `POST /api/v1/leads` - Create lead
- `GET /api/v1/leads/{id}` - Get lead
- `PUT /api/v1/leads/{id}` - Update lead
- `DELETE /api/v1/leads/{id}` - Delete lead
- `POST /api/v1/leads/{id}/convert` - Convert lead to customer

#### Deals

- `GET /api/v1/deals` - List deals
- `POST /api/v1/deals` - Create deal
- `GET /api/v1/deals/{id}` - Get deal
- `PUT /api/v1/deals/{id}` - Update deal
- `DELETE /api/v1/deals/{id}` - Delete deal

#### Contacts

- `GET /api/v1/contacts` - List contacts
- `POST /api/v1/contacts` - Create contact
- `GET /api/v1/contacts/{id}` - Get contact
- `PUT /api/v1/contacts/{id}` - Update contact
- `DELETE /api/v1/contacts/{id}` - Delete contact

## 🎨 UI Components

The application uses Tailwind CSS for styling and includes:

- **Responsive Navigation**: Sidebar with mobile support
- **Form Components**: Validated input fields with error handling
- **Data Tables**: Sortable and filterable data displays
- **Status Indicators**: Color-coded status badges
- **Loading States**: Skeleton loaders and spinners

## 🔐 Authentication

The frontend handles authentication through:

- JWT token storage in localStorage
- Automatic token refresh
- Protected routes
- Automatic logout on 401 responses

## 📊 Data Management

### Services Layer

Each module has its own service class:

```javascript
import { customerService } from "@/lib/services/customerService";

// Get all customers
const customers = await customerService.getCustomers();

// Create new customer
const newCustomer = await customerService.createCustomer(customerData);
```

### Custom Hooks

Use custom hooks for API calls:

```javascript
import { useApiOnMount } from "@/lib/hooks/useApi";
import { customerService } from "@/lib/services/customerService";

function CustomerList() {
  const { data, loading, error } = useApiOnMount(() =>
    customerService.getCustomers()
  );

  // Component logic
}
```

## 🧪 Validation

Form validation is handled through the validation utilities:

```javascript
import { validateForm, VALIDATION_SCHEMAS } from "@/lib/utils/validation";

const validation = validateForm(formData, VALIDATION_SCHEMAS.customer);
if (!validation.isValid) {
  setErrors(validation.errors);
}
```

## 📱 Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ using Next.js 15 and Tailwind CSS**

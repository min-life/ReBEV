<div align="center">

<img src="frontend/src/assets/image/favicon.png" alt="ReBEV logo" width="150">

# ReBEV - Second-hand EV & Battery Trading Platform

</div>

<div align="center">

This platform connects buyers and sellers of used electric motorcycles and old batteries. It aims to promote sustainable reuse, reduce electronic waste, and provide a trustworthy marketplace where users can easily list, browse, and purchase vehicles and batteries with detailed condition information.

</div>

## Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Built Using](#built-using)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## About

This project aims to build a comprehensive platform for trading used electric motorcycles and batteries. It provides users with a reliable marketplace to buy and sell pre-owned vehicles and battery products, while also offering delivery services for batteries and handling all vehicle deposit transactions.

The system acts as a trusted intermediary to ensure safe, secure, and transparent transactions, protecting both buyers and sellers. By facilitating these processes efficiently, the platform not only supports convenient trading but also promotes responsible reuse and contributes to environmental sustainability.

## Key Features

### For Users

- 🔐 **User Authentication**: Secure login/register with JWT tokens and Google OAuth integration
- 🛵 **Post Management**: Create, edit, and manage listings for electric motorcycles and batteries
- 🛒 **Shopping Cart**: Add items to cart and manage orders
- ⭐ **Favorites**: Save favorite posts for quick access
- 📦 **Order Tracking**: Track order status and delivery progress
- 💬 **Real-time Chat**: Communicate with sellers through messaging system
- ⚠️ **Complaint System**: Report issues and track complaint status
- 💰 **Transaction History**: View all purchase and sales history
- ⭐ **Review System**: Rate and review sellers after transactions

### For Sellers

- 📝 **Product Listing**: List electric vehicles and batteries with detailed specifications
- 📊 **Seller Dashboard**: Manage inventory and track sales performance
- 💳 **Payment Management**: Handle transactions securely through the platform
- 📦 **Package Management**: Auto-cancel expired packages with cron jobs
- 🚚 **Delivery Integration**: Coordinate with delivery services via webhooks

### For Admins

- 📈 **Statistics Dashboard**: View platform analytics and user statistics
- 👥 **User Management**: Manage user accounts and seller verification
- 🏷️ **Category Management**: Create and update product categories
- 📋 **Complaint Management**: Handle user complaints and disputes
- 💸 **Auto Transfer**: Automated payment transfers with scheduled jobs

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Before running this project, make sure you have the following installed:

```bash
Node.js >= 18.x
npm >= 9.x
SQL Server
Redis (optional, for caching)
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/min-life/ReBEV.git
cd ReBEV
```

2. **Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=3000
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=1433
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

3. **Frontend Setup**

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
# API Configuration
VITE_BASE_URL=http://localhost:3000/api

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Cloudinary (Image Upload)
VITE_CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name

# GHN Delivery API (Giao Hàng Nhanh)
VITE_GHN_API=https://dev-online-gateway.ghn.vn/shiip/public-api
VITE_GHN_TOKEN=your_ghn_token
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
ReBEV/
├── backend/                      # Node.js & Express API Server
│   ├── config/                  # Configuration files (DB, Redis, Swagger)
│   ├── controllers/            # Request handlers
│   │   ├── admin/             # Admin & statistics
│   │   ├── auth/              # Login, register, refresh token
│   │   ├── base/              # Base/common controllers
│   │   ├── cart/              # Shopping cart operations
│   │   ├── category/          # Product categories
│   │   ├── complaint/         # User complaints & disputes
│   │   ├── contact/           # Contact management
│   │   ├── favorite/          # Favorite posts
│   │   ├── order/             # Order processing
│   │   ├── package/           # Package/subscription management
│   │   ├── post/              # Product listings
│   │   ├── review/            # User reviews & ratings
│   │   ├── transaction/       # Payment transactions
│   │   ├── user/              # User profile management
│   │   └── variation/         # Product variations
│   │
│   ├── cronJobs/               # Scheduled tasks (auto-cancel, auto-transfer)
│   ├── middlewares/            # Express middlewares (auth, authorization)
│   ├── models/                 # Sequelize ORM models (database tables)
│   ├── routes/                 # API route definitions
│   ├── services/               # Business logic layer
│   │   ├── address/           # Address management
│   │   ├── admin/             # Admin operations
│   │   ├── auth/              # Authentication logic
│   │   ├── cart/              # Cart business logic
│   │   ├── complaint/         # Complaint handling
│   │   ├── delivery/          # Delivery integration
│   │   ├── favorite/          # Favorites logic
│   │   ├── order/             # Order processing
│   │   ├── package/           # Package management
│   │   ├── payment/           # Payment processing
│   │   ├── post/              # Post management
│   │   ├── transaction/       # Transaction handling
│   │   └── user/              # User services
│   │
│   └── webhooks/               # External service webhooks
│
└── frontend/                    # React + Vite Application
    ├── src/
    │   ├── app/                # Application pages & routing
    │   ├── assets/             # Static files (images, icons, etc.)
    │   ├── components/         # Reusable UI components (Shadcn/UI)
    │   ├── constants/          # App constants & configurations
    │   ├── contexts/           # React Context providers
    │   ├── data/               # Static data & mock data
    │   ├── features/           # Feature-specific components
    │   ├── hooks/              # Custom React hooks
    │   ├── lib/                # Utility functions & helpers
    │   └── services/           # API service calls & integrations
    │
    └── public/                 # Public static assets
```

## Screenshots

### Homepage

![Homepage](https://res.cloudinary.com/du261e4fa/image/upload/v1764232249/vcyrqjjaghyjpa4psddc.jpg)

### Product Listing

![Product Listing](https://res.cloudinary.com/du261e4fa/image/upload/v1764232249/sr0fqp6x9adtjzpaf9xy.jpg)

### Product Detail

![Product Detail](https://res.cloudinary.com/du261e4fa/image/upload/v1764232250/hgs46s6wgu4gvbso5dql.jpg)

### Shopping Cart

![Shopping Cart](https://res.cloudinary.com/du261e4fa/image/upload/v1764232248/vegu06i1nuwjovorphnk.png)

### User Dashboard

![User Dashboard](https://res.cloudinary.com/du261e4fa/image/upload/v1764232248/wlemnqnuoq0hsftqorvt.jpg)

### Admin Panel

![Admin Panel](https://res.cloudinary.com/du261e4fa/image/upload/v1764232248/h9fpsmfzntqrgstteqsd.jpg)

## Built Using

### Front-end

- [React.js 19](https://reactjs.org/) - Modern JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Fast build tool and development server
- [Shadcn/UI](https://ui.shadcn.com/) - Beautiful and accessible component library
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI primitives
- [TailwindCSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [React Hook Form](https://react-hook-form.com/) - Performant form validation
- [Axios](https://axios-http.com/) - HTTP client for API requests
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Firebase](https://firebase.google.com/) - Real-time chat messaging
- [Cloudinary](https://cloudinary.com/) - Image upload and management
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2) - Social authentication
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Router](https://reactrouter.com/) - Client-side routing

### Back-end

- [Node.js](https://nodejs.org/en/) - JavaScript runtime environment
- [Express.js](https://expressjs.com/) - Fast, minimalist web framework
- [SQL Server](https://www.microsoft.com/en-us/sql-server) - Relational database management system
- [Sequelize](https://sequelize.org/) - Promise-based ORM for SQL databases
- [JWT](https://jwt.io/) - Secure token-based authentication
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [Redis](https://redis.io/) - In-memory caching and session storage
- [node-cron](https://www.npmjs.com/package/node-cron) - Task scheduling for automated jobs
- [Swagger](https://swagger.io/) - API documentation
- [Google Auth Library](https://www.npmjs.com/package/google-auth-library) - Google OAuth integration

### DevOps & Deployment

- [Vercel](https://vercel.com/) - Frontend hosting with automatic deployments
- [Railway](https://railway.app/) - Backend hosting and database
- [Git](https://git-scm.com/) - Version control
- [Nodemon](https://nodemon.io/) - Development auto-reload

## Authors

- **Trần Văn Chương** - [@min-life](https://github.com/min-life)
  - _Back-end Developer & Team Leader_
  - Project management, API development with Node.js/Express, SQL Server integration
- **Nguyễn Ngọc Phương Đông** - [@dong-nnp](https://github.com/dong-nnp)
  - _Back-end Developer_
  - API implementation, server logic, database management
- **Nguyễn Thị Tú Anh** - [@tiana1314](https://github.com/tiana1314)
  - _Front-end Developer_
  - UI/UX design, React components, responsive layouts
- **Trần Đình Phúc** - [@phuc258](https://github.com/phuc258)
  - _Front-end Developer_
  - Feature development, API integration, testing
- **Dương Minh Kiệt** - [@kietlatoi](https://github.com/Kietlatoi)
  - _Front-end Developer_
  - Component development, state management, UI polish

See also the list of [contributors](https://github.com/min-life/ReBEV/graphs/contributors) who participated in this project.

## Acknowledgements

- Thanks to our university professors for guidance and support
- Inspired by modern e-commerce platforms and sustainable trading initiatives
- Special thanks to the open-source community for the amazing tools and libraries
- [Shadcn/UI](https://ui.shadcn.com/) for the beautiful component library
- [Sequelize documentation](https://sequelize.org/docs/v6/) for comprehensive ORM guides

---

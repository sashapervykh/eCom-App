# eCommerce-Application 🛍️🌐

**Deploy**: [link](https://space-real-estate.netlify.app/)

> **⚠️ Project Status: Backend Migration in Progress**  
> This application is currently undergoing a significant backend migration from **CommerceTools** to **Supabase**. Some features may be incomplete or temporarily unavailable as we rebuild and refactor the API integration. We appreciate your patience and welcome contributions during this transition period.

---

## 📋 Project Overview

This is the final team project for **RS School 2025** – an eCommerce platform originally integrated with **CommerceTools**. The application is being actively refactored to use **Supabase** as its backend, offering a modern, open‑source alternative with real‑time capabilities and built‑in authentication.

## You can see current limitations of the project [here](#current-limitations)

---

## 👥 Development Team

| Role      | Member            | GitHub                                          |
| --------- | ----------------- | ----------------------------------------------- |
| Mentor    | Andrey Voronin    | [AVor0n](https://github.com/AVor0n)             |
| Developer | Aleksandr Pervykh | [sashapervykh](https://github.com/sashapervykh) |
| Developer | Evgeniy Smirnov   | [maxnope](https://github.com/maxnope)           |
| Developer | Grigori Konopelko | [gkonopelko](https://github.com/gkonopelko)     |

---

## 🛒 About the Application

This is a full‑stack online shopping platform that replicates real‑world eCommerce workflows. Built as a **Single Page Application (SPA)** with responsive design (minimum supported resolution: 390px), it provides a seamless shopping experience across all devices.

### 🏪 Key Features & Pages

- **🔐 Authentication System** – Login & Registration
- **🛍️ Shopping Experience**
  - 🏠 Main page with promocodes
  - 📋 Product catalog with advanced filtering, sorting, and search
  - 🔎 Detailed product view with images and specifications
  - 🛒 Shopping basket & checkout workflow
- **👤 User Account** – Profile management
- **🙋‍♂️ Company Info** – About Us page

---

## 🚧 Migration Context

### Why We're Migrating

The application originally used **CommerceTools** as its backend service. With the end of the free trial period, we're migrating to **Supabase** to ensure:

- Long-term sustainability and cost-effectiveness
- Greater development flexibility
- Real-time capabilities
- Built-in authentication and database management

### Current Limitations

Due to the ongoing migration:

- ⚠️ Some API-dependent features (user authentication, product data, basket operations) may be partially functional or using mocked data, namely:
  - search of the products is not working properly;
  - removing products from the cart is not working properly;
  - full products amounts is not displayed currently;
  - editing user data is not working properly;
  - promocodes is not working properly;
- 🔧 Backend service layer is being rebuilt from the ground up
- 🎯 New Supabase-powered features will be introduced progressively

---

## 🛠 Technology Stack

### Current Implementation

- **Language:** TypeScript 📘
- **Build Tool:** Vite ⚡
- **Frontend Framework:** React ⚛️ (SPA)
- **Code Quality:** ESLint, Prettier, Stylelint, Husky 🛠️
- **Project Management:** [GitHub Taskboard](https://github.com/users/sashapervykh/projects/1)

### Backend Transition

- **Previous:** CommerceTools 🌐
- **Current Target:** Supabase 🔥

---

## 📥 Installation & Setup

### Prerequisites

- Node.js (v18 or later recommended)

### Steps to Run Locally

1. **Fork** this repository: [eCom-App](https://github.com/sashapervykh/eCom-App)
2. **Clone** your newly created repo
3. Install all dependencies using npm install

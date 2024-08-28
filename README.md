# E-Commerce Project

Excited to share with you my first e-commerce project built using REST APIs and React.js. This project includes a variety of features such as user authentication, browsing product catalogs, creating wish lists, adding items to a cart, and completing online payments.

## 🔗 Features & Tools

- Single Page Application (SPA) & Routing: Implemented using React Router to manage navigation and create a seamless user experience.
- Component Guards: Some components are protected with guards to manage user access based on authentication status.
- Authentication: User login, registration, and session management using Context and Redux.
- Form Handling & Validation: Built forms with Formik for state management and Yup for schema validation.
- Data Fetching & Manipulation: Integrated Axios for API communication to fetch, send, delete, and update data.
- Data Caching: Utilized React Query for caching displayed items, enhancing user experience with faster load times.
- React Hooks: Leveraged hooks such as `useEffect`, `useState`, `useParams`, and `useNavigate` for various functionalities throughout the application.
- Pagination: Implemented pagination using React Query to efficiently handle large data sets.
- SEO Optimization: Used `react-helmet` to dynamically generate meta titles and descriptions for each component.
- Online Payment Integration: Integrated Stripe Payment Gateway to securely handle online payments.
- UI/UX Enhancements: Styled using Bootstrap, Font Awesome, and other libraries such as Toast, AOS (Animate On Scroll), and Owl Carousel for enhanced user experience.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm or yarn
- A REST API server to connect with (ensure it supports the required endpoints for products, authentication, etc.)
- Stripe account for payment gateway integration

### Installation

## 1. Clone the repository:
- git clone https://github.com/nehalkhaled19/ecommerce-project.git
- cd ecommerce-project

## 2. Install dependencies:
- npm install
## or
- yarn install

## 3. Set up environment variables:
## Create a .env file in the root directory and add the following:
- REACT_APP_API_URL=<Your API URL>
- REACT_APP_STRIPE_PUBLIC_KEY=<Your Stripe Public Key>

## 4. Start the development server:
- npm start
## or
- yarn start

### Usage

-  Authentication: Register or log in to create an account.
-  Product Catalog: Browse through the product categories and view details.
-  Wishlist: Add your favorite items to a wishlist.
-  Cart: Add items to your cart, update quantities, or remove them as needed.
-  Checkout: Complete the purchase using Stripe's secure payment gateway.

### Build

## To build the app for production, run:
- npm run build
## or
- yarn build

## This will create an optimized production build in the build folder.

### 📚 Tech Stack

-  Frontend: React.js, Redux, Context API
-  Backend: REST APIs
-  UI/UX: Bootstrap, Font Awesome, Toast, AOS, Owl Carousel
-  Payment Integration: Stripe
-  Tools & Libraries: React Query, Axios, Formik, Yup, React Helmet, React Router

### 💡 Future Enhancements

-  Adding a user profile page with order history and settings.
-  Implementing search functionality to find products easily.
-  Integrating social media login (Google, Facebook).
-  Enhancing the checkout process with additional payment options.


---

Feel free to reach out if you have any questions or need further assistance.

Happy Coding!

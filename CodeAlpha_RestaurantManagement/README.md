# CodeAlpha Restaurant Management

A multi-role restaurant management system built with Express.js and MongoDB. This application handles the full lifecycle of restaurant operations — from customer menu browsing and table reservations to admin inventory management and sales reporting — with a premium Scarlet Witch themed UI.

## Tasks Covered
1. **Backend Server:** Created using Express.js.
2. **Database:** Integrated MongoDB using Mongoose.
3. **API Endpoints:**
   - GET/POST `/menu` to view and add menu items (with image upload support).
   - GET/POST `/orders` to view all orders and place new ones.
   - GET/POST `/reservations` to book and manage table reservations.
   - GET/POST `/tables` to view and register restaurant tables.
   - GET/POST `/inventory` to manage ingredient stock levels.
   - GET `/inventory/lowstock` to view items below their safety threshold.
   - GET `/reports/daily-sales` and `/reports/weekly-sales` for revenue summaries.
4. **Authentication:** Passport.js local strategy with session-based login/logout.
5. **Role-Based Access Control:** Routes are guarded by `isAuthenticated` and `authoriseRoles` middleware for Admin, Manager, Staff, and Customer roles.
6. **Inventory Auto-Update:** Placing an order automatically decrements the corresponding ingredient stock.
7. **Image Uploads:** Menu items support image uploads via Multer or external image URLs.
8. **Frontend:** EJS-based views with a premium dark-mode, Scarlet Witch-inspired design system.

## Author
Robert Tony MITALI Niyonkuru

## Features
- **Role-Based Dashboard:** The lobby dynamically shows different action cards depending on the logged-in user's role.
- **Menu Management:** Admins and Managers can add menu items with images (file upload or URL), grouped by category.
- **Table Reservations:** Customers can browse available tables and lock in a reservation with date, time, and guest count.
- **Order Lifecycle:** Customers place orders; Admins and Managers can view all orders and mark them as completed and paid.
- **Inventory Control:** Managers can add ingredients, update stock levels, and receive low-stock alerts.
- **Sales Reports:** Daily and weekly revenue summaries with full order breakdowns for Admin and Manager roles.
- **Premium UI:** Fully styled EJS templates using a custom CSS design system (Cinzel + Outfit fonts, Scarlet Witch color palette).

## Technologies Used
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Template Engine:** EJS
- **Authentication:** Passport.js (Local Strategy)
- **Password Hashing:** Bcrypt
- **File Uploads:** Multer
- **Session Management:** express-session, express-flash

---

## Getting Started

### 1. Environment Setup
Clone the repository and install dependencies:
```bash
# Clone the repository
git clone https://github.com/RobertNiyonkuru98/codealpha_tasks.git
cd CodeAlpha_RestaurantManagement

# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL=mongodb://localhost/restaurantManagement
SESSION_SECRET=your_secret_key_here
PORT=4000
```

### 3. Run the Application
```bash
# Start in development mode (with nodemon)
npm run dev

# Start in production mode
npm start
```

### 4. Viewing the Application
Open your browser and navigate to:
`http://localhost:4000/home`

> **Note:** Do not open `.ejs` files directly with Live Server. They must be rendered by the Node.js server to function correctly.

---

## Error Codes Reference

| Code | Meaning      | Description                                                   |
| ---- | ------------ | ------------------------------------------------------------- |
| 200  | OK           | Request succeeded.                                            |
| 201  | Created      | Resource (order, reservation, menu item) successfully saved.  |
| 400  | Bad Request  | Invalid input, table unavailable, or capacity exceeded.       |
| 401  | Unauthorized | User is not authenticated or session has expired.             |
| 403  | Forbidden    | Authenticated user's role does not permit this action.        |
| 404  | Not Found    | The requested order, table, or inventory item does not exist. |
| 500  | Server Error | Database connection issue or internal server failure.         |
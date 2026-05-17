# CodeAlpha Event Handler

A full-stack event management system built with Express.js and MongoDB. This application allows authenticated users to browse events, register as attendees, and enables admins to create and manage events and bookings.

## Tasks Covered
1. **Backend Server:** Created using Express.js.
2. **Database:** Integrated MongoDB using Mongoose.
3. **API Endpoints:**
   - GET `/home` to render the public dashboard.
   - GET/POST `/event/create` to create a new event (Admin only).
   - GET `/events` to list all available events.
   - GET/POST `/event/:id/register` to register as an event attendee.
   - GET `/event/:id/attendees` to view all attendees for a specific event (Admin only).
4. **Authentication:** Passport.js local strategy with session-based login/logout.
5. **Role-Based Access:** Middleware guards restrict event creation and attendee views to Admin users only.
6. **Frontend:** EJS-based views for the dashboard, event listing, registration, and attendee management.

## Author
Robert Tony MITALI Niyonkuru

## Features
- **Event Management:** Admins can create and publish new events from a dedicated form.
- **Event Registration:** Authenticated users can register for available events.
- **Attendee Tracking:** Admins can view the full list of registered attendees per event.
- **Secure Authentication:** Session-based login with bcrypt password hashing.
- **Role-Based Access Control:** Separate capabilities for Admin users and regular attendees.

## Technologies Used
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Template Engine:** EJS
- **Authentication:** Passport.js (Local Strategy)
- **Password Hashing:** Bcrypt
- **Session Management:** express-session, express-flash

---

## Getting Started

### 1. Environment Setup
Clone the repository and install dependencies:
```bash
# Clone the repository
git clone https://github.com/RobertNiyonkuru98/codealpha_tasks.git
cd CodeAlpha_EventHandler

# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL=mongodb://localhost/eventHandler
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

| Code | Meaning      | Description                                                |
| ---- | ------------ | ---------------------------------------------------------- |
| 200  | OK           | Request succeeded.                                         |
| 201  | Created      | Event or booking was successfully created and saved.       |
| 400  | Bad Request  | Invalid input or missing required fields.                  |
| 401  | Unauthorized | User is not authenticated or session has expired.          |
| 403  | Forbidden    | Authenticated user lacks the required Admin role.          |
| 404  | Not Found    | The requested event or resource does not exist.            |
| 500  | Server Error | Database connection issue or internal server failure.      |
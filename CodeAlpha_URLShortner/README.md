# CodeAlpha URL Shortener

A modern, simple URL shortener built with Express.js and MongoDB. This application allows users to input long URLs and generate unique, trackable short links.

## Tasks Covered
1. **Backend Server:** Created using Express.js.
2. **Database:** Integrated MongoDB using Mongoose.
3. **API Endpoints:**
   - POST `/shortUrls` to generate unique short codes.
   - GET `/:shortUrl` to redirect users to the original long URL.
4. **Click Tracking:** Store and update the number of times a short URL is accessed.
5. **Frontend:** EJS-based dashboard to manage and view all shortened URLs.

## Author
Robert Tony MITALI Niyonkuru

## Features
- **Shorten URLs:** Instantly convert long links into unique short codes.
- **Click Analytics:** Monitor how many people have used your short links.
- **Automatic Redirection:** Seamlessly sends users to the destination URL.
- **Clean Dashboard:** View all your active links and their stats in one table.

## Technologies Used
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Template Engine:** EJS
- **ID Generation:** ShortID

---

## Getting Started

### 1. Environment Setup
Clone the repository and install dependencies:
```bash
# Clone the repository
git clone https://github.com/RobertNiyonkuru98/codealpha_tasks.git
cd CodeAlpha_URLShortner

# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your MongoDB connection string:
```env
DATABASE_URL=mongodb://localhost/urlShortener
PORT=3000
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
`http://localhost:3000`

> **Note:** Do not open `index.ejs` directly with Live Server. It must be rendered by the Node.js server to function correctly.

---

## Error Codes Reference

| Code | Meaning      | Description                                           |
| ---- | ------------ | ----------------------------------------------------- |
| 200  | OK           | Request succeeded.                                    |
| 201  | Created      | URL was successfully shortened and saved.             |
| 400  | Bad Request  | Invalid URL or missing form data.                     |
| 404  | Not Found    | The requested short code does not exist.              |
| 500  | Server Error | Database connection issue or internal server failure. |


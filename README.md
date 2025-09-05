# Sahara Stay 🏨  

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-800?style=for-the-badge&logo=mongoose&logoColor=white) ![EJS](https://img.shields.io/badge/EJS-6E4A7E?style=for-the-badge&logo=ejs&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=black) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Cloudinary](https://img.shields.io/badge/Cloudinary-4285F4?style=for-the-badge&logo=cloudinary&logoColor=white) ![Multer](https://img.shields.io/badge/Multer-FFCA28?style=for-the-badge&logo=npm&logoColor=black) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)  

---

### 📖 Project Overview
An **Airbnb-type full-stack web application** where users can:  
- Sign up / Log in  
- Role-based access (**Admin & Guest**)  
- List hotels with **title, description, image, price, location, and country**  
- Upload images via **Cloudinary / Multer**  
- Perform **CRUD operations**  
- Leave **reviews & ratings**  
- Enjoy secure validation, error handling & MVC-based design  
- Fully deployed on **Render / Vercel**  

---

## 🚀 Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Frontend**: EJS, Bootstrap, JavaScript  
- **Architecture**: MVC (Models, Views, Controllers)  
- **Middleware**: Method-Override, Express.urlencoded, Express.static  
- **Authentication**: Passport.js / JWT  
- **Image Uploads**: Multer + Cloudinary  
- **Validation**: Mongoose validation + JOI + Bootstrap form validation  
- **Error Handling**:  
  - Custom error classes  
  - Middleware-based error handling  
  - Async errors handled with `wrapAsync`  
- **Deployment**: Render (backend) + Vercel (frontend/static assets if separated)  

---


## 📂 Project Structure  

## 📂 Project Structure  

```plaintext
SaharaStay/
│── app.js                 # Main Express app
│── models/                # Mongoose models (Listing.js, User.js, Review.js)
│── controllers/           # Controllers for MVC structure
│── routes/                # Route handlers
│── views/                 # EJS templates
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   │   └── edit.ejs
│   ├── users/
│   └── reviews/
│── init/                  # Database initialization
│   ├── data.js
│   └── index.js
│── public/                # Static assets (CSS, JS, images)
│── middleware/            # Custom middleware & error handlers
└── package.json


## ⚡ Installation & Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/sahara-stay.git
   cd sahara-stay
## Install dependencies:

npm install


Start MongoDB (local or Atlas). Default URL:

mongodb://127.0.0.1:27017/wanderlusts


## Initialize sample listings:

node init/index.js


## Run the server:

node app.js


## Visit in browser:

http://localhost:8080/listings

## 🔑 Features  

- **Authentication & Authorization**  
  - User login/signup with **Passport.js / JWT**  
  - Role-based access control (**Admin & Guest**)  

- **Listings**  
  - Create, view, update, and delete hotel listings  
  - ✅ Flash message shown after creating or deleting a listing  

- **Reviews & Ratings**  
  - Users can leave feedback on listings  
  - ✅ Flash message shown after deleting a review  

- **Image Handling**  
  - Upload images with **Cloudinary / Multer**  
  - Fallback to default if none provided  

- **Middleware**  
  - `method-override` for PUT/DELETE requests  
  - Authentication protection for routes  
  - Logging middleware for requests  

- **Validation**  
  - Client-side validation with **Bootstrap**  
  - Server-side validation with **JOI & Mongoose**  

- **Error Handling**  
  - Custom **ExpressError** class  
  - Async error handling with **wrapAsync**  
  - Validation and cast error handling  

- **Architecture**  
  - **MVC-based design** (Models, Views, Controllers)  

- **Deployment**  
  - **Render** for backend hosting  
  - **Vercel** for frontend/static assets  


## 📸 Screenshots

![image alt](https://github.com/Adarsh841412/saharastay/blob/main/Screenshot%202025-05-21%20211210.png)
---

| Method | Endpoint                          | Description          |
| ------ | --------------------------------- | -------------------- |
| GET    | `/listings`                       | Get all listings     |
| GET    | `/listings/:id`                   | Show listing details |
| GET    | `/listings/new`                   | Form for new listing |
| POST   | `/listings`                       | Create new listing   |
| GET    | `/listings/:id/edit`              | Edit listing form    |
| PUT    | `/listings/:id`                   | Update listing       |
| DELETE | `/listings/:id`                   | Delete listing       |
| POST   | `/listings/:id/reviews`           | Add review & rating  |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review        |




🔑 Setup Environment Variables
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_config
PORT=5000

## 🛡️ Error Handling
- Middleware ensures **invalid routes return 404**  
- Custom error messages with **status codes** (400, 401, 403, 404, 500)  
- Async errors handled using **wrapAsync**  
- Default fallback error handler  

---

## 📌 Future Enhancements
- 🗺️ Interactive maps for hotel locations  
- 🤖 Recommendation system for best stays  

---

## 👨‍💻 Author
**Adarsh Dubey**  





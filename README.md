# Aura Fitness Gym Management System

Aura Fitness Gym Management System is a full-stack web application developed using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It is designed to streamline gym operations by managing clients, schedules, memberships, employees, products, suppliers, and progress tracking.

## **Features**
### **Client Management (Your Function)**
- **User Authentication:**
  - Secure Sign-Up, Login, and Forgot Password functionality.
  - Authentication using JWT (JSON Web Token).
- **Admin Privileges:**
  - Admin can **add, update, delete, and view** all registered clients.
  - Ability to assign **admin privileges** to a client using the `isAdmin` checkbox.
- **Client Analytics & Reports:**
  - **BMI Distribution Chart** displaying the overall fitness statistics of all clients.
  - **PDF Report Generation:**
    - **Downloadable client list** in PDF format.
    - **Individual client reports** with detailed fitness-related information.

### **Other Functions**
1. Customer Awareness Management
2. Schedule Management
3. Membership Package Management
4. Employee Management
5. Product Management
6. Supplier Management
7. Progress Tracking Management

---

## **Tech Stack**
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **State Management:** Redux Toolkit
- **Authentication:** JWT (JSON Web Token)
- **Database:** MongoDB Atlas
- **Styling:** Tailwind CSS
- **Email Service:** Nodemailer (using Gmail SMTP)
- **PDF Generation:** pdfkit

---

## **Project Setup & Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/aura-fitness-gym.git
cd aura-fitness-gym

Step 2: Create a .env File
Inside the root directory, create a .env file and add the following environment variables:

env
Copy
Edit
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@mern-auth.sxzsr.mongodb.net/?retryWrites=true&w=majority&appName=Mern-Auth
JWT_SECRET=your_jwt_secret_key

EMAIL=aurafitness00@gmail.com
EMAIL_PASSWORD=your_email_app_password

EMAIL_USER=aurafitness00@gmail.com
EMAIL_PASS=your_email_app_password
Replace the placeholders (your_username, your_password, your_jwt_secret_key, etc.) with actual values.

Step 3: Install Dependencies
Run the following command in the root directory to install all dependencies for both frontend and backend:

bash
Copy
Edit
npm install
This will install dependencies for both the client and server.

Step 4: Run the Project Concurrently
The project is set up to run the frontend and backend concurrently using concurrently. Start the application with:

bash
Copy
Edit
npm run dev
This will start:

Backend server on http://localhost:5000
Frontend application on http://localhost:3000

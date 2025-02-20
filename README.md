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

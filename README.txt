project link 
https://github.com/asmaa77younes-cell/Final-Project.git

#E-Commerce Backend — Products, Categories, Cart & Orders

This is a backend Project I built using: 
  **Node.js**
  **Express.js**
  **MongoDB**

I learned how to deal with real backend projects and practising dealing with Node.js & Express.js,
 writing Schemas and dealing with MongoDb, testing end Points on PostMan, debugging, creating APIs,
 etc....  

#It is a full backend project provides restful APIs for categories, products, orders, categories


## Tech stack
 -Node.js
 -Express.js
 -MongoDB
 -Mongoose

 # Features
 
 - MVC architecture
 - MongoDB atlas integration
 - Categories CRUD API
 - Products CRUD API
 - Product filtering
 - Shopping Cart API
 - Orders and checkout API
 - Global error handling


 #Prerequisites

 You should have :

 -Node.js(v18 or later)
 -npm
 -local MongoDB

 Before running the server

#Installation

Clone the repository:

```bash
git clone https://github.com/asmaa77younes-cell/Final-Project.git
```

Go to the project folder:

```bash
cd Final-Project
```

Install dependencies:

```bash
npm install
```
Create a `.env` file and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

Seed the database:

```bash
npm run seed
```

Run the server:

```bash
npm run dev
```


#Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port |
| MONGO_URI | MongoDB connection string |
| NODE_ENV | Application environment |



#API Endpoints

## Categories

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/v1/categories | Get all categories |
| GET | /api/v1/categories/:id | Get category by ID |
| POST | /api/v1/categories | Create category |
| PATCH | /api/v1/categories/:id | Update category |
| DELETE | /api/v1/categories/:id | Delete category |



## Products

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/v1/products | Get all products |
| GET | /api/v1/products/:id | Get product by ID |
| POST | /api/v1/products | Create product |
| PATCH | /api/v1/products/:id | Update product |
| DELETE | /api/v1/products/:id | Delete product |

---

## Cart

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/v1/cart | Get cart |
| POST | /api/v1/cart/items | Add item to cart |
| PATCH | /api/v1/cart/items/:productId | Update item quantity |
| DELETE | /api/v1/cart/items/:productId | Remove item |
| DELETE | /api/v1/cart | Clear cart |

## Orders

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/v1/orders | Checkout and create order |
| GET | /api/v1/orders | Get all orders |
| GET | /api/v1/orders/:id | Get order by ID |
| PATCH | /api/v1/orders/:id/status | Update order status |



# Project Structure

```
Project
│
├── config/
├── controllers/
├── db/
├── middleware/
├── models/
├── routes/
├── utils/
├── app.js
├── server.js
├── seed.js
├── package.json
└── README.md
```

### Folder Description

- **config/** → Application configuration.
- **controllers/** → Business logic.
- **db/** → MongoDB connection.
- **middleware/** → Custom middleware and error handling.
- **models/** → Mongoose schemas.
- **routes/** → API routes.
- **utils/** → Helper classes and functions.



# Author

**Asmaa Younes**

Backend Development Project using Node.js, Express.js, and MongoDB





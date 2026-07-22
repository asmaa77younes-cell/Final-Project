const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Product = require('./models/product');
const Category = require('./models/category');
const connectDB = require('./db/connectDb');
const order = require('./models/order');

const seedData = async () => {
    try{
        await connectDB();
        await order.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});

const categories = await Category.insertMany([
    {
    name: "Electronics",
    description: "Electronic devices and accessories"
},
    {
    name: "Fashion",
    description: "Clothing, shoes, and accessories"
},
    {
    name: "Home & Kitchen",
    description: "Appliances, furniture, and home decor"
},
    {
    name: "Books",
    description: "Fiction, non-fiction, and educational books"
},
    {
    name: "Sports & Outdoors",
    description: "Sports equipment and outdoor gear"
}]);

const products = await Product.insertMany([
    {
    name: "Smartphone",
    description: "A high-end smartphone with advanced features",
    price: 999.99,
    stock: 50,
    category: categories[0]._id,
    images: ["image1.jpg", "image2.jpg"],
},
    {
    name: "Laptop",
    description: "A powerful laptop for work and gaming",
    price: 1499.99,
    stock: 30,
    category: categories[0]._id,
    images: ["image3.jpg", "image4.jpg"],
},
    {
    name: "T-shirt",
    description: "A comfortable and stylish t-shirt for everyday wear",
    price: 19.99,
    stock: 100,
    category: categories[1]._id,
    images: ["image5.jpg", "image6.jpg"],
},
    {
    name: "Dress",
    description: "A stylish dress for any occasion",
    price: 79.99,
    stock: 70,
    category: categories[1]._id,
    images: ["image19.jpg", "image20.jpg"],
},
    {
    name: "Cooking Pot",
    description: "A durable cooking pot for preparing delicious meals",
    price: 399.99,
    stock: 40,
    category: categories[2]._id,
    images: ["image9.jpg", "image10.jpg"],
},
    {
    name: "Pan",
    description: "A non-stick pan for easy cooking and cleaning",
    price: 899.99,
    stock: 20,
    category: categories[2]._id,
    images: ["image11.jpg", "image12.jpg"],
},
    {
    name: "Atomic Habits book",
    description: "A self-help book that provides practical strategies for building good habits and breaking bad ones",
    price: 499.99,
    stock: 60,
    category: categories[3]._id,
    images: ["image13.jpg", "image14.jpg"],
},
    {
    name: "Comfort Crisis book",
    description: "A book about overcoming comfort zone limitations",
    price: 29.99,
    stock: 50,
    category: categories[3]._id,
    images: ["image15.jpg", "image16.jpg"],
},
    {
    name: "Football",
    description: "A popular football for sports enthusiasts",
    price: 29.99,
    stock: 90,
    category: categories[4]._id,
    images: ["image17.jpg", "image18.jpg"],
},
    {
    name: "Volleyball",
    description: "A popular volleyball for sports enthusiasts",
    price: 39.99,
    stock: 60,
    category: categories[4]._id,
    images: ["image19.jpg", "image20.jpg"],
}]);
console.log(
  `${categories.length} categories and ${products.length} products inserted successfully`
);
} 
catch (error) {
    console.error("Error occurred while inserting seed data:", error);
} 
finally {
    await mongoose.disconnect();
}
};

seedData();
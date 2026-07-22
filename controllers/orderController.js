const Order = require("../models/order");
const Product = require("../models/product");
const Cart = require("../models/cart");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.checkout = asyncHandler(async (req, res) =>{
    
    const{sessionId, shippingAddress} =req.body;
    const cart = await Cart.findOne({sessionId}).populate("items.product");

    if(!cart || cart.items.length === 0){
        throw new AppError("Cart is empty", 400)
    }

    let totalPrice = 0;
    const orderItems = [];

    for(const item of cart.items){
        
        const product = await Product.findById(item.product._id);

        if(!product){
            throw new AppError("Product not found", 404)
        }

        if(product.stock < item.quantity){
            throw new AppError(`${product.name} has only ${product.stock} item(s) available`, 400)
        }

        totalPrice += product.price * item.quantity;

        orderItems.push({
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
        });
    }

    const order = await Order.create({
        orderNumber: `ORD-${Date.now()}`,
        items: orderItems,
        totalPrice,
        shippingAddress,
    });

    for(const item of cart.items){
        const product = await Product.findById(item.product._id);

        product.stock -= item.quantity;

        await product.save()
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
        status : "success",
        message : "Order added successfully",
        data : order,
    });
});


exports.getAllOrders = asyncHandler(async (req, res) =>{
    const orders = await Order.find();

    res.status(200).json({
        status: "success",
        message: "Orders retrieved successfully",
        results: orders.length,
        data: orders,
    });

});

exports.getOrderById = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id).populate(
        "items.product",
        "name price"
    );

    if(!order){
        throw new AppError("Order not found", 404)
    }

    res.status(200).json({
        status: "success",
        message: "Order retrieved successfully",
        data: order,
    });
});


exports.updateOrderStatus = asyncHandler(async (req, res) =>{
    const{status} = req.body;

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {status},
        {
            new: true,
            runValidators: true,
        }
    );

    if(!order){
        throw new AppError("Order not found", 404);
    }

    res.status(200).json({
        status: "success",
        message: "Status updated successfully",
        data: order,

    });
});
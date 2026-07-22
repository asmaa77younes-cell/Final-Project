const Cart = require("../models/cart");
const Product = require("../models/product");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.getCart = asyncHandler(async (req, res) => {
    const{sessionId} = req.body;
    const cart = await Cart.findOne({sessionId}).populate(
        "items.product",
        "name price"
    );

    if(!cart){
        throw new AppError("Cart not found" , 404)
    }
    res.status(200).json({
        status: "success",
        message: 'Cart retrieved successfully',
        data : cart,
    })
});

exports.addItem = asyncHandler(async (req, res) => {
    const{sessionId, productId, quantity} = req.body;
     
    if(quantity < 1){
            throw new AppError("Quantity must be at least 1 ", 400)
        }

    const product = await Product.findById(productId);

    if(!product){
        throw new AppError("Product not found", 404);
    }

    if(product.stock <= 0){
        throw new AppError("Product out of stock", 400)
    }

    let cart = await Cart.findOne({sessionId});

    if(!cart){
        cart = await Cart.create({
            sessionId,
            items: [],
            totalPrice: 0,
        });
    }
    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if(existingItem){
        if(existingItem.quantity + quantity > product.stock){
            throw new AppError("Not enough stock available", 400)
        }
        existingItem.quantity += quantity;
    }
    else{
        if(quantity > product.stock){
            throw new AppError("Not enough stock available", 400)
        }
        cart.items.push({
            product: product._id,
            quantity,
            price: product.price,
        });
    }

    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    await cart.save();
    
    res.status(200).json({
        status:"success",
        message: 'Item added successfully',
        data: cart,
    });

});


exports.updateItemQuantity = asyncHandler(async (req, res) => {
    const {sessionId, quantity} = req.body;
    const {productId} = req.params;
    const cart = await Cart.findOne({sessionId});

    if(!cart){
        throw new AppError("Cart not found", 404)
    }

    const item = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if(!item){
        throw new AppError("Product not found in the cart", 404)
    }

    if(quantity <= 0){
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        )
    }
    else{
        item.quantity = quantity
    }
    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    await cart.save();

    res.status(200).json({
        status: "success",
        message: "Item updated successfully",
        data: cart,
    })

});

exports.removeItem = asyncHandler(async (req, res) => {
    const {sessionId} = req.body;
    const {productId} = req.params;

    const cart = await Cart.findOne({sessionId});

    if(!cart){
        throw new AppError("Cart not found", 404)
    }

    const originalLength = cart.items.length;

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    )

    if(cart.items.length === originalLength){
        throw new AppError("Product not found in cart", 404)
    }

    cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    await cart.save();

    res.status(200).json({
        status: "success",
        message: "Item removed successfully",
        data: cart,
    })
});



exports.clearCart = asyncHandler(async (req, res) => {
    
    const{sessionId} = req.body;
    const cart = await Cart.findOne({sessionId});

    if(!cart){
        throw new AppError("Cart not found", 404)
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({
        status: "success",
        message: "Cart cleared successfully",
        data: cart,
    })
});

const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: String,
            unique: true,
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity:{
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],

        totalPrice: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum : [
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled",
            ],
             default : "pending",
        },

        shippingAddress:{
            street : String,
            city: String,
            country: String,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model('Order', orderSchema);


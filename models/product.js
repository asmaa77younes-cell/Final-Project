const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        min:[0, "Price cannot be negative"],
        required: [true, "Product price is required"],
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        default: 0,
        min: [0, "Stock cannot be negative"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Product category is required"],
    },
    images: [
        {
            type: String,
            default: [],
        }
    ],
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

  productSchema.virtual("inStock").get(function () {
    return this.stock > 0;
});

module.exports = mongoose.model('Product', productSchema);
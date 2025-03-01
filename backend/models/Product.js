const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Seller must be linked to the product
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to Category model
      required: true,
    },
    images: [{
      type: String, // URLs to product images
      required: true,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reviews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
        maxlength: 500,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  { timestamps: true }
);

// Method to get average rating of a product
productSchema.methods.getAverageRating = function () {
  if (this.reviews.length === 0) return 0;
  const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return (totalRating / this.reviews.length).toFixed(1);
};

// Create a Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

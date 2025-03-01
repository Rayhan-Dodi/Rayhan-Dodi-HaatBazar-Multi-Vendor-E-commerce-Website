const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');
const router = express.Router();

// Multer storage configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products'); // Save to 'uploads/products' folder
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Create product route
router.post('/create', upload.array('images', 5), async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;

  try {
    // Validate the category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Prepare image URLs from the uploaded files
    const images = req.files.map(file => `/uploads/products/${file.filename}`);

    // Create the new product
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category: categoryId,
      images,
      seller: req.user._id, // Assuming user is logged in, and seller ID is available
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// Get all products route
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').populate('seller', 'username');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Get product by ID route
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('seller', 'username');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// Update product route
router.put('/:id', upload.array('images', 5), async (req, res) => {
  const { name, description, price, stock, categoryId } = req.body;

  try {
    // Validate the category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Prepare image URLs if images are uploaded
    const images = req.files.length ? req.files.map(file => `/uploads/products/${file.filename}`) : undefined;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        stock,
        category: categoryId,
        images: images || undefined,
      },
      { new: true }
    ).populate('category', 'name').populate('seller', 'username');

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete product route
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;

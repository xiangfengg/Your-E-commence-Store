import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// getProducts: This async function fetch all products from the database. It uses the Product model to find all products by calling Product.find({}). It then sends back the retrieved products as a JSON response.
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//  fetch a single product based on the provided product ID.
//  It takes the product ID from the request parameters (req.params.id) and uses the findById method of the Product model to search for the product in the database. If the product is found, it is sent back as a JSON response.
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Resource not found');
});


//! Description   Create product
//! Route         Post /api/products
//!access         Private/Admin

const createProduct = asyncHandler(async(req,res)=>{
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// !desc    Update a product
// !route   PUT /api/products/:id
// !access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
console.log('productcontroller')
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description; 
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    console.log(`update product`)
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// !desc    Delete a product
// !route   Delete /api/products/:id
// !access  Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
// !desc    Create new review
// !route   POST /api/products/:id/reviews
// !access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const existingReviewIndex = product.reviews.findIndex(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (existingReviewIndex !== -1) {
      // Update the existing review
      product.reviews[existingReviewIndex] = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
    } else {
      // Add a new review
      const newReview = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(newReview);
    }

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }

  // !desc    Get top rated products
  // !route   GET /api/products/top
  // !access  Public
  const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

});


export { getProducts, getProductById, createProduct, updateProduct, deleteProduct,createProductReview, };






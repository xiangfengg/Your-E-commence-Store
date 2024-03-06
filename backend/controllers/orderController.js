import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import moment from 'moment-timezone';
// addOrderItems: This function is responsible for creating a new order. It expects the order details (such as order items, shipping address, payment method, prices, etc.) in the request body. It first checks if there are any order items and throws an error if the order items array is empty. Then, it creates a new Order object using the provided data and saves it to the database. Finally, it sends a JSON response with the created order.
const addOrderItems = asyncHandler(async (req, res) => {

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    console.log("else")
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      //include the user id 
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
    console.log("createorder")
  }
});

// getMyOrders: This function retrieves all orders associated with the currently logged-in user. It uses the Order model to find orders where the user field matches the ID of the authenticated user. It then sends a JSON response containing the retrieved orders.
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
  console.log("getmyorders")
});

// getOrderById: This function fetches a single order by its ID. It expects the order ID to be passed as a parameter in the URL. It uses the Order model to find the order with the specified ID and populates the user field with the name and email properties. If the order is found, it sends a JSON response with the order details. Otherwise, it throws a 404 error.
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
    console.log("getorderbyid")
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
// updateOrderToPaid: This function updates an order's payment status to "paid". It expects the order ID to be passed as a parameter in the URL and payment details to be provided in the request body. It finds the order by its ID, sets the isPaid field to true, and updates the paidAt field with the current timestamp. It also stores the payment details in the paymentResult field. The updated order is saved to the database, and a JSON response with the updated order is sent.
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = moment.utc().tz('Asia/Singapore').format();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// getOrders: This function retrieves all orders from the database. It is also intended for use by an admin user. It uses the Order model to find all orders and populates the user field with the id and name properties. The retrieved orders are sent as a JSON response.
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});


const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = moment.utc(order.deliveredAt).tz('Asia/Singapore').format();


    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// ...
// deleteOrder: This function handles the deletion of an order. It finds the order by ID and removes it from the database. If the order is successfully deleted, a success message is sent back as a JSON response. If the order is not found, an error is thrown.
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
console.log(req.params.id)
  if (order) {
    await order.deleteOne();
    res.json({ message: 'Order deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});


export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
  getOrders,
};

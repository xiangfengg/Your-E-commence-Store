import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder, 
  getOrders,
  // updateOrderToDelivered,
 
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// POST / route: It handles creating a new order. It requires authentication (protect middleware) and only allows admin access (admin middleware).
// GET / route: It fetches all orders. It requires authentication (protect middleware) and only allows admin access (admin middleware).

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// GET /mine route: It fetches orders belonging to the authenticated user. It requires authentication (protect middleware).

router.route('/mine').get(protect, getMyOrders);


// GET /:id route: It fetches a specific order by its ID. It requires authentication (protect middleware).

router.route('/:id').get(protect, getOrderById).delete( protect, admin, deleteOrder);;

// PUT /:id/pay route: It updates an order to mark it as paid. It requires authentication (protect middleware).

router.route('/:id/pay').put(protect, updateOrderToPaid);

// PUT /:id/deliver route: It updates an order to mark it as delivered. It requires authentication (protect middleware) and admin access (admin middleware).
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);
export default router;

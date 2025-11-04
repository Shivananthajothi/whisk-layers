import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { auth as protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Update order status (for tracking demo) - UNCHANGED
router.patch('/:id', protect, async (req, res) => {
  console.log('=== PATCH /api/orders/:id route hit ===', req.params.id, req.body);
  try {
    // Log at the very top to confirm route is hit and show incoming data
    console.log('PATCH /api/orders/:id route hit', {
      orderId: req.params.id,
      body: req.body,
      headers: req.headers,
      user: req.user
    });
    const { status } = req.body;
    console.log('[PATCH /api/orders/:id] user:', req.user?._id, 'orderId:', req.params.id, 'status:', status);
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) {
      console.log('[PATCH /api/orders/:id] Order not found for user:', req.user?._id, 'orderId:', req.params.id);
      return res.status(404).json({ message: 'Order not found' });
    }
    if (status) order.status = status;
    // If delivered and paymentMethod is cash, set paymentStatus to Paid
    if (status && status.toLowerCase() === 'delivered' && order.paymentMethod === 'cash') {
      order.paymentStatus = 'Paid';
    }
    await order.save();
    res.json(order);
  } catch (err) {
    console.error('[PATCH /api/orders/:id] Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Place order - UPDATED
router.post("/", protect, async (req, res) => {
  try {
    // 💡 NEW FIELDS ADDED HERE: paymentMode, paymentWay, finalAmount
    const { 
        paymentMethod, paymentStatus, onlineType, address, 
        paymentMode, paymentWay, finalAmount 
    } = req.body;
    // ... (rest of the logic remains untouched)
    const cartItems = await Cart.find({ user: req.user._id }).populate("product");

    if (cartItems.length === 0) return res.status(400).json({ message: "Cart is empty" });

    // Filter out cart items with missing product refs
    const validCartItems = cartItems.filter(item => item.product && item.product._id);
    if (validCartItems.length === 0) return res.status(400).json({ message: "No valid products in cart" });

    // Always recalculate price from product data for accuracy
    const orderItems = validCartItems.map(c => ({
      product: c.product._id,
      quantity: c.quantity,
      customization: c.customization,
      price: c.product.price * c.quantity
    }));
    const totalAmount = orderItems.reduce((acc, item) => acc + item.price, 0);

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalAmount,
      address,
      status: "Placed",
      paymentMethod: paymentMethod || 'cash',
      paymentStatus: paymentStatus || (paymentMethod === 'online' ? 'Paid' : 'Pending'),
      onlineType: onlineType || null,
        
      // 💾 NEW FIELDS SAVED HERE
      paymentMode,
      paymentWay,
      finalAmount // This maps to the amount paid on the client side
    });

    await Cart.deleteMany({ user: req.user._id });

    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user orders - UNCHANGED
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("orderItems.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single order - UNCHANGED (It already returns the full order, including the new fields)
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    }).populate("orderItems.product");
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json(order); // Returns the full order, now with paymentMode/Way
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
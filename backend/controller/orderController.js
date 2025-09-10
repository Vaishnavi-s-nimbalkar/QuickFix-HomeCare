// Submit feedback and rating for an order
exports.giveFeedback = async (req, res) => {
  try {
    const { feedback, rating } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { feedback, rating },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Cancel an order (set status to 'cancelled')
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: 'cancelled' },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get new orders (notifications) for a provider (status = 'new')
exports.getNewOrdersForProvider = async (req, res) => {
  try {
    const orders = await Order.find({
      provider: req.params.providerId,
      status: 'new'
    }).populate('user');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update order status (e.g., accepted, completed)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Order controller
const Order = require('../model/Order');

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const ORDER_STATUS = {
  NEW: 'new',
  // Add other statuses as needed
  ACCEPTED: 'accepted',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};


exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const orders = await Order.find({ user: userId })
      .populate('provider')
      .populate('user')
      .lean();

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders by user:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByProvider = async (req, res) => {
  try {
    const { providerId } = req.params;

    if (!providerId) {
      return res.status(400).json({ error: 'Provider ID is required.' });
    }

    const orders = await Order.find({ provider: providerId })
      .populate('user')
      .populate('provider')
      .lean();

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders by provider:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getNewOrdersForProvider = async (req, res) => {
  try {
    const { providerId } = req.params;

    if (!providerId) {
      return res.status(400).json({ error: 'Provider ID is required.' });
    }

    const orders = await Order.find({
      provider: providerId,
      status: ORDER_STATUS.NEW
    })
      .populate('user')
      .lean();

    res.json(orders);
  } catch (err) {
    console.error('Error fetching new orders for provider:', err);
    res.status(500).json({ error: err.message });
  }
};

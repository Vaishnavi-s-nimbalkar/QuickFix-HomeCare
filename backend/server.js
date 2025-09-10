// Main entry point for MERN backend
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./router/userRoutes');
const serviceProviderRoutes = require('./router/serviceProviderRoutes');
const orderRoutes = require('./router/orderRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid or empty JSON body' });
  }
  next();
});
app._router.stack.forEach(r => {
  if (r.route) {
    console.log(`Route: ${r.route.path} [${Object.keys(r.route.methods).join(', ')}]`);
  }
});


app.use('/api/users', userRoutes);
app.use('/api/providers', serviceProviderRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

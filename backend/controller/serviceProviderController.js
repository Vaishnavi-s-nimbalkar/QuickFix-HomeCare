const ServiceProvider = require('../model/ServiceProvider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// GET all providers
exports.getProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find().select('-password');
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST register provider
exports.createProvider = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    const existingProvider = await ServiceProvider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const provider = new ServiceProvider({ email, password: hashedPassword, ...rest });

    await provider.save();
    res.status(201).json({ message: 'Provider registered successfully', provider });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST login provider
exports.loginProvider = async (req, res) => {
  try {
    const { email, password } = req.body;

    const provider = await ServiceProvider.findOne({ email });
    if (!provider) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: provider._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, provider: { id: provider._id, email: provider.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET provider by ID (protected)
exports.getProviderById = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id).select('-password');
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

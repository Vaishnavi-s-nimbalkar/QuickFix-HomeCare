// ServiceProvider controller
const ServiceProvider = require('../model/ServiceProvider');

exports.getProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProvider = async (req, res) => {
  try {
    const provider = new ServiceProvider(req.body);
    await provider.save();
    res.status(201).json(provider);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const PromoCode = require('./models/PromoCode');

// Get all promocodes
const getPromoCodes = async (req, res) => {
  try {
    const promocodes = await PromoCode.find();
    res.status(200).json({
      success: true,
      data: promocodes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create new promocode
const createPromoCode = async (req, res) => {
  try {
    console.log("hitting");
    const { code, discount, status } = req.body;
    const promoCode = await PromoCode.create({
      code,
      discount,
      status
    });
    res.status(201).json({
      success: true,
      data: promoCode
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete promocode
const deletePromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.findByIdAndDelete(req.params.id);
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        error: 'Promocode not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Toggle promocode status
const togglePromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.findById(req.params.id);
    if (!promoCode) {
      return res.status(404).json({
        success: false,
        error: 'Promocode not found'
      });
    }

    promoCode.status = promoCode.status === 'active' ? 'inactive' : 'active';
    await promoCode.save();

    res.status(200).json({
      success: true,
      data: promoCode
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Validate promocode
const validatePromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.findOne({
      code: req.params.code.toUpperCase(),
      status: 'active'
    });

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        error: 'Invalid or inactive promo code'
      });
    }

    res.status(200).json({
      success: true,
      data: promoCode
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Export all functions as part of the module.exports object
module.exports = {
  getPromoCodes,
  createPromoCode,
  deletePromoCode,
  togglePromoCode,
  validatePromoCode
};

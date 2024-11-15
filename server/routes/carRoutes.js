import express from 'express';
import Car from '../models/Car.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create car
router.post('/', auth, async (req, res) => {
  try {
    const car = new Car({
      ...req.body,
      userId: req.user._id
    });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all cars for user
router.get('/', auth, async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user._id });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search cars
router.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.query;
    const cars = await Car.find({
      userId: req.user._id,
      $text: { $search: q }
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific car
router.get('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, userId: req.user._id });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update car
router.patch('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete car
router.delete('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
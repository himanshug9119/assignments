import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  images: [{
    type: String,
    required: true
  }],
  tags: {
    carType: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    dealer: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

// Index for search functionality
carSchema.index({
  title: 'text',
  description: 'text',
  'tags.carType': 'text',
  'tags.company': 'text',
  'tags.dealer': 'text'
});

const Car = mongoose.model('Car', carSchema);

export default Car;
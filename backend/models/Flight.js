import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      unique: true,
      index: true,
      default: function () {
        return `FLT-${Math.floor(1000 + Math.random() * 9000)}`;
      }
    },
    droneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drone',
      required: [true, 'Drone reference is required for flight logs.'],
      index: true
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      index: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer reference is required.'],
      index: true
    },
    startTime: {
      type: Date,
      default: Date.now,
      required: [true, 'Flight start time is required.']
    },
    endTime: {
      type: Date
    },
    duration: {
      type: Number, // In minutes
      default: 0,
      min: [0, 'Duration cannot be negative.']
    },
    distance: {
      type: Number, // In kilometers
      default: 0,
      min: [0, 'Distance cannot be negative.']
    },
    flightStatus: {
      type: String,
      enum: {
        values: [
          'scheduled',
          'in-flight',
          'completed',
          'aborted',
          'emergency-landed',
          'rth'
        ],
        message: '{VALUE} is not a valid flight status.'
      },
      default: 'scheduled',
      index: true
    },
    startLocation: {
      latitude: { type: Number },
      longitude: { type: Number },
      address: { type: String, default: 'Takeoff Hub' }
    },
    endLocation: {
      latitude: { type: Number },
      longitude: { type: Number },
      address: { type: String, default: 'Destination Point' }
    },
    maxAltitude: {
      type: Number, // in meters
      default: 0
    },
    maxSpeed: {
      type: Number, // in km/h
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

flightSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Auto-calculate flight duration when endTime is supplied
flightSchema.pre('save', function (next) {
  if (this.startTime && this.endTime) {
    const diffMs = new Date(this.endTime) - new Date(this.startTime);
    this.duration = Math.max(0, Math.round(diffMs / 60000));
  }
  next();
});

// Performance query index
flightSchema.index({ droneId: 1, flightStatus: 1 });
flightSchema.index({ customerId: 1, startTime: -1 });

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;


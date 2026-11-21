import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    droneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drone',
      required: [true, 'Drone reference is required for alert tracking.'],
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Target User reference is required.'],
      index: true
    },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      index: true
    },
    alertType: {
      type: String,
      required: [true, 'Alert category/type is required.'],
      enum: {
        values: [
          'emergency',
          'low battery',
          'geofence',
          'connection lost',
          'critical speed',
          'system'
        ],
        message: '{VALUE} is not a recognized alert type.'
      },
      index: true
    },
    message: {
      type: String,
      required: [true, 'Alert description message is required.'],
      trim: true
    },
    severity: {
      type: String,
      required: [true, 'Severity classification is required.'],
      enum: {
        values: ['low', 'medium', 'high', 'critical'],
        message: '{VALUE} is not a valid severity level.'
      },
      default: 'medium',
      index: true
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
      altitude: { type: Number }
    },
    acknowledgedAt: {
      type: Date
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

alertSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Performance compound indexes for notification queries
alertSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
alertSchema.index({ droneId: 1, createdAt: -1 });

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;


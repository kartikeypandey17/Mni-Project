import mongoose from 'mongoose';

const telemetrySchema = new mongoose.Schema(
  {
    droneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drone',
      required: [true, 'Drone reference is required for telemetry recording.'],
      index: true
    },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      index: true
    },
    batteryLevel: {
      type: Number,
      required: [true, 'Battery level percentage is required.'],
      min: [0, 'Battery level cannot be less than 0%.'],
      max: [100, 'Battery level cannot exceed 100%.']
    },
    latitude: {
      type: Number,
      required: [true, 'GPS latitude coordinate is required.'],
      min: [-90, 'Latitude must be between -90 and 90.'],
      max: [90, 'Latitude must be between -90 and 90.']
    },
    longitude: {
      type: Number,
      required: [true, 'GPS longitude coordinate is required.'],
      min: [-180, 'Longitude must be between -180 and 180.'],
      max: [180, 'Longitude must be between -180 and 180.']
    },
    altitude: {
      type: Number, // In meters
      required: [true, 'Flight altitude is required.'],
      min: [0, 'Altitude cannot be negative.'],
      default: 0
    },
    speed: {
      type: Number, // In km/h
      required: [true, 'Flight velocity/speed is required.'],
      min: [0, 'Speed cannot be negative.'],
      default: 0
    },
    heading: {
      type: Number, // Yaw/heading angle in degrees (0 - 360)
      required: [true, 'Flight heading orientation is required.'],
      min: [0, 'Heading must be between 0 and 360 degrees.'],
      max: [360, 'Heading must be between 0 and 360 degrees.'],
      default: 0
    },
    pitch: {
      type: Number, // Degrees
      default: 0
    },
    roll: {
      type: Number, // Degrees
      default: 0
    },
    satellites: {
      type: Number,
      default: 14,
      min: 0
    },
    signalStrength: {
      type: Number, // Percentage 0 - 100
      default: 95,
      min: 0,
      max: 100
    },
    telemetrySource: {
      type: String,
      required: [true, 'Telemetry data source is required.'],
      enum: {
        values: ['simulated', 'real'],
        message: '{VALUE} is not a valid telemetry source.'
      },
      default: 'simulated'
    },
    recordedAt: {
      type: Date,
      default: Date.now,
      required: true,
      index: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual aliases for frontend compatibility
telemetrySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

telemetrySchema.virtual('battery').get(function () {
  return this.batteryLevel;
});

telemetrySchema.virtual('lat').get(function () {
  return this.latitude;
});

telemetrySchema.virtual('lng').get(function () {
  return this.longitude;
});

telemetrySchema.virtual('isSimulated').get(function () {
  return this.telemetrySource === 'simulated';
});

// High-performance time-series index: Quickly fetch the latest telemetry stream for any drone
telemetrySchema.index({ droneId: 1, recordedAt: -1 });

const Telemetry = mongoose.model('Telemetry', telemetrySchema);

export default Telemetry;


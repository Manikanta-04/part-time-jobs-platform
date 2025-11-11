const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a job title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a job description'],
    },
    company: {
      name: {
        type: String,
        required: [true, 'Please add a company name'],
        trim: true,
      },
      logo: {
        type: String,
        default: '',
      },
    },
    location: {
      city: {
        type: String,
        required: [true, 'Please add a city'],
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        default: 'USA',
        trim: true,
      },
      remote: {
        type: Boolean,
        default: false,
      },
    },
    jobType: {
      type: String,
      enum: ['part-time', 'full-time', 'contract', 'freelance', 'internship'],
      required: [true, 'Please specify job type'],
    },
    category: {
      type: String,
      enum: ['retail', 'hospitality', 'tutoring', 'delivery', 'customer-service', 'other'],
      default: 'other',
    },
    salary: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
      currency: {
        type: String,
        default: 'USD',
      },
      period: {
        type: String,
        enum: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
      },
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applications: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ['pending', 'reviewed', 'accepted', 'rejected'],
          default: 'pending',
        },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'closed', 'draft'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ 'location.city': 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ status: 1 });

module.exports = mongoose.model('Job', jobSchema);


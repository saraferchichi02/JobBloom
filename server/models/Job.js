const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a job title'],
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    salary: {
      type: String,
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'fullstack', 'devops', 'other'],
      default: 'fullstack',
    },
    requirements: {
      type: String,
    },
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Remote', 'Internship', 'Contract', 'Freelance'],
      default: 'Full-time',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);

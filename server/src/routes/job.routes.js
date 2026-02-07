const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @route   POST /api/jobs
 * @desc    Create a new job
 * @access  Private
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.user._id, // 🔐 link job to logged-in user
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create job' });
  }
});

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs of logged-in user
 * @access  Private
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job
 * @access  Private
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete job' });
  }
});

module.exports = router;

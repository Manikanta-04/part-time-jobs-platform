const express = require('express');
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  applyForJob,
  getMyJobs,
  getMyApplications,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJob);

// Protected routes
router.use(protect);

// Specific routes before parameterized routes
router.get('/my-jobs/list', authorize('employer'), getMyJobs);
router.get('/my-applications/list', authorize('jobseeker'), getMyApplications);
router.post('/', authorize('employer'), createJob);

// Parameterized routes
router.post('/:id/apply', authorize('jobseeker'), applyForJob);
router.put('/:id', authorize('employer'), updateJob);
router.delete('/:id', authorize('employer'), deleteJob);

module.exports = router;


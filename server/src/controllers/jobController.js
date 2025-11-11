// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      jobType,
      category,
      page = 1,
      limit = 10,
    } = req.query;

    // ✅ Use isActive instead of status (to match your DB)
    const query = { isActive: { $ne: false } };

    // Location filter
    if (location) {
      query.$or = [
        { 'location.city': { $regex: location, $options: 'i' } },
        { 'location.state': { $regex: location, $options: 'i' } },
        { location: { $regex: location, $options: 'i' } } // for simple location string
      ];
    }

    if (jobType) query.jobType = jobType;
    if (category) query.category = category;

    // Text search
    if (search) {
      const searchRegex = { $regex: search, $options: 'i' };
      const searchQuery = {
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { company: searchRegex },
        ],
      };

      if (query.$or) {
        query.$and = [{ $or: query.$or }, searchQuery];
        delete query.$or;
      } else {
        Object.assign(query, searchQuery);
      }
    }

    // Execute query
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      data: jobs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/jobs/JobCard';
import api from '../services/api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    category: ''
  });

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      // Build query parameters for backend filtering
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filters.location) params.append('location', filters.location);
      if (filters.jobType) params.append('jobType', filters.jobType);
      if (filters.category) params.append('category', filters.category);
      
      const queryString = params.toString();
      const url = `/api/jobs${queryString ? `?${queryString}` : ''}`;
      
      const response = await api.get(url);
      // Backend returns { success: true, data: jobs, pagination: {...} }
      const jobsData = response.data?.data || response.data || [];
      setJobs(Array.isArray(jobsData) ? jobsData : []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Set empty array if API fails
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters.location, filters.jobType, filters.category]);

  useEffect(() => {
    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchJobs();
    }, searchTerm ? 500 : 0); // 500ms delay for search, immediate for filters

    return () => clearTimeout(timeoutId);
  }, [fetchJobs, searchTerm, filters.location, filters.jobType, filters.category]);

  const filteredJobs = Array.isArray(jobs) ? jobs : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Part-Time Jobs</h1>
          <p className="text-gray-600">
            Discover flexible opportunities that fit your schedule
            {!loading && filteredJobs.length > 0 && (
              <span className="ml-2 text-primary-600 font-semibold">
                ({filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found)
              </span>
            )}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search jobs..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="input-field"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
            <select
              className="input-field"
              value={filters.jobType}
              onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="part-time">Part-Time</option>
              <option value="full-time">Full-Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
            <select
              className="input-field"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              <option value="retail">Retail</option>
              <option value="hospitality">Hospitality</option>
              <option value="tutoring">Tutoring</option>
              <option value="delivery">Delivery</option>
              <option value="customer-service">Customer Service</option>
            </select>
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-soft">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Link to="/register" className="btn-primary">
              Post a Job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;


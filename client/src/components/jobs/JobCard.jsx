import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const getJobTypeColor = (type) => {
    const colors = {
      'part-time': 'bg-blue-100 text-blue-800',
      'full-time': 'bg-green-100 text-green-800',
      'contract': 'bg-purple-100 text-purple-800',
      'freelance': 'bg-yellow-100 text-yellow-800',
      'internship': 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return 'Competitive';
    
    const { min, max, currency = 'USD', period = 'monthly' } = salary;
    const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);
    
    if (min && max) {
      return `${currency} ${formatNumber(min)} - ${formatNumber(max)}/${period}`;
    }
    return `${currency} ${formatNumber(min || max)}/${period}`;
  };

  return (
    <Link to={`/jobs/${job._id}`} className="block">
      <div className="card group hover:border-primary-300 border border-transparent cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              {job.company?.logo ? (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="w-8 h-8 rounded object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded flex items-center justify-center text-white font-semibold">
                  {job.company?.name?.charAt(0)}
                </div>
              )}
              <span className="font-medium">{job.company?.name}</span>
            </div>
          </div>
          <span className={`badge ${getJobTypeColor(job.jobType)} text-xs`}>
            {job.jobType}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills?.slice(0, 3).map((skill, index) => (
            <span key={index} className="badge bg-gray-100 text-gray-700 text-xs">
              {skill}
            </span>
          ))}
          {job.skills?.length > 3 && (
            <span className="badge bg-gray-100 text-gray-700 text-xs">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location?.remote ? 'Remote' : job.location?.city || 'Location TBD'}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recently'}
            </div>
          </div>
          <div className="font-semibold text-primary-600">
            {formatSalary(job.salary)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
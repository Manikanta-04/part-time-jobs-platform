require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('../models/Job');
const User = require('../models/User');

const sampleJobs = [
  {
    title: 'Part-Time Retail Associate',
    description: 'Join our friendly retail team! We are looking for an energetic part-time associate to help customers and maintain store appearance. Flexible hours available, perfect for students or those seeking additional income.',
    company: {
      name: 'Fashion Forward Retail',
      logo: '',
    },
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
      remote: false,
    },
    jobType: 'part-time',
    category: 'retail',
    salary: {
      min: 15,
      max: 20,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Customer Service', 'Communication', 'Sales', 'Cash Handling'],
    requirements: ['High school diploma', '1+ years retail experience preferred', 'Weekend availability'],
  },
  {
    title: 'Remote Customer Service Representative',
    description: 'Work from home as a customer service representative! Handle customer inquiries via phone, email, and chat. Flexible scheduling with training provided. Great opportunity for those looking for remote work.',
    company: {
      name: 'TechSupport Solutions',
      logo: '',
    },
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      remote: true,
    },
    jobType: 'part-time',
    category: 'customer-service',
    salary: {
      min: 16,
      max: 22,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Customer Service', 'Problem Solving', 'Communication', 'Computer Skills'],
    requirements: ['High school diploma', 'Reliable internet connection', 'Quiet workspace'],
  },
  {
    title: 'Part-Time Food Server',
    description: 'Join our restaurant team as a part-time server! Great tips and flexible scheduling. Experience in hospitality preferred but not required. We provide training for the right candidate.',
    company: {
      name: 'The Cozy Corner Bistro',
      logo: '',
    },
    location: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      remote: false,
    },
    jobType: 'part-time',
    category: 'hospitality',
    salary: {
      min: 12,
      max: 15,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Customer Service', 'Time Management', 'Teamwork', 'Food Safety'],
    requirements: ['Food handler certification preferred', 'Evening and weekend availability'],
  },
  {
    title: 'Math Tutor (Part-Time)',
    description: 'Help students succeed in mathematics! We are seeking a patient and knowledgeable math tutor for high school students. Flexible hours, work from home or at our learning center.',
    company: {
      name: 'Excel Learning Academy',
      logo: '',
    },
    location: {
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      remote: true,
    },
    jobType: 'part-time',
    category: 'tutoring',
    salary: {
      min: 25,
      max: 35,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Mathematics', 'Teaching', 'Patience', 'Communication'],
    requirements: ['Bachelor degree in Math or related field', 'Teaching experience preferred'],
  },
  {
    title: 'Food Delivery Driver',
    description: 'Earn money on your own schedule! Deliver food orders using your vehicle or bike. Flexible hours, keep 100% of tips. Perfect for students or those looking for extra income.',
    company: {
      name: 'QuickBite Delivery',
      logo: '',
    },
    location: {
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      remote: false,
    },
    jobType: 'part-time',
    category: 'delivery',
    salary: {
      min: 18,
      max: 25,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Driving', 'Time Management', 'Customer Service', 'Navigation'],
    requirements: ['Valid driver license', 'Reliable vehicle', 'Smartphone'],
  },
  {
    title: 'Freelance Graphic Designer',
    description: 'Work on exciting design projects from home! We need a creative graphic designer for various client projects. Set your own hours and work remotely. Portfolio required.',
    company: {
      name: 'Creative Design Studio',
      logo: '',
    },
    location: {
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      remote: true,
    },
    jobType: 'freelance',
    category: 'other',
    salary: {
      min: 30,
      max: 50,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Adobe Creative Suite', 'Graphic Design', 'Creativity', 'Client Communication'],
    requirements: ['Portfolio of previous work', 'Experience with design software', 'Reliable internet'],
  },
  {
    title: 'Part-Time Barista',
    description: 'Join our coffee shop team! Make great coffee and create a welcoming atmosphere for customers. Morning shifts available, perfect for early risers. Coffee experience a plus!',
    company: {
      name: 'Brew & Bean Coffee House',
      logo: '',
    },
    location: {
      city: 'Portland',
      state: 'OR',
      country: 'USA',
      remote: false,
    },
    jobType: 'part-time',
    category: 'hospitality',
    salary: {
      min: 14,
      max: 18,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Customer Service', 'Coffee Making', 'Cash Handling', 'Teamwork'],
    requirements: ['Morning availability', 'Food handler certification'],
  },
  {
    title: 'Marketing Intern',
    description: 'Gain valuable marketing experience! Assist with social media, content creation, and marketing campaigns. This internship offers hands-on experience in digital marketing.',
    company: {
      name: 'Digital Marketing Pro',
      logo: '',
    },
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      remote: true,
    },
    jobType: 'internship',
    category: 'other',
    salary: {
      min: 15,
      max: 20,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Social Media', 'Content Creation', 'Marketing', 'Communication'],
    requirements: ['Currently enrolled in college', 'Marketing or business major preferred'],
  },
  {
    title: 'Part-Time Warehouse Associate',
    description: 'Help us fulfill orders! Work in our warehouse picking, packing, and shipping orders. Physical work with competitive pay. Flexible scheduling available.',
    company: {
      name: 'QuickShip Logistics',
      logo: '',
    },
    location: {
      city: 'Phoenix',
      state: 'AZ',
      country: 'USA',
      remote: false,
    },
    jobType: 'part-time',
    category: 'other',
    salary: {
      min: 16,
      max: 20,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Physical Fitness', 'Attention to Detail', 'Teamwork', 'Time Management'],
    requirements: ['Ability to lift 50 lbs', 'Standing for extended periods'],
  },
  {
    title: 'Online English Tutor',
    description: 'Teach English to students worldwide from home! Flexible schedule, work with students of all ages. Native English speakers preferred. Training provided.',
    company: {
      name: 'Global Language Academy',
      logo: '',
    },
    location: {
      city: 'Boston',
      state: 'MA',
      country: 'USA',
      remote: true,
    },
    jobType: 'part-time',
    category: 'tutoring',
    salary: {
      min: 20,
      max: 30,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Teaching', 'English Language', 'Patience', 'Online Communication'],
    requirements: ['Native English speaker', 'Bachelor degree preferred', 'Reliable internet'],
  },
  {
    title: 'Part-Time Event Staff',
    description: 'Work exciting events and concerts! Help set up, manage crowds, and ensure guest safety. Flexible schedule based on event calendar. Great for those who love live events!',
    company: {
      name: 'Event Management Plus',
      logo: '',
    },
    location: {
      city: 'Nashville',
      state: 'TN',
      country: 'USA',
      remote: false,
    },
    jobType: 'part-time',
    category: 'hospitality',
    salary: {
      min: 15,
      max: 22,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Customer Service', 'Event Management', 'Teamwork', 'Problem Solving'],
    requirements: ['Weekend and evening availability', 'Physical fitness'],
  },
  {
    title: 'Contract Web Developer',
    description: 'Build websites for clients on a contract basis! Work remotely on various web development projects. Flexible hours, competitive rates. Portfolio of previous work required.',
    company: {
      name: 'WebDev Solutions',
      logo: '',
    },
    location: {
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      remote: true,
    },
    jobType: 'contract',
    category: 'other',
    salary: {
      min: 40,
      max: 60,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['JavaScript', 'React', 'HTML/CSS', 'Web Development'],
    requirements: ['Portfolio of web projects', '2+ years experience', 'Reliable internet'],
  },
  {
    title: 'Part-Time Pet Sitter',
    description: 'Love animals? Care for pets while owners are away! Flexible schedule, work in clients homes. Perfect for animal lovers seeking part-time work.',
    company: {
      name: 'Paws & Claws Pet Care',
      logo: '',
    },
    location: {
      city: 'San Diego',
      state: 'CA',
      country: 'USA',
      remote: false,
    },
    jobType: 'part-time',
    category: 'other',
    salary: {
      min: 18,
      max: 25,
      currency: 'USD',
      period: 'hourly',
    },
    skills: ['Animal Care', 'Responsibility', 'Time Management', 'Communication'],
    requirements: ['Experience with pets', 'Reliable transportation', 'References'],
  },
];

async function seedJobs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find or create a test employer
    let employer = await User.findOne({ role: 'employer' });
    if (!employer) {
      employer = await User.create({
        name: 'Sample Employer',
        email: `employer${Date.now()}@example.com`,
        password: 'password123',
        role: 'employer',
      });
      console.log('✅ Created test employer');
    }

    // Clear existing jobs (optional - comment out if you want to keep existing)
    // await Job.deleteMany({});
    // console.log('✅ Cleared existing jobs');

    // Create jobs
    const createdJobs = [];
    for (const jobData of sampleJobs) {
      const job = await Job.create({
        ...jobData,
        employer: employer._id,
        status: 'active',
      });
      createdJobs.push(job);
    }

    console.log(`✅ Created ${createdJobs.length} sample jobs`);
    console.log('\n📊 Job Summary:');
    console.log(`   - Part-Time: ${createdJobs.filter(j => j.jobType === 'part-time').length}`);
    console.log(`   - Full-Time: ${createdJobs.filter(j => j.jobType === 'full-time').length}`);
    console.log(`   - Contract: ${createdJobs.filter(j => j.jobType === 'contract').length}`);
    console.log(`   - Freelance: ${createdJobs.filter(j => j.jobType === 'freelance').length}`);
    console.log(`   - Internship: ${createdJobs.filter(j => j.jobType === 'internship').length}`);
    console.log(`\n📍 Locations: ${[...new Set(createdJobs.map(j => j.location.city))].join(', ')}`);
    console.log(`\n🏷️ Categories: ${[...new Set(createdJobs.map(j => j.category))].join(', ')}`);

    await mongoose.connection.close();
    console.log('\n✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding jobs:', error);
    process.exit(1);
  }
}

seedJobs();


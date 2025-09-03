-- ================================
-- DEMO DATA INSERT STATEMENTS
-- ================================

-- TVET PROFILES Demo Data
INSERT INTO tvet_profiles (username, email, phone, password_hash) VALUES
('john_doe', 'john.doe@tvet.edu.rw', '+250788123456', '$2b$10$rQJ5qZ7mK8nH9pL2wX4vQeR6tY8uI0oP3sA5dF7gH9jK2lM4nO6pQ'),
('jane_smith', 'jane.smith@tvet.edu.rw', '+250788234567', '$2b$10$sR6tY8uI0oP3sA5dF7gH9jK2lM4nO6pQrQJ5qZ7mK8nH9pL2wX4v'),
('mike_johnson', 'mike.johnson@tvet.edu.rw', '+250788345678', '$2b$10$tY8uI0oP3sA5dF7gH9jK2lM4nO6pQrQJ5qZ7mK8nH9pL2wX4vsR6'),
('sarah_wilson', 'sarah.wilson@tvet.edu.rw', '+250788456789', '$2b$10$uI0oP3sA5dF7gH9jK2lM4nO6pQrQJ5qZ7mK8nH9pL2wX4vsR6tY8'),
('david_brown', 'david.brown@tvet.edu.rw', '+250788567890', '$2b$10$I0oP3sA5dF7gH9jK2lM4nO6pQrQJ5qZ7mK8nH9pL2wX4vsR6tY8u');

-- STATISTICS REPORTS Demo Data
INSERT INTO statistics_reports (report_type, period, file_url) VALUES
('Monthly Enrollment', '2024-08', 'https://storage.tvet.rw/reports/enrollment_2024_08.pdf'),
('Quarterly Performance', '2024-Q2', 'https://storage.tvet.rw/reports/performance_2024_q2.pdf'),
('Annual Graduate Survey', '2023', 'https://storage.tvet.rw/reports/graduates_survey_2023.pdf'),
('Skills Gap Analysis', '2024-H1', 'https://storage.tvet.rw/reports/skills_gap_2024_h1.pdf'),
('Partnership Impact', '2024-Q1', 'https://storage.tvet.rw/reports/partnership_impact_2024_q1.pdf'),
('Training Effectiveness', '2024-07', NULL),
('Industry Demand Report', '2024', 'https://storage.tvet.rw/reports/industry_demand_2024.pdf');

-- COMPANIES PARTNERSHIP Demo Data
INSERT INTO companies_partnership (name, industry, registration_date, status, contact) VALUES
('Rwanda Development Board', 'Government Services', '2024-01-15', 'Active', 'partnerships@rdb.rw'),
('MTN Rwanda', 'Telecommunications', '2024-02-20', 'Active', 'training@mtn.co.rw'),
('Bank of Kigali', 'Financial Services', '2024-03-10', 'Active', 'hr@bk.rw'),
('Mukamira Tea Estate', 'Agriculture', '2024-01-30', 'Active', 'training@mukamira.rw'),
('Inyange Industries', 'Manufacturing', '2024-04-05', 'Active', 'skills@inyange.co.rw'),
('Kigali Special Economic Zone', 'Industrial Development', '2024-02-28', 'Pending', 'partnerships@ksez.rw'),
('Rwanda Biomedical Centre', 'Healthcare', '2024-03-25', 'Active', 'capacity@rbc.gov.rw'),
('Horizon Construction', 'Construction', '2024-05-12', 'Under Review', 'training@horizon.rw'),
('Green Hills Academy', 'Education', '2024-01-08', 'Active', 'partnerships@greenhills.rw'),
('Simba Supermarket', 'Retail', '2024-04-18', 'Inactive', 'hr@simba.co.rw');

-- OPPORTUNITIES Demo Data
INSERT INTO opportunities (name, company_id, sector, level, location, salary, positions, description, requirements, period, status, applicants) VALUES
('Junior Software Developer Internship', 2, 'Technology', 'Entry', 'Kigali', 150000, 5, 'Learn mobile app development and web technologies in a supportive environment', '["Basic programming knowledge", "Computer Science or related field", "Good communication skills"]', '{"start": "2024-09-01", "end": "2024-12-31", "duration": "4 months"}', 'Active', 23),

('Banking Operations Trainee', 3, 'Finance', 'Entry', 'Kigali', 200000, 3, 'Comprehensive training program in banking operations and customer service', '["High school diploma", "Strong numerical skills", "Customer service experience preferred"]', '{"start": "2024-10-01", "end": "2025-03-31", "duration": "6 months"}', 'Active', 45),

('Agricultural Technology Specialist', 4, 'Agriculture', 'Mid-level', 'Musanze', 300000, 2, 'Support modern farming techniques and technology implementation', '["Agricultural degree or equivalent", "2+ years experience", "Knowledge of modern farming techniques"]', '{"start": "2024-09-15", "end": "2025-09-14", "duration": "12 months"}', 'Active', 12),

('Production Line Supervisor', 5, 'Manufacturing', 'Mid-level', 'Kigali', 350000, 1, 'Oversee production processes and quality control in food manufacturing', '["Manufacturing experience", "Leadership skills", "Quality management knowledge"]', '{"start": "2024-08-01", "end": "2025-07-31", "duration": "12 months"}', 'Active', 8),

('Construction Site Manager', 8, 'Construction', 'Senior', 'Kigali', 500000, 1, 'Manage construction projects and coordinate with various teams', '["Construction management degree", "5+ years experience", "Project management certification"]', '{"start": "2024-11-01", "end": "2025-10-31", "duration": "12 months"}', 'Under Review', 6),

('Healthcare Data Analyst', 7, 'Healthcare', 'Mid-level', 'Kigali', 280000, 2, 'Analyze healthcare data and support evidence-based decision making', '["Statistics or related field", "Data analysis experience", "Healthcare knowledge preferred"]', '{"start": "2024-09-01", "end": "2025-08-31", "duration": "12 months"}', 'Active', 18),

('Digital Marketing Assistant', 1, 'Government', 'Entry', 'Kigali', 180000, 3, 'Support digital marketing initiatives and social media management', '["Marketing or communications background", "Social media skills", "Creative thinking"]', '{"start": "2024-10-15", "end": "2025-04-14", "duration": "6 months"}', 'Active', 31),

('Retail Store Supervisor', 10, 'Retail', 'Mid-level', 'Kigali', 250000, 2, 'Supervise daily store operations and staff management', '["Retail experience", "Customer service skills", "Team leadership"]', '{"start": "2024-08-15", "end": "2024-11-14", "duration": "3 months"}', 'Inactive', 0),

('Education Technology Coordinator', 9, 'Education', 'Mid-level', 'Kigali', 320000, 1, 'Implement and support educational technology solutions', '["Education or IT background", "Technology integration experience", "Training skills"]', '{"start": "2024-09-01", "end": "2025-06-30", "duration": "10 months"}', 'Active', 14),

('Quality Assurance Technician', 6, 'Manufacturing', 'Entry', 'Kigali', 200000, 4, 'Ensure product quality standards in manufacturing processes', '["Technical diploma", "Attention to detail", "Basic laboratory skills"]', '{"start": "2024-10-01", "end": "2025-09-30", "duration": "12 months"}', 'Pending', 27);

-- SKILLS FEEDBACK Demo Data
INSERT INTO skills_feedback (skill_name, category, current_level, desired_level, priority, feedback, training_needed) VALUES
('JavaScript Programming', 'Technical', 'Intermediate', 'Advanced', 'High', 'Strong foundation but needs practice with advanced frameworks like React and Node.js', true),

('Project Management', 'Soft Skills', 'Beginner', 'Intermediate', 'Medium', 'Shows leadership potential but needs formal project management training and certification', true),

('Data Analysis', 'Technical', 'Beginner', 'Advanced', 'High', 'Basic Excel skills present. Needs training in SQL, Python, and statistical analysis tools', true),

('Customer Service', 'Soft Skills', 'Advanced', 'Advanced', 'Low', 'Excellent communication skills and customer handling. Ready for supervisory roles', false),

('Digital Marketing', 'Marketing', 'Intermediate', 'Advanced', 'Medium', 'Good understanding of social media platforms. Needs training in SEO, PPC, and analytics', true),

('Welding', 'Technical', 'Advanced', 'Expert', 'Medium', 'Highly skilled in basic welding techniques. Could benefit from advanced certification courses', true),

('Financial Analysis', 'Finance', 'Beginner', 'Intermediate', 'High', 'Basic accounting knowledge. Needs comprehensive training in financial modeling and analysis', true),

('Team Leadership', 'Soft Skills', 'Intermediate', 'Advanced', 'High', 'Natural leader but needs formal training in conflict resolution and strategic planning', true),

('Mobile App Development', 'Technical', 'Beginner', 'Intermediate', 'Medium', 'Completed basic course in Java. Ready for Android/iOS development training', true),

('Agricultural Technology', 'Technical', 'Intermediate', 'Advanced', 'Medium', 'Good practical experience. Needs training in precision agriculture and modern farming techniques', true),

('Quality Control', 'Technical', 'Advanced', 'Expert', 'Low', 'Excellent attention to detail and quality standards. Could mentor junior staff', false),

('Public Speaking', 'Soft Skills', 'Beginner', 'Intermediate', 'Medium', 'Shy but articulate. Needs confidence building and presentation skills training', true),

('Database Management', 'Technical', 'Intermediate', 'Advanced', 'High', 'Good SQL basics. Needs advanced training in database optimization and administration', true),

('Sales Techniques', 'Sales', 'Beginner', 'Advanced', 'High', 'Friendly personality but lacks formal sales training and closing techniques', true),

('Graphic Design', 'Creative', 'Intermediate', 'Advanced', 'Medium', 'Creative eye and basic software skills. Needs advanced training in design principles and tools', true);

-- Display counts for verification
SELECT 'TVET Profiles' as table_name, COUNT(*) as record_count FROM tvet_profiles
UNION ALL
SELECT 'Statistics Reports', COUNT(*) FROM statistics_reports
UNION ALL
SELECT 'Company Partnerships', COUNT(*) FROM companies_partnership
UNION ALL
SELECT 'Opportunities', COUNT(*) FROM opportunities
UNION ALL
SELECT 'Skills Feedback', COUNT(*) FROM skills_feedback;
-- =============================================
-- 1. CONTACT FORM TABLES
-- =============================================

-- Main contact form submissions table
CREATE TABLE contact_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    service ENUM(
        'Residential Interior Design',
        'Commercial Interior Design',
        'Space Planning',
        'Color Consultation',
        'Furniture & Decor Selection',
        'Project Management',
        'Full Home Renovation',
        'Other'
    ) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'in_review', 'contacted', 'closed') DEFAULT 'new',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contacted_at TIMESTAMP NULL,
    
    -- Indexes for better performance
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_service (service)
);

-- =============================================
-- 2. REVIEW/TESTIMONIAL TABLES
-- =============================================

-- Table for submitted reviews (user submissions)
CREATE TABLE review_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,  -- e.g., "Homeowner, Port Harcourt"
    review TEXT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    email VARCHAR(255),
    phone VARCHAR(50),
    project_type VARCHAR(100),
    consent_for_publication BOOLEAN DEFAULT FALSE,
    
    -- Review status and admin tracking
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    admin_notes TEXT,
    reviewed_by INT NULL,
    
    -- Timestamps
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    published_at TIMESTAMP NULL,
    
    -- Optional: User info for future reference
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Indexes
    INDEX idx_status (status),
    INDEX idx_rating (rating),
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_email (email),
    INDEX idx_published_at (published_at)
);

-- Table for published reviews (displayed on website)
CREATE TABLE published_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    submission_id INT NULL,  -- Link to original submission (if approved)
    client_name VARCHAR(255) NOT NULL,
    client_title VARCHAR(255) NOT NULL,
    review_text TEXT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    -- Display settings
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    location VARCHAR(255),  -- e.g., "Port Harcourt, Nigeria"
    
    -- Project info (optional)
    project_type ENUM(
        'residential',
        'commercial',
        'restaurant',
        'hotel',
        'office',
        'other'
    ),
    project_description TEXT,
    
    -- Timestamps
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key to submissions if applicable
    FOREIGN KEY (submission_id) REFERENCES review_submissions(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_is_featured (is_featured),
    INDEX idx_rating (rating),
    INDEX idx_display_order (display_order),
    INDEX idx_published_at (published_at),
    INDEX idx_project_type (project_type)
);

-- =============================================
-- 3. RATING SYSTEM TABLES
-- =============================================

-- Table for daily rating statistics
CREATE TABLE rating_statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stat_date DATE NOT NULL UNIQUE,
    
    -- Overall statistics
    total_reviews INT DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    
    -- Rating distribution
    rating_5_count INT DEFAULT 0,
    rating_4_count INT DEFAULT 0,
    rating_3_count INT DEFAULT 0,
    rating_2_count INT DEFAULT 0,
    rating_1_count INT DEFAULT 0,
    
    -- Additional metrics
    new_reviews_today INT DEFAULT 0,
    featured_reviews_count INT DEFAULT 0,
    
    -- Timestamps
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_stat_date (stat_date)
);

-- Table for monthly/yearly rating summaries
CREATE TABLE rating_summaries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    period_type ENUM('monthly', 'yearly') NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Statistics
    total_reviews INT DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    rating_5_count INT DEFAULT 0,
    rating_4_count INT DEFAULT 0,
    rating_3_count INT DEFAULT 0,
    rating_2_count INT DEFAULT 0,
    rating_1_count INT DEFAULT 0,
    
    -- Growth metrics
    previous_period_avg DECIMAL(3,2) DEFAULT 0.00,
    growth_percentage DECIMAL(5,2) DEFAULT 0.00,
    
    -- Unique constraint
    UNIQUE KEY unique_period (period_type, period_start),
    
    -- Indexes
    INDEX idx_period_type (period_type),
    INDEX idx_period_start (period_start)
);

-- =============================================
-- 4. VIEWS FOR EASY DATA RETRIEVAL
-- =============================================

-- View for current overall rating (real-time)
CREATE VIEW vw_current_overall_rating AS
SELECT 
    COUNT(*) as total_reviews,
    AVG(rating) as average_rating,
    ROUND(AVG(rating), 1) as average_rating_rounded,
    SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as rating_5,
    SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as rating_4,
    SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as rating_3,
    SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as rating_2,
    SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as rating_1
FROM published_reviews;

-- View for pending reviews (admin view)
CREATE VIEW vw_pending_reviews AS
SELECT 
    rs.*,
    DATEDIFF(NOW(), rs.submitted_at) as days_pending
FROM review_submissions rs
WHERE rs.status = 'pending'
ORDER BY rs.submitted_at ASC;

-- View for today's contact submissions
CREATE VIEW vw_today_contacts AS
SELECT 
    cs.*,
    TIME(cs.submitted_at) as submission_time
FROM contact_submissions cs
WHERE DATE(cs.submitted_at) = CURDATE()
ORDER BY cs.submitted_at DESC;

-- =============================================
-- 5. STORED PROCEDURES
-- =============================================

-- Procedure to submit a new contact form
DELIMITER //
CREATE PROCEDURE sp_submit_contact_form(
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_phone VARCHAR(50),
    IN p_service VARCHAR(100),
    IN p_message TEXT
)
BEGIN
    INSERT INTO contact_submissions (name, email, phone, service, message)
    VALUES (p_name, p_email, p_phone, p_service, p_message);
    
    SELECT LAST_INSERT_ID() as submission_id;
END //
DELIMITER ;

-- Procedure to submit a new review
DELIMITER //
CREATE PROCEDURE sp_submit_review(
    IN p_name VARCHAR(255),
    IN p_title VARCHAR(255),
    IN p_review TEXT,
    IN p_rating TINYINT,
    IN p_email VARCHAR(255),
    IN p_consent BOOLEAN
)
BEGIN
    INSERT INTO review_submissions (
        name, 
        title, 
        review, 
        rating, 
        email, 
        consent_for_publication
    ) VALUES (
        p_name, 
        p_title, 
        p_review, 
        p_rating, 
        p_email, 
        p_consent
    );
    
    SELECT LAST_INSERT_ID() as review_id;
END //
DELIMITER ;

-- Procedure to approve and publish a review
DELIMITER //
CREATE PROCEDURE sp_publish_review(
    IN p_submission_id INT,
    IN p_admin_id INT
)
BEGIN
    DECLARE v_client_name VARCHAR(255);
    DECLARE v_client_title VARCHAR(255);
    DECLARE v_review_text TEXT;
    DECLARE v_rating TINYINT;
    
    -- Get review data
    SELECT name, title, review, rating 
    INTO v_client_name, v_client_title, v_review_text, v_rating
    FROM review_submissions 
    WHERE id = p_submission_id;
    
    -- Insert into published reviews
    INSERT INTO published_reviews (
        submission_id,
        client_name,
        client_title,
        review_text,
        rating
    ) VALUES (
        p_submission_id,
        v_client_name,
        v_client_title,
        v_review_text,
        v_rating
    );
    
    -- Update submission status
    UPDATE review_submissions 
    SET 
        status = 'approved',
        reviewed_by = p_admin_id,
        reviewed_at = NOW(),
        published_at = NOW()
    WHERE id = p_submission_id;
    
    -- Update rating statistics
    CALL sp_update_rating_stats();
    
    SELECT LAST_INSERT_ID() as published_review_id;
END //
DELIMITER ;

-- Procedure to update rating statistics
DELIMITER //
CREATE PROCEDURE sp_update_rating_stats()
BEGIN
    -- Update daily statistics
    INSERT INTO rating_statistics (
        stat_date,
        total_reviews,
        average_rating,
        rating_5_count,
        rating_4_count,
        rating_3_count,
        rating_2_count,
        rating_1_count,
        new_reviews_today
    )
    SELECT 
        CURDATE(),
        COUNT(*),
        AVG(rating),
        SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END),
        SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END),
        SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END),
        SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END),
        SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END),
        COUNT(CASE WHEN DATE(published_at) = CURDATE() THEN 1 END)
    FROM published_reviews
    ON DUPLICATE KEY UPDATE
        total_reviews = VALUES(total_reviews),
        average_rating = VALUES(average_rating),
        rating_5_count = VALUES(rating_5_count),
        rating_4_count = VALUES(rating_4_count),
        rating_3_count = VALUES(rating_3_count),
        rating_2_count = VALUES(rating_2_count),
        rating_1_count = VALUES(rating_1_count),
        new_reviews_today = VALUES(new_reviews_today),
        calculated_at = NOW();
END //
DELIMITER ;

-- Procedure to get overall rating (for display on website)
DELIMITER //
CREATE PROCEDURE sp_get_overall_rating()
BEGIN
    SELECT 
        total_reviews,
        average_rating_rounded as average_rating,
        rating_5,
        rating_4,
        rating_3,
        rating_2,
        rating_1
    FROM vw_current_overall_rating;
END //
DELIMITER ;

-- =============================================
-- 6. TRIGGERS FOR AUTOMATION
-- =============================================

-- Trigger to auto-update rating stats when new review is published
DELIMITER //
CREATE TRIGGER trg_after_review_published
AFTER INSERT ON published_reviews
FOR EACH ROW
BEGIN
    CALL sp_update_rating_stats();
END //
DELIMITER ;

-- Trigger to update modified timestamp
DELIMITER //
CREATE TRIGGER trg_before_review_update
BEFORE UPDATE ON published_reviews
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END //
DELIMITER ;
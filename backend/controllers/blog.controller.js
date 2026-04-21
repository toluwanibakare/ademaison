const db = require('../config/db');

// Admin creates a blog
exports.createBlog = async (req, res) => {
  try {
    const { title, body, is_published } = req.body;
    let cover_image = '';
    
    // Simple file mock/upload logic assuming multer or base64 was used
    // For now we assume image path is passed in body if using base64, or file if multer
    if (req.file) {
      cover_image = `/uploads/${req.file.filename}`;
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const [result] = await db.promise().execute(
      'INSERT INTO blogs (title, slug, body, cover_image, is_published, published_at) VALUES (?, ?, ?, ?, ?, ?)',
      [title, slug, body, cover_image, is_published || false, is_published ? new Date() : null]
    );

    res.status(201).json({ success: true, message: 'Blog created', blogId: result.insertId });
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Get all blogs (public)
exports.getBlogs = async (req, res) => {
  try {
    const [blogs] = await db.promise().execute(
      'SELECT id, title, slug, cover_image, views, likes, published_at FROM blogs WHERE is_published = TRUE ORDER BY published_at DESC'
    );
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error("Get blogs error:", error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Get single blog by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const [blogs] = await db.promise().execute('SELECT * FROM blogs WHERE slug = ? AND is_published = TRUE', [slug]);
    if (blogs.length === 0) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    // Update views
    await db.promise().execute('UPDATE blogs SET views = views + 1 WHERE id = ?', [blogs[0].id]);
    
    // Fetch comments
    const [comments] = await db.promise().execute('SELECT id, user_name, comment, created_at FROM blog_comments WHERE blog_id = ? AND is_approved = TRUE ORDER BY created_at DESC', [blogs[0].id]);

    const blogData = { ...blogs[0], views: blogs[0].views + 1, comments };
    res.status(200).json({ success: true, data: blogData });
  } catch (error) {
    console.error("Get single blog error:", error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Like a blog
exports.likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await db.promise().execute('UPDATE blogs SET likes = likes + 1 WHERE id = ?', [id]);
    res.status(200).json({ success: true, message: 'Blog liked' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Comment on a blog
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, user_email, comment } = req.body;
    
    await db.promise().execute(
      'INSERT INTO blog_comments (blog_id, user_name, user_email, comment) VALUES (?, ?, ?, ?)',
      [id, user_name, user_email, comment]
    );
    res.status(201).json({ success: true, message: 'Comment submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

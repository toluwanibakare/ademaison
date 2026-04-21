import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const AdminBlogCreate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    is_published: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast({ title: "Success", description: "Blog created successfully!" });
        navigate("/");
      } else {
        toast({ title: "Error", description: data.error || "Failed to create blog", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Network error occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding bg-background min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card"
          >
            <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Create New Blog Post</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="form-label">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="Enter a catchy title..."
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="form-label">Cover Image (Upload feature mocked due to lack of cloud storage)</label>
                <input
                  type="file"
                  className="form-input bg-secondary/50"
                  accept="image/*"
                />
              </div>

              <div>
                <label className="form-label">Blog Content (Paragraphs, Headings etc. Use HTML or just raw text)</label>
                <textarea
                  name="body"
                  rows={10}
                  className="form-input resize-none"
                  placeholder="Write your blog post here..."
                  value={formData.body}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                <input
                  type="checkbox"
                  id="is_published"
                  name="is_published"
                  className="w-5 h-5 accent-accent"
                  checked={formData.is_published}
                  onChange={handleChange}
                />
                <label htmlFor="is_published" className="text-foreground font-medium">
                  Publish Immediately
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-lg mt-6"
              >
                {loading ? "Saving..." : "Save Blog Post"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminBlogCreate;

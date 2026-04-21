import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { createBlog } from "@/api/blogs";

const AdminBlogCreate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    is_published: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === "website admin" && loginData.password === "Administration@26") {
      setIsAuthenticated(true);
      toast({ title: "Success", description: "Admin authenticated." });
    } else {
      toast({ title: "Access Denied", description: "Invalid credentials.", variant: "destructive" });
    }
  };

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
      const data = await createBlog(formData);
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
      <section className="section-padding bg-background min-h-screen pt-32">
        {!isAuthenticated ? (
          <div className="container mx-auto max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
              <h1 className="text-3xl font-serif font-bold text-center mb-8 text-foreground">Secure Login</h1>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="form-label text-sm font-medium">Username</label>
                  <input
                    type="text"
                    className="form-input bg-background/50 border-border/50 focus:border-accent transition-colors"
                    placeholder="Enter admin username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="form-label text-sm font-medium">Password</label>
                  <input
                    type="password"
                    className="form-input bg-background/50 border-border/50 focus:border-accent transition-colors"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full shadow-md mt-4 py-3">
                  Authenticate
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card grid gap-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
                <h1 className="text-3xl font-serif font-bold text-foreground">Content Studio</h1>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    showPreview 
                      ? "bg-accent/10 text-accent hover:bg-accent/20" 
                      : "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:-translate-y-0.5"
                  }`}
                >
                  {showPreview ? "Back to Editor" : "Preview Article"}
                </button>
              </div>
              
              {showPreview ? (
                <div className="bg-card border border-border/50 rounded-xl p-8 min-h-[500px]">
                  <p className="text-accent text-sm font-bold uppercase tracking-widest mb-6">Preview Mode</p>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8 leading-tight">
                    {formData.title || "Untitled Masterpiece"}
                  </h1>
                  <div 
                    className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formData.body || "<p class='text-muted-foreground italic'>Your incredible content will appear here...</p>" }}
                  />
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-6 bg-secondary/20 p-6 rounded-xl border border-border/30">
                    <div>
                      <label className="form-label font-bold text-lg">Article Title</label>
                      <input
                        type="text"
                        name="title"
                        className="form-input text-lg py-4 shadow-sm"
                        placeholder="Enter a captivating headline..."
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label font-bold text-lg flex items-center justify-between">
                        Cover Media <span className="text-xs font-normal text-muted-foreground px-2 py-1 bg-background rounded-md border border-border/50">Local Upload Bound</span>
                      </label>
                      <div className="relative border-2 border-dashed border-border hover:border-accent/50 transition-colors bg-background rounded-lg p-8 text-center cursor-pointer">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                        />
                        <p className="text-muted-foreground">Drag and drop or click to select cover image</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-xl border border-border/30">
                    <label className="form-label font-bold text-lg mb-4 flex items-center justify-between">
                      Story Content
                      <span className="text-xs font-normal text-muted-foreground">HTML Supported</span>
                    </label>
                    <textarea
                      name="body"
                      rows={15}
                      className="form-input resize-y shadow-sm font-mono text-sm leading-relaxed"
                      placeholder="<p>Start writing your expertise here...</p>"
                      value={formData.body}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border/50">
                    <div className="flex items-center space-x-3 bg-secondary/30 px-4 py-3 rounded-lg border border-border/50 w-full sm:w-auto">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id="is_published"
                          name="is_published"
                          className="peer sr-only"
                          checked={formData.is_published}
                          onChange={handleChange}
                        />
                        <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-accent transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                      </div>
                      <label htmlFor="is_published" className="text-foreground font-medium cursor-pointer select-none">
                        Publish Instantly
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full sm:w-auto px-10 text-lg shadow-lg hover:shadow-accent/20"
                    >
                      {loading ? "Publishing..." : "Commit Article"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default AdminBlogCreate;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Eye, Heart, ArrowUpRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { getBlogs } from "@/api/blogs";

const BlogIndex = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SEO implementation
    document.title = "ADÉmaison Journal | Interior Design Blog";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Discover the latest trends, tips, and insights in premium interior design on the ADÉmaison Journal.');

    // Update Open Graph tags for SEO
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'ADÉmaison Journal | Interior Design Blog');

    const fetchBlogsData = async () => {
      try {
        const data = await getBlogs();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogsData();
  }, []);

  return (
    <Layout>
      <PageHeader
        title="ADÉmaison Journal"
        subtitle="Discover the latest trends, tips, and insights in interior design."
        breadcrumbs={[{ label: "Journal" }]}
      />

      {/* Blogs Layout */}
      <section className="section-padding bg-background min-h-screen">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-secondary animate-pulse rounded-lg flex flex-col justify-end p-6">
                  <div className="h-4 bg-muted-foreground/20 w-1/3 mb-4 rounded"></div>
                  <div className="h-8 bg-muted-foreground/20 w-3/4 mb-4 rounded"></div>
                  <div className="h-4 bg-muted-foreground/20 w-full mb-2 rounded"></div>
                  <div className="h-4 bg-muted-foreground/20 w-5/6 rounded"></div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-xl text-muted-foreground">
              No articles published yet. Check back later!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any, index: number) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/post/${blog.slug}`}
                    className="group premium-card flex flex-col h-full bg-card hover:bg-primary hover:text-primary-foreground transform transition-all duration-500 rounded-xl overflow-hidden shadow-sm"
                  >
                    {blog.cover_image && (
                      <div className="w-full h-48 -mt-6 -mx-6 mb-6 overflow-hidden">
                        <img 
                          src={blog.cover_image} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-4 mb-4 text-sm font-medium text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(blog.published_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-foreground group-hover:text-primary-foreground transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-border group-hover:border-primary-foreground/20 transition-colors">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground group-hover:text-primary-foreground/70">
                        <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {blog.views}</span>
                        <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {blog.likes}</span>
                      </div>
                      <span className="text-primary group-hover:text-accent font-bold flex items-center transition-colors">
                        Read
                        <ArrowUpRight className="ml-1 w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogIndex;

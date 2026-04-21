import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, Heart, MessageSquare, ArrowLeft, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { getBlogBySlug, likeBlog, addComment as saveComment } from "@/api/blogs";

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentData, setCommentData] = useState({ user_name: "", user_email: "", comment: "" });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const data = await getBlogBySlug(slug!);
        if (data.success) {
          setBlog(data.data);
          
          // SEO implementation
          document.title = `${data.data.title} | ADÉmaison Journal`;
          
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
          }
          const cleanText = data.data.body.replace(/<[^>]*>?/gm, '').substring(0, 160);
          metaDescription.setAttribute('content', cleanText);

          let ogTitle = document.querySelector('meta[property="og:title"]');
          if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
          }
          ogTitle.setAttribute('content', `${data.data.title} | ADÉmaison Journal`);
          
          let ogImage = document.querySelector('meta[property="og:image"]');
          if (!ogImage && data.data.cover_image) {
            ogImage = document.createElement('meta');
            ogImage.setAttribute('property', 'og:image');
            document.head.appendChild(ogImage);
          }
          if (ogImage && data.data.cover_image) {
            ogImage.setAttribute('content', data.data.cover_image);
          }
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [slug]);

  const handleLike = async () => {
    if (hasLiked || !blog) return;
    try {
      setHasLiked(true);
      setBlog((prev: any) => ({ ...prev, likes: prev.likes + 1 }));
      await likeBlog(blog.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: blog.title, url });
    } else {
      navigator.clipboard.writeText(url);
      toast({ title: "Copied!", description: "Link copied to clipboard" });
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentData.user_name || !commentData.comment) return;
    
    setSubmittingComment(true);
    try {
      const data = await saveComment(blog.id, commentData);
      if (data.success) {
        setBlog((prev: any) => ({
          ...prev,
          comments: [{ ...commentData, created_at: new Date().toISOString() }, ...prev.comments]
        }));
        setCommentData({ user_name: "", user_email: "", comment: "" });
        toast({ title: "Success", description: "Comment posted!" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to post comment", variant: "destructive" });
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-center">
          <h1 className="text-4xl font-serif mb-4">Blog not found</h1>
          <Link to="/" className="btn-primary">Back to Journal</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        title={blog.title}
        subtitle={`Published on ${new Date(blog.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`}
        breadcrumbs={[
          { label: "Journal", path: "/blog" },
          { label: blog.title }
        ]}
      />
      
      <article className="py-16 bg-background min-h-screen">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-wrap items-center justify-end border-b border-border/50 pb-8 mb-10 gap-4">

            
            <div className="flex items-center gap-6">
              <button onClick={handleLike} className={`flex items-center gap-2 font-medium transition-colors ${hasLiked ? 'text-accent' : 'text-muted-foreground hover:text-accent'}`}>
                <Heart className={`w-6 h-6 ${hasLiked ? 'fill-accent' : ''}`} /> 
                <span className="text-lg">{blog.likes}</span>
              </button>
              <button onClick={handleShare} className="flex items-center gap-2 text-muted-foreground hover:text-primary font-medium transition-colors">
                <Share2 className="w-6 h-6" /> Share
              </button>
            </div>
          </div>

          <div 
            className="prose prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed mb-16"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />

          <div className="border-t border-border/50 pt-16">
            <h3 className="flex items-center gap-3 text-3xl font-serif font-bold mb-10">
              <MessageSquare className="w-8 h-8 text-primary" /> 
              Discussion ({blog.comments?.length || 0})
            </h3>
            
            <form onSubmit={submitComment} className="mb-12 bg-secondary/30 p-6 md:p-8 rounded-xl border border-border/50">
              <h4 className="text-xl font-bold mb-6">Leave a Reply</h4>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name *" 
                    required 
                    className="form-input rounded-md bg-background"
                    value={commentData.user_name}
                    onChange={(e) => setCommentData({...commentData, user_name: e.target.value})}
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="form-input rounded-md bg-background"
                    value={commentData.user_email}
                    onChange={(e) => setCommentData({...commentData, user_email: e.target.value})}
                  />
                </div>
              </div>
              <div className="mb-6">
                <textarea 
                  rows={4} 
                  placeholder="Your Comment *" 
                  required 
                  className="form-input rounded-md bg-background resize-none"
                  value={commentData.comment}
                  onChange={(e) => setCommentData({...commentData, comment: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" disabled={submittingComment} className="btn-primary w-full md:w-auto">
                <Send className="w-4 h-4 mr-2" />
                {submittingComment ? "Posting..." : "Post Comment"}
              </button>
            </form>

            <div className="space-y-8">
              {blog.comments?.map((comment: any, index: number) => (
                <div key={index} className="flex gap-4 p-6 bg-card border border-border/50 rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl flex-shrink-0">
                    {comment.user_name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-lg">{comment.user_name}</span>
                      <span className="text-sm text-muted-foreground">{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;

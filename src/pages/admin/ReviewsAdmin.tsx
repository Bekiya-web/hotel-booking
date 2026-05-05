import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AdminReviews = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-yellow-600 mb-6 transition-smooth">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="font-serif text-4xl mb-4">Reviews Management</h1>
        <p className="text-muted-foreground mb-8">Monitor and respond to guest reviews and feedback.</p>
        
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">Reviews management page - Coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Star, Edit, Trash2, Save, X, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getReviews, createReview, updateReview, deleteReview } from "@/lib/supabase";
import { toast } from "sonner";
import type { Review } from "@/types/database";

const AdminReviewsAdmin = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    guest_name: '',
    country: '',
    review_date: new Date().toISOString().split('T')[0],
    rating: 5,
    room_type: '',
    text: '',
    verified: true
  });

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: getReviews
  });

  const createMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success("Review created successfully!");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      toast.error("Failed to create review", { description: error.message });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Review> }) => 
      updateReview(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success("Review updated successfully!");
      setIsDialogOpen(false);
      setEditingReview(null);
      resetForm();
    },
    onError: (error: Error) => {
      toast.error("Failed to update review", { description: error.message });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success("Review deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete review", { description: error.message });
    }
  });

  const resetForm = () => {
    setFormData({
      guest_name: '',
      country: '',
      review_date: new Date().toISOString().split('T')[0],
      rating: 5,
      room_type: '',
      text: '',
      verified: true
    });
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      guest_name: review.guest_name,
      country: review.country || '',
      review_date: review.review_date,
      rating: review.rating,
      room_type: review.room_type || '',
      text: review.text,
      verified: review.verified
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingReview) {
      updateMutation.mutate({ id: editingReview.id, updates: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string, guestName: string) => {
    if (confirm(`Are you sure you want to delete the review by ${guestName}?`)) {
      deleteMutation.mutate(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-yellow-500 mb-6 transition-smooth">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl mb-2">Reviews Management</h1>
            <p className="text-muted-foreground">Manage guest reviews and ratings.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setEditingReview(null); }}>
                <Plus className="w-4 h-4 mr-2" /> Add Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingReview ? 'Edit Review' : 'Add New Review'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Guest Name *</Label>
                    <Input
                      required
                      placeholder="John Doe"
                      value={formData.guest_name}
                      onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Input
                      placeholder="New York, USA"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Review Date *</Label>
                    <Input
                      required
                      type="date"
                      value={formData.review_date}
                      onChange={(e) => setFormData({...formData, review_date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Room Type</Label>
                    <Input
                      placeholder="Deluxe Skyline"
                      value={formData.room_type}
                      onChange={(e) => setFormData({...formData, room_type: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rating (1-5) *</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      required
                      type="number"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                      className="w-24"
                    />
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < formData.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Review Text *</Label>
                  <Textarea
                    required
                    placeholder="Share your experience..."
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.verified}
                    onCheckedChange={(checked) => setFormData({...formData, verified: checked})}
                  />
                  <Label>Verified Review</Label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    {editingReview ? 'Update Review' : 'Create Review'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <p className="text-4xl font-serif font-semibold mb-2">{reviews.length}</p>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              <p className="text-4xl font-serif font-semibold text-yellow-500">{avgRating}</p>
            </div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-4xl font-serif font-semibold text-green-600">
              {reviews.filter(r => r.verified).length}
            </p>
            <p className="text-sm text-muted-foreground">Verified Reviews</p>
          </Card>
        </div>

        {/* Reviews List */}
        {isLoading ? (
          <p className="text-center text-muted-foreground py-12">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No reviews yet. Add your first review to get started.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Review
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-serif text-xl">{review.guest_name}</h3>
                      {review.verified && (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/30">
                          <BadgeCheck className="w-3 h-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.country} · {formatDate(review.review_date)} · {review.room_type}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(review)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDelete(review.id, review.guest_name)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-foreground/85 leading-relaxed">"{review.text}"</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviewsAdmin;

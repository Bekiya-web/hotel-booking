import { useState } from "react";
import { Image as ImageIcon, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaLibrary } from "@/features/media/MediaLibrary";
import type { Room } from "@/types/database";

interface RoomFormProps {
  room?: Room | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const RoomForm = ({ room, onSubmit, onCancel, isSubmitting }: RoomFormProps) => {
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [mediaLibraryMode, setMediaLibraryMode] = useState<'main' | 'gallery'>('main');
  const [formData, setFormData] = useState({
    room_id: room?.room_id || '',
    name: room?.name || '',
    tagline: room?.tagline || '',
    description: room?.description || '',
    long_description: room?.long_description || '',
    price: room?.price || 0,
    image: room?.image || '',
    gallery: room?.gallery?.join(', ') || '',
    bed: room?.bed || '',
    size: room?.size || '',
    guests: room?.guests || 2,
    rating: room?.rating || 4.5,
    reviews_count: room?.reviews_count || 0,
    amenities: room?.amenities?.join(', ') || '',
    available: room?.available || 0,
    view: room?.view || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const roomData = {
      room_id: formData.room_id,
      name: formData.name,
      tagline: formData.tagline,
      description: formData.description,
      long_description: formData.long_description,
      price: Number(formData.price),
      image: formData.image,
      gallery: formData.gallery.split(',').map(s => s.trim()).filter(Boolean),
      bed: formData.bed,
      size: formData.size,
      guests: Number(formData.guests),
      rating: Number(formData.rating),
      reviews_count: Number(formData.reviews_count),
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean),
      available: Number(formData.available),
      view: formData.view
    };

    onSubmit(roomData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Room ID *</Label>
                <Input
                  required
                  placeholder="classic-king"
                  value={formData.room_id}
                  onChange={(e) => setFormData({...formData, room_id: e.target.value})}
                  disabled={!!room}
                />
              </div>
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  required
                  placeholder="Classic King"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tagline *</Label>
              <Input
                required
                placeholder="Timeless comfort"
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Short Description *</Label>
              <Textarea
                required
                placeholder="A serene retreat with king bed..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Long Description *</Label>
              <Textarea
                required
                placeholder="Our Classic King rooms balance..."
                value={formData.long_description}
                onChange={(e) => setFormData({...formData, long_description: e.target.value})}
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Price ($) *</Label>
                <Input
                  required
                  type="number"
                  placeholder="189"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label>Guests *</Label>
                <Input
                  required
                  type="number"
                  placeholder="2"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: Number(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label>Available *</Label>
                <Input
                  required
                  type="number"
                  placeholder="5"
                  value={formData.available}
                  onChange={(e) => setFormData({...formData, available: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Bed Type *</Label>
                <Input
                  required
                  placeholder="King bed"
                  value={formData.bed}
                  onChange={(e) => setFormData({...formData, bed: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Size *</Label>
                <Input
                  required
                  placeholder="38 m²"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>View *</Label>
                <Input
                  required
                  placeholder="City view"
                  value={formData.view}
                  onChange={(e) => setFormData({...formData, view: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Amenities (comma-separated) *</Label>
              <Textarea
                required
                placeholder="Free WiFi, Air conditioning, Breakfast, Smart TV"
                value={formData.amenities}
                onChange={(e) => setFormData({...formData, amenities: e.target.value})}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rating (0-5)</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="4.5"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label>Reviews Count</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.reviews_count}
                  onChange={(e) => setFormData({...formData, reviews_count: Number(e.target.value)})}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Main Image</Label>
              
              {formData.image && (
                <div className="relative aspect-video rounded-lg overflow-hidden border mb-2">
                  <img src={formData.image} alt="Main" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setMediaLibraryMode('main');
                    setIsMediaLibraryOpen(true);
                  }}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Choose from Gallery
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">Or enter URL manually:</p>
              <Input
                placeholder="https://res.cloudinary.com/..."
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Gallery Images</Label>
              
              {formData.gallery && (
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {formData.gallery.split(',').map((url, index) => {
                    const trimmedUrl = url.trim();
                    if (!trimmedUrl) return null;
                    return (
                      <div key={index} className="relative aspect-video rounded overflow-hidden border">
                        <img src={trimmedUrl} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const urls = formData.gallery.split(',').map(s => s.trim()).filter(Boolean);
                            urls.splice(index, 1);
                            setFormData({...formData, gallery: urls.join(', ')});
                          }}
                          className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setMediaLibraryMode('gallery');
                    setIsMediaLibraryOpen(true);
                  }}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Choose from Gallery
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">Or enter URLs manually (comma-separated):</p>
              <Textarea
                placeholder="https://res.cloudinary.com/image1.jpg, https://res.cloudinary.com/image2.jpg"
                value={formData.gallery}
                onChange={(e) => setFormData({...formData, gallery: e.target.value})}
                rows={2}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 pt-4 border-t">
          <Button type="submit" disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" />
            {room ? 'Update Room' : 'Create Room'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>
        </div>
      </form>

      <MediaLibrary
        open={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelect={(urls) => {
          if (mediaLibraryMode === 'main') {
            setFormData({...formData, image: urls[0] || ''});
          } else {
            const existingUrls = formData.gallery ? formData.gallery.split(',').map(s => s.trim()).filter(Boolean) : [];
            const allUrls = [...existingUrls, ...urls];
            setFormData({...formData, gallery: allUrls.join(', ')});
          }
        }}
        multiple={mediaLibraryMode === 'gallery'}
        maxSelection={5}
        selectedUrls={
          mediaLibraryMode === 'main' 
            ? (formData.image ? [formData.image] : [])
            : (formData.gallery ? formData.gallery.split(',').map(s => s.trim()).filter(Boolean) : [])
        }
      />
    </>
  );
};

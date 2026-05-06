import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Room } from "@/types/database";

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onDelete: (id: string, name: string) => void;
  isDeleting: boolean;
}

export const RoomCard = ({ room, onEdit, onDelete, isDeleting }: RoomCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex gap-6">
        <img 
          src={room.image} 
          alt={room.name}
          className="w-48 h-32 object-cover rounded-md"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-serif text-2xl">{room.name}</h3>
              <p className="text-sm text-muted-foreground italic">{room.tagline}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(room)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onDelete(room.id, room.name)}
                disabled={isDeleting}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{room.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Price:</span>
              <span className="ml-2 font-semibold text-yellow-500">${room.price}/night</span>
            </div>
            <div>
              <span className="text-muted-foreground">Bed:</span>
              <span className="ml-2">{room.bed}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Size:</span>
              <span className="ml-2">{room.size}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Available:</span>
              <span className="ml-2 font-semibold">{room.available} rooms</span>
            </div>
            <div>
              <span className="text-muted-foreground">Guests:</span>
              <span className="ml-2">Up to {room.guests}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Rating:</span>
              <span className="ml-2">⭐ {room.rating} ({room.reviews_count})</span>
            </div>
            <div>
              <span className="text-muted-foreground">View:</span>
              <span className="ml-2">{room.view}</span>
            </div>
            <div>
              <span className="text-muted-foreground">ID:</span>
              <span className="ml-2 text-xs">{room.room_id}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

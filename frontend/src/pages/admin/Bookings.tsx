import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Search, Filter, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBookings, updateBooking, deleteBooking } from "@/lib/supabase";
import { toast } from "sonner";
import type { Booking } from "@/types/database";

const AdminBookings = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Booking> }) => 
      updateBooking(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success("Booking updated successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to update booking", { description: error.message });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success("Booking deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error("Failed to delete booking", { description: error.message });
    }
  });

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    updateMutation.mutate({ 
      id: bookingId, 
      updates: { status: newStatus as Booking['status'] } 
    });
  };

  const handleDelete = (id: string, bookingId: string) => {
    if (confirm(`Are you sure you want to delete booking ${bookingId}?`)) {
      deleteMutation.mutate(id);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = searchTerm === "" || 
      booking.booking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.guest && `${booking.guest.first_name} ${booking.guest.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.room && booking.room.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500/10 text-green-600 border-green-500/30";
      case "pending": return "bg-yellow-500 text-white border-yellow-500";
      case "cancelled": return "bg-red-500/10 text-red-600 border-red-500/30";
      case "completed": return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-yellow-500 mb-6 transition-smooth">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Bookings Management</h1>
          <p className="text-muted-foreground">View and manage all hotel bookings.</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by booking ID, guest name, or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Bookings List */}
        {isLoading ? (
          <p className="text-center text-muted-foreground py-12">Loading bookings...</p>
        ) : filteredBookings.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all" 
                ? "No bookings match your filters." 
                : "No bookings yet. Bookings will appear here when guests make reservations."}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-lg">{booking.booking_id}</h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Created: {formatDate(booking.created_at || '')}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Guest:</span>
                        <span className="ml-2 font-medium">
                          {booking.guest 
                            ? `${booking.guest.first_name} ${booking.guest.last_name}`
                            : 'Unknown'}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <span className="ml-2">{booking.guest?.email || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Room:</span>
                        <span className="ml-2 font-medium">{booking.room?.name || 'Unknown'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Guests:</span>
                        <span className="ml-2">{booking.guests_count} people</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Check-in:</span>
                        <span className="ml-2">{formatDate(booking.check_in)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Check-out:</span>
                        <span className="ml-2">{formatDate(booking.check_out)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="ml-2 font-semibold text-yellow-500">${booking.amount}</span>
                      </div>
                      {booking.special_requests && (
                        <div className="md:col-span-2">
                          <span className="text-muted-foreground">Special Requests:</span>
                          <span className="ml-2">{booking.special_requests}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <Select 
                      value={booking.status} 
                      onValueChange={(value) => handleStatusChange(booking.id, value)}
                      disabled={updateMutation.isPending}
                    >
                      <SelectTrigger className="w-full lg:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(booking.id, booking.booking_id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Summary */}
        {!isLoading && filteredBookings.length > 0 && (
          <Card className="p-6 mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl font-serif font-semibold">{filteredBookings.length}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-semibold text-yellow-500">
                  {filteredBookings.filter(b => b.status === 'confirmed').length}
                </p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-semibold text-green-600">
                  {filteredBookings.filter(b => b.status === 'completed').length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-semibold text-blue-600">
                  ${filteredBookings.reduce((sum, b) => sum + Number(b.amount), 0).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;

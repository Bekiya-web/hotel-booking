import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  BedDouble, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Star,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  Search,
  Bell,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";

const stats = [
  { label: "Total Revenue", value: "$124,500", change: "+12.5%", trend: "up", icon: DollarSign },
  { label: "Bookings Today", value: "23", change: "+8.2%", trend: "up", icon: Calendar },
  { label: "Occupancy Rate", value: "87%", change: "+5.1%", trend: "up", icon: BedDouble },
  { label: "Guest Rating", value: "4.9", change: "+0.2", trend: "up", icon: Star },
];

const recentBookings = [
  { id: "BK-2401", guest: "Helena Marlow", room: "Executive Suite", checkIn: "Today", status: "confirmed", amount: "$850" },
  { id: "BK-2402", guest: "Daniel Reyes", room: "Deluxe Skyline", checkIn: "Tomorrow", status: "pending", amount: "$650" },
  { id: "BK-2403", guest: "Sara Khan", room: "Penthouse", checkIn: "May 8", status: "confirmed", amount: "$1,200" },
  { id: "BK-2404", guest: "Marcus Lindqvist", room: "Classic King", checkIn: "May 10", status: "confirmed", amount: "$450" },
  { id: "BK-2405", guest: "Isabela Rocha", room: "Deluxe Skyline", checkIn: "May 12", status: "cancelled", amount: "$650" },
];

const roomStatus = [
  { room: "101", type: "Classic King", status: "occupied", guest: "John Doe", checkout: "May 6" },
  { room: "102", type: "Deluxe Skyline", status: "cleaning", guest: "-", checkout: "-" },
  { room: "103", type: "Executive Suite", status: "available", guest: "-", checkout: "-" },
  { room: "201", type: "Penthouse", status: "occupied", guest: "Jane Smith", checkout: "May 8" },
  { room: "202", type: "Classic King", status: "maintenance", guest: "-", checkout: "-" },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500/10 text-green-600 border-green-500/30";
      case "pending": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
      case "cancelled": return "bg-red-500/10 text-red-600 border-red-500/30";
      case "occupied": return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      case "cleaning": return "bg-purple-500/10 text-purple-600 border-purple-500/30";
      case "available": return "bg-green-500/10 text-green-600 border-green-500/30";
      case "maintenance": return "bg-orange-500/10 text-orange-600 border-orange-500/30";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-wide text-yellow-600">Auréa</span>
              <span className="font-serif text-xl tracking-wider text-foreground font-semibold uppercase">Grand</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-yellow-500/10 text-yellow-600 border border-yellow-500/30">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link to="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:bg-accent transition-colors">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Bookings</span>
            </Link>
            <Link to="/admin/rooms" className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:bg-accent transition-colors">
              <BedDouble className="w-5 h-5" />
              <span className="font-medium">Rooms</span>
            </Link>
            <Link to="/admin/guests" className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:bg-accent transition-colors">
              <Users className="w-5 h-5" />
              <span className="font-medium">Guests</span>
            </Link>
            <Link to="/admin/revenue" className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:bg-accent transition-colors">
              <DollarSign className="w-5 h-5" />
              <span className="font-medium">Revenue</span>
            </Link>
            <Link to="/admin/reviews" className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:bg-accent transition-colors">
              <Star className="w-5 h-5" />
              <span className="font-medium">Reviews</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:bg-accent transition-colors">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>
            <Link to="/admin/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:bg-accent transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search bookings, guests, rooms..." 
                  className="pl-10 w-80 hidden md:block"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@aurea-grand.com</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-yellow-600">AU</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="font-serif text-3xl mb-2">Welcome back, Admin</h1>
            <p className="text-muted-foreground">Here's what's happening with your hotel today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-serif font-semibold">{stat.value}</p>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl">Recent Bookings</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-medium">{booking.guest}</p>
                        <Badge className={`text-xs ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.room} • {booking.checkIn}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold text-yellow-600">{booking.amount}</p>
                      <button className="p-2 hover:bg-background rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Room Status */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl">Room Status</h2>
                <Button variant="outline" size="sm">Manage Rooms</Button>
              </div>
              <div className="space-y-4">
                {roomStatus.map((room) => (
                  <div key={room.room} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center">
                        <span className="font-semibold">{room.room}</span>
                      </div>
                      <div>
                        <p className="font-medium">{room.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {room.guest !== "-" ? `${room.guest} • Until ${room.checkout}` : "No guest"}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(room.status)}`}>
                      {room.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="font-serif text-2xl mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                <Calendar className="w-6 h-6 text-yellow-600" />
                <span>New Booking</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span>Check In</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                <XCircle className="w-6 h-6 text-blue-600" />
                <span>Check Out</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                <Clock className="w-6 h-6 text-purple-600" />
                <span>Housekeeping</span>
              </Button>
            </div>
          </Card>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

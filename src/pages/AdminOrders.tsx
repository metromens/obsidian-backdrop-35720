import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, Package } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type Order = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: number;
  total: string;
  status: string;
  date: string;
  orderItems: OrderItem[];
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<string>("");

  const handleLogout = () => {
    navigate("/admin");
  };

  const [orders, setOrders] = useState<Order[]>([
    { 
      id: "ORD-001", 
      customer: "John Doe", 
      email: "john@example.com",
      phone: "+1 234 567 8900",
      address: "123 Main St, New York, NY 10001",
      items: 3, 
      total: "$259.97", 
      status: "Delivered",
      date: "2025-10-25",
      orderItems: [
        { id: "1", name: "Classic White Shirt", quantity: 2, price: 49.99, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400" },
        { id: "2", name: "Blue Denim Jeans", quantity: 1, price: 79.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
      ]
    },
    { 
      id: "ORD-002", 
      customer: "Jane Smith", 
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      address: "456 Oak Ave, Los Angeles, CA 90001",
      items: 1, 
      total: "$49.99", 
      status: "Processing",
      date: "2025-10-28",
      orderItems: [
        { id: "3", name: "Graphic T-Shirt", quantity: 1, price: 49.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
      ]
    },
    { 
      id: "ORD-003", 
      customer: "Bob Johnson", 
      email: "bob@example.com",
      phone: "+1 234 567 8902",
      address: "789 Pine Rd, Chicago, IL 60601",
      items: 5, 
      total: "$459.95", 
      status: "Shipped",
      date: "2025-10-27",
      orderItems: [
        { id: "4", name: "Sneakers Pro", quantity: 2, price: 129.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
        { id: "5", name: "Cargo Shorts", quantity: 3, price: 39.99, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
      ]
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "default";
      case "Processing":
        return "secondary";
      case "Shipped":
        return "outline";
      case "Cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.status);
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = () => {
    if (!selectedOrder) return;

    setOrders(orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: updatedStatus }
        : order
    ));

    toast({
      title: "Status Updated",
      description: `Order ${selectedOrder.id} status updated to ${updatedStatus}`,
    });

    setIsDialogOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-card">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="bg-black text-yellow-400 hover:bg-black/90 hover:text-yellow-300" />
                <h1 className="text-2xl font-bold text-primary">Orders Management</h1>
              </div>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </header>

          <main className="flex-1 px-4 py-8">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Track and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewOrder(order)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Package className="w-6 h-6" />
              Order Details - {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription>
              Order placed on {selectedOrder?.date}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{selectedOrder.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Shipping Address</Label>
                    <p className="font-medium">{selectedOrder.address}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Order Summary */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Total Amount</h3>
                <p className="text-2xl font-bold text-primary">{selectedOrder.total}</p>
              </div>

              <Separator />

              {/* Order Status Update */}
              <div>
                <Label htmlFor="status" className="text-base font-semibold">Update Order Status</Label>
                <Select value={updatedStatus} onValueChange={setUpdatedStatus}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={handleUpdateStatus}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default AdminOrders;

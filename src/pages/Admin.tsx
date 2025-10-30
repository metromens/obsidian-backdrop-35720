import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import authCharacter from "@/assets/auth-character.png";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const ADMIN_EMAIL = "admin@techverse.com";
  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
      // Navigate to admin dashboard
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      console.log("Admin login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Character Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-accent/10 items-center justify-center p-12">
        <div className="max-w-md animate-fade-in">
          <img 
            src={authCharacter} 
            alt="Admin Character" 
            className="w-full h-auto hover-scale"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">
              Welcome to <span className="text-primary">Admin Panel</span>
            </h1>
            <p className="text-muted-foreground">Sign in to continue managing</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;

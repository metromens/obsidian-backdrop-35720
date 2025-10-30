import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Sparkles, Mail, Lock, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import authAvatar from "@/assets/auth-avatar.png";
import authSignupAvatar from "@/assets/auth-signup-avatar.png";

const AuthDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Login feature coming soon!");
      setIsSubmitting(false);
      setIsOpen(false);
      setFocusedField("");
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Signup feature coming soon!");
      setIsSubmitting(false);
      setIsOpen(false);
      setFocusedField("");
    }, 1000);
  };

  const getCharacterAnimation = () => {
    if (isSubmitting) return "animate-celebrate-jump";
    if (focusedField === "email") return "animate-head-turn-right";
    if (focusedField === "password") return "animate-typing-hands";
    if (focusedField === "name") return "animate-excited-greeting";
    return "transition-transform duration-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:text-accent hover:scale-110 transition-all duration-300">
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden border-0 shadow-glow bg-background animate-scale-in">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 rounded-full hover:bg-accent/10 hover:text-accent transition-all duration-200 hover:scale-110"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="grid md:grid-cols-2 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float [animation-delay:1s] pointer-events-none" />
          
          {/* Left side - Image */}
          <div className="hidden md:flex items-center justify-center relative bg-gradient-to-br from-accent/5 via-accent/10 to-primary/5 p-8 lg:p-12 overflow-hidden" style={{ perspective: "1000px" }}>
            <div className="absolute inset-0 bg-gradient-shine bg-[length:200%_100%] animate-shimmer" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            
            {/* Decorative sparkles */}
            <Sparkles className="absolute top-8 right-8 w-6 h-6 text-accent animate-pulse" />
            <Sparkles className="absolute bottom-12 left-8 w-4 h-4 text-accent/60 animate-pulse [animation-delay:0.5s]" />
            <Sparkles className="absolute top-1/2 right-12 w-5 h-5 text-accent/40 animate-pulse [animation-delay:1s]" />
            
            <div className="w-full max-w-sm lg:max-w-md relative z-10">
              <img 
                key={activeTab}
                src={activeTab === "signup" ? authSignupAvatar : authAvatar} 
                alt="Metro Men's Fashion Character" 
                className={`w-full h-auto object-contain transition-all duration-700 ease-out drop-shadow-2xl filter ${getCharacterAnimation()} ${
                  activeTab === "signup" ? "scale-105 brightness-110" : "scale-100"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="p-8 md:p-12 flex flex-col relative z-10 bg-background/80 backdrop-blur-sm">
            <DialogHeader className="space-y-4 mb-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-8 bg-gradient-premium rounded-full animate-pulse" />
                <DialogTitle className="text-center text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-shimmer">
                  Metro Men's
                </DialogTitle>
                <div className="w-1 h-8 bg-gradient-premium rounded-full animate-pulse [animation-delay:0.5s]" />
              </div>
              <p className="text-center text-muted-foreground text-sm font-medium">
                {activeTab === "login" ? "✨ Sign in to continue your shopping journey" : "🎉 Create an account to get started"}
              </p>
            </DialogHeader>
            <Tabs defaultValue="login" className="w-full mt-6 flex-1 flex flex-col" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 h-14 bg-gradient-to-r from-muted/80 to-muted/60 backdrop-blur-sm p-1.5 rounded-xl shadow-smooth border border-border/50">
                <TabsTrigger 
                  value="login" 
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-hover data-[state=active]:scale-[1.02] transition-all duration-300 font-semibold data-[state=active]:text-primary"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-hover data-[state=active]:scale-[1.02] transition-all duration-300 font-semibold data-[state=active]:text-primary"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex-1 mt-8 animate-fade-in">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-3 group">
                    <Label htmlFor="login-email" className="text-sm font-bold flex items-center gap-2 text-foreground">
                      <Mail className="w-4 h-4 text-accent" />
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        className="h-12 pl-4 pr-4 transition-all duration-300 focus:scale-[1.02] focus:shadow-hover border-2 focus:border-accent/50 rounded-xl bg-background/50 backdrop-blur-sm font-medium"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-shine bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="login-password" className="text-sm font-bold flex items-center gap-2 text-foreground">
                      <Lock className="w-4 h-4 text-accent" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input 
                        id="login-password" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField("")}
                        className="h-12 pl-4 pr-4 transition-all duration-300 focus:scale-[1.02] focus:shadow-hover border-2 focus:border-accent/50 rounded-xl bg-background/50 backdrop-blur-sm font-medium"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-shine bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </div>
                  <div className="pt-3">
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-base font-bold bg-gradient-premium hover:opacity-90 shadow-premium hover:shadow-glow transition-all duration-300 hover:scale-[1.02] rounded-xl relative overflow-hidden group" 
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          <>
                            <User className="w-5 h-5" />
                            Login to Your Account
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-shine bg-[length:200%_100%] animate-shimmer" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="signup" className="flex-1 mt-8 animate-fade-in">
                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-3 group">
                    <Label htmlFor="signup-name" className="text-sm font-bold flex items-center gap-2 text-foreground">
                      <UserCircle className="w-4 h-4 text-accent" />
                      Full Name
                    </Label>
                    <div className="relative">
                      <Input 
                        id="signup-name" 
                        type="text" 
                        placeholder="John Doe" 
                        required 
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField("")}
                        className="h-12 pl-4 pr-4 transition-all duration-300 focus:scale-[1.02] focus:shadow-hover border-2 focus:border-accent/50 rounded-xl bg-background/50 backdrop-blur-sm font-medium"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-shine bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="signup-email" className="text-sm font-bold flex items-center gap-2 text-foreground">
                      <Mail className="w-4 h-4 text-accent" />
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="you@example.com" 
                        required 
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        className="h-12 pl-4 pr-4 transition-all duration-300 focus:scale-[1.02] focus:shadow-hover border-2 focus:border-accent/50 rounded-xl bg-background/50 backdrop-blur-sm font-medium"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-shine bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="signup-password" className="text-sm font-bold flex items-center gap-2 text-foreground">
                      <Lock className="w-4 h-4 text-accent" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input 
                        id="signup-password" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField("")}
                        className="h-12 pl-4 pr-4 transition-all duration-300 focus:scale-[1.02] focus:shadow-hover border-2 focus:border-accent/50 rounded-xl bg-background/50 backdrop-blur-sm font-medium"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-shine bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                  </div>
                  <div className="pt-3">
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-base font-bold bg-gradient-to-r from-accent via-accent to-gold hover:opacity-90 text-accent-foreground shadow-premium hover:shadow-glow transition-all duration-300 hover:scale-[1.02] rounded-xl relative overflow-hidden group" 
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Create Your Account
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-shine bg-[length:200%_100%] animate-shimmer" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;

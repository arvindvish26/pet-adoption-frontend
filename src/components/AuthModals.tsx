import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Phone, Heart, MapPin, Globe } from 'lucide-react';

interface AuthModalsProps {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  onLoginClose: () => void;
  onRegisterClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

const AuthModals: React.FC<AuthModalsProps> = ({
  isLoginOpen,
  isRegisterOpen,
  onLoginClose,
  onRegisterClose,
  onSwitchToRegister,
  onSwitchToLogin,
}) => {
  const { login, register } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(loginData.username, loginData.password);
      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        onLoginClose();
        setLoginData({ username: '', password: '' });
      } else {
        toast({
          title: "Login Failed",
          description: result.error || "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.password_confirm) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (registerData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(registerData);
      if (result.success) {
        toast({
          title: "Account created!",
          description: "Welcome to PetMate! You've been automatically logged in.",
        });
        onRegisterClose();
        setRegisterData({
          username: '',
          email: '',
          password: '',
          password_confirm: '',
          first_name: '',
          last_name: '',
          phone: '',
          address: '',
          city: '',
          country: '',
        });
      } else {
        toast({
          title: "Registration Failed",
          description: result.error || "Registration failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={onLoginClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center">
              <Heart className="h-5 w-5 text-primary" />
              Welcome Back to PetMate
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="login-username">Username or Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="login-username"
                  type="text"
                  placeholder="Enter your username or email"
                  className="pl-10"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-hero"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-primary hover:text-primary-glow font-medium"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={isRegisterOpen} onOpenChange={onRegisterClose}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center">
              <Heart className="h-5 w-5 text-primary" />
              Join the PetMate Family
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="register-firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-firstName"
                    placeholder="First name"
                    className="pl-10"
                    value={registerData.first_name}
                    onChange={(e) => setRegisterData({ ...registerData, first_name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="register-lastName">Last Name</Label>
                <Input
                  id="register-lastName"
                  placeholder="Last name"
                  value={registerData.last_name}
                  onChange={(e) => setRegisterData({ ...registerData, last_name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="register-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value, username: e.target.value.toLowerCase() })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="register-phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="(+91) 9876543210"
                  className="pl-10"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="register-address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="register-address"
                  placeholder="Street address"
                  className="pl-10"
                  value={registerData.address}
                  onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="register-city">City</Label>
                <Input
                  id="register-city"
                  placeholder="City"
                  value={registerData.city}
                  onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-country">Country</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-country"
                    placeholder="Country"
                    className="pl-10"
                    value={registerData.country}
                    onChange={(e) => setRegisterData({ ...registerData, country: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="register-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className="pl-10 pr-10"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="register-confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="register-confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="pl-10"
                  value={registerData.password_confirm}
                  onChange={(e) => setRegisterData({ ...registerData, password_confirm: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-hero"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-primary hover:text-primary-glow font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModals;
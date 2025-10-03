import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import PetCard from '@/components/PetCard';
import AccessoryCard from '@/components/AccessoryCard';
import AuthModals from '@/components/AuthModals';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pet, Accessory } from '@/lib/mockData';
import { fetchPetsApi, fetchAccessoriesApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Search, Filter, Star, Users, Award, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-pets.jpg';

const Index = () => {
  const [petFilter, setPetFilter] = useState('all');
  const [accessoryFilter, setAccessoryFilter] = useState('all');
  const [petSearchQuery, setPetSearchQuery] = useState('');
  const [accessorySearchQuery, setAccessorySearchQuery] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  const { data: pets = [], isLoading: petsLoading } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const resp = await fetchPetsApi({ status: 'Available' });
      // DRF returns paginated by default if configured; handle both cases
      const results = Array.isArray(resp) ? resp : resp.results ?? [];
      // Map to UI Pet type if needed
      const mapped: Pet[] = results.map((p: any) => ({
        id: String(p.id),
        name: p.name,
        breed: p.breed,
        age: String(p.age) + ' years',
        size: 'Medium',
        gender: 'Male',
        description: `${p.name} the ${p.breed} in ${p.city}.`,
        image: p.image || 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop',
        adoptionFee: 0,
        vaccinated: !!p.vaccinated,
        neutered: true,
        goodWithKids: true,
        goodWithPets: true,
      }));
      return mapped;
    },
  });

  const { data: accessories = [], isLoading: accessoriesLoading } = useQuery({
    queryKey: ['accessories'],
    queryFn: async () => {
      const resp = await fetchAccessoriesApi({ in_stock: 'true' });
      const results = Array.isArray(resp) ? resp : resp.results ?? [];
      const mapped: Accessory[] = results.map((a: any) => ({
        id: String(a.id),
        name: a.name,
        category: 'Toys',
        price: Number(a.price),
        image: a.image || 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=300&fit=crop',
        description: a.description || '',
        rating: 4.5,
        inStock: (a.stock ?? 0) > 0,
      }));
      return mapped;
    },
  });

  const filteredPets = pets.filter((pet: Pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(petSearchQuery.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(petSearchQuery.toLowerCase());
    const matchesFilter = petFilter === 'all' || pet.size.toLowerCase() === petFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredAccessories = accessories.filter((accessory: Accessory) => {
    const matchesSearch = accessory.name.toLowerCase().includes(accessorySearchQuery.toLowerCase()) ||
                         accessory.description.toLowerCase().includes(accessorySearchQuery.toLowerCase());
    const matchesFilter = accessoryFilter === 'all' || accessory.category === accessoryFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative max-w-6xl mx-auto text-center text-primary-foreground">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-primary-glow">Furry Companion</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            Give a loving home to pets in need and discover everything you need for their care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 shadow-warm font-semibold"
            >
              <Heart className="h-5 w-5 mr-2" />
              Start Adopting Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
            >
              Learn About Pet Care
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { icon: Heart, label: 'Pets Adopted', value: '2,450+' },
              { icon: Users, label: 'Happy Families', value: '1,800+' },
              { icon: Award, label: 'Years of Service', value: '15+' },
              { icon: CheckCircle, label: 'Success Rate', value: '98%' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary-glow" />
                <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Search and Filter Section */}
      <section className="py-8 px-4 bg-background/50 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-4">Find Your Perfect Pet</h3>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pets by name or breed..."
                value={petSearchQuery}
                onChange={(e) => setPetSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex gap-2">
              <Select value={petFilter} onValueChange={setPetFilter}>
                <SelectTrigger className="w-40 bg-background">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Pet Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Pets Section */}
      <section id="pets" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Pets</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every pet deserves a loving home. Browse our available pets and find your perfect match.
            </p>
          </div>
          
          {petsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <PetCard 
              key={pet.id} 
              pet={pet} 
              onLoginRequired={() => setIsLoginOpen(true)} 
            />
          ))}
            </div>
          )}
          
          {filteredPets.length === 0 && !petsLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pets found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Accessories Section */}
      <section id="accessories" className="py-16 px-4 bg-background/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4">Pet Accessories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything your new companion needs to be happy, healthy, and comfortable.
            </p>
          </div>
          
          {/* Accessory Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accessories..."
                value={accessorySearchQuery}
                onChange={(e) => setAccessorySearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex gap-2">
              <Select value={accessoryFilter} onValueChange={setAccessoryFilter}>
                <SelectTrigger className="w-40 bg-background">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Toys">Toys</SelectItem>
                  <SelectItem value="Beds">Beds</SelectItem>
                  <SelectItem value="Collars">Collars</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Grooming">Grooming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {accessoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-40 bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                    <div className="h-3 bg-muted rounded w-1/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAccessories.map((accessory) => (
                <AccessoryCard key={accessory.id} accessory={accessory} />
              ))}
            </div>
          )}
          
          {filteredAccessories.length === 0 && !accessoriesLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No accessories found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-primary-glow p-2 rounded-lg">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold">PawHeart</h3>
          </div>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Connecting loving families with pets in need. Every adoption makes a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/about" className="hover:text-primary-glow transition-colors">About Us</Link>
            <Link to="/adoption-process" className="hover:text-primary-glow transition-colors">Adoption Process</Link>
            <Link to="/pet-care-tips" className="hover:text-primary-glow transition-colors">Pet Care Tips</Link>
            <Link to="/contact" className="hover:text-primary-glow transition-colors">Contact</Link>
            <Link to="/support" className="hover:text-primary-glow transition-colors">Support</Link>
          </div>
          <p className="text-primary-foreground/60 text-sm mt-6">
            © 2024 PawHeart Pet Adoption. Made with ❤️ for our furry friends.
          </p>
        </div>
      </footer>

      <CartDrawer>
        <div></div>
      </CartDrawer>
      
      <AuthModals
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onRegisterClose={() => setIsRegisterOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};

export default Index;

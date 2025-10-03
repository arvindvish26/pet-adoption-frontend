import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pet } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import AdoptionModal from '@/components/AdoptionModal';
import { Heart, MapPin, Calendar, DollarSign, CheckCircle } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  onLoginRequired: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onLoginRequired }) => {
  const { isAuthenticated } = useAuth();
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);

  const handleAdoptClick = () => {
    if (!isAuthenticated) {
      onLoginRequired();
      return;
    }
    setIsAdoptionModalOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-warm transition-all duration-300 hover:scale-[1.02] group bg-card">
        <div className="relative overflow-hidden">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/90 text-foreground">
              {pet.size}
            </Badge>
          </div>
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary text-primary-foreground">
              ${pet.adoptionFee}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-foreground">{pet.name}</h3>
            <Heart className="h-5 w-5 text-muted-foreground hover:text-primary hover:fill-current transition-all cursor-pointer" />
          </div>
          
          <p className="text-muted-foreground text-sm mb-3">
            {pet.breed} • {pet.gender}
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{pet.age}</span>
          </div>

          <p className="text-sm text-foreground mb-4 line-clamp-2">
            {pet.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {pet.vaccinated && (
              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                <CheckCircle className="h-3 w-3 mr-1" />
                Vaccinated
              </Badge>
            )}
            {pet.neutered && (
              <Badge variant="outline" className="text-xs bg-accent/20 text-accent-dark border-accent">
                Neutered
              </Badge>
            )}
            {pet.goodWithKids && (
              <Badge variant="outline" className="text-xs bg-secondary text-secondary-dark border-secondary-dark">
                Good with Kids
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAdoptClick}
            className="w-full bg-gradient-hero hover:shadow-warm transition-all duration-300 font-semibold"
          >
            <Heart className="h-4 w-4 mr-2" />
            {isAuthenticated ? 'Start Adoption Process' : 'Sign In to Adopt'}
          </Button>
        </CardFooter>
      </Card>

      <AdoptionModal
        isOpen={isAdoptionModalOpen}
        onClose={() => setIsAdoptionModalOpen(false)}
        pet={pet}
        onLoginRequired={onLoginRequired}
      />
    </>
  );
};

export default PetCard;
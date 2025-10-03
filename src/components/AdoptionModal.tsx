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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pet } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Heart, Home, Users, MapPin, Calendar, DollarSign } from 'lucide-react';
import { adoptPetApi } from '@/lib/api';

interface AdoptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet | null;
  onLoginRequired: () => void;
}

interface AdoptionFormData {
  experience: string;
  livingSituation: string;
  otherPets: string;
  reasonForAdoption: string;
  schedule: string;
  emergencyContact: string;
  emergencyPhone: string;
  agreeToTerms: boolean;
  agreeToVisit: boolean;
}

const AdoptionModal: React.FC<AdoptionModalProps> = ({
  isOpen,
  onClose,
  pet,
  onLoginRequired,
}) => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<AdoptionFormData>({
    experience: '',
    livingSituation: '',
    otherPets: '',
    reasonForAdoption: '',
    schedule: '',
    emergencyContact: '',
    emergencyPhone: '',
    agreeToTerms: false,
    agreeToVisit: false,
  });

  const handleInputChange = (field: keyof AdoptionFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      onLoginRequired();
      return;
    }

    if (!formData.agreeToTerms || !formData.agreeToVisit) {
      toast({
        title: "Please agree to terms",
        description: "You must agree to the terms and home visit to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Call backend adopt endpoint
      await adoptPetApi(pet!.id);
      
      toast({
        title: "Adoption successful!",
        description: `You adopted ${pet?.name}. We'll contact you with next steps.`,
      });

      // Reset form and close modal
      setFormData({
        experience: '',
        livingSituation: '',
        otherPets: '',
        reasonForAdoption: '',
        schedule: '',
        emergencyContact: '',
        emergencyPhone: '',
        agreeToTerms: false,
        agreeToVisit: false,
      });
      onClose();
      
    } catch (error) {
      toast({
        title: "Adoption failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  if (!pet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Adopt {pet.name}
          </DialogTitle>
        </DialogHeader>

        {/* Pet Summary */}
        <Card className="border-primary/20 bg-gradient-warm/50">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{pet.name}</h3>
                  <Badge className="bg-primary text-primary-foreground">
                    ${pet.adoptionFee}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {pet.breed} • {pet.gender} • {pet.age} • {pet.size}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {pet.vaccinated && (
                    <Badge variant="outline" className="text-xs bg-success/10 text-success">
                      Vaccinated
                    </Badge>
                  )}
                  {pet.neutered && (
                    <Badge variant="outline" className="text-xs bg-accent/20 text-accent-dark">
                      Neutered
                    </Badge>
                  )}
                  {pet.goodWithKids && (
                    <Badge variant="outline" className="text-xs">
                      Good with Kids
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {!isAuthenticated && (
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Please log in to submit an adoption request
              </p>
              <Button onClick={onLoginRequired} variant="outline">
                Login to Continue
              </Button>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience Section */}
          <div>
            <Label htmlFor="experience">Pet Experience</Label>
            <Textarea
              id="experience"
              placeholder="Tell us about your experience with pets (previous pets, training, etc.)"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              required
              disabled={!isAuthenticated}
            />
          </div>

          {/* Living Situation */}
          <div>
            <Label htmlFor="livingSituation">Living Situation</Label>
            <Textarea
              id="livingSituation"
              placeholder="Describe your home (house/apartment, yard, other residents, etc.)"
              value={formData.livingSituation}
              onChange={(e) => handleInputChange('livingSituation', e.target.value)}
              required
              disabled={!isAuthenticated}
            />
          </div>

          {/* Other Pets */}
          <div>
            <Label htmlFor="otherPets">Current Pets</Label>
            <Textarea
              id="otherPets"
              placeholder="Do you have other pets? Please describe them and how they get along with new animals."
              value={formData.otherPets}
              onChange={(e) => handleInputChange('otherPets', e.target.value)}
              disabled={!isAuthenticated}
            />
          </div>

          {/* Reason for Adoption */}
          <div>
            <Label htmlFor="reasonForAdoption">Why do you want to adopt {pet.name}?</Label>
            <Textarea
              id="reasonForAdoption"
              placeholder="What draws you to this specific pet? What are you looking for in a companion?"
              value={formData.reasonForAdoption}
              onChange={(e) => handleInputChange('reasonForAdoption', e.target.value)}
              required
              disabled={!isAuthenticated}
            />
          </div>

          {/* Schedule */}
          <div>
            <Label htmlFor="schedule">Daily Schedule</Label>
            <Textarea
              id="schedule"
              placeholder="Describe your daily routine and how you'll care for your pet (work schedule, exercise time, etc.)"
              value={formData.schedule}
              onChange={(e) => handleInputChange('schedule', e.target.value)}
              required
              disabled={!isAuthenticated}
            />
          </div>

          {/* Emergency Contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              <Input
                id="emergencyContact"
                placeholder="Full name"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                required
                disabled={!isAuthenticated}
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                required
                disabled={!isAuthenticated}
              />
            </div>
          </div>

          <Separator />

          {/* Agreements */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', !!checked)}
                disabled={!isAuthenticated}
              />
              <Label htmlFor="agreeToTerms" className="text-sm">
                I agree to the adoption terms and understand that adoption fees help cover medical care, food, and shelter operations.
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToVisit"
                checked={formData.agreeToVisit}
                onCheckedChange={(checked) => handleInputChange('agreeToVisit', !!checked)}
                disabled={!isAuthenticated}
              />
              <Label htmlFor="agreeToVisit" className="text-sm">
                I consent to a home visit as part of the adoption process to ensure a safe environment for the pet.
              </Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-hero"
              disabled={!isAuthenticated || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Adoption Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdoptionModal;

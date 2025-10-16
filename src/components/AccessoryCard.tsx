import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accessory } from '@/lib/mockData';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Star, ShoppingCart, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/currency';

interface AccessoryCardProps {
  accessory: Accessory;
  onLoginRequired?: () => void;
}

const AccessoryCard: React.FC<AccessoryCardProps> = ({ accessory, onLoginRequired }) => {
  const { addItem, openCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!accessory.inStock) return;
    
    addItem(accessory, onLoginRequired);
  };

  const handleBuyNow = () => {
    if (!accessory.inStock) return;
    
    addItem(accessory, () => {
      if (onLoginRequired) {
        onLoginRequired();
      }
    });
    openCart();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Card className="overflow-hidden hover:shadow-card transition-all duration-300 hover:scale-[1.02] group">
      <div className="relative overflow-hidden">
        <img
          src={accessory.image}
          alt={accessory.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant="secondary" 
            className="bg-background/90"
          >
            {accessory.category}
          </Badge>
        </div>
        {!accessory.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
          {accessory.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          {renderStars(accessory.rating)}
          <span className="text-xs text-muted-foreground ml-1">
            ({accessory.rating})
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {accessory.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatPrice(accessory.price, accessory.currency)}
          </span>
          {accessory.inStock ? (
            <Badge variant="outline" className="text-xs bg-success/10 text-success">
              <Package className="h-3 w-3 mr-1" />
              In Stock
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            disabled={!accessory.inStock}
            className="hover:bg-accent hover:text-accent-dark transition-all"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
          <Button
            size="sm"
            onClick={handleBuyNow}
            disabled={!accessory.inStock}
            className="bg-gradient-hero hover:shadow-soft transition-all"
          >
            Buy Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AccessoryCard;
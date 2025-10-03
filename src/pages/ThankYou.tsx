import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, Mail } from 'lucide-react';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-warm text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-success" />
          </div>
          <CardTitle className="text-2xl text-success">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-lg font-semibold mb-2">Thank you for your purchase!</p>
            <p className="text-muted-foreground">
              Your order has been confirmed and will be processed shortly. 
              You'll receive a confirmation email with tracking information.
            </p>
          </div>
          
          <div className="bg-gradient-nature/10 p-4 rounded-lg border">
            <div className="flex items-center justify-center mb-2">
              <Mail className="h-5 w-5 text-accent-dark mr-2" />
              <span className="font-medium">Order Confirmation</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Check your email for order details and tracking information.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Need help? Contact our support team for assistance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;
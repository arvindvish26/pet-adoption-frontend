import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-card text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <XCircle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl text-destructive">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-lg font-semibold mb-2">Transaction Unsuccessful</p>
            <p className="text-muted-foreground">
              We were unable to process your payment. This could be due to insufficient funds, 
              incorrect card details, or a temporary issue with your payment provider.
            </p>
          </div>
          
          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
            <div className="flex items-center justify-center mb-2">
              <HelpCircle className="h-5 w-5 text-destructive mr-2" />
              <span className="font-medium">Common Solutions</span>
            </div>
            <ul className="text-sm text-muted-foreground text-left space-y-1">
              <li>• Check your card details and try again</li>
              <li>• Ensure you have sufficient funds</li>
              <li>• Try a different payment method</li>
              <li>• Contact your bank if issues persist</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/checkout')} 
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/')} 
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shopping
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Need assistance? Our customer support team is here to help.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailed;
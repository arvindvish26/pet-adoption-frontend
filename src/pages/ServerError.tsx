import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw, Mail } from 'lucide-react';

const ServerError = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-card text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl text-destructive">Server Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-lg font-semibold mb-2">Something went wrong</p>
            <p className="text-muted-foreground">
              We're experiencing technical difficulties on our end. 
              Our team has been notified and is working to resolve the issue.
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg border">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="font-medium">Error Code: 500</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Internal Server Error - Please try again in a few minutes
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleRefresh} 
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/')} 
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </Button>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                If this problem persists, please contact support:
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary hover:text-primary-glow"
              >
                <Mail className="h-4 w-4 mr-2" />
                support@petadoption.com
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerError;
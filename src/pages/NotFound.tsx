import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-card text-center">
        <CardHeader>
          <div className="mx-auto mb-4 text-6xl">🐾</div>
          <CardTitle className="text-2xl text-foreground">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-lg font-semibold mb-2">Oops! This page has wandered off</p>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist. It might have been moved, 
              deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg border">
            <div className="flex items-center justify-center mb-2">
              <Search className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="font-medium">Error 404</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Page not found: {location.pathname}
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-hero"
            >
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Looking for pets to adopt? Head back to our homepage!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;

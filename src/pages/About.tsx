import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Paw Paradise
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting loving families with pets in need since 2015. Our mission is to find forever homes for every rescued animal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe every pet deserves a loving home. Through our comprehensive adoption program, 
                  we rescue, rehabilitate, and rehome abandoned and surrendered pets while educating the 
                  community about responsible pet ownership.
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-secondary">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Compassionate care for all animals</li>
                  <li>Transparent adoption process</li>
                  <li>Lifetime support for adopters</li>
                  <li>Community education and outreach</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
                <div className="text-muted-foreground">Pets Adopted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">98%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">8</div>
                <div className="text-muted-foreground">Years of Service</div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-muted-foreground mb-4">
                Founded in 2015 by animal lovers Sarah Johnson and Mark Chen, Paw Paradise began as a small 
                rescue operation in their backyard. What started with helping just a few stray cats has grown 
                into a full-service adoption center serving the entire metropolitan area.
              </p>
              <p className="text-muted-foreground mb-4">
                Today, our dedicated team of volunteers and staff work tirelessly to provide medical care, 
                behavioral training, and loving temporary homes for hundreds of animals each year. We partner 
                with local veterinarians, training professionals, and other rescue organizations to ensure 
                every pet receives the care they need.
              </p>
              <p className="text-muted-foreground">
                We're proud to be a no-kill shelter, meaning every healthy and treatable pet that comes through 
                our doors will find a loving home, no matter how long it takes.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, FileText, Home } from "lucide-react";

const AdoptionProcess = () => {
  const steps = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Browse & Connect",
      description: "Browse our available pets and find one that captures your heart. Each pet profile includes photos, personality details, and care requirements.",
      timeframe: "15-30 minutes"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Submit Application",
      description: "Complete our adoption application with information about your lifestyle, experience, and what you're looking for in a pet companion.",
      timeframe: "30-45 minutes"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Review & Interview",
      description: "Our adoption team reviews your application and conducts a brief interview to ensure the perfect match for both you and your chosen pet.",
      timeframe: "1-3 days"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Meet & Adopt",
      description: "Visit our facility to meet your pet, complete the adoption paperwork, and take your new family member home!",
      timeframe: "1-2 hours"
    }
  ];

  const requirements = [
    "Must be 18 years or older",
    "Valid government-issued ID",
    "Proof of residence (lease agreement or utility bill)",
    "Landlord permission if renting",
    "Veterinary references for current/previous pets",
    "All household members must meet the pet"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Adoption Process
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our simple 4-step process ensures the perfect match between pets and families. 
              We're here to guide you every step of the way.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary">Step {index + 1}</Badge>
                        <Badge variant="outline">{step.timeframe}</Badge>
                      </div>
                      <CardTitle className="text-2xl">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Adoption Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Adoption Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                    <span className="font-medium">Dogs</span>
                    <span className="text-lg font-bold text-primary">₹6,000 - ₹12,500</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                    <span className="font-medium">Cats</span>
                    <span className="text-lg font-bold text-primary">₹3,000 - ₹6,500</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/10 rounded">
                    <span className="font-medium">Small Animals</span>
                    <span className="text-lg font-bold text-primary">₹1,000 - ₹3,000</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    *Fees include spay/neuter, vaccinations, microchipping, and basic health check
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdoptionProcess;
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Utensils, Activity, Shield, Home, Users } from "lucide-react";

const PetCareTips = () => {
  const dogTips = [
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "Nutrition & Feeding",
      tips: [
        "Feed high-quality dog food appropriate for your dog's age and size",
        "Maintain consistent meal times - typically twice daily for adult dogs",
        "Avoid toxic foods like chocolate, grapes, onions, and garlic",
        "Always provide fresh, clean water"
      ]
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Exercise & Play",
      tips: [
        "Provide daily walks - at least 30 minutes for most breeds",
        "Engage in interactive play sessions with toys",
        "Consider your dog's breed and energy level for exercise needs",
        "Mental stimulation through puzzle toys and training"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Health & Grooming",
      tips: [
        "Regular veterinary checkups - annually or as recommended",
        "Keep up with vaccinations and parasite prevention",
        "Brush teeth regularly or provide dental chews",
        "Groom regularly based on coat type and length"
      ]
    }
  ];

  const catTips = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Indoor Environment",
      tips: [
        "Provide multiple litter boxes - one per cat plus one extra",
        "Create vertical spaces with cat trees and shelving",
        "Ensure access to sunny windowsills for basking",
        "Cat-proof your home by securing toxic plants and small objects"
      ]
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "Feeding & Nutrition",
      tips: [
        "Choose age-appropriate, high-quality cat food",
        "Provide fresh water daily - consider a fountain",
        "Avoid overfeeding - follow feeding guidelines",
        "Never give dogs food, chocolate, or onions to cats"
      ]
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Social & Mental Health",
      tips: [
        "Provide interactive toys and puzzle feeders",
        "Respect your cat's independence while offering affection",
        "Create quiet, safe spaces for alone time",
        "Regular play sessions to prevent boredom"
      ]
    }
  ];

  const generalTips = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Socialization",
      description: "Gradual introduction to new people, pets, and environments builds confidence and reduces anxiety."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety First",
      description: "Pet-proof your home, use proper restraints in vehicles, and ensure ID tags are current."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Love & Patience",
      description: "Building trust takes time. Be patient, consistent, and show lots of love during the adjustment period."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pet Care Tips
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Essential guidance for keeping your new companion happy, healthy, and well-adjusted in their forever home.
            </p>
          </div>

          <Tabs defaultValue="dogs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="dogs">Dogs</TabsTrigger>
              <TabsTrigger value="cats">Cats</TabsTrigger>
              <TabsTrigger value="general">General Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="dogs">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-primary mb-2">Dog Care Essentials</h2>
                  <p className="text-muted-foreground">Everything you need to know about caring for your canine companion</p>
                </div>
                <div className="grid gap-6">
                  {dogTips.map((section, index) => (
                    <Card key={index} className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-primary">
                          {section.icon}
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {section.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-3">
                              <Badge variant="default" className="mt-1 h-2 w-2 rounded-full p-0" />
                              <span className="text-muted-foreground">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cats">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-primary mb-2">Cat Care Essentials</h2>
                  <p className="text-muted-foreground">Creating the perfect environment for your feline friend</p>
                </div>
                <div className="grid gap-6">
                  {catTips.map((section, index) => (
                    <Card key={index} className="border-secondary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-primary">
                          {section.icon}
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {section.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start gap-3">
                              <Badge variant="default" className="mt-1 h-2 w-2 rounded-full p-0" />
                              <span className="text-muted-foreground">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="general">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-primary mb-2">General Pet Care</h2>
                  <p className="text-muted-foreground">Universal principles for all pet parents</p>
                </div>
                <div className="grid gap-6">
                  {generalTips.map((tip, index) => (
                    <Card key={index} className="border-accent/20">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-accent/10 p-3 rounded-full text-primary">
                            {tip.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">{tip.title}</h3>
                            <p className="text-muted-foreground">{tip.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Need More Help?</h3>
                    <p className="text-muted-foreground mb-6">
                      Our team is here to support you throughout your pet's life. Don't hesitate to reach out 
                      with questions about behavior, health, or general care.
                    </p>
                    <Badge variant="default" className="text-lg px-6 py-2">
                      Contact Our Pet Care Team
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PetCareTips;
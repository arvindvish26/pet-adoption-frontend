import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About PetMate
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting loving families with pets in need since 2025. Our mission is to find forever homes for every rescued animal.
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
                <CardTitle className="text-primary">Our Values</CardTitle>
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
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">8</div>
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
                PetMate is a community-driven animal welfare initiative developed as part of our college project. The idea was inspired by the growing need for organized pet adoption and rescue platforms in India. The project aims to create a digital system that connects animal lovers, shelters, and veterinarians under one platform to promote responsible pet care and adoption.
              </p>
              <p className="text-muted-foreground mb-4">
                Founded in 2025 by two passionate animal lovers, Sahil Rathore and Arvind Vishwakrama, PetMate began as a small effort to rescue and care for stray animals in their local neighborhood. What started with helping a few abandoned pets gradually evolved into a model of a full-fledged animal rescue and adoption organization serving urban areas across India.
              </p>
              <p className="text-muted-foreground mb-4">
                Today, the project envisions a dedicated team of volunteers and staff who provide medical care, vaccination, behavioral training, and temporary shelter to rescued animals. PetMate also aims to collaborate with local veterinarians, NGOs, and animal welfare groups to ensure that every pet receives the care and attention it deserves.
              </p>
              <p className="text-muted-foreground mb-4">
                The organization follows a no-kill policy, ensuring that every healthy and treatable animal is given a chance to find a loving and permanent home — no matter how long it takes.
              </p>
              <p className="text-muted-foreground">
                Through this project, PetMate demonstrates how technology can be integrated with compassion to make the process of animal adoption, rescue management, and pet welfare more efficient and transparent in the Indian context.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
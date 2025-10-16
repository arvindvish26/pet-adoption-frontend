import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MessageCircle, Heart, DollarSign, Users, HelpCircle } from "lucide-react";

const Support = () => {
  const supportOptions = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our adoption specialists",
      contact: "(+91) 98765 43210",
      availability: "Mon-Fri 10AM-6PM",
      color: "primary"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support", 
      description: "Get detailed answers to your questions",
      contact: "support@petmate.com",
      availability: "24-48 hour response",
      color: "primary"
    },
  ];

  const faqs = [
    {
      category: "Adoption Process",
      questions: [
        {
          question: "How long does the adoption process take?",
          answer: "Our adoption process typically takes 1-3 days from application to taking your pet home. This includes application review, interview, and meet-and-greet sessions to ensure the perfect match."
        },
        {
          question: "What if my new pet doesn't adjust well to my home?",
          answer: "We offer a 30-day adjustment period with full support. Our behavioral specialists can provide guidance, and in rare cases where it's not working out, we'll help you find a better match."
        },
        {
          question: "Can I visit pets before applying?",
          answer: "Absolutely! We encourage visits during our open hours. You can meet multiple pets and spend time with them in our socialization areas before making a decision."
        }
      ]
    },
    {
      category: "Pet Care",
      questions: [
        {
          question: "What's included in the adoption fee?",
          answer: "All pets come spayed/neutered, vaccinated, microchipped, and with a health certificate. We also provide a starter kit with food, toys, and care instructions."
        },
        {
          question: "Do you provide post-adoption support?",
          answer: "Yes! We offer lifetime support including behavioral consultation, training resources, and our 24/7 helpline for any questions about your adopted pet."
        },
        {
          question: "What if my pet gets sick after adoption?",
          answer: "We provide a 14-day health guarantee and can connect you with our partner veterinarians. We also offer discounted medical care for the first year."
        }
      ]
    },
    {
      category: "Volunteering & Donations",
      questions: [
        {
          question: "How can I volunteer at PetMate?",
          answer: "We offer various volunteer opportunities including pet care, events, fostering, and administrative support. Visit our website to fill out a volunteer application and attend orientation."
        },
        {
          question: "What items do you need for donations?",
          answer: "We always need pet food, toys, blankets, cleaning supplies, and medical supplies. Check our website for our current wish list of most needed items."
        },
        {
          question: "Can I foster a pet temporarily?",
          answer: "Yes! Our foster program helps pets who need extra care or socialization. We provide all supplies and medical care while you provide the loving temporary home."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Support Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're here to help! Find answers to common questions or get in touch with our support team.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Get Help Now</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {supportOptions.map((option, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`bg-${option.color}/10 p-3 rounded-full text-${option.color} w-fit mx-auto mb-4`}>
                      {option.icon}
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{option.description}</p>
                    <div className="space-y-2">
                      <div className="font-medium">{option.contact}</div>
                      <Badge variant="outline">{option.availability}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <HelpCircle className="w-6 h-6" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold text-primary mb-4">{category.category}</h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Heart className="w-5 h-5" />
                  Volunteer Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Questions about volunteering, fostering, or helping our mission? Our volunteer coordinator 
                  is here to help match you with the perfect opportunity.
                </p>
                <Button variant="outline" className="w-full text-primary bg-primary-foreground hover:text-primary-foreground hover:bg-primary">
                  Contact Volunteer Team
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <DollarSign className="w-5 h-5" />
                  Donation Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Want to make a donation or sponsor a pet? Our fundraising team can help you choose 
                  the best way to support our animals in need.
                </p>
                <Button variant="outline" className="w-full text-primary bg-primary-foreground hover:text-primary-foreground hover:bg-primary">
                  Donation Information
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Still Need Help?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our dedicated support team is ready to assist you 
                with any questions about adoption, pet care, or our services.
              </p>
              <Button size="lg">
                Contact Our Support Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Support;
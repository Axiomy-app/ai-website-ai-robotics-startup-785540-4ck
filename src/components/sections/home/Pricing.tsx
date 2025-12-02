'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Building2, Rocket } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_PRICING = {
  title: 'Choose Your Robotics Solution',
  subtitle: 'Flexible pricing plans designed to scale with your business needs',
  billingToggle: {
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyDiscount: 'Save 20%',
  },
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small businesses exploring automation',
      icon: 'zap',
      monthlyPrice: 299,
      yearlyPrice: 239,
      currency: '$',
      period: 'month',
      popular: false,
      features: [
        '1 AI Robot Unit',
        'Basic Task Automation',
        'Email Support',
        'Monthly Performance Reports',
        'Standard Integration APIs',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=starter',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Advanced robotics for growing enterprises',
      icon: 'building2',
      monthlyPrice: 799,
      yearlyPrice: 639,
      currency: '$',
      period: 'month',
      popular: true,
      features: [
        '5 AI Robot Units',
        'Advanced Machine Learning',
        'Priority Support & Training',
        'Real-time Analytics Dashboard',
        'Custom Integration Support',
        'Multi-location Management',
      ],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=professional',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Complete robotics ecosystem for large organizations',
      icon: 'rocket',
      monthlyPrice: 1999,
      yearlyPrice: 1599,
      currency: '$',
      period: 'month',
      popular: false,
      features: [
        'Unlimited AI Robot Units',
        'Custom AI Model Training',
        'Dedicated Success Manager',
        'Advanced Security & Compliance',
        'White-label Solutions',
        '24/7 Technical Support',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-6 w-6" />;
      case 'building2':
        return <Building2 className="h-6 w-6" />;
      case 'rocket':
        return <Rocket className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              <span data-editable="billingToggle.monthly">{config.billingToggle.monthly}</span>
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                <span data-editable="billingToggle.yearly">{config.billingToggle.yearly}</span>
              </span>
              <Badge variant="secondary" className="text-xs">
                <span data-editable="billingToggle.yearlyDiscount">
                  {config.billingToggle.yearlyDiscount}
                </span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={plan.id}
              className={`relative transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    {getIcon(plan.icon)}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
                <div className="mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">
                      <span data-editable={`plans[${idx}].currency`}>{plan.currency}</span>
                      <span
                        data-editable={`plans[${idx}].${isYearly ? 'yearlyPrice' : 'monthlyPrice'}`}
                      >
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                    </span>
                    <span className="text-muted-foreground">
                      /<span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                    </span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-muted-foreground mt-1">Billed annually</p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  size="lg"
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Need a custom solution?{' '}
            <button className="text-primary hover:underline font-medium">
              Contact our sales team
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

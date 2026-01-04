"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Star, TrendingUp, Trophy, Users, Zap } from "lucide-react";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";
import { Card, CardContent } from "~~/components/ui/card";

const Index = () => {
  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-[#E84142]" />,
      title: "Dynamic NFTs",
      description: "Player NFTs evolve with achievements, creating a living digital legacy.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#E84142]" />,
      title: "DeFi Features",
      description: "Stake tokens, invest in talent, and earn rewards through DeFi mutual funds.",
    },
    {
      icon: <Users className="w-8 h-8 text-[#E84142]" />,
      title: "Fantasy Football",
      description: "Play fantasy football with real-world talent and NFT assets.",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#E84142]" />,
      title: "Decentralized Scouting",
      description: "Get player development data/ratings from 3 sources: trainer, scout, AI.",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#E84142]" />,
      title: "Tokenized Memorabilia",
      description: "Own authentic, tradable collectibles tied to pivotal moments.",
    },
    {
      icon: <Star className="w-8 h-8 text-[#E84142]" />,
      title: "Community & Teams",
      description: "Form teams, message teammates, and participate in virtual events.",
    },
  ];

  const categories = [
    {
      name: "Prospex",
      description: "Young stars with potential, ready to shine on the global stage.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "The Unknown",
      description: "Late bloomers and hidden gems who rise from obscurity.",
      color: "from-blue-400 to-purple-500",
    },
    {
      name: "The Fallen",
      description: "Players who faced setbacks but deserve a second chance.",
      color: "from-red-400 to-pink-500",
    },
  ];

  const partners = [
    "Avalanche Academy",
    "FIFA Health",
    "Global Nutrition",
    "TechFit IoT",
    "VR Training Labs",
    "Community Sports Foundation",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0066B3]/10 to-[#E84142]/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 flex flex-col items-center justify-center gap-4">
              <Image
                src="/images/prospex-logo-light.png"
                alt="Prospex Logo"
                width={256}
                height={256}
                className="w-48 h-48 md:w-64 md:h-64 object-contain"
              />
              <h1 className="text-5xl md:text-7xl font-bold text-[#0066B3] tracking-tight">Prospex</h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto">
              Redefining Football Talent Development, Investment, and Fan Engagement
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering footballers, investors, trainers, and scouts on Avalanche—where every story matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-[#E84142] hover:bg-[#E84142]/90 text-white px-8 py-3 rounded-full text-lg"
                >
                  Sign Up / Connect Wallet
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#0066B3] text-[#0066B3] hover:bg-[#0066B3] hover:text-white px-8 py-3 rounded-full text-lg"
                >
                  Explore Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0066B3] mb-6">Project Overview</h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Prospex is a blockchain-powered platform that connects football talent with global opportunities. By
              leveraging Avalanche and dynamic NFTs, we create a transparent, inclusive ecosystem for talent discovery,
              investment, and community engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#0066B3] mb-16">Unique Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-0 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-[#0066B3] mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Player Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#0066B3] mb-16">Player Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`h-4 bg-gradient-to-r ${category.color}`} />
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[#0066B3] mb-3">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-[#0066B3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-6">Business Economy of Partners</h2>
          <p className="text-xl text-blue-100 text-center mb-12 max-w-4xl mx-auto">
            Our platform is powered by a network of partners—academies, trainers, nutritionists, medical providers, and
            tech companies—who provide essential resources and services to support footballers.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <Badge
                  variant="secondary"
                  className="text-sm px-4 py-2 bg-white/10 text-white border-white/20 rounded-full"
                >
                  {partner}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#E84142] to-[#ED1C24]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join the Future of Football?</h2>
          <p className="text-xl text-white/90 mb-8">
            Sign up today and connect your wallet to access NFTs, DeFi features, and investment opportunities.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-white text-[#E84142] hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;

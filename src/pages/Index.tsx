
import React from 'react';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Clock, BarChart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-scrum-purple/10 to-scrum-blue/10 py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-scrum-darkText mb-4">
                  Streamline Your Agile Estimations
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Efficient Scrum planning poker for distributed teams. Get consensus on task difficulty quickly and accurately.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => navigate('/create')}>
                    Create New Session
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/join')}>
                    Join Existing Session
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="relative w-[300px] h-[200px]">
                  {/* Decorative poker cards */}
                  <div className="absolute h-28 w-20 bg-white rounded-lg shadow-lg transform rotate-[-15deg] left-[60px] top-[40px] flex items-center justify-center text-2xl font-bold border border-gray-200 animate-float">
                    3
                  </div>
                  <div className="absolute h-28 w-20 bg-white rounded-lg shadow-lg transform rotate-[5deg] left-[120px] top-[20px] flex items-center justify-center text-2xl font-bold border border-gray-200 animate-float" style={{animationDelay: '0.5s'}}>
                    5
                  </div>
                  <div className="absolute h-28 w-20 bg-scrum-blue text-white rounded-lg shadow-lg transform rotate-[25deg] left-[180px] top-[50px] flex items-center justify-center text-2xl font-bold border border-gray-200 animate-float" style={{animationDelay: '1s'}}>
                    8
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Why Use Our Scrum Poker App?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-scrum-purple/10 p-3 rounded-full w-fit mb-4">
                  <Users className="h-6 w-6 text-scrum-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                <p className="text-gray-600">
                  Bring your distributed teams together with real-time voting and discussions.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-scrum-blue/10 p-3 rounded-full w-fit mb-4">
                  <Clock className="h-6 w-6 text-scrum-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Time Efficiency</h3>
                <p className="text-gray-600">
                  Move through estimations quickly with our streamlined process and built-in timers.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-scrum-purple/10 p-3 rounded-full w-fit mb-4">
                  <BarChart className="h-6 w-6 text-scrum-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Data Insights</h3>
                <p className="text-gray-600">
                  Get valuable statistics and track estimation patterns over time.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-scrum-darkPurple text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to improve your sprint planning?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get started with Scrum Poker today and make your estimations more accurate and efficient.
            </p>
            <Button size="lg" variant="default" className="bg-white text-scrum-darkPurple hover:bg-gray-100" onClick={() => navigate('/create')}>
              Start Now - It's Free
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const CreateSession = () => {
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState('');
  const [yourName, setYourName] = useState('');
  const [deckType, setDeckType] = useState('fibonacci');
  
  const handleCreateSession = () => {
    if (!sessionName.trim()) {
      toast.error("Please enter a session name");
      return;
    }
    
    if (!yourName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    // Generate a random session ID
    const sessionId = Math.random().toString(36).substring(2, 9);
    
    // In a real app, we'd store this data in a database
    // For now, we'll use localStorage for demo purposes
    const sessionData = {
      id: sessionId,
      name: sessionName,
      creator: yourName,
      deckType,
      createdAt: new Date().toISOString(),
      tasks: [],
      participants: [{ id: 'user-' + Math.random().toString(36).substring(2, 9), name: yourName }]
    };
    
    // Save to localStorage
    localStorage.setItem(`session_${sessionId}`, JSON.stringify(sessionData));
    
    toast.success("Session created successfully!");
    navigate(`/session/${sessionId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create New Session</CardTitle>
              <CardDescription>
                Start a new planning poker session for your team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionName">Session Name</Label>
                <Input
                  id="sessionName"
                  placeholder="Sprint 34 Planning"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yourName">Your Name</Label>
                <Input
                  id="yourName"
                  placeholder="John Smith"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deckType">Estimation Deck</Label>
                <select
                  id="deckType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={deckType}
                  onChange={(e) => setDeckType(e.target.value)}
                >
                  <option value="fibonacci">Fibonacci (1, 2, 3, 5, 8, 13, 21)</option>
                  <option value="tshirt">T-Shirt (XS, S, M, L, XL)</option>
                  <option value="powers">Powers of 2 (1, 2, 4, 8, 16, 32)</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/')}>Cancel</Button>
              <Button onClick={handleCreateSession}>Create Session</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateSession;

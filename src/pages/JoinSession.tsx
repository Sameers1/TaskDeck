
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

const JoinSession = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState('');
  const [yourName, setYourName] = useState('');
  
  const handleJoinSession = () => {
    if (!sessionId.trim()) {
      toast.error("Please enter a session ID");
      return;
    }
    
    if (!yourName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    // In a real app, we'd check if the session exists in the database
    // For demo purposes, we'll use localStorage
    const sessionData = localStorage.getItem(`session_${sessionId}`);
    
    if (!sessionData) {
      toast.error("Session not found. Please check the ID and try again");
      return;
    }
    
    // Add the user to the session
    const session = JSON.parse(sessionData);
    const userId = 'user-' + Math.random().toString(36).substring(2, 9);
    
    session.participants.push({
      id: userId,
      name: yourName
    });
    
    // Update session in localStorage
    localStorage.setItem(`session_${sessionId}`, JSON.stringify(session));
    
    toast.success("Successfully joined session!");
    navigate(`/session/${sessionId}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Join Existing Session</CardTitle>
              <CardDescription>
                Enter the session ID and your name to join
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionId">Session ID</Label>
                <Input
                  id="sessionId"
                  placeholder="abc123"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
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
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/')}>Cancel</Button>
              <Button onClick={handleJoinSession}>Join Session</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JoinSession;

"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  TrendingUp,
  Calendar,
  Wallet,
  Lightbulb
} from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'insight' | 'recommendation';
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI personal assistant. I can help you with financial insights, task management, scheduling, and more. What would you like to know?',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call AI API
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          userId: 'demo-user' // In real app, get from auth
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          type: data.type || 'text'
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { 
      icon: TrendingUp, 
      label: "Spending Analysis", 
      prompt: "Analyze my spending patterns this month",
      color: "text-blue-600"
    },
    { 
      icon: Wallet, 
      label: "Budget Tips", 
      prompt: "Give me tips to save money on food",
      color: "text-green-600"
    },
    { 
      icon: Calendar, 
      label: "Schedule Help", 
      prompt: "Help me plan my week",
      color: "text-purple-600"
    },
    { 
      icon: Lightbulb, 
      label: "Financial Advice", 
      prompt: "What are some good investment strategies for beginners?",
      color: "text-yellow-600"
    }
  ];

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="pb-6">
          <h1 className="text-3xl font-bold">AI Personal Assistant</h1>
          <p className="text-muted-foreground">Your intelligent companion for personal finance and productivity</p>
        </div>

        <div className="flex-1 grid gap-6 lg:grid-cols-4">
          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Conversation
                </CardTitle>
                <CardDescription>
                  Ask me anything about your finances, tasks, or schedule
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                        
                        <div className={`max-w-[80%] ${
                          message.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        } rounded-lg p-3`}>
                          {message.type === 'insight' && (
                            <Badge variant="secondary" className="mb-2">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Insight
                            </Badge>
                          )}
                          {message.type === 'recommendation' && (
                            <Badge variant="secondary" className="mb-2">
                              <Lightbulb className="w-3 h-3 mr-1" />
                              Recommendation
                            </Badge>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>

                        {message.role === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="flex gap-2 mt-4">
                  <Input
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Suggestions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => {
                      setInput(action.prompt);
                    }}
                  >
                    <action.icon className={`w-4 h-4 mr-2 ${action.color}`} />
                    <div className="text-left">
                      <p className="text-sm font-medium">{action.label}</p>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle>AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Smart Analysis</p>
                    <p className="text-xs text-muted-foreground">
                      Analyze spending patterns and provide insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Schedule Planning</p>
                    <p className="text-xs text-muted-foreground">
                      Help organize your tasks and meetings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Wallet className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Financial Advice</p>
                    <p className="text-xs text-muted-foreground">
                      Personalized tips for saving and investing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Goal Tracking</p>
                    <p className="text-xs text-muted-foreground">
                      Monitor progress towards your financial goals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from "lucide-react";

export default function FinancePage() {
  const [naturalInput, setNaturalInput] = useState("");
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Starbucks Coffee", category: "Food", amount: -75000, date: "2024-01-15", description: "Morning coffee with colleagues" },
    { id: 2, name: "Salary", category: "Income", amount: 8500000, date: "2024-01-14", description: "Monthly salary" },
    { id: 3, name: "Electric Bill", category: "Bills", amount: -250000, date: "2024-01-13", description: "PLN electricity bill" },
    { id: 4, name: "Grocery Shopping", category: "Food", amount: -320000, date: "2024-01-12", description: "Weekly groceries at Supermarket" },
    { id: 5, name: "Freelance Project", category: "Income", amount: 2000000, date: "2024-01-11", description: "Web design project" },
  ]);

  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Income", "Other"];

  const handleNaturalInput = async () => {
    if (!naturalInput.trim()) return;

    // Simulate AI processing
    console.log("Processing:", naturalInput);
    
    // Mock AI categorization
    const mockTransaction = {
      id: transactions.length + 1,
      name: naturalInput,
      category: "Food", // AI would determine this
      amount: -75000, // AI would extract this
      date: new Date().toISOString().split('T')[0],
      description: "Added via natural language"
    };

    setTransactions([mockTransaction, ...transactions]);
    setNaturalInput("");
  };

  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Financial Tracker</h1>
            <p className="text-muted-foreground">Manage your finances with AI-powered insights</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {totalBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Income: Rp {totalIncome.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+Rp {totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {transactions.filter(t => t.amount > 0).length} income sources
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">-Rp {totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {transactions.filter(t => t.amount < 0).length} expenses
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Natural Language Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI-Powered Transaction Entry
            </CardTitle>
            <CardDescription>
              Describe your transaction in natural language and let AI categorize it automatically
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., 'bought coffee for 25k at starbucks' or 'received salary 8.5 million'"
                value={naturalInput}
                onChange={(e) => setNaturalInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNaturalInput()}
                className="flex-1"
              />
              <Button onClick={handleNaturalInput}>
                <Sparkles className="w-4 h-4 mr-2" />
                Process
              </Button>
            </div>
            <div className="mt-2 flex gap-2">
              <Badge variant="outline" className="text-xs">Natural language</Badge>
              <Badge variant="outline" className="text-xs">Auto-categorization</Badge>
              <Badge variant="outline" className="text-xs">Smart extraction</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your complete transaction history</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.amount > 0 ? "bg-green-500" : "bg-red-500"
                      }`} />
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-sm text-muted-foreground">{transaction.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{transaction.category}</Badge>
                          <span className="text-xs text-muted-foreground">{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${
                        transaction.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.amount > 0 ? "+" : ""}Rp {Math.abs(transaction.amount).toLocaleString()}
                      </span>
                      {transaction.amount > 0 ? 
                        <ArrowUpRight className="w-4 h-4 text-green-600" /> :
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      }
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="income">
                {transactions.filter(t => t.amount > 0).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-sm text-muted-foreground">{transaction.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{transaction.category}</Badge>
                          <span className="text-xs text-muted-foreground">{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-600">
                        +Rp {transaction.amount.toLocaleString()}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="expenses">
                {transactions.filter(t => t.amount < 0).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-sm text-muted-foreground">{transaction.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{transaction.category}</Badge>
                          <span className="text-xs text-muted-foreground">{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-red-600">
                        -Rp {Math.abs(transaction.amount).toLocaleString()}
                      </span>
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  PieChart, 
  TrendingUp, 
  AlertTriangle,
  Target,
  Calendar,
  DollarSign
} from "lucide-react";

interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: string;
  startDate: string;
  endDate?: string;
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      category: 'Food',
      amount: 2000000,
      spent: 1600000,
      period: 'monthly',
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    },
    {
      id: '2',
      category: 'Transport',
      amount: 500000,
      spent: 350000,
      period: 'monthly',
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    },
    {
      id: '3',
      category: 'Entertainment',
      amount: 800000,
      spent: 900000,
      period: 'monthly',
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    },
    {
      id: '4',
      category: 'Bills',
      amount: 1500000,
      spent: 1200000,
      period: 'monthly',
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    },
    {
      id: '5',
      category: 'Shopping',
      amount: 1000000,
      spent: 400000,
      period: 'monthly',
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    }
  ]);

  const [newBudgetCategory, setNewBudgetCategory] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");

  const addBudget = () => {
    if (!newBudgetCategory || !newBudgetAmount) return;

    const newBudget: Budget = {
      id: Date.now().toString(),
      category: newBudgetCategory,
      amount: parseInt(newBudgetAmount),
      spent: 0,
      period: 'monthly',
      startDate: new Date().toISOString().split('T')[0]
    };

    setBudgets([...budgets, newBudget]);
    setNewBudgetCategory("");
    setNewBudgetAmount("");
  };

  const getBudgetStatus = (budget: Budget) => {
    const percentage = (budget.spent / budget.amount) * 100;
    
    if (percentage >= 100) return { status: 'over', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (percentage >= 80) return { status: 'warning', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (percentage >= 60) return { status: 'caution', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    return { status: 'good', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;

  const overBudgetCount = budgets.filter(b => b.spent > b.amount).length;
  const warningBudgetCount = budgets.filter(b => {
    const percentage = (b.spent / b.amount) * 100;
    return percentage >= 80 && percentage < 100;
  }).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Budget Management</h1>
            <p className="text-muted-foreground">Track your spending and stay within budget limits</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Budget
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {totalBudgeted.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((totalSpent / totalBudgeted) * 100).toFixed(1)}% of budget
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Rp {totalRemaining.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {totalRemaining >= 0 ? 'On track' : 'Over budget'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overBudgetCount + warningBudgetCount}</div>
              <p className="text-xs text-muted-foreground">
                {overBudgetCount} over, {warningBudgetCount} warning
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Budget */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Budget</CardTitle>
            <CardDescription>Set a budget limit for a specific category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Category (e.g., Food, Transport)"
                value={newBudgetCategory}
                onChange={(e) => setNewBudgetCategory(e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Amount (IDR)"
                value={newBudgetAmount}
                onChange={(e) => setNewBudgetAmount(e.target.value)}
                className="w-48"
              />
              <Button onClick={addBudget}>
                <Plus className="w-4 h-4 mr-2" />
                Add Budget
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Budget List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Budgets</CardTitle>
                <CardDescription>Monitor your spending against budget limits</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Budgets</TabsTrigger>
                <TabsTrigger value="warning">Needs Attention</TabsTrigger>
                <TabsTrigger value="good">On Track</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4 mt-4">
                {budgets.map((budget) => {
                  const status = getBudgetStatus(budget);
                  const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
                  
                  return (
                    <div key={budget.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${status.bgColor}`} />
                          <h3 className="font-medium">{budget.category}</h3>
                          <Badge className={status.color} variant="secondary">
                            {status.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Rp {budget.spent.toLocaleString()} / Rp {budget.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}% used</p>
                        </div>
                      </div>
                      
                      <Progress value={percentage} className="mb-2" />
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(budget.startDate).toLocaleDateString()} - {budget.endDate ? new Date(budget.endDate).toLocaleDateString() : 'Ongoing'}
                        </div>
                        <div className="flex items-center gap-1">
                          <PieChart className="w-3 h-3" />
                          {budget.period}
                        </div>
                      </div>
                      
                      {budget.spent > budget.amount && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          Over budget by Rp {(budget.spent - budget.amount).toLocaleString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="warning" className="space-y-4 mt-4">
                {budgets.filter(b => {
                  const percentage = (b.spent / b.amount) * 100;
                  return percentage >= 80;
                }).map((budget) => {
                  const status = getBudgetStatus(budget);
                  const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
                  
                  return (
                    <div key={budget.id} className="p-4 border rounded-lg border-red-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${status.bgColor}`} />
                          <h3 className="font-medium">{budget.category}</h3>
                          <Badge className={status.color} variant="secondary">
                            {status.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Rp {budget.spent.toLocaleString()} / Rp {budget.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}% used</p>
                        </div>
                      </div>
                      
                      <Progress value={percentage} className="mb-2" />
                      
                      {budget.spent > budget.amount && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          Over budget by Rp {(budget.spent - budget.amount).toLocaleString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="good" className="space-y-4 mt-4">
                {budgets.filter(b => {
                  const percentage = (b.spent / b.amount) * 100;
                  return percentage < 80;
                }).map((budget) => {
                  const status = getBudgetStatus(budget);
                  const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
                  
                  return (
                    <div key={budget.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${status.bgColor}`} />
                          <h3 className="font-medium">{budget.category}</h3>
                          <Badge className={status.color} variant="secondary">
                            {status.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Rp {budget.spent.toLocaleString()} / Rp {budget.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}% used</p>
                        </div>
                      </div>
                      
                      <Progress value={percentage} className="mb-2" />
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  CheckSquare, 
  Calendar,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your personal overview.</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 12,500,000</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp 3,200,000</div>
              <p className="text-xs text-muted-foreground">
                -12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                3 due today
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Next: Team meeting
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Starbucks Coffee", category: "Food", amount: -75000, date: "Today", trend: "down" },
                  { name: "Salary", category: "Income", amount: 8500000, date: "Yesterday", trend: "up" },
                  { name: "Electric Bill", category: "Bills", amount: -250000, date: "2 days ago", trend: "down" },
                  { name: "Grocery Shopping", category: "Food", amount: -320000, date: "3 days ago", trend: "down" },
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.trend === "up" ? "bg-green-500" : "bg-red-500"
                      }`} />
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${
                        transaction.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.trend === "up" ? "+" : ""}Rp {Math.abs(transaction.amount).toLocaleString()}
                      </span>
                      {transaction.trend === "up" ? 
                        <ArrowUpRight className="w-4 h-4 text-green-600" /> :
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      }
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions & Notifications */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Transaction
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Event
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Wallet className="w-4 h-4 mr-2" />
                  Set Budget
                </Button>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Bell className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Budget Alert</p>
                    <p className="text-xs text-muted-foreground">Food budget 80% used</p>
                    <Badge variant="secondary" className="mt-1">2 hours ago</Badge>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Meeting Reminder</p>
                    <p className="text-xs text-muted-foreground">Team meeting in 30 min</p>
                    <Badge variant="secondary" className="mt-1">30 min ago</Badge>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">AI Insight</p>
                    <p className="text-xs text-muted-foreground">Spending up 15% this week</p>
                    <Badge variant="secondary" className="mt-1">1 day ago</Badge>
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
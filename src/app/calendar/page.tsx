"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock,
  MapPin,
  Users,
  Video,
  Coffee
} from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  location?: string;
  participants?: string[];
  type: 'meeting' | 'call' | 'appointment' | 'reminder';
  description?: string;
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Team Standup',
      date: '2024-01-16',
      time: '09:00',
      duration: '30 min',
      location: 'Conference Room A',
      participants: ['John', 'Sarah', 'Mike'],
      type: 'meeting',
      description: 'Daily team sync-up'
    },
    {
      id: '2',
      title: 'Client Call',
      date: '2024-01-16',
      time: '14:00',
      duration: '1 hour',
      location: 'Zoom',
      participants: ['Client Team'],
      type: 'call',
      description: 'Project status update'
    },
    {
      id: '3',
      title: 'Doctor Appointment',
      date: '2024-01-17',
      time: '10:30',
      duration: '45 min',
      location: 'Medical Center',
      type: 'appointment',
      description: 'Regular checkup'
    },
    {
      id: '4',
      title: 'Budget Review',
      date: '2024-01-18',
      time: '15:00',
      duration: '2 hours',
      location: 'Office',
      participants: ['Finance Team'],
      type: 'meeting',
      description: 'Monthly budget analysis'
    },
    {
      id: '5',
      title: 'Coffee Break',
      date: '2024-01-19',
      time: '15:00',
      duration: '30 min',
      location: 'Café',
      type: 'reminder',
      description: 'Take a break!'
    }
  ]);

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Users;
      case 'call': return Video;
      case 'appointment': return Clock;
      case 'reminder': return Coffee;
      default: return CalendarIcon;
    }
  };

  const getMeetingTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'call': return 'bg-green-100 text-green-800';
      case 'appointment': return 'bg-purple-100 text-purple-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMeetingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return meetings.filter(meeting => meeting.date === dateStr);
  };

  const getUpcomingMeetings = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);
    
    return meetings
      .filter(meeting => {
        if (meeting.date < today) return false;
        if (meeting.date === today && meeting.time < currentTime) return false;
        return true;
      })
      .sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.time.localeCompare(b.time);
      })
      .slice(0, 5);
  };

  const todayMeetings = getMeetingsForDate(new Date());
  const upcomingMeetings = getUpcomingMeetings();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">Manage your schedule and meetings</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Event
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View your schedule and upcoming events</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                
                {/* Selected Date Events */}
                {selectedDate && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">
                      Events for {selectedDate.toLocaleDateString()}
                    </h3>
                    <div className="space-y-2">
                      {getMeetingsForDate(selectedDate).map((meeting) => {
                        const Icon = getMeetingIcon(meeting.type);
                        return (
                          <div key={meeting.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Icon className="w-4 h-4 text-muted-foreground" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-sm">{meeting.title}</p>
                                <Badge className={getMeetingTypeColor(meeting.type)} variant="secondary">
                                  {meeting.type}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {meeting.time} ({meeting.duration})
                                </div>
                                {meeting.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {meeting.location}
                                  </div>
                                )}
                              </div>
                              {meeting.description && (
                                <p className="text-xs text-muted-foreground mt-1">{meeting.description}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      
                      {getMeetingsForDate(selectedDate).length === 0 && (
                        <p className="text-center text-muted-foreground py-4">
                          No events scheduled for this date
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your events for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayMeetings.map((meeting) => {
                    const Icon = getMeetingIcon(meeting.type);
                    return (
                      <div key={meeting.id} className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{meeting.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {meeting.time} • {meeting.duration}
                          </p>
                        </div>
                        <Badge className={getMeetingTypeColor(meeting.type)} variant="secondary">
                          {meeting.type}
                        </Badge>
                      </div>
                    );
                  })}
                  
                  {todayMeetings.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No events today
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next few days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingMeetings.map((meeting) => {
                    const Icon = getMeetingIcon(meeting.type);
                    return (
                      <div key={meeting.id} className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{meeting.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(meeting.date).toLocaleDateString()} • {meeting.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {upcomingMeetings.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      No upcoming events
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  Start Video Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Set Reminder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Mail, MessageSquare, Calendar, Activity, Clock, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NotificationSettingsProps {
  onSave: () => void
  saveStatus: "idle" | "saving" | "saved" | "error"
}

export default function NotificationSettings({ onSave, saveStatus }: NotificationSettingsProps) {
  const [notificationSettings, setNotificationSettings] = useState({
    channels: {
      push: true,
      email: true,
      sms: false,
      inApp: true,
    },
    types: {
      appointments: true,
      medicationReminders: true,
      trackingReminders: true,
      systemUpdates: true,
      healthTips: true,
      communityActivity: false,
      achievements: true,
      doctorMessages: true,
    },
    frequency: "balanced",
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "07:00",
    },
    emailDigest: "daily",
    notificationVolume: 70,
  })

  const handleChannelChange = (channel: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: value,
      },
    }))
  }

  const handleTypeChange = (type: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      types: {
        ...prev.types,
        [type]: value,
      },
    }))
  }

  const handleChange = (field: string, value: any) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleQuietHoursChange = (field: string, value: any) => {
    setNotificationSettings((prev) => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [field]: value,
      },
    }))
  }

  const handleSave = () => {
    onSave()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notification Settings</h2>
        <Button variant="default" size="sm" onClick={handleSave} disabled={saveStatus === "saving"}>
          {saveStatus === "saving" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="channels" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="channels">Notification Channels</TabsTrigger>
          <TabsTrigger value="types">Notification Types</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="mt-6">
          <motion.div
            className="space-y-6"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Bell className="h-5 w-5 mr-2 text-slate-500" />
                Notification Channels
              </h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center">
                        <Bell className="h-4 w-4 mr-2 text-slate-500" />
                        Push Notifications
                      </CardTitle>
                      <Switch
                        checked={notificationSettings.channels.push}
                        onCheckedChange={(checked) => handleChannelChange("push", checked)}
                      />
                    </div>
                    <CardDescription>Receive notifications on your device</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Push notifications allow you to receive instant alerts about important updates, even when you're
                      not using the app.
                    </p>
                    {notificationSettings.channels.push && (
                      <div className="mt-4">
                        <Label className="text-sm mb-2 block">Notification Volume</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[notificationSettings.notificationVolume]}
                            max={100}
                            step={10}
                            onValueChange={(value) => handleChange("notificationVolume", value[0])}
                          />
                          <span className="text-sm font-medium w-9">{notificationSettings.notificationVolume}%</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-slate-500" />
                        Email Notifications
                      </CardTitle>
                      <Switch
                        checked={notificationSettings.channels.email}
                        onCheckedChange={(checked) => handleChannelChange("email", checked)}
                      />
                    </div>
                    <CardDescription>Receive notifications via email</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Email notifications provide a record of important updates and information about your account and
                      health tracking.
                    </p>
                    {notificationSettings.channels.email && (
                      <div className="mt-4">
                        <Label htmlFor="email-digest" className="text-sm mb-2 block">
                          Email Digest Frequency
                        </Label>
                        <Select
                          value={notificationSettings.emailDigest}
                          onValueChange={(value) => handleChange("emailDigest", value)}
                        >
                          <SelectTrigger id="email-digest">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time (Immediate)</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">Weekly Summary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-slate-500" />
                        SMS Notifications
                      </CardTitle>
                      <Switch
                        checked={notificationSettings.channels.sms}
                        onCheckedChange={(checked) => handleChannelChange("sms", checked)}
                      />
                    </div>
                    <CardDescription>Receive notifications via text message</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      SMS notifications are useful for critical alerts when you may not have internet access.
                    </p>
                    {notificationSettings.channels.sms && (
                      <div className="mt-4">
                        <Label htmlFor="phone-number" className="text-sm mb-2 block">
                          Phone Number
                        </Label>
                        <Input id="phone-number" placeholder="+1 (555) 123-4567" className="text-sm" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Standard message rates may apply
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-slate-500" />
                        In-App Notifications
                      </CardTitle>
                      <Switch
                        checked={notificationSettings.channels.inApp}
                        onCheckedChange={(checked) => handleChannelChange("inApp", checked)}
                      />
                    </div>
                    <CardDescription>Receive notifications within the app</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      In-app notifications appear in your notification center while you're using the app.
                    </p>
                    {notificationSettings.channels.inApp && (
                      <div className="mt-4 flex items-center justify-between">
                        <Label className="text-sm">Show notification badge</Label>
                        <Switch defaultChecked />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <motion.div
            className="space-y-6"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Bell className="h-5 w-5 mr-2 text-slate-500" />
                Notification Types
              </h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                      Appointment Reminders
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Notifications about upcoming doctor appointments
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.types.appointments}
                    onCheckedChange={(checked) => handleTypeChange("appointments", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-slate-500" />
                      Medication Reminders
                      <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        Important
                      </Badge>
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Reminders to take your medications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.types.medicationReminders}
                    onCheckedChange={(checked) => handleTypeChange("medicationReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-slate-500" />
                      Tracking Reminders
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Reminders to log your health data</p>
                  </div>
                  <Switch
                    checked={notificationSettings.types.trackingReminders}
                    onCheckedChange={(checked) => handleTypeChange("trackingReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-slate-500" />
                      System Updates
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Updates about new features and improvements
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.types.systemUpdates}
                    onCheckedChange={(checked) => handleTypeChange("systemUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-slate-500" />
                      Health Tips & Articles
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Educational content about eczema management
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.types.healthTips}
                    onCheckedChange={(checked) => handleTypeChange("healthTips", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-slate-500" />
                      Community Activity
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Updates from community forums and discussions
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.types.communityActivity}
                    onCheckedChange={(checked) => handleTypeChange("communityActivity", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-slate-500" />
                      Achievements & Milestones
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Notifications when you earn badges or reach goals
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.types.achievements}
                    onCheckedChange={(checked) => handleTypeChange("achievements", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <div className="space-y-0.5">
                    <Label className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-slate-500" />
                      Doctor Messages
                      <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        Important
                      </Badge>
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Messages from your healthcare providers
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.types.doctorMessages}
                    onCheckedChange={(checked) => handleTypeChange("doctorMessages", checked)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <motion.div
            className="space-y-6"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Bell className="h-5 w-5 mr-2 text-slate-500" />
                Notification Preferences
              </h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Notification Frequency</CardTitle>
                    <CardDescription>Control how often you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="minimal"
                          name="frequency"
                          value="minimal"
                          checked={notificationSettings.frequency === "minimal"}
                          onChange={() => handleChange("frequency", "minimal")}
                          ge={() => handleChange("frequency", "minimal")}
                          className="text-primary"
                        />
                        <Label htmlFor="minimal" className="text-sm font-medium">
                          Minimal - Only critical notifications
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="balanced"
                          name="frequency"
                          value="balanced"
                          checked={notificationSettings.frequency === "balanced"}
                          onChange={() => handleChange("frequency", "balanced")}
                          className="text-primary"
                        />
                        <Label htmlFor="balanced" className="text-sm font-medium">
                          Balanced - Important notifications only
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="all"
                          name="frequency"
                          value="all"
                          checked={notificationSettings.frequency === "all"}
                          onChange={() => handleChange("frequency", "all")}
                          className="text-primary"
                        />
                        <Label htmlFor="all" className="text-sm font-medium">
                          All - Receive all notifications
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Quiet Hours</CardTitle>
                      <Switch
                        checked={notificationSettings.quietHours.enabled}
                        onCheckedChange={(checked) => handleQuietHoursChange("enabled", checked)}
                      />
                    </div>
                    <CardDescription>Pause notifications during specific hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {notificationSettings.quietHours.enabled && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="quiet-start" className="text-sm">
                              Start Time
                            </Label>
                            <Input
                              id="quiet-start"
                              type="time"
                              value={notificationSettings.quietHours.start}
                              onChange={(e) => handleQuietHoursChange("start", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="quiet-end" className="text-sm">
                              End Time
                            </Label>
                            <Input
                              id="quiet-end"
                              type="time"
                              value={notificationSettings.quietHours.end}
                              onChange={(e) => handleQuietHoursChange("end", e.target.value)}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Critical notifications will still be delivered during quiet hours
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Smart Notifications</CardTitle>
                      <CardDescription>Let AI optimize your notification experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium">Adaptive Notifications</Label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Automatically adjust notification frequency based on your usage patterns
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium">Contextual Reminders</Label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Send reminders based on your location and schedule
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium">Priority Filtering</Label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Automatically prioritize important notifications
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link, Smartphone, Watch, Activity, Cloud, Plus, Loader2, Save, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface IntegrationSettingsProps {
  onSave: () => void
  saveStatus: "idle" | "saving" | "saved" | "error"
}

export default function IntegrationSettings({ onSave, saveStatus }: IntegrationSettingsProps) {
  const [addIntegrationOpen, setAddIntegrationOpen] = useState(false)

  const handleSave = () => {
    onSave()
  }

  const connectedServices = [
    {
      id: "apple-health",
      name: "Apple Health",
      icon: <Activity className="h-5 w-5 text-green-500" />,
      status: "connected",
      lastSync: "10 minutes ago",
      dataTypes: ["Activity", "Sleep", "Vitals"],
    },
    {
      id: "fitbit",
      name: "Fitbit",
      icon: <Watch className="h-5 w-5 text-blue-500" />,
      status: "connected",
      lastSync: "2 hours ago",
      dataTypes: ["Activity", "Sleep"],
    },
    {
      id: "google-fit",
      name: "Google Fit",
      icon: <Activity className="h-5 w-5 text-red-500" />,
      status: "error",
      lastSync: "Failed to sync",
      dataTypes: [],
    },
  ]

  const availableIntegrations = [
    {
      id: "samsung-health",
      name: "Samsung Health",
      icon: <Smartphone className="h-5 w-5 text-blue-500" />,
      description: "Connect with Samsung Health to sync your health data",
    },
    {
      id: "garmin",
      name: "Garmin Connect",
      icon: <Watch className="h-5 w-5 text-green-500" />,
      description: "Sync your Garmin device data",
    },
    {
      id: "withings",
      name: "Withings",
      icon: <Activity className="h-5 w-5 text-teal-500" />,
      description: "Connect with Withings smart devices",
    },
    {
      id: "oura",
      name: "Oura Ring",
      icon: <Activity className="h-5 w-5 text-purple-500" />,
      description: "Track sleep and activity with Oura Ring",
    },
    {
      id: "strava",
      name: "Strava",
      icon: <Activity className="h-5 w-5 text-orange-500" />,
      description: "Connect with Strava for activity tracking",
    },
    {
      id: "google-drive",
      name: "Google Drive",
      icon: <Cloud className="h-5 w-5 text-yellow-500" />,
      description: "Backup your data to Google Drive",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Integrations</h2>
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

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <Link className="h-5 w-5 mr-2 text-slate-500" />
              Connected Services
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage your connected health services and devices
            </p>
          </div>
          <Dialog open={addIntegrationOpen} onOpenChange={setAddIntegrationOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Integration</DialogTitle>
                <DialogDescription>Connect with health services and devices to sync your data</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {availableIntegrations.map((integration) => (
                  <button
                    key={integration.id}
                    className="flex items-center space-x-3 p-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    onClick={() => setAddIntegrationOpen(false)}
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {integration.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{integration.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{integration.description}</p>
                    </div>
                    <Plus className="h-4 w-4 text-slate-400" />
                  </button>
                ))}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddIntegrationOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        <motion.div
          className="space-y-4"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {connectedServices.map((service) => (
            <Card key={service.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base">{service.name}</CardTitle>
                      <CardDescription>
                        {service.status === "connected" ? (
                          <span className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                            Connected • Last sync: {service.lastSync}
                          </span>
                        ) : (
                          <span className="flex items-center text-red-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></span>
                            Connection error
                          </span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <Switch defaultChecked={service.status === "connected"} />
                </div>
              </CardHeader>
              <CardContent>
                {service.status === "connected" && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {service.dataTypes.map((type) => (
                        <Badge key={type} variant="outline" className="bg-slate-100 dark:bg-slate-800">
                          {type}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                        <Label className="text-xs">Sync Frequency</Label>
                        <span className="text-xs font-medium">Every 30 min</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-md">
                        <Label className="text-xs">Auto Sync</Label>
                        <Switch size="sm" defaultChecked />
                      </div>
                    </div>
                  </div>
                )}

                {service.status === "error" && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-md text-sm">
                    <p>There was an error connecting to this service. Please reconnect your account.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  {service.status === "connected" ? "Manage Data" : "Reconnect"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  Disconnect
                </Button>
              </CardFooter>
            </Card>
          ))}

          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-base">Add More Integrations</CardTitle>
              <CardDescription>Connect with more health services and devices</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mb-4">
                Enhance your health tracking by connecting with additional services and devices
              </p>
              <Button onClick={() => setAddIntegrationOpen(true)}>Browse Integrations</Button>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">Healthcare Providers</h3>
          <Separator />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Connect with Healthcare Providers</CardTitle>
              <CardDescription>Share your health data with your healthcare providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Check className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                      <p className="text-xs text-slate-500">Dermatologist • Connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <X className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Dr. Michael Chen</p>
                      <p className="text-xs text-slate-500">Primary Care • Not connected</p>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Healthcare Provider
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}


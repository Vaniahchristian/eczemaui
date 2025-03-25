"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Database, Download, Upload, Trash2, Clock, BarChart, FileText, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DataSettingsProps {
  onSave: () => void
  saveStatus: "idle" | "saving" | "saved" | "error"
}

export default function DataSettings({ onSave, saveStatus }: DataSettingsProps) {
  const [dataSettings, setDataSettings] = useState({
    autoBackup: true,
    backupFrequency: "weekly",
    dataRetention: "indefinite",
    anonymousDataSharing: true,
    healthDataSync: true,
    syncFrequency: "realtime",
    storageUsed: 65, // percentage
  })

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteText, setDeleteText] = useState("")

  const handleChange = (field: string, value: any) => {
    setDataSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    onSave()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Data Management</h2>
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

      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manage">Manage Data</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          <TabsTrigger value="privacy">Data Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="mt-6">
          <motion.div
            className="space-y-6"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Database className="h-5 w-5 mr-2 text-slate-500" />
                    Data Storage
                  </CardTitle>
                  <CardDescription>Manage your data storage and usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Used</span>
                      <span className="font-medium">{dataSettings.storageUsed}%</span>
                    </div>
                    <Progress value={dataSettings.storageUsed} className="h-2" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>0 GB</span>
                      <span>2 GB Free</span>
                      <span>5 GB Total</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                        <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Health Metrics</p>
                        <p className="text-xs text-slate-500">1.2 GB</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Documents</p>
                        <p className="text-xs text-slate-500">0.8 GB</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">History</p>
                        <p className="text-xs text-slate-500">0.5 GB</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                      <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-3">
                        <Database className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Other Data</p>
                        <p className="text-xs text-slate-500">0.2 GB</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Storage
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Data Actions</CardTitle>
                  <CardDescription>Export, import, or delete your data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>

                  <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete All Data
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete all your health data, tracking
                          history, and personal information from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="text-sm font-medium">To confirm, type "DELETE" below:</p>
                        <input
                          type="text"
                          className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md"
                          value={deleteText}
                          onChange={(e) => setDeleteText(e.target.value)}
                          placeholder="Type DELETE to confirm"
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          disabled={deleteText !== "DELETE"}
                          onClick={() => {
                            // Handle delete action
                            setDeleteConfirmOpen(false)
                            setDeleteText("")
                          }}
                        >
                          Delete All Data
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-base">Data Retention</CardTitle>
                  <CardDescription>Control how long your data is stored</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention Period</Label>
                    <Select
                      value={dataSettings.dataRetention}
                      onValueChange={(value) => handleChange("dataRetention", value)}
                    >
                      <SelectTrigger id="data-retention">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6months">6 Months</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Data older than this period will be automatically deleted
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Health Metrics</h4>
                      <Select defaultValue="indefinite">
                        <SelectTrigger>
                          <SelectValue placeholder="Select retention" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30days">30 Days</SelectItem>
                          <SelectItem value="90days">90 Days</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Activity Logs</h4>
                      <Select defaultValue="90days">
                        <SelectTrigger>
                          <SelectValue placeholder="Select retention" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30days">30 Days</SelectItem>
                          <SelectItem value="90days">90 Days</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Media & Documents</h4>
                      <Select defaultValue="1year">
                        <SelectTrigger>
                          <SelectValue placeholder="Select retention" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30days">30 Days</SelectItem>
                          <SelectItem value="90days">90 Days</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="backup" className="mt-6">
          <motion.div
            className="space-y-6"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Database className="h-5 w-5 mr-2 text-slate-500" />
                Backup & Restore
              </h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Automatic Backups</CardTitle>
                      <Switch
                        checked={dataSettings.autoBackup}
                        onCheckedChange={(checked) => handleChange("autoBackup", checked)}
                      />
                    </div>
                    <CardDescription>Regularly back up your data to the cloud</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dataSettings.autoBackup && (
                      <div className="space-y-2">
                        <Label htmlFor="backup-frequency">Backup Frequency</Label>
                        <Select
                          value={dataSettings.backupFrequency}
                          onValueChange={(value) => handleChange("backupFrequency", value)}
                        >
                          <SelectTrigger id="backup-frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="pt-2">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Last backup: <span className="font-medium">March 15, 2025, 10:30 AM</span>
                      </p>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Backup Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Restore Data</CardTitle>
                    <CardDescription>Restore your data from a backup</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Available Backups</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div>
                            <p className="text-sm font-medium">March 15, 2025</p>
                            <p className="text-xs text-slate-500">10:30 AM • 2.7 GB</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Restore
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div>
                            <p className="text-sm font-medium">March 8, 2025</p>
                            <p className="text-xs text-slate-500">9:15 AM • 2.5 GB</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Restore
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div>
                            <p className="text-sm font-medium">March 1, 2025</p>
                            <p className="text-xs text-slate-500">11:45 AM • 2.3 GB</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Restore
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Backup File
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base">Cloud Sync</CardTitle>
                    <CardDescription>Sync your health data across devices</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="health-sync" className="text-sm font-medium">
                          Health Data Sync
                        </Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Keep your health data in sync across all your devices
                        </p>
                      </div>
                      <Switch
                        id="health-sync"
                        checked={dataSettings.healthDataSync}
                        onCheckedChange={(checked) => handleChange("healthDataSync", checked)}
                      />
                    </div>

                    {dataSettings.healthDataSync && (
                      <div className="space-y-2 pt-2">
                        <Label htmlFor="sync-frequency">Sync Frequency</Label>
                        <Select
                          value={dataSettings.syncFrequency}
                          onValueChange={(value) => handleChange("syncFrequency", value)}
                        >
                          <SelectTrigger id="sync-frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="manual">Manual Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-2">Connected Devices</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">iPhone 15 Pro</p>
                              <p className="text-xs text-slate-500">Last sync: 5 minutes ago</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            Remove
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">MacBook Pro</p>
                              <p className="text-xs text-slate-500">Last sync: Just now</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            Remove
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mr-3">
                              <div className="h-2 w-2 rounded-full bg-slate-500"></div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">iPad Air</p>
                              <p className="text-xs text-slate-500">Last sync: 2 hours ago</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6">
          <motion.div
            className="space-y-6"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Database className="h-5 w-5 mr-2 text-slate-500" />
                Data Privacy
              </h3>
              <Separator />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="anonymous-data" className="text-sm font-medium">
                      Anonymous Data Sharing
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Share anonymized data to help improve eczema research and treatment
                    </p>
                  </div>
                  <Switch
                    id="anonymous-data"
                    checked={dataSettings.anonymousDataSharing}
                    onCheckedChange={(checked) => handleChange("anonymousDataSharing", checked)}
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Data Usage</CardTitle>
                    <CardDescription>Control how your data is used</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Use data for personalized recommendations</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Use data for product improvement</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Share data with healthcare providers</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Share data with third-party researchers</Label>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Data Access Log</CardTitle>
                    <CardDescription>See who has accessed your data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                        <div>
                          <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                          <p className="text-xs text-slate-500">Accessed health records • March 18, 2025</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          Details
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                        <div>
                          <p className="text-sm font-medium">You</p>
                          <p className="text-xs text-slate-500">Downloaded data export • March 15, 2025</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          Details
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                        <div>
                          <p className="text-sm font-medium">System</p>
                          <p className="text-xs text-slate-500">Automatic backup • March 15, 2025</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          Details
                        </Button>
                      </div>
                    </div>
                    <Button variant="link" size="sm" className="mt-2 px-0">
                      View Full Access Log
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Legal Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Privacy Policy
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Terms of Service
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Data Processing Agreement
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      HIPAA Compliance
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


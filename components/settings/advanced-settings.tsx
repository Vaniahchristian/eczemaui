"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Code, Terminal, Database, RefreshCw, Loader2, Save, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AdvancedSettingsProps {
  onSave: () => void
  saveStatus: "idle" | "saving" | "saved" | "error"
}

export default function AdvancedSettings({ onSave, saveStatus }: AdvancedSettingsProps) {
  const [advancedSettings, setAdvancedSettings] = useState({
    developerMode: false,
    experimentalFeatures: false,
    apiAccess: false,
    debugMode: false,
    cacheStrategy: "balanced",
    apiKey: "••••••••••••••••",
    customEndpoint: "",
  })

  const handleChange = (field: string, value: any) => {
    setAdvancedSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    onSave()
  }

  const handleClearCache = () => {
    // Simulate clearing cache
    setTimeout(() => {
      alert("Cache cleared successfully")
    }, 1000)
  }

  const handleResetApp = () => {
    // Simulate app reset
    if (confirm("Are you sure you want to reset the application? This will clear all data and settings.")) {
      alert("Application reset successfully")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced Settings</h2>
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

      <Alert variant="warning" className="bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          These settings are intended for advanced users. Incorrect configuration may affect application performance and
          stability.
        </AlertDescription>
      </Alert>

      <motion.div
        className="space-y-6"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <Settings className="h-5 w-5 mr-2 text-slate-500" />
            Developer Options
          </h3>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Developer Mode</CardTitle>
                  <Switch
                    checked={advancedSettings.developerMode}
                    onCheckedChange={(checked) => handleChange("developerMode", checked)}
                  />
                </div>
                <CardDescription>Enable advanced debugging and development tools</CardDescription>
              </CardHeader>
              <CardContent>
                {advancedSettings.developerMode && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="debug-mode" className="text-sm">
                        Debug Mode
                      </Label>
                      <Switch
                        id="debug-mode"
                        checked={advancedSettings.debugMode}
                        onCheckedChange={(checked) => handleChange("debugMode", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="log-level" className="text-sm">
                        Log Level
                      </Label>
                      <Select defaultValue="info">
                        <SelectTrigger id="log-level">
                          <SelectValue placeholder="Select log level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="error">Error</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="verbose">Verbose</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Terminal className="h-4 w-4 mr-2" />
                      Open Developer Console
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Experimental Features</CardTitle>
                  <Switch
                    checked={advancedSettings.experimentalFeatures}
                    onCheckedChange={(checked) => handleChange("experimentalFeatures", checked)}
                  />
                </div>
                <CardDescription>Enable features that are still in development</CardDescription>
              </CardHeader>
              <CardContent>
                {advancedSettings.experimentalFeatures && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">AI-Powered Recommendations</Label>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Advanced Analytics</Label>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Real-time Collaboration</Label>
                      <Switch />
                    </div>

                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      Note: Experimental features may be unstable and subject to change.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <Code className="h-5 w-5 mr-2 text-slate-500" />
            API & Integrations
          </h3>
          <Separator />

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">API Access</CardTitle>
                <Switch
                  checked={advancedSettings.apiAccess}
                  onCheckedChange={(checked) => handleChange("apiAccess", checked)}
                />
              </div>
              <CardDescription>Enable API access for third-party integrations</CardDescription>
            </CardHeader>
            <CardContent>
              {advancedSettings.apiAccess && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="api-key" className="text-sm">
                        API Key
                      </Label>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Regenerate
                      </Button>
                    </div>
                    <div className="flex">
                      <Input
                        id="api-key"
                        value={advancedSettings.apiKey}
                        readOnly
                        className="font-mono text-sm rounded-r-none"
                      />
                      <Button variant="outline" className="rounded-l-none">
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-endpoint" className="text-sm">
                      Custom API Endpoint
                    </Label>
                    <Input
                      id="custom-endpoint"
                      placeholder="https://api.example.com"
                      value={advancedSettings.customEndpoint}
                      onChange={(e) => handleChange("customEndpoint", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="webhook-url" className="text-sm">
                      Webhook URL
                    </Label>
                    <Input id="webhook-url" placeholder="https://your-service.com/webhook" />
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="api-docs">
                      <AccordionTrigger className="text-sm">View API Documentation</AccordionTrigger>
                      <AccordionContent>
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm">
                          <p className="mb-2">
                            Base URL: <code>https://api.eczemaai.com/v1</code>
                          </p>
                          <p className="mb-2">Authentication: Bearer Token</p>
                          <p>
                            For full documentation, visit our{" "}
                            <a href="#" className="text-primary underline">
                              Developer Portal
                            </a>
                            .
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <Database className="h-5 w-5 mr-2 text-slate-500" />
            System Maintenance
          </h3>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cache Management</CardTitle>
                <CardDescription>Control how the application caches data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cache-strategy" className="text-sm">
                    Cache Strategy
                  </Label>
                  <Select
                    value={advancedSettings.cacheStrategy}
                    onValueChange={(value) => handleChange("cacheStrategy", value)}
                  >
                    <SelectTrigger id="cache-strategy">
                      <SelectValue placeholder="Select cache strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aggressive">Aggressive (Maximum Performance)</SelectItem>
                      <SelectItem value="balanced">Balanced (Recommended)</SelectItem>
                      <SelectItem value="minimal">Minimal (Always Fresh Data)</SelectItem>
                      <SelectItem value="disabled">Disabled (No Caching)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" size="sm" className="w-full" onClick={handleClearCache}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Application Cache
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Application Logs</CardTitle>
                <CardDescription>View and export application logs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-32 p-2 bg-slate-50 dark:bg-slate-800 rounded-md overflow-y-auto font-mono text-xs">
                  <p className="text-slate-500">[2025-03-21 10:45:23] INFO: Application started</p>
                  <p className="text-slate-500">[2025-03-21 10:45:24] INFO: Connected to database</p>
                  <p className="text-slate-500">[2025-03-21 10:46:12] INFO: User login successful</p>
                  <p className="text-slate-500">[2025-03-21 10:47:05] INFO: Health data synced</p>
                  <p className="text-amber-500">[2025-03-21 10:48:30] WARN: API rate limit approaching</p>
                  <p className="text-slate-500">[2025-03-21 10:50:15] INFO: Settings updated</p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Export Logs
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Clear Logs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-red-200 dark:border-red-800">
              <CardHeader className="text-red-600 dark:text-red-400">
                <CardTitle className="text-base">Danger Zone</CardTitle>
                <CardDescription className="text-red-500 dark:text-red-400">
                  These actions cannot be undone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-red-200 dark:border-red-800 rounded-md">
                    <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Reset Application</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      Reset the application to its default state. All settings will be lost.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/20"
                      onClick={handleResetApp}
                    >
                      Reset Application
                    </Button>
                  </div>

                  <div className="p-4 border border-red-200 dark:border-red-800 rounded-md">
                    <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                      Export & Delete All Data
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      Export all your data and delete it from our servers.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/20"
                    >
                      Export & Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


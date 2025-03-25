"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Lock, Eye, Fingerprint, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PrivacySettingsProps {
  onSave: () => void
  saveStatus: "idle" | "saving" | "saved" | "error"
}

export default function PrivacySettings({ onSave, saveStatus }: PrivacySettingsProps) {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "followers",
    dataSharing: "minimal",
    activityTracking: true,
    locationSharing: false,
    allowSearchByEmail: true,
    allowSearchByPhone: false,
    twoFactorAuth: true,
    biometricLogin: true,
    rememberDevices: true,
    dataRetention: "1year",
    cookiePreferences: {
      necessary: true,
      functional: true,
      analytics: true,
      advertising: false,
    },
  })

  const handleChange = (field: string, value: any) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCookieChange = (field: string, value: boolean) => {
    setPrivacySettings((prev) => ({
      ...prev,
      cookiePreferences: {
        ...prev.cookiePreferences,
        [field]: value,
      },
    }))
  }

  const handleSave = () => {
    onSave()
  }

  // Calculate security score based on settings
  const calculateSecurityScore = () => {
    let score = 0

    if (privacySettings.twoFactorAuth) score += 30
    if (privacySettings.biometricLogin) score += 20
    if (privacySettings.profileVisibility === "private") score += 15
    else if (privacySettings.profileVisibility === "followers") score += 10
    if (privacySettings.dataSharing === "minimal") score += 15
    else if (privacySettings.dataSharing === "moderate") score += 5
    if (!privacySettings.locationSharing) score += 10
    if (!privacySettings.allowSearchByEmail) score += 5
    if (!privacySettings.allowSearchByPhone) score += 5

    return Math.min(score, 100)
  }

  const securityScore = calculateSecurityScore()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Privacy & Security</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-500" />
              Security Score
            </CardTitle>
            <CardDescription>Your account security level based on current settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {securityScore < 40 ? "Low" : securityScore < 70 ? "Medium" : "High"}
                </span>
                <span className="text-sm font-medium">{securityScore}%</span>
              </div>
              <Progress value={securityScore} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {securityScore < 70
                ? "Enhance your account security by enabling additional security features below."
                : "Your account security is strong. Keep up the good practices!"}
            </p>
          </CardFooter>
        </Card>

        <motion.div
          className="space-y-6 md:col-span-2"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Eye className="h-5 w-5 mr-2 text-slate-500" />
              Privacy Settings
            </h3>
            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-visibility">Profile Visibility</Label>
                <Select
                  value={privacySettings.profileVisibility}
                  onValueChange={(value) => handleChange("profileVisibility", value)}
                >
                  <SelectTrigger id="profile-visibility">
                    <SelectValue placeholder="Who can see your profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Everyone)</SelectItem>
                    <SelectItem value="followers">Followers Only</SelectItem>
                    <SelectItem value="private">Private (Only You)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-sharing">Health Data Sharing</Label>
                <RadioGroup
                  value={privacySettings.dataSharing}
                  onValueChange={(value) => handleChange("dataSharing", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <Label htmlFor="minimal" className="font-normal">
                      Minimal - Only share with your healthcare providers
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate" className="font-normal">
                      Moderate - Share anonymized data for research
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full" className="font-normal">
                      Full - Contribute to community insights (anonymized)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activity-tracking">Activity Tracking</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Allow the app to track your usage for personalized recommendations
                  </p>
                </div>
                <Switch
                  id="activity-tracking"
                  checked={privacySettings.activityTracking}
                  onCheckedChange={(checked) => handleChange("activityTracking", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="location-sharing">Location Sharing</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Allow the app to access your location for environmental factors
                  </p>
                </div>
                <Switch
                  id="location-sharing"
                  checked={privacySettings.locationSharing}
                  onCheckedChange={(checked) => handleChange("locationSharing", checked)}
                />
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-medium">Search Privacy</h4>
                <div className="flex items-center justify-between">
                  <Label htmlFor="search-email" className="text-sm">
                    Allow others to find you by email
                  </Label>
                  <Switch
                    id="search-email"
                    checked={privacySettings.allowSearchByEmail}
                    onCheckedChange={(checked) => handleChange("allowSearchByEmail", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="search-phone" className="text-sm">
                    Allow others to find you by phone number
                  </Label>
                  <Switch
                    id="search-phone"
                    checked={privacySettings.allowSearchByPhone}
                    onCheckedChange={(checked) => handleChange("allowSearchByPhone", checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Lock className="h-5 w-5 mr-2 text-slate-500" />
              Security Settings
            </h3>
            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor" className="flex items-center">
                    Two-Factor Authentication
                    <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
                      Recommended
                    </span>
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Require a verification code when logging in
                  </p>
                </div>
                <Switch
                  id="two-factor"
                  checked={privacySettings.twoFactorAuth}
                  onCheckedChange={(checked) => handleChange("twoFactorAuth", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="biometric">Biometric Login</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Use fingerprint or face recognition to log in on your devices
                  </p>
                </div>
                <Switch
                  id="biometric"
                  checked={privacySettings.biometricLogin}
                  onCheckedChange={(checked) => handleChange("biometricLogin", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="remember-devices">Remember Trusted Devices</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Stay logged in on devices you use regularly
                  </p>
                </div>
                <Switch
                  id="remember-devices"
                  checked={privacySettings.rememberDevices}
                  onCheckedChange={(checked) => handleChange("rememberDevices", checked)}
                />
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="data-retention">Data Retention Period</Label>
                <Select
                  value={privacySettings.dataRetention}
                  onValueChange={(value) => handleChange("dataRetention", value)}
                >
                  <SelectTrigger id="data-retention">
                    <SelectValue placeholder="How long to keep your data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="indefinite">Indefinitely</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This affects how long we keep your health tracking history
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="md:row-start-2 md:col-start-3"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0.8 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cookie Preferences</CardTitle>
              <CardDescription>Manage how we use cookies on this device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Necessary Cookies</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Required for the website to function</p>
                </div>
                <Switch checked={privacySettings.cookiePreferences.necessary} disabled={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Functional Cookies</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Remember your preferences</p>
                </div>
                <Switch
                  checked={privacySettings.cookiePreferences.functional}
                  onCheckedChange={(checked) => handleCookieChange("functional", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Analytics Cookies</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Help us improve our service</p>
                </div>
                <Switch
                  checked={privacySettings.cookiePreferences.analytics}
                  onCheckedChange={(checked) => handleCookieChange("analytics", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Advertising Cookies</Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Show personalized ads</p>
                </div>
                <Switch
                  checked={privacySettings.cookiePreferences.advertising}
                  onCheckedChange={(checked) => handleCookieChange("advertising", checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Reject All
              </Button>
              <Button size="sm">Accept Selected</Button>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Fingerprint className="h-4 w-4 mr-2" />
              Delete All My Data
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


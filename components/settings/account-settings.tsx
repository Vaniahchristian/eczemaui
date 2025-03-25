"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Calendar, Pencil, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface AccountSettingsProps {
  onSave: () => void
  saveStatus: "idle" | "saving" | "saved" | "error"
}

export default function AccountSettings({ onSave, saveStatus }: AccountSettingsProps) {
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    birthdate: "1990-05-15",
    bio: "Living with eczema for 15+ years. Passionate about sharing my journey and helping others manage their skin conditions effectively.",
    language: "english",
    timezone: "pacific",
    twoFactorEnabled: true,
    emailVerified: true,
    accountType: "premium",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setEditMode(false)
    onSave()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        {!editMode ? (
          <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
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
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              {editMode && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>

            <h3 className="mt-4 text-lg font-medium">{profileData.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{profileData.email}</p>

            <div className="mt-3 flex gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Premium Member
              </Badge>
              {profileData.emailVerified && (
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  Verified
                </Badge>
              )}
            </div>

            <div className="w-full mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm">Email</span>
                  </div>
                  <span className="text-sm font-medium">{profileData.emailVerified ? "Verified" : "Unverified"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm">Phone</span>
                  </div>
                  <span className="text-sm font-medium">Linked</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <span className="text-sm font-medium">May 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 space-y-6">
          <motion.div
            className="space-y-4"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-medium">Personal Information</h3>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-slate-500" />
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-slate-500" />
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                  <Input
                    id="birthdate"
                    type="date"
                    value={profileData.birthdate}
                    onChange={(e) => handleInputChange("birthdate", e.target.value)}
                    disabled={!editMode}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                disabled={!editMode}
                className="min-h-[100px]"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <h3 className="text-lg font-medium">Preferences</h3>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={profileData.language}
                  onValueChange={(value) => handleInputChange("language", value)}
                  disabled={!editMode}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Select
                  value={profileData.timezone}
                  onValueChange={(value) => handleInputChange("timezone", value)}
                  disabled={!editMode}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pacific">Pacific Time (PT)</SelectItem>
                    <SelectItem value="mountain">Mountain Time (MT)</SelectItem>
                    <SelectItem value="central">Central Time (CT)</SelectItem>
                    <SelectItem value="eastern">Eastern Time (ET)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch
                id="two-factor"
                checked={profileData.twoFactorEnabled}
                onCheckedChange={(checked) => handleInputChange("twoFactorEnabled", checked)}
                disabled={!editMode}
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <h3 className="text-lg font-medium">Account Management</h3>
            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Account Type</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {profileData.accountType === "premium"
                      ? "Premium account with all features"
                      : "Free account with limited features"}
                  </p>
                </div>
                <Badge
                  className={
                    profileData.accountType === "premium"
                      ? "bg-gradient-to-r from-violet-500 to-purple-500"
                      : "bg-slate-500"
                  }
                >
                  {profileData.accountType === "premium" ? "Premium" : "Free"}
                </Badge>
              </div>

              {profileData.accountType !== "premium" && (
                <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600">
                  Upgrade to Premium
                </Button>
              )}

              <div className="pt-2">
                <Button
                  variant="outline"
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  Deactivate Account
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


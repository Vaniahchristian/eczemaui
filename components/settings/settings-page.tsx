"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import SettingsSidebar from "@/components/settings/settings-sidebar"
import AccountSettings from "@/components/settings/account-settings"
import PrivacySettings from "@/components/settings/privacy-settings"
import NotificationSettings from "@/components/settings/notification-settings"
import AccessibilitySettings from "@/components/settings/accessibility-settings"
import DataSettings from "@/components/settings/data-settings"
import AppearanceSettings from "@/components/settings/appearance-settings"
import IntegrationSettings from "@/components/settings/integration-settings"
import AdvancedSettings from "@/components/settings/advanced-settings"
import { useIsMobile } from "@/hooks/use-mobile"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export type SettingsCategory =
  | "account"
  | "privacy"
  | "notifications"
  | "accessibility"
  | "data"
  | "appearance"
  | "integrations"
  | "advanced"

export default function SettingsPage() {
  const isMobile = useIsMobile()
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>("account")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const handleSave = () => {
    setSaveStatus("saving")
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }

  const renderSettingsContent = () => {
    switch (activeCategory) {
      case "account":
        return <AccountSettings onSave={handleSave} saveStatus={saveStatus} />
      case "privacy":
        return <PrivacySettings onSave={handleSave} saveStatus={saveStatus} />
      case "notifications":
        return <NotificationSettings onSave={handleSave} saveStatus={saveStatus} />
      case "accessibility":
        return <AccessibilitySettings onSave={handleSave} saveStatus={saveStatus} />
      case "data":
        return <DataSettings onSave={handleSave} saveStatus={saveStatus} />
      case "appearance":
        return <AppearanceSettings onSave={handleSave} saveStatus={saveStatus} />
      case "integrations":
        return <IntegrationSettings onSave={handleSave} saveStatus={saveStatus} />
      case "advanced":
        return <AdvancedSettings onSave={handleSave} saveStatus={saveStatus} />
      default:
        return <AccountSettings onSave={handleSave} saveStatus={saveStatus} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 pt-20 md:pt-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            Premium Active
          </div>
        </div>

        <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardContent className="p-0">
            {isMobile ? (
              <div className="p-4">
                <Tabs
                  defaultValue="account"
                  onValueChange={(value) => setActiveCategory(value as SettingsCategory)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    <TabsTrigger value="notifications">Alerts</TabsTrigger>
                    <TabsTrigger value="appearance">Display</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="accessibility">Access</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                    <TabsTrigger value="integrations">Connect</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderSettingsContent()}
                  </motion.div>
                </Tabs>
              </div>
            ) : (
              <div className="flex">
                <SettingsSidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
                <div className="flex-1 p-6 border-l border-slate-200 dark:border-slate-800 min-h-[80vh]">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {renderSettingsContent()}
                  </motion.div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { User, Shield, Bell, Eye, Database, Palette, Link, Settings, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SettingsCategory } from "./settings-page"

interface SettingsSidebarProps {
  activeCategory: SettingsCategory
  onCategoryChange: (category: SettingsCategory) => void
}

interface SettingsNavItem {
  id: SettingsCategory
  label: string
  icon: React.ReactNode
  description: string
}

export default function SettingsSidebar({ activeCategory, onCategoryChange }: SettingsSidebarProps) {
  const navItems: SettingsNavItem[] = [
    {
      id: "account",
      label: "Account",
      icon: <User className="h-5 w-5" />,
      description: "Manage your personal information and preferences",
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      icon: <Shield className="h-5 w-5" />,
      description: "Control your data and security settings",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      description: "Customize your notification preferences",
    },
    {
      id: "accessibility",
      label: "Accessibility",
      icon: <Eye className="h-5 w-5" />,
      description: "Adjust settings for better accessibility",
    },
    {
      id: "data",
      label: "Data Management",
      icon: <Database className="h-5 w-5" />,
      description: "Export, import, or delete your health data",
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Palette className="h-5 w-5" />,
      description: "Customize the look and feel of the app",
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: <Link className="h-5 w-5" />,
      description: "Connect with other health services and devices",
    },
    {
      id: "advanced",
      label: "Advanced",
      icon: <Settings className="h-5 w-5" />,
      description: "Advanced settings and developer options",
    },
  ]

  return (
    <div className="w-64 p-4">
      <div className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onCategoryChange(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              activeCategory === item.id
                ? "bg-primary/10 text-primary"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
            )}
          >
            <div className="flex items-center">
              <div
                className={cn(
                  "mr-3 rounded-md p-1",
                  activeCategory === item.id ? "bg-primary/20" : "bg-slate-100 dark:bg-slate-800",
                )}
              >
                {item.icon}
              </div>
              <span>{item.label}</span>
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                activeCategory === item.id ? "rotate-90 text-primary" : "text-slate-400",
              )}
            />
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <h3 className="font-medium text-sm mb-2">Need Help?</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Having trouble with settings? Our support team is here to help.
        </p>
        <a href="#" className="text-xs text-primary font-medium hover:underline">
          Contact Support
        </a>
      </div>
    </div>
  )
}


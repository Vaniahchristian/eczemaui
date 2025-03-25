"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Palette, Monitor, Moon, Sun, Layout, Check, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AppearanceSettingsProps {
  onSave: () => void
  saveStatus: "idle" | "saving" | "saved" | "error"
}

export default function AppearanceSettings({ onSave, saveStatus }: AppearanceSettingsProps) {
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    colorScheme: "default",
    fontSize: 16,
    reducedMotion: false,
    borderRadius: "medium",
    density: "comfortable",
    sidebarPosition: "left",
    customAccentColor: "#3b82f6",
  })

  const handleChange = (field: string, value: any) => {
    setAppearanceSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    onSave()
  }

  const colorSchemes = [
    { id: "default", name: "Default", colors: ["bg-blue-500", "bg-indigo-500"] },
    { id: "green", name: "Green", colors: ["bg-emerald-500", "bg-green-500"] },
    { id: "purple", name: "Purple", colors: ["bg-violet-500", "bg-purple-500"] },
    { id: "rose", name: "Rose", colors: ["bg-rose-500", "bg-pink-500"] },
    { id: "amber", name: "Amber", colors: ["bg-amber-500", "bg-yellow-500"] },
    { id: "teal", name: "Teal", colors: ["bg-teal-500", "bg-cyan-500"] },
    { id: "red", name: "Red", colors: ["bg-red-500", "bg-rose-500"] },
    { id: "custom", name: "Custom", colors: ["bg-slate-500", "bg-slate-400"] },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Appearance Settings</h2>
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

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="mt-6">
          <motion.div
            className="space-y-6"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Palette className="h-5 w-5 mr-2 text-slate-500" />
                Theme Settings
              </h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-base">Theme Mode</CardTitle>
                    <CardDescription>Choose between light, dark, or system theme</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="relative">
                        <input
                          type="radio"
                          name="theme"
                          id="light"
                          value="light"
                          checked={appearanceSettings.theme === "light"}
                          onChange={() => handleChange("theme", "light")}
                          className="sr-only"
                        />
                        <Label
                          htmlFor="light"
                          className="flex flex-col items-center space-y-2 rounded-md border-2 border-slate-200 dark:border-slate-800 p-4 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
                          data-state={appearanceSettings.theme === "light" ? "checked" : "unchecked"}
                        >
                          <div className="rounded-md bg-white border border-slate-200 p-2 w-full h-20 flex items-center justify-center">
                            <Sun className="h-8 w-8 text-amber-500" />
                          </div>
                          <span className="text-sm font-medium">Light</span>
                          {appearanceSettings.theme === "light" && (
                            <div className="absolute top-3 right-3 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </Label>
                      </div>

                      <div className="relative">
                        <input
                          type="radio"
                          name="theme"
                          id="dark"
                          value="dark"
                          checked={appearanceSettings.theme === "dark"}
                          onChange={() => handleChange("theme", "dark")}
                          className="sr-only"
                        />
                        <Label
                          htmlFor="dark"
                          className="flex flex-col items-center space-y-2 rounded-md border-2 border-slate-200 dark:border-slate-800 p-4 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
                          data-state={appearanceSettings.theme === "dark" ? "checked" : "unchecked"}
                        >
                          <div className="rounded-md bg-slate-900 border border-slate-700 p-2 w-full h-20 flex items-center justify-center">
                            <Moon className="h-8 w-8 text-slate-400" />
                          </div>
                          <span className="text-sm font-medium">Dark</span>
                          {appearanceSettings.theme === "dark" && (
                            <div className="absolute top-3 right-3 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </Label>
                      </div>

                      <div className="relative">
                        <input
                          type="radio"
                          name="theme"
                          id="system"
                          value="system"
                          checked={appearanceSettings.theme === "system"}
                          onChange={() => handleChange("theme", "system")}
                          className="sr-only"
                        />
                        <Label
                          htmlFor="system"
                          className="flex flex-col items-center space-y-2 rounded-md border-2 border-slate-200 dark:border-slate-800 p-4 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
                          data-state={appearanceSettings.theme === "system" ? "checked" : "unchecked"}
                        >
                          <div className="rounded-md bg-gradient-to-br from-white to-slate-900 border border-slate-200 p-2 w-full h-20 flex items-center justify-center">
                            <Monitor className="h-8 w-8 text-slate-600" />
                          </div>
                          <span className="text-sm font-medium">System</span>
                          {appearanceSettings.theme === "system" && (
                            <div className="absolute top-3 right-3 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-base">Color Scheme</CardTitle>
                    <CardDescription>Choose a color scheme for the application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={appearanceSettings.colorScheme}
                      onValueChange={(value) => handleChange("colorScheme", value)}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      {colorSchemes.map((scheme) => (
                        <div key={scheme.id} className="relative">
                          <RadioGroupItem value={scheme.id} id={`color-${scheme.id}`} className="sr-only" />
                          <Label
                            htmlFor={`color-${scheme.id}`}
                            className="flex flex-col items-center space-y-2 rounded-md border-2 border-slate-200 dark:border-slate-800 p-4 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
                            data-state={appearanceSettings.colorScheme === scheme.id ? "checked" : "unchecked"}
                          >
                            <div className="w-full h-10 rounded-md bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden">
                              <div className={`h-4 w-4 rounded-full ${scheme.colors[0]} mr-1`}></div>
                              <div className={`h-4 w-4 rounded-full ${scheme.colors[1]}`}></div>
                            </div>
                            <span className="text-sm font-medium">{scheme.name}</span>
                            {appearanceSettings.colorScheme === scheme.id && (
                              <div className="absolute top-3 right-3 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {appearanceSettings.colorScheme === "custom" && (
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="custom-color" className="text-sm">
                          Custom Accent Color
                        </Label>
                        <div className="flex items-center space-x-2">
                          <div
                            className="h-8 w-8 rounded-md border border-slate-200 dark:border-slate-700"
                            style={{ backgroundColor: appearanceSettings.customAccentColor }}
                          ></div>
                          <input
                            type="color"
                            id="custom-color"
                            value={appearanceSettings.customAccentColor}
                            onChange={(e) => handleChange("customAccentColor", e.target.value)}
                            className="h-8 w-full"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-base">Theme Preview</CardTitle>
                    <CardDescription>See how your theme settings look</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`p-6 rounded-md border border-slate-200 dark:border-slate-700 ${
                        appearanceSettings.theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
                      }`}
                    >
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium">Sample Content</h4>
                        <p className="text-sm">
                          This is how your content will appear with the selected theme settings.
                        </p>
                        <div className="flex space-x-2">
                          <Button
                            style={
                              appearanceSettings.colorScheme === "custom"
                                ? { backgroundColor: appearanceSettings.customAccentColor }
                                : {}
                            }
                          >
                            Primary Button
                          </Button>
                          <Button variant="outline">Secondary Button</Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="preview-switch" defaultChecked />
                          <Label htmlFor="preview-switch">Toggle Setting</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="layout" className="mt-6">
          <motion.div
            className="space-y-6"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Layout className="h-5 w-5 mr-2 text-slate-500" />
                Layout Settings
              </h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Sidebar Position</CardTitle>
                    <CardDescription>Choose where the sidebar appears</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="radio"
                          name="sidebar"
                          id="left"
                          value="left"
                          checked={appearanceSettings.sidebarPosition === "left"}
                          onChange={() => handleChange("sidebarPosition", "left")}
                          className="sr-only"
                        />
                        <Label
                          htmlFor="left"
                          className="flex flex-col items-center space-y-2 rounded-md border-2 border-slate-200 dark:border-slate-800 p-4 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
                          data-state={appearanceSettings.sidebarPosition === "left" ? "checked" : "unchecked"}
                        >
                          <div className="w-full h-20 rounded-md bg-slate-100 dark:bg-slate-800 flex overflow-hidden">
                            <div className="w-1/4 h-full bg-slate-300 dark:bg-slate-700"></div>
                            <div className="w-3/4 h-full"></div>
                          </div>
                          <span className="text-sm font-medium">Left</span>
                          {appearanceSettings.sidebarPosition === "left" && (
                            <div className="absolute top-3 right-3 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </Label>
                      </div>

                      <div className="relative">
                        <input
                          type="radio"
                          name="sidebar"
                          id="right"
                          value="right"
                          checked={appearanceSettings.sidebarPosition === "right"}
                          onChange={() => handleChange("sidebarPosition", "right")}
                          className="sr-only"
                        />
                        <Label
                          htmlFor="right"
                          className="flex flex-col items-center space-y-2 rounded-md border-2 border-slate-200 dark:border-slate-800 p-4 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer"
                          data-state={appearanceSettings.sidebarPosition === "right" ? "checked" : "unchecked"}
                        >
                          <div className="w-full h-20 rounded-md bg-slate-100 dark:bg-slate-800 flex overflow-hidden">
                            <div className="w-3/4 h-full"></div>
                            <div className="w-1/4 h-full bg-slate-300 dark:bg-slate-700"></div>
                          </div>
                          <span className="text-sm font-medium">Right</span>
                          {appearanceSettings.sidebarPosition === "right" && (
                            <div className="absolute top-3 right-3 h-5 w-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Density</CardTitle>
                    <CardDescription>Control the spacing between elements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={appearanceSettings.density}
                      onValueChange={(value) => handleChange("density", value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="compact" />
                        <Label htmlFor="compact" className="font-normal">
                          Compact - Less space between elements
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="comfortable" />
                        <Label htmlFor="comfortable" className="font-normal">
                          Comfortable - Default spacing
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="spacious" id="spacious" />
                        <Label htmlFor="spacious" className="font-normal">
                          Spacious - More space between elements
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Border Radius</CardTitle>
                    <CardDescription>Control the roundness of UI elements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={appearanceSettings.borderRadius}
                      onValueChange={(value) => handleChange("borderRadius", value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="none" id="none" />
                        <Label htmlFor="none" className="font-normal">
                          None - Square corners
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="small" />
                        <Label htmlFor="small" className="font-normal">
                          Small - Slightly rounded corners
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="font-normal">
                          Medium - Default rounded corners
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="large" />
                        <Label htmlFor="large" className="font-normal">
                          Large - Very rounded corners
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Font Size</CardTitle>
                    <CardDescription>Adjust the base font size</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="font-size">Base Font Size: {appearanceSettings.fontSize}px</Label>
                      </div>
                      <Slider
                        id="font-size"
                        min={12}
                        max={20}
                        step={1}
                        value={[appearanceSettings.fontSize]}
                        onValueChange={(value) => handleChange("fontSize", value[0])}
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Small</span>
                        <span>Default</span>
                        <span>Large</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div
                        className="p-3 border border-slate-200 dark:border-slate-700 rounded-md"
                        style={{ fontSize: `${appearanceSettings.fontSize}px` }}
                      >
                        <p>This is sample text at {appearanceSettings.fontSize}px.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <motion.div
            className="space-y-6"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Palette className="h-5 w-5 mr-2 text-slate-500" />
                Advanced Settings
              </h3>
              <Separator />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduced-motion" className="text-sm font-medium">
                      Reduced Motion
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Minimize animations and transitions</p>
                  </div>
                  <Switch
                    id="reduced-motion"
                    checked={appearanceSettings.reducedMotion}
                    onCheckedChange={(checked) => handleChange("reducedMotion", checked)}
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Custom CSS</CardTitle>
                    <CardDescription>Add your own custom CSS styles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      className="w-full h-32 p-3 text-sm font-mono bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md"
                      placeholder=":root { --custom-color: #ff0000; }"
                    ></textarea>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Custom CSS will override default styles. Use with caution.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Apply Custom CSS</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Reset Appearance</CardTitle>
                    <CardDescription>Reset all appearance settings to default</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                      This will reset all theme, layout, and advanced settings to their default values.
                    </p>
                    <Button variant="outline" className="w-full">
                      Reset to Defaults
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, Type, MousePointer, VolumeX, Volume2, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AccessibilitySettingsProps {
  onSave: () => void
  saveStatus: "idle" | "saving" | "saved" | "error"
}

export default function AccessibilitySettings({ onSave, saveStatus }: AccessibilitySettingsProps) {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    textSize: "medium",
    contrastMode: "normal",
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    autoplay: false,
    cursorSize: 1,
    soundEffects: true,
    soundVolume: 70,
    readingGuide: false,
    focusHighlight: true,
    dyslexiaFont: false,
    colorBlindMode: "none",
  })

  const handleChange = (field: string, value: any) => {
    setAccessibilitySettings((prev) => ({
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
        <h2 className="text-2xl font-bold">Accessibility Settings</h2>
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
        <motion.div
          className="space-y-6 md:col-span-2"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Eye className="h-5 w-5 mr-2 text-slate-500" />
              Visual Settings
            </h3>
            <Separator />

            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="text-size" className="text-sm font-medium">
                  Text Size
                </Label>
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4 text-slate-500" />
                  <Slider
                    id="text-size"
                    min={0}
                    max={4}
                    step={1}
                    value={[
                      accessibilitySettings.textSize === "smallest"
                        ? 0
                        : accessibilitySettings.textSize === "small"
                          ? 1
                          : accessibilitySettings.textSize === "medium"
                            ? 2
                            : accessibilitySettings.textSize === "large"
                              ? 3
                              : 4,
                    ]}
                    onValueChange={(value) => {
                      const sizeMap = ["smallest", "small", "medium", "large", "largest"]
                      handleChange("textSize", sizeMap[value[0]])
                    }}
                  />
                  <Type className="h-6 w-6 text-slate-500" />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Smaller</span>
                  <span>Default</span>
                  <span>Larger</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Contrast Mode</Label>
                <RadioGroup
                  value={accessibilitySettings.contrastMode}
                  onValueChange={(value) => handleChange("contrastMode", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal" className="font-normal">
                      Normal contrast
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="font-normal">
                      High contrast
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inverted" id="inverted" />
                    <Label htmlFor="inverted" className="font-normal">
                      Inverted colors
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Color Blind Mode</Label>
                <Select
                  value={accessibilitySettings.colorBlindMode}
                  onValueChange={(value) => handleChange("colorBlindMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select color blind mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="protanopia">Protanopia (Red-Blind)</SelectItem>
                    <SelectItem value="deuteranopia">Deuteranopia (Green-Blind)</SelectItem>
                    <SelectItem value="tritanopia">Tritanopia (Blue-Blind)</SelectItem>
                    <SelectItem value="achromatopsia">Achromatopsia (No Color)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="cursor-size" className="text-sm font-medium">
                  Cursor Size
                </Label>
                <div className="flex items-center space-x-2">
                  <MousePointer className="h-4 w-4 text-slate-500" />
                  <Slider
                    id="cursor-size"
                    min={1}
                    max={3}
                    step={1}
                    value={[accessibilitySettings.cursorSize]}
                    onValueChange={(value) => handleChange("cursorSize", value[0])}
                  />
                  <MousePointer className="h-6 w-6 text-slate-500" />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Normal</span>
                  <span>Large</span>
                  <span>Extra Large</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion" className="text-sm font-medium">
                    Reduced Motion
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Minimize animations and transitions</p>
                </div>
                <Switch
                  id="reduced-motion"
                  checked={accessibilitySettings.reducedMotion}
                  onCheckedChange={(checked) => handleChange("reducedMotion", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dyslexia-font" className="text-sm font-medium">
                    Dyslexia-Friendly Font
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Use a font designed for readers with dyslexia
                  </p>
                </div>
                <Switch
                  id="dyslexia-font"
                  checked={accessibilitySettings.dyslexiaFont}
                  onCheckedChange={(checked) => handleChange("dyslexiaFont", checked)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Volume2 className="h-5 w-5 mr-2 text-slate-500" />
              Audio Settings
            </h3>
            <Separator />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-effects" className="text-sm font-medium">
                    Sound Effects
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Play sounds for notifications and interactions
                  </p>
                </div>
                <Switch
                  id="sound-effects"
                  checked={accessibilitySettings.soundEffects}
                  onCheckedChange={(checked) => handleChange("soundEffects", checked)}
                />
              </div>

              {accessibilitySettings.soundEffects && (
                <div className="space-y-3">
                  <Label htmlFor="sound-volume" className="text-sm font-medium">
                    Sound Volume
                  </Label>
                  <div className="flex items-center space-x-2">
                    <VolumeX className="h-4 w-4 text-slate-500" />
                    <Slider
                      id="sound-volume"
                      min={0}
                      max={100}
                      step={10}
                      value={[accessibilitySettings.soundVolume]}
                      onValueChange={(value) => handleChange("soundVolume", value[0])}
                    />
                    <Volume2 className="h-5 w-5 text-slate-500" />
                    <span className="text-sm font-medium w-9">{accessibilitySettings.soundVolume}%</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoplay" className="text-sm font-medium">
                    Autoplay Media
                  </Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Automatically play videos and audio</p>
                </div>
                <Switch
                  id="autoplay"
                  checked={accessibilitySettings.autoplay}
                  onCheckedChange={(checked) => handleChange("autoplay", checked)}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0.8 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Assistive Technology</CardTitle>
              <CardDescription>Settings for screen readers and other assistive devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="screen-reader" className="text-sm font-medium">
                    Screen Reader Support
                  </Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Optimize for screen readers</p>
                </div>
                <Switch
                  id="screen-reader"
                  checked={accessibilitySettings.screenReader}
                  onCheckedChange={(checked) => handleChange("screenReader", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="keyboard-nav" className="text-sm font-medium">
                    Keyboard Navigation
                  </Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Enhanced keyboard shortcuts</p>
                </div>
                <Switch
                  id="keyboard-nav"
                  checked={accessibilitySettings.keyboardNavigation}
                  onCheckedChange={(checked) => handleChange("keyboardNavigation", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="focus-highlight" className="text-sm font-medium">
                    Focus Highlighting
                  </Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Highlight focused elements</p>
                </div>
                <Switch
                  id="focus-highlight"
                  checked={accessibilitySettings.focusHighlight}
                  onCheckedChange={(checked) => handleChange("focusHighlight", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reading-guide" className="text-sm font-medium">
                    Reading Guide
                  </Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Show a guide line when reading</p>
                </div>
                <Switch
                  id="reading-guide"
                  checked={accessibilitySettings.readingGuide}
                  onCheckedChange={(checked) => handleChange("readingGuide", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preview</CardTitle>
              <CardDescription>See how your settings look</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`p-4 rounded-md border ${
                  accessibilitySettings.contrastMode === "high"
                    ? "bg-white text-black border-black"
                    : accessibilitySettings.contrastMode === "inverted"
                      ? "bg-black text-white border-white"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                }`}
                style={{
                  fontSize:
                    accessibilitySettings.textSize === "smallest"
                      ? "0.75rem"
                      : accessibilitySettings.textSize === "small"
                        ? "0.875rem"
                        : accessibilitySettings.textSize === "medium"
                          ? "1rem"
                          : accessibilitySettings.textSize === "large"
                            ? "1.125rem"
                            : "1.25rem",
                  fontFamily: accessibilitySettings.dyslexiaFont ? "'Open Dyslexic', sans-serif" : "inherit",
                }}
              >
                <h4 className="font-medium mb-2">Sample Text</h4>
                <p className="mb-2">This is how your content will appear with the current settings.</p>
                <Button size="sm">Sample Button</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Accessibility Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                We are committed to ensuring our platform is accessible to all users. If you encounter any accessibility
                issues, please contact our support team.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View Full Accessibility Statement
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


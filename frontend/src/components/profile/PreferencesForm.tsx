import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/stores/useThemeStore";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const PreferencesForm = () => {
  const { isDark, toggleTheme } = useThemeStore();

  //các bạn cần handle logic setOnlineStatus
  const [onlineStatus, setOnlineStatus] = useState(false);

  return (
    <Card className="glass-strong border-border/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-primary" />
          App Preferences
        </CardTitle>
        <CardDescription>Personalize your chat experience</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Dark mode  */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="theme-toggle" className="text-base font-medium">
              Dark Mode
            </Label>
            <p className="text-sm text-muted-foreground">
              Change Dark and Light Mode
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              id="theme-toggle"
              checked={isDark}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-primary-glow"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Online Status  */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="online-status" className="text-base font-medium">
              Display online status
            </Label>
            <p className="text-sm text-muted-foreground">
              Accept another see you when you online
            </p>
          </div>
          <Switch
            id="online-status"
            checked={onlineStatus}
            onCheckedChange={setOnlineStatus}
            className="data-[state=checked]:bg-primary-glow"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesForm;

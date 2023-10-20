import { Button, useTheme } from "@rneui/themed";
import { useThemeMode } from '@rneui/themed';
import CustomIcon from "./CustomIcon";

export default function ToggleMode() {
  const themeColors = useTheme().theme.colors;
  const { mode, setMode } = useThemeMode();

  function IconNode() {
    return (
            <CustomIcon 
              name={mode === 'dark' ? "moon-waxing-crescent": "white-balance-sunny"} 
              size={24}
              style={{color: themeColors.primary, backgroundColor: themeColors.background}}
            />
    )
  }

  return (
          <Button 
            onPress={() => setMode(mode === 'dark' ? 'light' : 'dark')} 
            buttonStyle={{backgroundColor: themeColors.background}}
            icon={<IconNode />}
            raised={false}
          />
        ) 
}
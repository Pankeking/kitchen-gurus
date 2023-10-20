import { Button } from "@rneui/themed";
import { useThemeMode } from '@rneui/themed';

export default function ToggleMode() {
  const { mode, setMode } = useThemeMode();
  return <Button onPress={() => setMode(mode === 'dark' ? 'light' : 'dark')} title={mode} />;
}
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { useTheme } from '@rneui/themed';
import { CustomIcon } from '../../components/themedCustom';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof CustomIcon>['name'];
  color: string;
}) {
  const themeColors = useTheme().theme.colors
  return <CustomIcon size={28} style={{ marginBottom: -3, color: themeColors.lightText }} {...props} />;
}

export default function TabLayout() {
  const themeColors = useTheme().theme.colors;

  return (
    <Tabs
      screenOptions={{
        headerStyle: {backgroundColor: themeColors.background},
        headerTintColor: themeColors.lightText,
        tabBarActiveTintColor: themeColors.primary,
        tabBarStyle: {backgroundColor: themeColors.surface},
        tabBarLabelStyle: {fontSize: 12, fontWeight: "bold"}
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarBadge: "99+",
          title: 'Home',
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => <TabBarIcon 
                                              name={focused ? "home-variant" : "home-variant-outline"} 
                                              color={themeColors.primary} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={themeColors.primary}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: "Profile",
          
          tabBarIcon: ({ focused }) => <TabBarIcon 
                                              name={focused ? "account-circle" : "account-circle-outline"} 
                                              color={themeColors.primary} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => <TabBarIcon 
                                              name={focused ? "cog" : "cog-outline"} 
                                              color={themeColors.primary} />,
        }}
      />
    </Tabs>
  );
}

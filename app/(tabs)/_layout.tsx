
import { Tabs } from 'expo-router';

import { useTheme } from '@rneui/themed';
import { CustomIcon } from '../../components/themedCustom';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof CustomIcon>['name'];
  color?: string;
}) {
  const themeColors = useTheme().theme.colors
  return <CustomIcon size={28} style={{ marginBottom: -3, color: themeColors.lightText }} {...props} />;
}

export default function TabLayout() {
  const themeColors = useTheme().theme.colors;

  return (
    <Tabs
      screenOptions={{
        headerStyle: {backgroundColor: themeColors.surface},
        headerTintColor: themeColors.lightText,
        tabBarActiveTintColor: themeColors.primary,
        tabBarStyle: {backgroundColor: themeColors.surface},
        tabBarLabelStyle: {fontSize: 12, fontWeight: "bold"},

      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarBadge: "99+",
          title: 'Home',
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? "home-variant" : "home-variant-outline"} />,
        }}
      />
      <Tabs.Screen 
        name="search"
        options={{
          href: "/search",
          headerShown: false,
          title: 'Search',
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? "magnify-expand" : "magnify-scan"}/>,
        }}
      />

      <Tabs.Screen 
        name="buttonToAdd"
        options={{
          title: 'Add',
          tabBarIcon: () => <CustomIcon
                                  size={35}
                                  style={{backgroundColor: themeColors.surface}} 
                                  name="plus-circle-outline" />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: "Profile",
          
          tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? "account-circle" : "account-circle-outline"} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? "cog" : "cog-outline"} />,
        }}
      />
      

      
    </Tabs>
  );
}

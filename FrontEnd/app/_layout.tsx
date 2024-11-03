import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider, MD3LightTheme as DefaultTheme, useTheme } from "react-native-paper";
import * as CustomTheme from "./CustomTheme.json";
import { View } from "react-native";

const theme = {
  ...DefaultTheme,
  colors: CustomTheme.colors,
  spacing: (factor: number) => 4 * factor,
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingTop: theme.spacing(4),
        }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </PaperProvider>
  );
}

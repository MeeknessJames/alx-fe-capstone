import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="/" />
      <Stack.Screen name="join" />
      <Stack.Screen name="signin" />
      <Stack.Screen
        name="(home)/profile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

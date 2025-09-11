import "../styles/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="join" />
        <Stack.Screen name="signin" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

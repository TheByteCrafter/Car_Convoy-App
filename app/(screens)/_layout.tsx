import { Stack } from 'expo-router';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function ScreensLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingTop: 0,
        },
      }}>

        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
        <Stack.Screen name="editprofile" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>

  )
}
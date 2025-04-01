import React from 'react';
import { Stack } from 'expo-router';
import ProfileScreen from '@/components/screens/ProfileScreen';

export default function ProfilePage() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      <ProfileScreen />
    </>
  );
} 
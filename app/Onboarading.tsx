import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const Onboarading = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Oops!' }} />
      
      <Text>Onboarading</Text>
    </View>
  )
}

export default Onboarading;

const styles = StyleSheet.create({
    
});
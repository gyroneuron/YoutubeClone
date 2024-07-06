import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const upload = () => {
  return (
    <SafeAreaView className="flex-1 bg-dark-black-100 dark:bg-black h-full w-full items-center justify-center"> 
        <View className="flex-1 items-center justify-center">
            <Text className="text-blue-500 font-bold">Upload Screen</Text>
        </View>
    </SafeAreaView>
  )
}

export default upload;
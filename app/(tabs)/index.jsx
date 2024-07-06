import { View,FlatList,Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import TopBar from '../../components/TopBar';
import TagsBar from '../../components/TagsBar';

const home = () => {

  const data = [];
  return (
    <SafeAreaView className="flex-1 dark:bg-dark-black-600 h-full w-full items-center justify-start">
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => {
              return (
                <View className="w-full h-[92]">
                  <TopBar/>
                  <TagsBar/>
                </View>
              )
            }}
          />
    </SafeAreaView>
  )
}

export default home
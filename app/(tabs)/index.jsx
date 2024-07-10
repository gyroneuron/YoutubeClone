import { View, FlatList, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import TopBar from '../../components/TopBar';
import TagsBar from '../../components/TagsBar';
import VideoCard from '../../components/VideoCard';
import CustomButton from '../../components/CustomButton';
import { supabase } from '../../utils/supabase';
import { fetchVideos } from '../../utils/useSupabase';

const Home = () => {
  // Fixing state initialization error
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchVideos = async (tableName) => {
      try {
  
        const { data, error } = await supabase
          .from(tableName)
          .select();
  
        if (error) {
          Alert.alert('Error fetching Videos', error.message);
        } else {
          setVideoData(data);
        }
      } catch (error) {
        console.log(error);
      }
  };


  fetchVideos('videos');
  }, []);

  

  return (
    <SafeAreaView className="h-full w-full flex-1 bg-dark-black-100 dark:bg-dark-black-600 items-center justify-center">
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => {
          return (
            <View className="w-full h-24">
              <TopBar />
              <TagsBar />
            </View>
          );
        }}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 h-[600] w-[90%] items-center justify-center self-center">
            <Text className="font-Rbold text-dark-black-100 text-3xl">No Videos on Youtube</Text>
            <Text className="font-Rmedium text-dark-black-300 text-xl">Be the first one to upload a video</Text>
            <CustomButton name={'Fetch Videos'} textstyle={'text-lg font-Rbold'} handlePress={() => fetchVideos('videos')} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default Home;

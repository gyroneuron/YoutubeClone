import {
  SafeAreaView,
  Image,
  StatusBar,
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import VideoCard from "../components/VideoCard";
import Tag from "../components/Tag";
import { supabase } from "../utils/supabase";
import { VideoView, useVideoPlayer } from "expo-video";

const VideoPlayback = () => {
  const [otherVideos, setOtherVideos] = useState([]);
  const ref = useRef(null);
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const video = useLocalSearchParams();
  // console.log(video);

  const player = useVideoPlayer(video.video_url, (player) => {
    player.loop = true;
  });

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  const timestamp = new Date(video.created_at);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase.from("videos").select().orderBy('', { ascending: false });;

        if (error) {
          Alert.alert("Error fetching Videos", error.message);
        } else {
          console.log("Success", "Videos fetched successfully");
          setOtherVideos(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <SafeAreaView className="h-full bg-dark-black-100 dark:bg-dark-black-600 items-center justify-center">
      <StatusBar barStyle={"light-content"} />
      <View className="justify-center items-center w-full h-[240] bg-white">
        <VideoView
          className="w-full h-full flex-1"
          ref={ref}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          nativeControls
          showsTimecodes
          contentFit="contain"
        />
      </View>
      <FlatList
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
        data={otherVideos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => {
          return (
            <View className="h-[310] w-full self-center bg-dark-black-100 dark:bg-dark-black-600 items-center justify-start space-y-3">
              <View className="h-[60] w-full items-start justify-start p-3">
                <Text className=" font-Rbold text-lg text-dark-black-100 text-left">
                  {video.title}
                </Text>
                <Text className=" font-Rmedium text-xs text-dark-black-400">
                  Uploaded: {""}
                  {timeAgo(timestamp)}
                </Text>
              </View>
              <View className="h-[48] w-full flex-row items-center justify-center">
                <View className="h-full w-full flex-[1.2] items-center justify-center">
                  <Image
                    className="h-10 w-10 rounded-full"
                    source={{ uri: video.avatar }}
                    resizeMode="contain"
                  />
                </View>
                <View className="h-full w-full flex-[7] items-center justify-between flex-row px-1 pr-4">
                  <View className="flex-row space-x-2 items-center justify-center">
                    <Text className="font-Rbold text-base text-dark-black-100">
                      {video.creator}
                    </Text>
                    <Text className="font-Rmedium text-sm text-dark-black-400 self-end">
                      93.1K
                    </Text>
                  </View>
                  <TouchableOpacity className="h-[33] px-4 items-center justify-center bg-white rounded-3xl">
                    <Text className="font-Rbold text-black text-xs">
                      Subscribe
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView
                className="w-full"
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <Tag
                  name={"Like"}
                  icon={require("../assets/icons/PNG/Like.png")}
                  icon2={require("../assets/icons/PNG/Dislike.png")}
                />
                <Tag
                  name={"Share"}
                  icon={require("../assets/icons/PNG/Share.png")}
                />
                <Tag
                  name={"Download"}
                  icon={require("../assets/icons/PNG/Download.png")}
                />
                <Tag
                  name={"Remix"}
                  icon={require("../assets/icons/PNG/Short_Add.png")}
                />
                <Tag
                  name={"Clip"}
                  icon={require("../assets/icons/PNG/Cut.png")}
                />
                <Tag
                  name={"Thanks"}
                  icon={require("../assets/icons/PNG/Heart_Monny.png")}
                />
              </ScrollView>
              <TouchableOpacity
                onPress={() => setDescriptionVisible(false)}
                className="w-[95%] p-3 mb-6 bg-neutral-800 rounded-2xl"
              >
                <Text className=" font-Rbold text-base text-white">
                  Description
                </Text>
                <Text className="font-Rregular text-xs px-2 text-slate-200">
                  {video.description}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View className="flex-1 w-full items-center justify-center">
            <Text className=" font-Rbold text-dark-black-100">
              No Videos Start Posting!
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="h-[30] w-full p-2 items-center justify-center">
            <Text className="font-Rregular text-sm text-dark-black-400">
              More videos not available.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default VideoPlayback;

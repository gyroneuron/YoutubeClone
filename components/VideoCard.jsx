import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ThreeDots from "../assets/icons/More.svg";
import ProfilePic from "../assets/icons/profile-avatar.png";
import { router } from "expo-router";

const VideoCard = ({ video }) => {

  function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }
  
  const timestamp = new Date(video?.created_at);

  return (
    <View className="w-full h-[290] items-center justify-evenly">
        <View className="h-full w-full items-center justify-center">
          <TouchableOpacity
            className="w-full h-[210] items-center justify-center"
            onPress={() => router.navigate({pathname: 'VideoPlayback', params: video})}
          >
            <Image
              source={{ uri: video?.thumbnail_url }}
              resizeMode="cover"
              className="h-full w-full"
            />
          </TouchableOpacity>
          <View className="w-full h-[80] p-3 flex-row flex-1 items-center justify-start">
            <View className="h-full w-full flex-row items-center justify-center flex-[7]">
              <View className="h-full w-full flex-[1.5] items-center justify-center">
                <Image
                  className="h-10 w-10 rounded-full"
                  source={{uri: video?.avatar}}
                  resizeMode="contain"
                />
              </View>
              <View className="h-full w-full flex-[7] items-start justify-center">
                <Text className="font-Rmedium text-dark-black-100">
                  {video?.title}
                </Text>
                <Text className="font-Rregular text-dark-black-300">
                  {video?.creator}{' • '}{timeAgo(timestamp)}
                </Text>
              </View>
            </View>
            <View className="h-full w-full flex-[1] p-2 items-end justify-start">
              <ThreeDots height={20} width={20} />
            </View>
          </View>
        </View>
    </View>
  );
};

export default VideoCard;

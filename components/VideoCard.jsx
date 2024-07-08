import { View, Text, Image } from "react-native";
import React from "react";
import ThreeDots from '../assets/icons/More.svg';
import ProfilePic from "../assets/icons/profile-avatar.png";

const VideoCard = ({video}) => {
  return (
    <View className="w-full h-[290] items-center justify-evenly">
      <View className="w-full h-[210] items-center justify-center">
        <Image
          source={{ uri: video.thumbnail_url }}
          resizeMode="cover"
          className="h-full w-full"
        />
      </View>
      <View className="w-full h-[80] p-3 flex-row flex-1 items-center justify-start">
        <View className="h-full w-full flex-row items-center justify-center flex-[7]">
          <View className="h-full w-full flex-[1.5] items-center justify-center">
            <Image
              className="h-16 w-16 rounded-full"
              source={ProfilePic}
              resizeMode="contain"
            />
          </View>
          <View className="h-full w-full flex-[7] items-start justify-center">
            <Text className="font-Rmedium text-dark-black-100">
              {video.title}
            </Text>
            <Text className="font-Rregular text-dark-black-300">
              Vivek 473K views 7 days ago{" "}
            </Text>
          </View>
        </View>
        <View className="h-full w-full flex-[1] p-2 items-end justify-start">
          <ThreeDots height={20} width={20} />
        </View>
      </View>
    </View>
  );
};

export default VideoCard;

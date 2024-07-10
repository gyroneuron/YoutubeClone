import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import Explore from "../assets/icons/Explore.svg";

const TagsBar = () => {
  const { data } = [
    { id: 1, name: "All" },
    { id: 2, name: "Trending" },
    { id: 3, name: "Popular" },
    { id: 4, name: "New" },
  ];

  return (
    <View className="w-full h-14 items-center justify-end flex-row px-4">
      
      <ScrollView
        className="w-full h-8 space-x-3"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
        onPress={() => {}}
        className="h-8 w-10 bg-dark-black-500 rounded-md items-center justify-center"
      >
        <Explore height={24} width={24} />
      </TouchableOpacity>
        <TouchableOpacity className="h-[30] p-2 items-center justify-center bg-dark-black-500 rounded-md">
          <Text className="font-Rbold text-dark-black-100">All</Text>
        </TouchableOpacity>

        <TouchableOpacity className="h-[30] p-2 items-center justify-center bg-dark-black-500 rounded-md">
          <Text className="font-Rbold text-dark-black-100">Vlog</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-[30] p-2 items-center justify-center bg-dark-black-500 rounded-md">
          <Text className="font-Rbold text-dark-black-100">Music</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-[30] p-2 items-center justify-center bg-dark-black-500 rounded-md">
          <Text className="font-Rbold text-dark-black-100">Live</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-[30] p-2 items-center justify-center bg-dark-black-500 rounded-md">
          <Text className="font-Rbold text-dark-black-100">Mixes</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-[30] p-2 items-center justify-center bg-dark-black-500 rounded-md">
          <Text className="font-Rbold text-dark-black-100">Gaming</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-[30] p-2 items-center justify-center bg-dark-black-500 rounded-md">
          <Text className="font-Rbold text-dark-black-100">Comedy</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TagsBar;

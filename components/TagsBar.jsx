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
    <View className="w-full h-12 items-center flex-row px-4">
      <TouchableOpacity
        onPress={() => {}}
        className="h-8 w-10 bg-dark-black-500 rounded-md items-center justify-center"
      >
        <Explore height={24} width={24} />
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // Convert the ID to a string
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {}}
            className="h-8 bg-dark-black-500 rounded-md items-center justify-center ml-2"
          >
            <Text className="text-white">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TagsBar;

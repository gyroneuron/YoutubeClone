import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../utils/supabase";
import { useGlobalContext } from "../provider/GlobalProvider";
import { router } from "expo-router";
import Search from "../assets/icons/Search.svg";
import Back from "../assets/icons/Back.svg";
import VideoCard from "../components/VideoCard";

const SearchScreen = () => {
  const { profileData, isLoggedIn, isLoading } = useGlobalContext();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .ilike("title", `%${query}%`);

      if (error) {
        Alert.alert("Search Error", error.message);
      } else {
        setResults(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => <VideoCard video={item} />;

  return (
    <SafeAreaView className="flex-1 dark:bg-dark-black-600 h-full w-full items-center justify-start">
      <View className="w-full items-center space-x-2 flex-row mb-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Back height={24} width={24} />
        </TouchableOpacity>
        <View className="rounded-3xl  border-2 border-dark-black-500 bg-dark-black-500 h-10 w-[90%] items-center flex-row justify-center focus:border-dark-black-300">
          <TextInput
            className="w-[90%] h-full text-base px-4 text-white font-Rmedium"
            value={query}
            onChangeText={(text) => {
                setQuery(text)
                handleSearch()
            }}
            keyboardType='url'
            cursorColor={"#FF8E01"}
            placeholder="Search Youtube"
            on
          />
          <TouchableOpacity onPress={handleSearch}>
            <Search height={24} width={24} />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#5CA4F8" />
      ) : (
        <FlatList
          className="flex-1 w-full"
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

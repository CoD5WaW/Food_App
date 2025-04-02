// app/(tabs)/index.js
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Component for food/drink categories
const CategoryButton = ({ title, active, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`mr-4 px-4 py-2 rounded-full ${active ? 'bg-blue-500' : 'bg-gray-200'}`}
  >
    <Text className={`font-medium ${active ? 'text-white' : 'text-gray-800'}`}>{title}</Text>
  </TouchableOpacity>
);

// Component for food/drink items
const FoodItem = ({ item }) => (
  <TouchableOpacity className="bg-white rounded-lg shadow mr-4 w-40 overflow-hidden">
    <View className="h-24 bg-gray-300">
      {/* Placeholder for food image */}
      <View className="w-full h-full items-center justify-center">
        <Text className="text-gray-500">{item.name} Image</Text>
      </View>
    </View>
    <View className="p-2">
      <Text className="font-bold">{item.name}</Text>
      <View className="flex-row justify-between items-center mt-1">
        <Text className="text-blue-500 font-bold">${item.price}</Text>
        <TouchableOpacity className="bg-blue-500 rounded-full w-6 h-6 items-center justify-center">
          <Ionicons name="add" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('Foods');
  
  const categories = ['Foods', 'Desserts', 'Drinks', 'Orders'];
  
  // Sample data
  const foodItems = [
    { id: '1', name: 'Burger', price: '5.99' },
    { id: '2', name: 'Pizza', price: '8.99' },
    { id: '3', name: 'Pasta', price: '7.50' },
    { id: '4', name: 'Salad', price: '4.99' },
  ];
  
  const featuredItems = [
    { id: '1', name: 'Special Combo', price: '12.99', description: 'Burger, fries and drink' },
  ];
  
  return (
    <View className="flex-1 bg-gray-50 pt-12">
      {/* Search bar */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center bg-white rounded-lg px-4 h-12 border border-gray-200">
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Search for food or drinks..."
            value={searchText}
            onChangeText={setSearchText}
            className="flex-1 h-full ml-2"
          />
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Banner */}
        <View className="px-4 mb-6">
          <View className="bg-blue-100 rounded-lg p-4 flex-row items-center">
            <View className="flex-1">
              <Text className="text-xl font-bold text-blue-800">Featured Deal</Text>
              <Text className="text-blue-600 mt-1">Get 20% off your first order!</Text>
              <TouchableOpacity className="bg-blue-500 rounded-lg px-4 py-2 mt-2 self-start">
                <Text className="text-white font-bold">Order Now</Text>
              </TouchableOpacity>
            </View>
            <View className="w-16 h-16 bg-blue-200 rounded-lg items-center justify-center">
              <Text className="text-blue-500">Food</Text>
            </View>
          </View>
        </View>
        
        {/* Categories */}
        <View className="mb-6">
          <Text className="px-4 text-lg font-bold mb-2">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
            {categories.map((category) => (
              <CategoryButton 
                key={category}
                title={category}
                active={activeCategory === category}
                onPress={() => setActiveCategory(category)}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Popular Items */}
        <View className="mb-6">
          <View className="px-4 flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold">Most Popular</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={foodItems}
            renderItem={({ item }) => <FoodItem item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>
        
        {/* Recommended Items */}
        <View className="mb-6">
          <View className="px-4 flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold">Recommended</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={foodItems.slice(0, 3)}
            renderItem={({ item }) => <FoodItem item={item} />}
            keyExtractor={item => `rec-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

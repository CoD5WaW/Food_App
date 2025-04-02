// app/(tabs)/profile.js
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Menu item component
const MenuItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="flex-row items-center py-4 border-b border-gray-200"
  >
    <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-4">
      <Ionicons name={icon} size={20} color="#3b82f6" />
    </View>
    <View className="flex-1">
      <Text className="font-medium text-base">{title}</Text>
      {subtitle && <Text className="text-gray-500 text-sm">{subtitle}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
  </TouchableOpacity>
);

export default function Profile() {
  const router = useRouter();
  
  const handleLogout = () => {
    // Implement logout logic here
    router.replace('/(auth)/login');
  };
  
  return (
    <View className="flex-1 bg-gray-50 pt-12">
      <ScrollView>
        <View className="bg-white px-4 py-6 mb-6">
          <View className="items-center mb-4">
            <View className="w-24 h-24 rounded-full bg-gray-300 mb-2 items-center justify-center">
              <Ionicons name="person" size={40} color="#9ca3af" />
            </View>
            <Text className="text-xl font-bold">John Doe</Text>
            <Text className="text-gray-500">john.doe@example.com</Text>
            <TouchableOpacity className="bg-blue-500 rounded-full px-4 py-2 mt-2">
              <Text className="text-white font-medium">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View className="bg-white px-4 mb-6">
          <MenuItem 
            icon="time" 
            title="Order History" 
            subtitle="View your past orders"
            onPress={() => {}}
          />
          <MenuItem 
            icon="card" 
            title="Payment Methods" 
            subtitle="Add or manage payment options"
            onPress={() => {}}
          />
          <MenuItem 
            icon="location" 
            title="Address Book" 
            subtitle="Manage your delivery addresses"
            onPress={() => {}}
          />
          <MenuItem 
            icon="notifications" 
            title="Notifications" 
            subtitle="Manage your notifications"
            onPress={() => {}}
          />
          <MenuItem 
            icon="settings" 
            title="Settings" 
            subtitle="App preferences"
            onPress={() => {}}
          />
          <MenuItem 
            icon="help-circle" 
            title="Help & Support" 
            subtitle="Get assistance"
            onPress={() => {}}
          />
        </View>
        
        <View className="items-center mb-6">
          <TouchableOpacity 
            className="bg-red-500 rounded-full px-8 py-3"
            onPress={handleLogout}
          >
            <Text className="text-white font-bold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
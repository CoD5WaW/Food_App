// app/(auth)/login.js
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement authentication logic here
    // For now, just navigate to the main app
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="items-center mb-10">
        <Text className="text-3xl font-bold text-blue-500">QUICKBITE</Text>
      </View>
      
      <View className="space-y-4">
        <View className="border border-gray-300 rounded-lg px-4 py-2">
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            className="h-12"
          />
        </View>
        
        <View className="border border-gray-300 rounded-lg px-4 py-2">
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="h-12"
          />
        </View>
        
        <TouchableOpacity>
          <Text className="text-blue-500 text-right">Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-blue-500 rounded-lg py-4 items-center"
          onPress={handleLogin}
        >
          <Text className="text-white font-bold text-lg">Login</Text>
        </TouchableOpacity>
        
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity>
              <Text className="text-blue-500 font-bold">Signup</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

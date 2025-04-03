// app/(auth)/signup.js
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // Signup logic 1
    try {
      // Put Loading animation logic here

      // Prep data to send to api
      const signupData = {
        username: username, //idk if mugana nga same name sa variable sa taas
        password: password
      }

      // API Call
      const response = await fetch('http://capstone-testproject-backend-djangoapi.onrender.com/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData)
      });

      // Parse response
      const data = await response.json();

      // Check response
      if (response.status != 200) {
        throw new Error(data.message || 'Signup failed'); // Throw error
      }

      // If successful then go to home
      router.replace('/(tabs)');
    }
    catch (error) {
      console.error('Signup error: ', error); // put error to console
      throw new Error('Signup Failed', error.message) // alert user to error
    }
    finally {

    }


    
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="items-center mb-10">
        <Text className="text-3xl font-bold text-blue-500">FoodApp</Text>
      </View>
      
      <View className="space-y-4">
        <View className="border border-gray-300 rounded-lg px-4 py-2">
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            className="h-12"
          />
        </View>
        
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
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
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
        
        <TouchableOpacity 
          className="bg-blue-500 rounded-lg py-4 items-center"
          onPress={handleSignup}
        >
          <Text className="text-white font-bold text-lg">Sign Up</Text>
        </TouchableOpacity>
        
        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className="text-blue-500 font-bold">Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

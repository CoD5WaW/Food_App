// app/(tabs)/chatbot.js
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Chat message component
const ChatMessage = ({ message, isUser }) => (
  <View className={`max-w-3/4 rounded-lg p-3 mb-2 ${isUser ? 'bg-blue-500 self-end' : 'bg-gray-200 self-start'}`}>
    <Text className={isUser ? 'text-white' : 'text-gray-800'}>{message.text}</Text>
  </View>
);

// Quick suggestion button
const SuggestionButton = ({ text, onPress }) => (
  <TouchableOpacity 
    onPress={() => onPress(text)}
    className="bg-blue-100 rounded-full px-4 py-2 mr-2"
  >
    <Text className="text-blue-600">{text}</Text>
  </TouchableOpacity>
);

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: '1', text: 'Hello! I\'m your FoodApp assistant. How can I help you today?', isUser: false },
  ]);
  
  const suggestions = [
    'Order pizza',
    'Daily specials',
    'Track my order',
    'Diet options'
  ];
  
  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    // Add user message to chat
    const userMessage = { id: Date.now().toString(), text, isUser: true };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        id: (Date.now() + 1).toString(), 
        text: `I received your message: "${text}". What else can I help you with?`, 
        isUser: false 
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  const handleSuggestion = (text) => {
    sendMessage(text);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pt-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold">AI Chatbot</Text>
          <TouchableOpacity className="bg-blue-100 rounded-full p-2">
            <Ionicons name="information-circle-outline" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={chatHistory}
          renderItem={({ item }) => <ChatMessage message={item} isUser={item.isUser} />}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingVertical: 10 }}
          inverted={false}
        />
        
        <View className="py-2">
          <Text className="text-gray-500 mb-2">Suggestions:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {suggestions.map((suggestion, index) => (
              <SuggestionButton 
                key={index} 
                text={suggestion} 
                onPress={handleSuggestion} 
              />
            ))}
          </ScrollView>
        </View>
        
        <TouchableOpacity className="self-center mb-4">
          <Text className="text-blue-500 font-medium">Order History</Text>
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <View className="border-t border-gray-200 p-2 flex-row items-center">
          <View className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2 flex-row items-center">
            <TextInput
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              className="flex-1"
              multiline
            />
          </View>
          <TouchableOpacity className="bg-blue-500 rounded-full p-3 mr-2">
            <Ionicons name="mic" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-blue-500 rounded-full p-3"
            onPress={() => sendMessage(message)}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
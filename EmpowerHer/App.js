//app.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MenuScreen from './screens/MenuScreen';
import AboutScreen from './screens/AboutScreen';
import ProfileScreen from './screens/ProfileScreen';
import FirstPage from './screens/Firstpage';
import Membership from './screens/Membership';
import volunteer from './screens/Volunteer'
import manager from './screens/ManagerScreen';
import task from './screens/Tasks';
import StoreScreen from './screens/Store';
import AddProduct from './screens/AddProduct';
import ProductDetailsScreen from './screens/ProductScreen';
import CartScreen from './screens/AddtoCart';
import Cart from './screens/Cart';
import { CartProvider } from './screens/CartContext';
import ChatScreen from './screens/Chat';
import PurchaseScreen from './screens/PurchaseScreen';
import EditProductScreen from './screens/EditProduct';
import BuyNow from './screens/BuyNow';
import Purchase from './screens/PurchaseNow';
import { MessageProvider } from './screens/MessageContext';
import AdminStoreScreen from './screens/AdminStore';
import PaymentScreen from './screens/Donation';
import NotificationScreen from './screens/Notifications';
const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <MessageProvider>

    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="First" component={FirstPage} />
        <Stack.Screen name="Member" component={Membership} />
        <Stack.Screen name="volunteer" component={volunteer} />
        <Stack.Screen name="ManagerScreen" component={manager} />
        <Stack.Screen name="tasks" component={task} />
        <Stack.Screen name="store" component={StoreScreen}/>
        <Stack.Screen name="AddProduct" component={AddProduct}/>
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen}/>
        <Stack.Screen name="AddToCart" component={CartScreen}/>
        <Stack.Screen name="Cart" component={Cart}/>
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="Purchase" component={PurchaseScreen}/>
        <Stack.Screen name="EditProduct" component={EditProductScreen}/>
        <Stack.Screen name="BuyNow" component={BuyNow}/>
        <Stack.Screen name="Buy" component={Purchase}/>
        <Stack.Screen name="AdminStore" component={AdminStoreScreen}/>
        <Stack.Screen name="Donation" component={PaymentScreen}/>
        <Stack.Screen name="Notifications" component={NotificationScreen}/>


      </Stack.Navigator>

    </NavigationContainer>
    </MessageProvider>
    </CartProvider>


  );
}


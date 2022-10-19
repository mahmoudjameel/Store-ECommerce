import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './StackScreens/Register'
import Home from './StackScreens/Home';
import LoginScreen from './StackScreens/Login';
import { firebase } from './config'
import ForgotPassword from './StackScreens/ForgotPassword';
import WomanClothing from './TabScreens/WomanClothing';
import MenClothing from './TabScreens/MenClothing';
import Shoes from './TabScreens/Shoes';
import Accessories from './TabScreens/Accessories';
import ProductDetail from './StackScreens/ProductDetail';
import AdminTab from './AdminScreens/AdminTabs';

export default function App() {

    const Stack = createStackNavigator();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
            setIsLoggedIn(true)

        } else {
            setIsLoggedIn(false);
        }
    })
    return (
        <NavigationContainer>
            {isLoggedIn ?
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="AdminHome" component={AdminTab} options={{ headerShown: false }} />
                    <Stack.Screen name="Woman" component={WomanClothing}
                    options={{
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerStyle: { backgroundColor: '#000' },
                        headerTitleStyle: { color: '#fff', },
                        headerTintColor: '#ffffff',
                      }}
                    />
                    <Stack.Screen name="Men" component={MenClothing}
                    options={{
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerStyle: { backgroundColor: '#000' },
                        headerTitleStyle: { color: '#fff', },
                        headerTintColor: '#ffffff',
                      }}
                    />
                    <Stack.Screen name="Shoes" component={Shoes}
                    options={{
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerStyle: { backgroundColor: '#000' },
                        headerTitleStyle: { color: '#fff', },
                        headerTintColor: '#ffffff',
                      }}
                    />
                    <Stack.Screen name="Accessory" component={Accessories}
                    options={{
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerStyle: { backgroundColor: '#000' },
                        headerTitleStyle: { color: '#fff', },
                        headerTintColor: '#ffffff',
                      }}
                    />
                    <Stack.Screen name="ProductDetail" component={ProductDetail}
                    options={{
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerStyle: { backgroundColor: '#000' },
                        headerTitleStyle: { color: '#fff', },
                        headerTintColor: '#ffffff',
                      }}
                    />
                 
                </Stack.Navigator> :
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                </Stack.Navigator>}
        </NavigationContainer>

    );
}

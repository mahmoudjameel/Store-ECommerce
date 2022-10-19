import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from './AdminScreen';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';
import CreateCategory from './CreateCategory';
import CategoryList from './CategoryList';
import TrendProduct from './TrendProduct';
import Confirm from './confirm';
import { Button, HeaderBackButton } from 'react-native';
const Stack = createStackNavigator();

export default function AdminHome({ navigation }) {

    return (

        <Stack.Navigator
            initialRouteName="Admin"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Admin" component={AdminScreen} />
            <Stack.Screen name='CreateProduct' component={CreateProduct}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff', },
                    headerTintColor: '#ffffff',
                }}
            />
            <Stack.Screen name='UpdateProduct' component={UpdateProduct}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff', },
                    headerTintColor: '#ffffff',
                }} />
            <Stack.Screen name='TrendProduct' component={TrendProduct}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff', },
                    headerTintColor: '#ffffff',
                }} />
            <Stack.Screen name='CreateCategory' component={CreateCategory} />
            <Stack.Screen name='CategoryList' component={CategoryList} />
            <Stack.Screen name='orderConfirm' component={Confirm}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#000' },
                    headerTitleStyle: { color: '#fff', },
                    headerTintColor: '#ffffff',
                }}
            />
        </Stack.Navigator>

    );
}

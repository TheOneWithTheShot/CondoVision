import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, LoginScreen, PropertyManagementScreen, OwnerMapScreen } from './screens/index';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="OwnerMap"
                screenOptions={{
                    headerShown: false, // This line hides the header globally
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="PropertyManagement" component={PropertyManagementScreen} />
                <Stack.Screen name="OwnerMap" component={OwnerMapScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

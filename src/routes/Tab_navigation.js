import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/main_Container/home/Home';
import More from '../pages/main_Container/more/More';
import Profile from '../pages/main_Container/profile/Profile';
import Update from '../pages/main_Container/update/Update';
import Winners from '../pages/main_Container/winners/Winners';
import { Colors } from '../constant/Colors';
import { Normalize } from '../constant/for_responsive/Dimens';
const { height, width } = Dimensions.get('window')

const whichLogo = (val,isFocused) => {
    switch (val) {
        case 0: return <Ionicons name='home' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} />;
        case 1: return <Entypo name='newsletter' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} />;
        case 2: return <Entypo name='ticket' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} />;
        case 3: return <MaterialCommunityIcons name='account' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} />;
        case 4: return <Fontisto name='more-v-a' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} />;
        default: return <Fontisto name='more-v-a' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} />;
    }

}


function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View
            style={{
                height: Normalize(52),
                width: "96%",
                flexDirection: 'row',
                marginBottom: Normalize(8),
                alignSelf: "center",
                borderRadius: Normalize(10),
                backgroundColor: Colors.purple,
            }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                return (
                    <TouchableOpacity
                        activeOpacity={1}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, justifyContent: "center" }}
                        key={index}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: "70%", width: "90%", backgroundColor: isFocused ? Colors.white : Colors.purple, borderRadius: Normalize(10), alignItems: 'center', justifyContent: 'center', paddingTop: isFocused ? 0 : Normalize(9) }} >
                                {
                                    whichLogo(index,isFocused)
                                }
                                <Text style={{ color: Colors.purple, fontSize: Normalize(9), paddingTop: Normalize(1), fontFamily: "Outfit-SemiBold" }}>
                                    {isFocused ? label : null}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

// {index == 0 ?
//     <Ionicons name='home' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} /> :
//     index == 1 ?
//         <Entypo name='newsletter' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} />
//         :
//         index == 2 ? <Entypo name='ticket' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} /> :
//             index == 3 ?
//                 <MaterialCommunityIcons name='account' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} />
//                 :
//                 <Fontisto name='more-v-a' size={isFocused ? Normalize(14) : Normalize(15)} color={!isFocused ? Colors.white : Colors.purple} />
// }

export default function Tab_navigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Update" component={Update} />
            <Tab.Screen name="Winners" component={Winners} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="More" component={More} />
        </Tab.Navigator>
    )
}
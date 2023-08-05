import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, Image, FlatList } from "react-native";
import styles from "./styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import GOBALCOLOR from '../../gobalconstant/colors';
import ProgressScreen from '../highordercomponents/progressscreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FarmListController from "../../view-controllers/farmlistcontroller";
import { useNavigation } from '@react-navigation/native';
import { connect, useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FarmList = (props) => {

    const { goBackScreen, getFarmList } = FarmListController();
    const navigation = useNavigation();
    const { farmList } = useSelector((state) => state.apiCallReducers);

    useEffect(() => {
        AsyncStorage.getItem('accessToken').then((accessToken) => {
            getFarmList({
                "authToken": accessToken,
            });
        });

    }, [])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.appBarContainer}>
                <View style={{ flexDirection: 'row', position: 'absolute', left: 5 }}>
                    <Ionicons name="arrow-back" size={35} style={{ margin: 10, color: '#FFF' }} onPress={() => goBackScreen()} />
                </View>
                <View style={{ marginLeft: 70 }}>
                    <Text style={styles.appBarTitle}>Farm List</Text>
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
                    <MaterialCommunityIcons name="home-plus" size={32} style={{ margin: 10, color: '#FFF' }}
                        onPress={() => navigation.navigate("AddFarm", { comesFrom: 'new' })} />
                </View>
            </View>
            {farmList.length > 0 ? < FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                listKey={(item, index) => 'A.' + index.toString()}
                style={{ marginTop: 5, }}
                data={farmList}
                // contentContainerStyle={{ paddingBottom: 120 }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={[{
                            flexDirection: 'row', padding: 5, margin: 10,
                        }, {
                            backgroundColor: 'white',
                            borderRadius: 8,
                            paddingVertical: 15,
                            paddingHorizontal: 15,
                            marginVertical: 10,
                        },
                        {
                            elevation: 3,
                            shadowColor: '#52006A',
                        }]}>
                            <View style={{ flex: 1, marginTop: 5, marginBottom: 5, borderRadius: 5 }}>
                                <View style={{ backgroundColor: GOBALCOLOR.COLORS.BROWN_LIGHT, padding: 5, margin: 3 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '500', color: GOBALCOLOR.COLORS.BROWN }}>Farm Name :</Text>
                                    <Text style={{ fontSize: 15, color: GOBALCOLOR.COLORS.BROWN }}>{item.FarmName}</Text>
                                </View>
                                <View style={{ backgroundColor: GOBALCOLOR.COLORS.BROWN_LIGHT, padding: 5, margin: 3 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '500', color: GOBALCOLOR.COLORS.BROWN }}>Farmer Name :</Text>
                                    <Text style={{ fontSize: 15, color: GOBALCOLOR.COLORS.BROWN }}>{item.FarmerName}</Text>
                                </View>
                                <View style={{ backgroundColor: GOBALCOLOR.COLORS.BROWN_LIGHT, padding: 5, margin: 3 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '500', color: GOBALCOLOR.COLORS.BROWN }}>Farm Registration Date :</Text>
                                    <Text style={{ fontSize: 15, color: GOBALCOLOR.COLORS.BROWN }}>{item.FarmRegDate}</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="pencil-box" size={35} style={{ position: 'absolute', top: -15, right: -10 }} color={GOBALCOLOR.COLORS.DARK_BLUE}
                                onPress={() =>
                                    navigation.navigate("AddFarm", { comesFrom: 'edit', selectedFarm: item })} />
                            {/* <MaterialCommunityIcons name="delete-circle" size={35} style={{ position: 'absolute', bottom: -15, right: -10 }} color={GOBALCOLOR.COLORS.ORANAGE} /> */}
                        </View>
                    )
                }}
                keyExtractor={(item, index) => "ca" + index.toString()}
            /> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: GOBALCOLOR.COLORS.BLACK, fontSize: 15, fontWeight: '600' }}>Farms Not Found</Text>
                </View>}
        </View>
    )
};

export default connect(null, null)(FarmList);

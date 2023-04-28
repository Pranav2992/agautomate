import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import MapView, { Marker, PROVIDER_GOOGLE, Polygon, Overlay } from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import {
    Container,
    Content,
    ListItem,
    Left,
    Input,
    Right,
    Radio,
    Icon,
    List,
    Body,
    Title,
    Button,
    Header,
    Grid,
    Row,
    Col,
    Picker,
    Item,
    Tab,
    Tabs,
    Footer,
} from "native-base";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const DashboardScreen = (props) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    const [markers, setMarkers] = useState([]);

    const check = (coordinate) => {
        console.log('coordinate = ', coordinate)
        console.log('markers = ', markers)
        setMarkers(markers => [...markers, coordinate])
    }

    return (
        <View style={styles.mainContainer}>

            <View style={styles.appBarContainer}>
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.appBarTitle}>Dashboard</Text>
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
                    <Ionicons name="person-circle-outline" size={35} style={{ margin: 10, color: '#FFF' }} />
                    <Ionicons name="exit-outline" size={35} style={{ margin: 10, color: '#FFF' }} />
                </View>
            </View>

            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
            </View>
            <View style={{
                flex: 1,
                width: deviceWidth,
                position: 'absolute',
                bottom: 0,
                overflow: 'hidden',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.2,
                elevation: 7
            }}>
                <MapView
                    mapType="hybrid"
                    style={{
                        height: deviceHeight * 0.83,
                        width: deviceWidth,
                    }}
                    initialRegion={{
                        latitude: 16.7086167,
                        longitude: 74.1564648,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                    onPress={(e) => check(e.nativeEvent.coordinate)}
                >
                    {markers.length > 4 && < Polygon
                        coordinates={markers}
                        strokeColor="#000"
                        strokeWidth={2}
                        fillColor="#00000022"
                    >
                    </Polygon>}

                    {markers.length > 0 && markers.map((marker, i) => {
                        console.log('marker ==', marker)
                        return (
                            <Marker coordinate={marker} key={i} draggable/>
                        )
                    })}
                    {/*  <Marker
    key={1}
    draggable
    coordinate={{
        "latitude": 16.686109,
        "longitude": 74.186840,
    }}
    onDragEnd={(e) => {
        console.log('e ==>>', e.nativeEvent.coordinate)
    }}
/> */}
                </MapView>
                <TouchableOpacity
                    style={styles.mapBtn}
                    onPress={() => setMarkers([])}
                >
                    <Text style={styles.maBtnText}>Clear Area Section</Text>
                </TouchableOpacity>
            </View>

        </View >
    )
};

export default DashboardScreen;
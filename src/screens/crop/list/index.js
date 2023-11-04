import React, { useEffect, useState } from 'react';
import { View, Text, Alert, BackHandler, FlatList } from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CropController from '../../../view-controllers/cropController';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GOBALCOLOR from '../../../gobalconstant/colors';
import moment from 'moment';
import { Button, IconButton } from 'react-native-paper';
import AddFarmController from '../../../view-controllers/addfarmcontroller';
import { farmList as getFarmList } from '../../../store/actions/apiCallActions';

const CropListScreen = props => {
  const navigation = useNavigation();
  const { goBackScreen, Crop_Details_List, Crop_List, setAccessToken } =
    CropController();
  const dispatch = useDispatch();

  const { cropDetailsList } = useSelector(state => state.apiCallReducers);
  const { farmList } = useSelector(state => state.apiCallReducers);
  const { cropList } = useSelector(state => state.apiCallReducers);

  console.log('croplist = ', cropList);
  console.log('farmList = ', farmList);

  //   useEffect(() => {
  //     AsyncStorage.getItem('accessToken').then(accessToken => {
  //       setAccessToken(accessToken);

  //       dispatch(
  //         getFarmList({authToken: accessToken}),
  //         Crop_List({
  //           authToken: accessToken,
  //         }),
  //         Crop_Details_List({
  //           authToken: accessToken,
  //         }),
  //       );
  //     });
  //   }, []);
  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(accessToken => {
      setAccessToken(accessToken);

      dispatch(
        getFarmList({ authToken: accessToken }),
        Crop_List({
          authToken: accessToken,
        }),
        Crop_Details_List({
          authToken: accessToken,
        }),
      );
    });
  }, [navigation.isFocused()]);
  //   getFarmName = id => {
  //     let name = '--';
  //     if (id) {
  //       let res = farmList.find(x => x.id == id);
  //       name = res.FarmName;
  //     }

  //     return <Text>{name}</Text>;
  //   };
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.appBarContainer}>
          <View style={{ flexDirection: 'row', position: 'absolute', left: 5 }}>
            <Ionicons
              name="arrow-back"
              size={30}
              style={{ margin: 10, color: '#FFF' }}
              onPress={() => goBackScreen()}
            />
          </View>
          <View style={{ marginLeft: 50 }}>
            <Text style={styles.appBarTitle}>Crop List</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Button
              icon="plus"
              mode="text"
              labelStyle={{ fontSize: 28, color: '#fff' }}
              onPress={() =>
                navigation.navigate('AddCrop', { comesFrom: 'new' })
              }>
              <Text style={{ fontSize: 16 }}>Add Crop</Text>
            </Button>
            {/* <MaterialCommunityIcons
              name="palm-tree"
              size={32}
              style={{marginR: 10, color: '#FFF'}}
              onPress={() => navigation.navigate('AddCrop', {comesFrom: 'new'})}
            /> */}
          </View>
        </View>
        {cropDetailsList.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            listKey={(item, index) => 'A.' + index.toString()}
            style={{ marginTop: 5 }}
            data={cropDetailsList}
            // contentContainerStyle={{ paddingBottom: 120 }}
            renderItem={({ item, index }) => {
              return (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <View style={styles.mainCardView}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        /* height: '100%', */
                      }}>
                      {/*  <View style={{ flex: 1 }}></View> */}
                      <View style={{ flex: 4 }}>
                        {cropList.map(person => {
                          return (
                            <Text
                              style={{
                                fontSize: 20,
                                color: GOBALCOLOR.COLORS.BROWN,
                                fontWeight: '600',
                                textTransform: 'capitalize',
                              }}>
                              {person.id == item.CropId ? person.CropName : ''}
                            </Text>
                          );
                        })}
                        {farmList.map(person => {
                          return (
                            < View style={{ marginBottom: 2, marginTop: 2 }} >
                              {person.id == item.FarmId ?
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: 'grey',
                                    fontWeight: '600',
                                    textTransform: 'capitalize',
                                  }}>
                                  {person.FarmName}
                                </Text> : null}
                            </View>

                          );
                        })}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: 'grey',
                              textAlign: 'left',
                              paddingRight: 10,
                            }}>
                            {moment(item?.SowingDate).format('d MMM yyyy')}
                          </Text>
                          <Text style={{ color: 'grey', fontSize: 13, fontWeight: 'bold' }}>-</Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: 'grey',
                              textAlign: 'right',
                              paddingLeft: 10,
                            }}>
                            {moment(item?.ExpectedHarvestingDate).format(
                              'd MMM yyyy',
                            )}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: '15%',
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                          backgroundColor: GOBALCOLOR.COLORS.BLUE,
                          height: 90,
                          borderBottomRightRadius: 15,
                          borderTopRightRadius: 15,
                        }}>
                        <IconButton
                          icon="pencil"
                          color="#fff"
                          iconColor="white"
                          size={28}
                        //   onPress={() =>
                        //     navigation.navigate('AddCrop', {
                        //       comesFrom: 'edit',
                        //       selectedFarm: item,
                        //     })
                        //   }
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => 'ca' + index.toString()}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                color: GOBALCOLOR.COLORS.BLACK,
                fontSize: 15,
                fontWeight: '600',
              }}>
              Crops details Not Found
            </Text>
          </View>
        )}
      </View >
    </>
  );
};

export default CropListScreen;

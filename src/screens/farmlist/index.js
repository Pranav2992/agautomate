import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GOBALCOLOR, { COLORS } from '../../gobalconstant/colors';
import ProgressScreen from '../highordercomponents/progressscreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FarmListController from '../../view-controllers/farmlistcontroller';
import { useNavigation } from '@react-navigation/native';
import { connect, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import moment from 'moment/moment';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FarmList = props => {
  const { goBackScreen, getFarmList, deleteFarmFromList } = FarmListController();
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  const { farmList } = useSelector(state => state.apiCallReducers);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(accessToken => {
      getFarmList({
        authToken: accessToken,
      });
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.appBarContainer}>
        <View style={{ flexDirection: 'row', position: 'absolute', left: 0 }}>
          <Ionicons
            name="arrow-back"
            size={30}
            style={{ margin: 10, color: '#FFF' }}
            onPress={() => goBackScreen()}
          />
        </View>
        <View style={{ marginLeft: 50 }}>
          <Text style={styles.appBarTitle}>My Farm List</Text>
        </View>
        <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
          <MaterialCommunityIcons
            name="plus"
            size={32}
            style={{ margin: 10, color: '#FFF' }}
            onPress={() => navigation.navigate('AddFarm', { comesFrom: 'new' })}
          />
        </View>
      </View>
      {farmList.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          listKey={(item, index) => 'A.' + index.toString()}
          style={{ marginTop: 5 }}
          data={farmList}
          // contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={styles.mainCardView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <View style={{ width: '10%' }}></View>
                    <View style={{ width: '75%' }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: GOBALCOLOR.COLORS.BROWN,
                          fontWeight: '600',
                          textTransform: 'capitalize',
                        }}>
                        {item.FarmName}
                      </Text>

                      <Text
                        style={{
                          fontSize: 15,
                          color: 'grey',
                          textTransform: 'capitalize',
                        }}>
                        {item.FarmerName}
                      </Text>

                      <Text
                        style={{
                          fontSize: 13,
                          color: 'grey',
                          textAlign: 'right',
                          paddingRight: 10,
                        }}>
                        {moment(item?.FarmRegDate).format('d MMM yyyy')}
                      </Text>
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
                        size={22}
                        onPress={() =>
                          navigation.navigate('AddFarm', {
                            comesFrom: 'edit',
                            selectedFarm: item,
                          })
                        }
                      />
                      <View style={{ height: 1, backgroundColor: COLORS.WHITE, width: '80%' }} />
                      <IconButton
                        icon="delete"
                        color="#fff"
                        iconColor="white"
                        size={22}
                        onPress={() => {
                          setIsShowModal(true);
                          setSelectedItem(item);
                          //deleteFarmFromList({ 'id': item.id })
                        }
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
              //   <View
              //     style={[
              //       {
              //         flexDirection: 'row',
              //         padding: 5,
              //         margin: 10,
              //       },
              //       {
              //         backgroundColor: 'white',
              //         borderRadius: 8,
              //         paddingVertical: 15,
              //         paddingHorizontal: 15,
              //         marginVertical: 10,
              //       },
              //       {
              //         elevation: 3,
              //         shadowColor: '#52006A',
              //       },
              //     ]}>
              //     <View
              //       style={{
              //         flex: 1,
              //         marginTop: 5,
              //         marginBottom: 5,
              //         borderRadius: 5,
              //       }}>
              //       <View
              //         style={{
              //           backgroundColor: GOBALCOLOR.COLORS.BROWN_LIGHT,
              //           padding: 5,
              //           margin: 3,
              //         }}>
              //         <Text
              //           style={{
              //             fontSize: 18,
              //             fontWeight: '500',
              //             color: GOBALCOLOR.COLORS.BROWN,
              //           }}>
              //           Farm Name :
              //         </Text>
              //         <Text
              //           style={{fontSize: 15, color: GOBALCOLOR.COLORS.BROWN}}>
              //           {item.FarmName}
              //         </Text>
              //       </View>
              //       <View
              //         style={{
              //           backgroundColor: GOBALCOLOR.COLORS.BROWN_LIGHT,
              //           padding: 5,
              //           margin: 3,
              //         }}>
              //         <Text
              //           style={{
              //             fontSize: 18,
              //             fontWeight: '500',
              //             color: GOBALCOLOR.COLORS.BROWN,
              //           }}>
              //           Farmer Name :
              //         </Text>
              //         <Text
              //           style={{fontSize: 15, color: GOBALCOLOR.COLORS.BROWN}}>
              //           {item.FarmerName}
              //         </Text>
              //       </View>
              //       <View
              //         style={{
              //           backgroundColor: GOBALCOLOR.COLORS.BROWN_LIGHT,
              //           padding: 5,
              //           margin: 3,
              //         }}>
              //         <Text
              //           style={{
              //             fontSize: 18,
              //             fontWeight: '500',
              //             color: GOBALCOLOR.COLORS.BROWN,
              //           }}>
              //           Farm Registration Date :
              //         </Text>
              //         <Text
              //           style={{fontSize: 15, color: GOBALCOLOR.COLORS.BROWN}}>
              //           {item.FarmRegDate}
              //         </Text>
              //       </View>
              //     </View>
              //     <MaterialCommunityIcons
              //       name="pencil-box"
              //       size={35}
              //       style={{position: 'absolute', top: -15, right: -10}}
              //       color={GOBALCOLOR.COLORS.DARK_BLUE}
              //       onPress={() =>
              //         navigation.navigate('AddFarm', {
              //           comesFrom: 'edit',
              //           selectedFarm: item,
              //         })
              //       }
              //     />
              //     {/* <MaterialCommunityIcons name="delete-circle" size={35} style={{ position: 'absolute', bottom: -15, right: -10 }} color={GOBALCOLOR.COLORS.ORANAGE} /> */}
              //   </View>
            );
          }}
          keyExtractor={(item, index) => 'ca' + index.toString()}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              color: GOBALCOLOR.COLORS.BLACK,
              fontSize: 15,
              fontWeight: '600',
            }}>
            Farms Not Found
          </Text>
        </View>
      )}

      <Modal
        isVisible={isShowModal}
        animationIn="bounceIn"
        animationOut="bounceOut"
        coverScreen={true}
        hasBackdrop={true}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        backdropColor="black"
        backdropOpacity={0.7}>
        <View style={{ width: width / 2, alignSelf: 'center', backgroundColor: GOBALCOLOR.COLORS.WHITE, borderRadius: 10 }}>
          <Text style={{ color: COLORS.BLACK, fontSize: 16, fontWeight: '800', padding: 10 }}>{`Do you want to delete `}<Text style={{ color: COLORS.ORANAGE }}>{selectedItem?.FarmName}</Text>{` ?`}</Text>
          <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
            <View style={{ flex: 1, backgroundColor: COLORS.ORANAGE, borderBottomLeftRadius: 10 }}>
              <TouchableOpacity style={{ padding: 10, alignItems: 'center' }} onPress={() =>
                AsyncStorage.getItem('accessToken').then(accessToken => {
                  deleteFarmFromList({ 'id': selectedItem.id, 'authToken': accessToken });
                  setIsShowModal(false);
                })}>
                <Text style={{ color: COLORS.WHITE, fontWeight: '700', fontSize: 15 }}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: '100%', width: 1, backgroundColor: COLORS.WHITE }} />
            <View style={{ flex: 1, backgroundColor: COLORS.BLUE, borderBottomRightRadius: 10 }}>
              <TouchableOpacity style={{ padding: 10, alignItems: 'center' }} onPress={() => setIsShowModal(false)}>
                <Text style={{ color: COLORS.WHITE, fontWeight: '700', fontSize: 15 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal >
    </View >
  );
};

export default connect(null, null)(FarmList);

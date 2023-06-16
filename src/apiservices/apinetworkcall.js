import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import { Toast } from 'native-base';

let promiseData;

export default Network = (endpoint, method, body) => {
    console.log("calling api", `${endpoint}`);
    console.log(body, "body");

    try {
        return new Promise((resolve, reject) => {
            // console.log("promise call")
            NetInfo.fetch().then(state => {
                // console.log("state.isConnected---->", state.isConnected)
                if (state.isConnected) {
                    if (method == "get") {
                        axios({
                            method,
                            url: `${endpoint}`,
                            headers: {
                                'Authorization': body.authToken ? body.authToken : null,
                            },
                            timeout: 5000,
                        }).then(function (response) {
                            console.log("get resopnce===>", resolve)
                            resolve(response)
                        }).catch(function (error) {
                            console.log("get catch error===>", error)
                            Toast.show({
                                text: 'Something went wrong. Please try again !.',
                                type: 'danger',
                                duration: 6000
                            })
                            reject(error)
                        });
                    } else {
                        axios({
                            method,
                            url: `${endpoint}`,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': body?.authToken
                            },
                            data: body,
                            timeout: 5000,
                        }).then(function (response) {
                            console.log("post resopnce===>", response)
                            resolve(response)
                        }
                        ).catch(function (error) {
                            console.log("error===>", error)
                            console.log("post catch error===>", error.response.data[0])
                            Toast.show({
                                // text: 'Something went wrong. Please try again !.',
                                text: error.response.data[0],
                                type: 'danger',
                                duration: 6000
                            })
                            reject(error)
                            // return error
                        });
                    }
                } else {
                    reject('No connection')
                    Toast.show({
                        text: 'Please check your internet connection !.',
                        type: 'danger',
                        duration: 6000
                    })
                }
            });
        })
    } catch (error) {
        Toast.show({
            text: 'Something went wrong. Please try again !.',
            type: 'danger',
            duration: 6000
        });
        return false;
    }
}

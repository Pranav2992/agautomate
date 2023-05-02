import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import { Toast } from "native-base";

export default Network = (endpoint, method, body) => {
    return new Promise((resolve, reject) => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                if (method == "get") {
                    axios({
                        method,
                        url: `${endpoint}`,
                        headers: {
                            'x-access-token': body.authToken ? body.authToken : null,
                        }
                    }).then(function (response) {
                        resolve(response)
                    }).catch(function (error) {
                        console.log(error);
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
                            'x-access-token': body?.authToken
                        },
                        data: body
                    }).then(function (response) {
                        resolve(response)
                    }
                    ).catch(function (error) {
                        console.log("error========>", error);
                        Toast.show({
                            text: 'Something went wrong. Please try again !.',
                            type: 'danger',
                            duration: 6000
                        })
                        reject(error)
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
}
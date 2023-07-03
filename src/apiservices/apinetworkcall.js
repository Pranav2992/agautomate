import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import { Toast } from 'native-base';
import store from '../store';
import { SHOW_PROGRESS } from "../store/types";
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
                            store.dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
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
                            store.dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
                            console.log("post resopnce===>", response)
                            resolve(response)
                        }
                        ).catch(function (error) {
                            console.log("error===>", error)
                            console.log("post catch error===>", typeof error.response.data.non_field_errors === 'undefined')
                            store.dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
                            Toast.show({
                                text: typeof error.response.data.non_field_errors === 'undefined' ? error.response.data[0] : error.response.data.non_field_errors[0],
                                // text: error.response.data[0],
                                type: 'danger',
                                duration: 6000
                            })
                            // reject(error)
                            reject(error)
                        });
                    }
                } else {
                    console.log("no connection")
                    reject('No connection')
                    store.dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
                    Toast.show({
                        text: 'Please check your internet connection !.',
                        type: 'danger',
                        duration: 6000
                    })
                    return false;
                }
            });
        })
    } catch (error) {
        store.dispatch({ type: SHOW_PROGRESS, isProgressShow: false });
        Toast.show({
            text: 'Something went wrong. Please try again !.',
            type: 'danger',
            duration: 6000
        });
        return false;
    }
}

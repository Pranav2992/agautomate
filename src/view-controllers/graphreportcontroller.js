import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'native-base';
import { useDispatch, useSelector, connect } from 'react-redux';
import moment from 'moment/moment';
import GraphReportViewModel from '../view-models/graphreportviewmodel';
import { SHOW_PROGRESS } from '../store/types';
const GraphReportController = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Yeild', value: '1' },
        { label: 'Pol In Cane', value: '2' },
        { label: 'Water Stress', value: '3' }
    ]);
    const options = [{ label: 'Daily' }, { label: 'Weekly' }]
    const [selectedGraphType, setSelectedGraphType] = useState('Daily');
    const [openMonths, setOpenMonths] = useState(false);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [valueMonth, setValueMonth] = useState(null);
    const [valueYear, setValueYear] = useState(null);
    const [isDrawGraph, setIsDrawGraph] = useState(false);
    const [userId, setUserId] = useState('');
    const [getGraphDataResponse, setGetGraphDataResponse] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const navigation = useNavigation();
    const [itemMonths, setItemMonths] = useState([
        {
            label: 'January', value: '1'
        },
        {
            label: 'February', value: '2'
        },
        {
            label: 'March', value: '3'
        },
        {
            label: 'April', value: '4'
        },
        {
            label: 'May', value: '5'
        },
        {
            label: 'June', value: '6'
        },
        {
            label: 'July', value: '7'
        },
        {
            label: 'August', value: '8'
        },
        {
            label: 'September', value: '9'
        },
        {
            label: 'October', value: '10'
        },
        {
            label: 'November', value: '11'
        },
        {
            label: 'December', value: '12'
        },
    ]);

    const { getGraphData } = GraphReportViewModel();

    const goBackScreen = () => {
        navigation.goBack();
    }

    const checkSelectedMonth = (monthValue) => {
        var date = new Date();
        console.log('date = ', date)
        var currentMonth = moment(date).format('MM');
        console.log('currentMonth = ' + currentMonth + " monthValue = " + monthValue)
        console.log('date = ', monthValue > currentMonth)
        parseInt(monthValue) > parseInt(currentMonth) && Toast.show({
            variant: "solid",
            text: 'Selected current or previous month.',
            type: 'danger',
            duration: 6000
        })
        parseInt(monthValue) > parseInt(currentMonth) ? setValueMonth(null) : setValueMonth(monthValue);
        /* parseInt(monthValue) <= parseInt(currentMonth) &&  */getDaysInMonth(monthValue);
    }

    const getDaysInMonth = (monthValue) => {
        var date = new Date();
        var year = moment(date).format('YYYY');
        setValueYear(year);
        var monthIndex = parseInt(monthValue) - 1;
        var date1 = new Date(parseInt(year), monthIndex, 1);

        var result = [];
        while (date1.getMonth() == monthIndex) {
            result.push("" + date1.getDate());
            date1.setDate(date1.getDate() + 1);
        }
        setLabels(result);

        console.log('result ==', result);
    }

    const getGraphDataFromServer = async (requestJson) => {
        console.log("getGraphDataFromServer--->", JSON.stringify(requestJson))
        console.log("userId--->", userId)
        console.log("valueMonth--->", valueMonth)
        console.log("valueYear--->", valueYear)
        console.log("value--->", value)
        if (valueMonth !== null && valueYear !== null && value !== null) {

            dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
            let apiResponseObject = await getGraphData(userId, valueMonth, valueYear, value, requestJson);
            let garphData = [];
            if (apiResponseObject.apiCallSuccess === true) {

                if (apiResponseObject.apiResponse.length > 0) {
                    console.log('getGraphDataResponse === ', apiResponseObject.apiResponse);

                    for (let data = 0; data < apiResponseObject.apiResponse.length; data++) {
                        for (let label = 0; label < labels.length; label++) {
                            console.log('data === ', data)
                            try {
                                /* if (apiResponseObject.apiResponse[data].ReportDate === undefined) {
                                    garphData.push(0);
                                } else { */
                                let date = moment(apiResponseObject.apiResponse[data].ReportDate).format('DD');
                                console.log('date ==', date);
                                console.log('labels = ', labels);
                                if (date === labels[label]) {
                                    garphData.push(parseFloat(apiResponseObject.apiResponse[data].ParameterValue).toFixed(2));
                                } else {
                                    garphData.push(0);
                                }
                                /*  } */
                            } catch (error) {
                                console.log('error = ', error);
                                garphData.push(0);
                            }
                        }
                    }

                    console.log('graphData == ', garphData);
                    setData([{
                        data: garphData
                    }]);
                    setIsDrawGraph(true);
                } else {
                    setIsDrawGraph(false);
                    Toast.show({
                        variant: "solid",
                        text: 'Data not found.',
                        type: 'danger',
                        duration: 6000
                    });
                }

            }
            else {
                setIsDrawGraph(false);
                Toast.show({
                    variant: "solid",
                    text: 'Something went wrong. Please try again !.',
                    type: 'danger',
                    duration: 6000
                });
            }
        }
        else if (valueMonth === null && valueYear === null && value !== null) {
            setIsDrawGraph(false);
            Toast.show({
                variant: "solid",
                text: 'Please Select Month',
                type: 'danger',
                duration: 6000
            });
        }
        else if (valueMonth !== null && valueYear !== null && value === null) {
            setIsDrawGraph(false);
            Toast.show({
                variant: "solid",
                text: 'Please Select Parameter',
                type: 'danger',
                duration: 6000
            });
        }
        else {
            console.log("Please Select Month and Parameter")
            setIsDrawGraph(false);
            Toast.show({
                variant: "solid",
                text: 'Please Select Month and Parameter',
                type: 'danger',
                duration: 6000
            });
        }
    }

    return {
        open,
        value,
        items,
        options,
        selectedGraphType,
        openMonths,
        valueMonth,
        itemMonths,
        accessToken,
        isDrawGraph,
        labels,
        data,
        getGraphDataResponse,
        setData,
        setLabels,
        setOpen,
        setValue,
        setItems,
        setSelectedGraphType,
        setOpenMonths,
        setValueMonth,
        setItemMonths,
        checkSelectedMonth,
        setAccessToken,
        setIsDrawGraph,
        setUserId,
        goBackScreen,
        setGetGraphDataResponse,
        getGraphDataFromServer
    }
}
export default GraphReportController;
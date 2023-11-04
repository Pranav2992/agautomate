import { useSelector, useDispatch } from 'react-redux';
import { farmList, deleteFarm } from '../store/actions/apiCallActions';

const FarmListViewmModel = () => {
    const dispatch = useDispatch();
    return {
        farmList: (requestJson) => dispatch(farmList(requestJson)),
        deleteFarm: (requestJson) => dispatch(deleteFarm(requestJson))
    }
}

export default FarmListViewmModel;
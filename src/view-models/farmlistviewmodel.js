import { useSelector, useDispatch } from 'react-redux';
import { farmList } from '../store/actions/apiCallActions';

const FarmListViewmModel = () => {
    const dispatch = useDispatch();
    return {
        farmList: (requestJson) => dispatch(farmList(requestJson))
    }
}

export default FarmListViewmModel;
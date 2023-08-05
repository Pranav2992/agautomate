import { useSelector, useDispatch } from 'react-redux';
import { addFarm, updateFarm } from '../store/actions/apiCallActions';

const AddFarmViewmModel = () => {
    const dispatch = useDispatch();
    return {
        addFarm: (requestJson) => dispatch(addFarm(requestJson)),
        updateFarm: (requestJson) => dispatch(updateFarm(requestJson))

    }
}

export default AddFarmViewmModel;
import { useSelector, useDispatch } from 'react-redux';
import { sendCoordinates } from '../store/actions/apiCallActions';

const DashboardViewModel = () => {
    const dispatch = useDispatch();
    return {
        sendCoordinates: (requestJson) => dispatch(sendCoordinates(requestJson))
    }

}

export default DashboardViewModel;
import { useSelector, useDispatch } from 'react-redux';
import { getGraphData } from '../store/actions/apiCallActions';

const GraphReportViewModel = () => {
    const dispatch = useDispatch();
    return {
        getGraphData: (userId, valueMonth, valueYear, value, requestJson) => dispatch(getGraphData(userId, valueMonth, valueYear, value, requestJson))
    }
}

export default GraphReportViewModel;
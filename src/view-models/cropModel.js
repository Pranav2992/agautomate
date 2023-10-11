import {useSelector, useDispatch} from 'react-redux';
import {
  addCropDetails,
  CropDetailsList,
  CropList,
} from '../store/actions/apiCallActions';

const CropViewmModel = () => {
  const dispatch = useDispatch();
  return {
    addCropDetails: requestJson => dispatch(addCropDetails(requestJson)),
    CropList: requestJson => dispatch(CropList(requestJson)),
    CropDetailsList: requestJson => dispatch(CropDetailsList(requestJson)),
  };
};

export default CropViewmModel;

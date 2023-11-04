import { useSelector, useDispatch } from 'react-redux';
import {
  addCropDetails,
  CropDetailsList,
  CropList,
  getCropVariety
} from '../store/actions/apiCallActions';

const CropViewmModel = () => {
  const dispatch = useDispatch();
  return {
    addCropDetails: requestJson => dispatch(addCropDetails(requestJson)),
    CropList: requestJson => dispatch(CropList(requestJson)),
    CropDetailsList: requestJson => dispatch(CropDetailsList(requestJson)),
    getCropVariety: requestJson => dispatch(getCropVariety(requestJson))
  };
};

export default CropViewmModel;

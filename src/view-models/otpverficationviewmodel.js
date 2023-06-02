import { useSelector, useDispatch } from 'react-redux';
import { accountActivation } from '../store/actions/apiCallActions';

const OTPVerificationViewModel = () => {
    const dispatch = useDispatch();

    return {
        accountActivation: (requestJson) => dispatch(accountActivation(requestJson))
    }
}

export default OTPVerificationViewModel;
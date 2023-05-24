import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from '../store/actions/apiCallActions';

const ForgotPasswordViewModel = () => {
    const dispatch = useDispatch();

    return {
        forgotPassword: (requestJson) => dispatch(forgotPassword(requestJson))
    }

}

export default ForgotPasswordViewModel;
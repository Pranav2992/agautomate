import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../store/actions/apiCallActions';

const LoginViewModel = () => {
    const dispatch = useDispatch();
    return {
        userLogin: (requestJson) => dispatch(userLogin(requestJson))
    }

}

export default LoginViewModel;
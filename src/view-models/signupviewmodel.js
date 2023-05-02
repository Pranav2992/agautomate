import { useSelector, useDispatch } from 'react-redux';
import { userRegisteration } from '../store/actions/apiCallActions';

const SignUpViewModel = () => {
    const dispatch = useDispatch();

    return {
        userRegisteration: (requestJson) => dispatch(userRegisteration(requestJson))
    }

}

export default SignUpViewModel;
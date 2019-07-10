import {createStackNavigator,createAppContainer} from 'react-navigation';
import LandingScreen from './screens/LandingScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';

const AppNavigator = createStackNavigator({

    Landing : {
        screen : LandingScreen
    },
    SignUp : {
        screen : SignUpScreen
    },
    SignIn : {
        screen : SignInScreen
    },
    Profile : {
        screen : ProfileScreen
    }

})

export default createAppContainer(AppNavigator);
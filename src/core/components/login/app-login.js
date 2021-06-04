import { setLogin } from "../../loginSubscription";

export const signin = (values, callback) => {

    setLogin(true)
    callback();
}
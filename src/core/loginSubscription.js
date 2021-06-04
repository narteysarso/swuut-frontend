let subscribers = [];


export const subscribeToLogin = (fn) =>{
    subscribers.push(fn);
    let unscribe = () => {
        subscribers = subscribers.filter(s => s != fn(getLogin(false)) )
    }

    return unscribe;
}


export const setLogin = (value) => {
    sessionStorage.setItem("Login", value)
    subscribers.forEach((fn) => fn(value));
}


export const getLogin = (defaultValue) => {
    const value = sessionStorage.getItem("Login");
    const bool = value ? value == "true" : null
    return bool || defaultValue;
}
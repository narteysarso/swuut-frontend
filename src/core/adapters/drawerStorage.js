var subscribers = {}; // {key: subscribers[]}

export const subscriber = (key, fn) => {
    if(!subscribers[key]){
        subscribers[key] = [];
    }
    subscribers[key].push(fn);
    let unscribe = () => {
        subscribers[key] = subscribers[key].filter(s => s != fn)
    }

    return unscribe
}

export const set = (key, value) => {
    localStorage.setItem(key, value);
    subscribers[key].forEach(s => s(value))
}

export const get = (key, defaultValue) => (
    JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue))
  )
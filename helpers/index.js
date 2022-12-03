export const loadFromLocalStorage = (key = 'persistentState') => {
    try {
        const serialisedState = localStorage.getItem(key);
        if (serialisedState) {
            return JSON.parse(serialisedState);
        } else {
            return undefined;
        }
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

export const saveToLocalStorage = (key = 'persistentState', state) => {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem(key, serialisedState);
    } catch (error) {
        console.log(error);
    }
};

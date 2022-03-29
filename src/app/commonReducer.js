const initialState = {

};

export default function common(state = initialState, action) {
    if (action.error === true) {
        return state;
    }
    switch (action.type) {
        default:
            return state;
    }
}
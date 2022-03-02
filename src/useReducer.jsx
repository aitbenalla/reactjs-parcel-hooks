export function reducer(state, action) {
    switch (action.type) {
        case 'inc':
            return {count: state.count + (action.payload || 1)}
        case 'dec':
            if (state.count <= 0)
                return state
            return {count: state.count - 1}
        case 'reset':
            return init(0)
        default:
            throw new Error('no action')
    }
}

export function init(initValue) {
    return {count: initValue}
}
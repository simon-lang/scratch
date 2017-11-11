export const flatten = (arr) => {
    return arr.reduce((previous, current) => {
        if (Array.isArray(current)) {
            return previous.concat(flatten(current))
        } else {
            return previous.concat([current])
        }
    }, [])
}

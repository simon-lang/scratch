items = [ // 15000
    { type: 'phone', name: 'iPhone', color: 'gold' }, //3
    { type: 'laptop', name: 'Chromebook', color: 'gray' },
    // ...
]

excludes = [ // 1000
    { k: 'color', v: 'gold' },
    { k: 'color', v: 'silver' },
    // ...
]

function applyFilters(items, excludes) {
    excludes.forEach(function (pair) {
        items = items.filter((item) => item[pair.k] !== pair.v);
    });
    return items;
}

// O(excludes * items)

// O(items * 3 * 1 * 1)

function applyFilters(items, _excludes) {
    // excludes = {
    //     'color': { 'gold': true, 'silver': true },
    // }
    let excludes = {}

    _excludes.forEach(({ k, v }) => {
        if (excludes[k] === undefined) {
            excludes[k] = {}
        }
        excludes[k][v] = true
    })

    return items.filter((item) => {
        _.each(item, (k, v) => {
            return !excludes[k] || !excludes[k][v]
        })
        return true
    });
}

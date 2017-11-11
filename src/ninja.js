Math.min.apply(Math, array)
Math.max.apply(Math, array)

var ninja = {
    yell: function (n) {
        return n > 0 ? arguments.callee(n - 1) + "a" : "hiy";
    }
};
assert(ninja.yell(4) == "hiyaaaa", "arguments.callee is the function itself.");


function loop(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn.call(array, i, array[i])
    }
}
var num = 0;
loop([0, 1, 2], function (value) {
    assert(value == num++, "Make sure the contents are as we expect it.");
    assert(this instanceof Array, "The context should be the full array.");
});


function User(first, last) {
    if (!(this instanceof arguments.callee))
        return new User(first, last);

    this.name = first + " " + last;
}


function merge(root) {
    for (var i = 1; i < arguments.length; i++)
        for (var key in arguments[i])
            root[key] = arguments[i][key];
    return root;
}

var merged = merge({ name: "John" }, { city: "Boston" });
assert(merged.name == "John", "The original name is intact.");
assert(merged.city == "Boston", "And the city has been copied over.");


function Ninja() { }
var ninja = new Ninja();
var ninjaB = new ninja.constructor();

assert(ninjaB instanceof Ninja, "Still a ninja object.");

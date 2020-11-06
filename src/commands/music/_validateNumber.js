module.exports = (n, min=undefined, max=undefined, type="int") => {
    if (isNaN(n)) return false;
    else if (min != undefined && n < min) return false;
    else if (max != undefined && n > max) return false;
    else return type == "int" ? parseInt(n) : n;
}
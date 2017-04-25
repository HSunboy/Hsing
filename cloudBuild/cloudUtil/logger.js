function nowTime() {
    var myDate = new Date();

    return (myDate.toLocaleDateString() + " " + myDate.toLocaleTimeString() + " " + myDate.getMilliseconds())

}


module.exports = function(text) {
    console.log(`[${nowTime()}]-- ` + text)
}
function waitForHigh () {
    images.iconImage(IconNames.SmallSquare).showImage(0, 0)
    while (go && pins.analogReadPin(pin) < threshold) {
        checkButtonB()
    }
}
input.onButtonPressed(Button.A, function () {
    led.stopAnimation()
    basic.clearScreen()
    go = true
})
function checkButtonB () {
    if (input.buttonIsPressed(Button.B)) {
        go = false
    }
}
function waitForLow () {
    images.iconImage(IconNames.Square).showImage(0)
    while (go && pins.analogReadPin(pin) >= threshold) {
        checkButtonB()
    }
}
function timeDifference (first: number, last: number) {
    if (last >= first) {
        return last - first
    }
    timemax = 1073741823
    return timemax + 1 - first + last
}
let time = 0
let timeHigh = 0
let timeLow = 0
let timemax = 0
let go = false
let threshold = 0
let pin = 0
pin = AnalogPin.P0
threshold = 800
go = false
basic.showString("A=GO B=STOP")
basic.forever(function () {
    if (go) {
        waitForLow()
        timeLow = input.runningTimeMicros()
        waitForHigh()
        timeHigh = input.runningTimeMicros()
        if (go) {
            time = timeDifference(timeLow, timeHigh)
        }
        go = false
    } else {
        basic.showNumber(time)
        basic.pause(200)
    }
})

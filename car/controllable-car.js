radio.onReceivedValue(function (name, value) {
    if (name == "forwardbackward") {
        speed = 255 * value
    } else if (name == "leftright") {
        if (value > 0) {
            leftbrake = 0
            rightbrake = value
        } else if (value < 0) {
            leftbrake = 0 - value
            rightbrake = 0
        }
    }
    leftWheelSpeed = speed * (1 - leftbrake)
    rightWheelSpeed = speed * (1 - rightbrake)
})
let rightbrake = 0
let leftbrake = 0
let speed = 0
let rightWheelSpeed = 0
let leftWheelSpeed = 0
basic.showIcon(IconNames.Happy)
radio.setGroup(1)
leftWheelSpeed = 0
rightWheelSpeed = 0
basic.forever(function () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, leftWheelSpeed)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, rightWheelSpeed)
})


radio.onReceivedValue(function (name, value) {
    if (name == "fb") {
        speed = 255 * value
        if (value > 0) {
            basic.showArrow(ArrowNames.North)
        } else if (value < 0) {
            basic.showArrow(ArrowNames.South)
        } else {
            basic.showIcon(IconNames.Diamond)
        }
    } else if (name == "lr") {
        if (value > 0) {
            leftbrake = 0.0
            rightbrake = value
            basic.showArrow(ArrowNames.West)
        } else if (value < 0) {
            leftbrake = Math.abs(value)
            rightbrake = 0.0
            basic.showArrow(ArrowNames.East)
        } else {
            basic.showIcon(IconNames.SmallDiamond)
        }
    } else {
        basic.showIcon(IconNames.Confused)
    }

    //basic.showString(name)
    //basic.pause(2000)
})
let rightbrake = 0.0
let leftbrake = 0.0
let speed = 0
let rightWheelSpeed = 0
let leftWheelSpeed = 0
basic.showIcon(IconNames.Happy)
radio.setGroup(1)
basic.forever(function () {
    leftWheelSpeed = speed * (1.0 - leftbrake)
    rightWheelSpeed = speed * (1.0 - rightbrake)
    let leftDir = leftWheelSpeed > 0 ? maqueen.Dir.CW : maqueen.Dir.CCW;
    let rightDir = rightWheelSpeed > 0 ? maqueen.Dir.CW : maqueen.Dir.CCW;

    maqueen.motorRun(maqueen.Motors.M1, leftDir, Math.min(255, Math.abs(leftWheelSpeed)))
    maqueen.motorRun(maqueen.Motors.M2, rightDir, Math.min(255, Math.abs(rightWheelSpeed)))
})


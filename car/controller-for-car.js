let x_cal = 0
let y_cal = 0
let joyx = 0
let joyy = 0
let ymin = 0
let xmin = 0
basic.showIcon(IconNames.House)
radio.setGroup(1)
let xmax = 1023
let ymax = 1023
let xcenter = (xmax - xmin) / 2
let ycenter = (ymax - ymin) / 2
let centertol = 100
basic.forever(function () {
    joyx = bitcommander.readJoystick(BCJoystick.X)
    x_cal = 0
    if (Math.abs(joyx - xcenter) > centertol) {
        x_cal = (joyx - xcenter) * 2 / (xmax - xmin)
    }
    // basic.showNumber(x_cal)
    // basic.pause(1000)
    radio.sendValue("lr", x_cal)
    if (x_cal > 0) {
        basic.showArrow(ArrowNames.East)
    } else if (x_cal < 0) {
        basic.showArrow(ArrowNames.West)
    } else {
        basic.showIcon(IconNames.Diamond)
    }
    y_cal = 0
    joyy = bitcommander.readJoystick(BCJoystick.Y)
    if (Math.abs(joyy - ycenter) > centertol) {
        y_cal = (joyy - ycenter) * 2 / (ymax - ymin)
    }
    // basic.showNumber(x_cal)
    // basic.pause(1000)
    radio.sendValue("fb", y_cal)
    if (y_cal > 0) {
        basic.showArrow(ArrowNames.North)
    } else if (y_cal < 0) {
        basic.showArrow(ArrowNames.South)
    } else {
        basic.showIcon(IconNames.SmallDiamond)
    }
    // Without the delay the messages seem to 
    // overwhelm the recipient and cause very laggy response.
    // Yes the LEDs are clearly not cycling 20 times per
    // second so something else in the code is really slow.
    // TODO: find out if it's the LEDs.
    basic.pause(50)
})


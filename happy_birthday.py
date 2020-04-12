from microbit import *
import music
import neopixel
import random
import radio

"""
Sends a happy birthday message to a Kitronic ZIP Halo-equipped microbit.

Uses a second microbit's a-button as the trigger.
Code developed on https://python.microbit.org/v/2.0

"""

LEDS_ON_HALO = 60

YOUR_NAME_HERE = "Joe"

zip_halo = neopixel.NeoPixel(pin8, LEDS_ON_HALO)

def color_ring(zh, color):
    for i in range(0,60):
        sleep(5) # Seems to be a race condition that without some pause the LEDs don't update?
        zh[i] = color
        zh.show()

def cycle_colors(zh, N):
    for i in range(0, N):
        col = (random.randint(0, 255),random.randint(0, 255),random.randint(0, 255))
        color_ring(zh, col)
     
def happy_birthday():
    display.show(Image.HEART)
    color_ring(zip_halo, (0, 0, 100))
    music.play(music.BIRTHDAY, pin14, True)
    cycle_colors(zip_halo, 5)
    color_ring(zip_halo, (20, 20, 0)) # easier on the eyes
    display.scroll("Happy Birthday %s!" % YOUR_NAME_HERE)
    sleep(100)
    zip_halo.clear()
    display.show(Image.HAPPY)
    sleep(5000)
    display.clear()
    
radio.on()

while True:
    if button_a.was_pressed():
        radio.send("hb")
    incoming = radio.receive()
    if incoming == "hb":
        happy_birthday()
    




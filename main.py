light2 = 0
noise = 0
pins.servo_write_pin(AnalogPin.P1, 0)
led.enable(False)
strip = neopixel.create(DigitalPin.P3, 1, NeoPixelMode.RGB)
led.enable(False)
pins.set_pull(DigitalPin.P6, PinPullMode.PULL_UP)
OLED.init(128, 64)
pins.servo_write_pin(AnalogPin.P1, 180)
open2 = False

def on_forever():
    global noise, light2, open2
    noise = smarthome.read_noise(AnalogPin.P2)
    if noise > 70:
        pins.servo_write_pin(AnalogPin.P1, 0)
        basic.pause(2000)
    else:
        pins.servo_write_pin(AnalogPin.P1, 0)
        basic.pause(2000)
    light2 = smarthome.read_light_intensity(AnalogPin.P4)
    if light2 > 50:
        noise = smarthome.read_noise(AnalogPin.P2)
        if noise:
            strip.show_color(neopixel.colors(NeoPixelColors.WHITE))
            basic.pause(10000)
            strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
    if pins.analog_read_pin(AnalogPin.P5) > 500:
        music.start_melody(music.built_in_melody(Melodies.DADADADUM),
            MelodyOptions.ONCE)
        pins.digital_write_pin(DigitalPin.P5, 1)
        basic.pause(1000)
    else:
        pins.digital_write_pin(DigitalPin.P5, 0)
        basic.pause(1000)
    noise = smarthome.read_noise(AnalogPin.P2)
    if noise > 70:
        OLED.clear()
        OLED.write_string("Alguien se ha ido")
        basic.pause(1000)
    if pins.digital_read_pin(DigitalPin.P2) == 0:
        open2 = not (False)
        if open2 == True:
            pins.servo_write_pin(AnalogPin.P2, 180)
            basic.pause(3000)
    else:
        pins.servo_write_pin(AnalogPin.P2, 180)
        OLED.clear()
        OLED.write_string("nadie")
        basic.pause(1000)
basic.forever(on_forever)

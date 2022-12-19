let light2 = 0
let noise = 0
pins.servoWritePin(AnalogPin.P1, 0)
led.enable(false)
let strip = neopixel.create(DigitalPin.P3, 1, NeoPixelMode.RGB)
led.enable(false)
pins.setPull(DigitalPin.P6, PinPullMode.PullUp)
OLED.init(128, 64)
pins.servoWritePin(AnalogPin.P1, 180)
let open2 = false
basic.forever(function on_forever() {
    
    noise = smarthome.ReadNoise(AnalogPin.P2)
    if (noise > 70) {
        pins.servoWritePin(AnalogPin.P1, 0)
        basic.pause(2000)
    } else {
        pins.servoWritePin(AnalogPin.P1, 0)
        basic.pause(2000)
    }
    
    light2 = smarthome.ReadLightIntensity(AnalogPin.P4)
    if (light2 > 50) {
        noise = smarthome.ReadNoise(AnalogPin.P2)
        if (noise) {
            strip.showColor(neopixel.colors(NeoPixelColors.White))
            basic.pause(10000)
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
        }
        
    }
    
    if (pins.analogReadPin(AnalogPin.P5) > 500) {
        music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
        pins.digitalWritePin(DigitalPin.P5, 1)
        basic.pause(1000)
    } else {
        pins.digitalWritePin(DigitalPin.P5, 0)
        basic.pause(1000)
    }
    
    noise = smarthome.ReadNoise(AnalogPin.P2)
    if (noise > 70) {
        OLED.clear()
        OLED.writeString("Alguien se ha ido")
        basic.pause(1000)
    }
    
    if (pins.digitalReadPin(DigitalPin.P2) == 0) {
        open2 = !false
        if (open2 == true) {
            pins.servoWritePin(AnalogPin.P2, 180)
            basic.pause(3000)
        }
        
    } else {
        pins.servoWritePin(AnalogPin.P2, 180)
        OLED.clear()
        OLED.writeString("nadie")
        basic.pause(1000)
    }
    
})

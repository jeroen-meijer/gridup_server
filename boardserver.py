#!/usr/bin/python

import RPi.GPIO as GPIO
import smbus
import time
import board
import neopixel
from flask import Flask, jsonify, make_response, request

isElevated = False

elevationPin1 = 23
elevationPin2 = 24
elevationEnable = 25

GPIO.setmode(GPIO.BCM)
GPIO.setup(elevationPin1, GPIO.OUT)
GPIO.setup(elevationPin2, GPIO.OUT)
GPIO.setup(elevationEnable, GPIO.OUT)

app = Flask(__name__)

# 0 = /dev/i2c-0 (port I2C0), 1 = /dev/i2c-1 (port I2C1)
bus = smbus.SMBus(1)

ORDER = neopixel.RGBW
pixels = neopixel.NeoPixel(board.D18, 19, pixel_order=ORDER)
pixels.fill((0, 255, 0, 0))

DEVICE_ADDRESS = 0x26  # 7 bit address (will be left shifted to add the read $
DEVICE_REG_MODE1 = 0x00
DEVICE_REG_BLANC = 0x00
DEVICE_REG_COLOR = 0x01
DEVICE_REG_ROLL_DICE = 0x02
DEVICE_REG_ELEVATION = 0x03

ADDRESS_LIST = [
    [[18, 0], [12, 0], [11, 0], [4, 0], [0x28, 1]],
    [[0x27, 1], [13, 0], [10, 0], [5, 0], [3, 0]],
    [[17, 0], [14, 0], [0x26, 1], [6, 0], [2, 0]],
    [[0x29, 1], [15, 0], [9, 0], [7, 0], [1, 0]],
    [[16, 0], [0x30, 1], [8, 0], [0x31, 1], [0, 0]]
]

def elevate(up):
    if (up):
        GPIO.output(elevationPin1, GPIO.HIGH)
        GPIO.output(elevationPin2, GPIO.LOW)
    else:
        GPIO.output(elevationPin1, GPIO.LOW)
        GPIO.output(elevationPin2, GPIO.HIGH)
    GPIO.output(elevationEnable, GPIO.HIGH)
    time.sleep(1/3)
    GPIO.output(elevationEnable, GPIO.LOW)
    
@app.route('/setGameState', methods=['POST'])
def set_game_state():
    state = request.get_json(force=True)
    for x in range(0, 5):
        for y in range(0, 5):
            print('Fetching color data for [' + str(x) + ',' + str(y) + ']')
            tileData = colorData = state['board'][x][y]
            colorData = tileData['color']
            colorPayload = [colorData['r'], colorData['g'], colorData['b']]
            print('colorPayload: ' + str(colorPayload))
            print('ADDRESS_LIST[x][y][1]: ' + str(ADDRESS_LIST[x][y][1]))
            address = ADDRESS_LIST[x][y][0]
            if(ADDRESS_LIST[x][y][1] == 1):
                print('Writing block...')
                print('address: ' + str(address))
                try:
                    bus.write_i2c_block_data(
                        address, DEVICE_REG_COLOR, colorPayload)
                    time.sleep(1/100)
                except OSError as e:
                    print('!!! Failed to write to address ' +
                          str(address) + '. Error: ' + str(e))
            else:
                pixels[address] = (
                    colorData['g'], colorData['r'], colorData['b'], 0)
            print('---------')
    print('--- DONE ---')
    return make_response(jsonify({'success': True}))


@app.route('/rollDice/<value>', methods=['GET'])
def roll_dice(value):
    number = int(value)
    ledoutValues = [number, 0x00, 0x00]
    bus.write_i2c_block_data(
        DEVICE_ADDRESS, DEVICE_REG_ROLL_DICE, ledoutValues)
    return make_response(jsonify({'success': True}))


@app.route('/setTileElevated/<value>', methods=['GET'])
def set_tile_elevated(value):
    elevated = int(value) == 1
    print('elevated: ' + str(elevated))
    global isElevated
    if (elevated == isElevated):
        print('Elevation was the same. Doing nothing.')
    else:
        print('Elevation has changed. Performing change...')
        isElevated = elevated
        elevate(elevated)

    return make_response(jsonify({'success': True}))


if __name__ == '__main__':
    app.run(host='localhost', port=6969)

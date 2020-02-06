def set_tile_elevated(value):
    elevated = int(value) == 1
    print('elevated: ' + str(elevated))
    with open('config.txt', 'w+') as s:
        pass
    with open('config.txt', 'r+') as s:
        s.seek(0)
        content = s.readline(1)
        print('content: ' + str(content))
        savedVal = content == '1'
        print('savedVal: ' + str(savedVal))
        if (elevated == savedVal):
            print('Same')
        else:
            print('Changed')
            s.seek(0)
            s.write('1' if elevated else '0')
            print('Do stuff here...')

    return 'Done'


if __name__ == '__main__':
    set_tile_elevated(1)

from flask import Flask, jsonify;
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'

socketIo = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = '0.0.0.0'


@socketIo.on("message")
def handleMessage(msg):
    print(msg)
    # use send only after confirming not every time
    # send("aaaa", broadcast=True)
    return None

@socketIo.on("image")
def handleMessage(img):
    print("hello")
    # use send only after confirming not every time
    # send("aaaa", broadcast=True)
    return None

if __name__ == '__main__':
    socketIo.run(app)
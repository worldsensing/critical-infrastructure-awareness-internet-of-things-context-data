from threading import Thread

import paho.mqtt.client as mqtt

from config import Settings

TTS_MQTT_HOST_BROKER = Settings.TTS_MQTT_HOST_BROKER
TTS_MQTT_PORT_BROKER = Settings.TTS_MQTT_PORT_BROKER
TTS_MQTT_USER = Settings.TTS_MQTT_USER
TTS_MQTT_PASS = Settings.TTS_MQTT_PASS
TTS_APPLICATION_ID = Settings.TTS_APPLICATION_ID
TTS_DEVICE_ID = Settings.TTS_DEVICE_ID

keepalive = 60

broker_topic = f"v3/{TTS_APPLICATION_ID}/devices/{TTS_DEVICE_ID}/up"


def on_connect(client, userdata, flags, rc):
    if rc == 3:
        print("Connection Error: Server Unavailable")
        return
    elif rc == 4:
        print("Connection Error: Bad Credentials")
        return
    elif rc == 5:
        print("Connection Error: Unauthorized")
        return

    if rc == 0:
        print("Connected to MQTT Broker")
        print(f"Subscribing to Topic: {broker_topic}")
        client.subscribe(broker_topic)
    else:
        print(f"Bad connection to MQTT Broker: Error code is {rc}")


def on_message(client, userdata, msg):
    print("MQTT Message Received")
    print(msg.payload.decode())


def mqtt_subscriptor():
    client.on_message = on_message
    client.loop_forever()


if __name__ == "__main__":
    print("Starting MQTT Subscriber...")

    client = mqtt.Client()
    client.username_pw_set(username=TTS_MQTT_USER, password=TTS_MQTT_PASS)
    print("Connecting to MQTT Broker...")
    client.connect(host=TTS_MQTT_HOST_BROKER, port=TTS_MQTT_PORT_BROKER, keepalive=keepalive)
    client.on_connect = on_connect

    thread = Thread(target=mqtt_subscriptor)
    thread.start()

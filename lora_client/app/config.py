import os
from pathlib import Path

from dotenv import load_dotenv

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)


class Settings:
    TTS_MQTT_HOST_BROKER: str = os.getenv("TTS_MQTT_HOST_BROKER", "host.com")
    TTS_MQTT_PORT_BROKER: int = int(os.getenv("TTS_MQTT_PORT_BROKER", 1883))
    TTS_MQTT_USER: str = os.getenv("TTS_MQTT_USER", "user1")
    TTS_MQTT_PASS: str = os.getenv("TTS_MQTT_PASS", "pass1")
    TTS_APPLICATION_ID: str = os.getenv("TTS_APPLICATION_ID", "XYZ-STR-STR")
    TTS_DEVICE_ID: str = os.getenv("TTS_DEVICE_ID", "ls-12345")


settings = Settings()

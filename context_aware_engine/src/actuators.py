import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from src import SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_EMAIL_SENDER


def send_email(recipient: str, message: str):
    config = {
        "hostname": SMTP_HOST,
        "port": 2525,
        "username": SMTP_USER,
        "password": SMTP_PASS,
        "use_tls": True,
    }
    sender = SMTP_EMAIL_SENDER

    msg = MIMEMultipart('mixed')
    msg['Subject'] = 'Actuation from TOCA'
    msg['From'] = sender
    msg['To'] = recipient
    msg.attach(MIMEText(message, 'plain'))

    print(f"Sending email to {recipient}...")

    server = smtplib.SMTP(config["hostname"], config["port"])
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(config["username"], config["password"])
    server.sendmail(sender, recipient, msg.as_string())
    print("Email sent")


def send_http():
    print("This a dummy function to actually send an HTTP request")

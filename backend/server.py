import os
import smtplib
import ssl
import traceback
import certifi
from email.message import EmailMessage
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv


# Resolve project root (folder containing index.html)
BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BACKEND_DIR.parent

# Load .env if present
load_dotenv(PROJECT_ROOT / '.env')

SMTP_HOST = os.getenv('SMTP_HOST', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '465'))
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')

app = Flask(
    __name__,
    static_folder=str(PROJECT_ROOT),  # serve existing static files (css, js, images)
    static_url_path=''                # so /css/... works
)
cors_origins = os.getenv('CORS_ORIGINS')  # e.g., http://localhost:8000,http://localhost:5050
CORS(app, resources={r"/api/*": {"origins": cors_origins.split(',') if cors_origins else "*"}})


@app.route('/')
def index():
    return send_from_directory(str(PROJECT_ROOT), 'index.html')


@app.post('/api/contact')
def contact():
    data = request.get_json(silent=True) or {}
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()
    subject = (data.get('subject') or '').strip()
    message = (data.get('message') or '').strip()

    # Validate inputs
    if not all([name, email, subject, message]):
        return jsonify({
            'ok': False,
            'error': 'Missing required fields.'
        }), 400

    # Validate SMTP config
    if not (SMTP_USER and SMTP_PASS):
        return jsonify({
            'ok': False,
            'error': 'SMTP is not configured on the server.'
        }), 500

    # Build email
    to_addr = SMTP_USER  # send to yourself
    email_msg = EmailMessage()
    email_msg['From'] = f"Portfolio Contact <{SMTP_USER}>"
    email_msg['To'] = to_addr
    email_msg['Subject'] = f"Portfolio Contact: {subject}"
    email_msg['Reply-To'] = email  # so you can reply directly

    body = (
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        f"{message}\n"
    )
    email_msg.set_content(body)

    # Send via SMTP (Gmail)
    try:
        # Preferred: SMTPS with trusted CA bundle
        ssl_ctx = ssl.create_default_context(cafile=certifi.where())
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=ssl_ctx) as server:
            password = SMTP_PASS.replace(' ', '') if SMTP_PASS else SMTP_PASS
            server.login(SMTP_USER, password)
            server.send_message(email_msg)
    except Exception as exc_ssl:
        print('SMTP SSL failed, attempting STARTTLS:', exc_ssl)
        print(traceback.format_exc())
        try:
            # Fallback: STARTTLS on 587
            with smtplib.SMTP(SMTP_HOST, 587) as server:
                server.ehlo()
                starttls_ctx = ssl.create_default_context(cafile=certifi.where())
                server.starttls(context=starttls_ctx)
                server.ehlo()
                password = SMTP_PASS.replace(' ', '') if SMTP_PASS else SMTP_PASS
                server.login(SMTP_USER, password)
                server.send_message(email_msg)
        except Exception as exc_tls:
            print('SMTP STARTTLS failed:', exc_tls)
            print(traceback.format_exc())
            return jsonify({
                'ok': False,
                'error': f'Failed to send email via SSL and STARTTLS: {exc_tls.__class__.__name__}: {str(exc_tls)}'
            }), 500

    return jsonify({'ok': True})


if __name__ == '__main__':
    port = int(os.getenv('PORT', '5000'))
    app.run(host='0.0.0.0', port=port, debug=True)

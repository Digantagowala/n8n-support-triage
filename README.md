# N8N Support Ticket Triage Automation

## 1. How to Run n8n (Docker)
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n

Open: http://localhost:5678

## 2. How to Install the Custom Node
cd custom-node/TicketClassifierNode
npm install --ignore-scripts
npm run build
docker cp dist n8n:/home/node/.n8n/custom/
docker restart n8n

## 3. Required Credentials
- SLACK_BOT_TOKEN — xoxb- token from api.slack.com
- GOOGLE_SHEETS_OAUTH — Client ID + Secret from Google Cloud Console
- SHEET_ID — Your Google Sheet ID

## 4. How to Replay Sample Payloads
bash replay.sh

## 5. Classification Rules
| Keywords | Category | Priority |
|---|---|---|
| refund, invoice, charge, payment | billing | high |
| crash, error, broken, 500 | bug | high |
| feature, suggest, enhancement | feature_request | medium |
| (no match) | general | low |

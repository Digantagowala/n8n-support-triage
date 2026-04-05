\# N8N Support Ticket Triage Automation



\## 1. How to Run n8n (Docker)

```bash

docker run -it --rm --name n8n -p 5678:5678 -v n8n\_data:/home/node/.n8n n8nio/n8n

```

Open: http://localhost:5678



\## 2. How to Install the Custom Node

```bash

cd custom-node/TicketClassifierNode

npm install --ignore-scripts

npm run build

docker cp dist n8n:/home/node/.n8n/custom/

docker restart n8n

```



\## 3. Required Credentials

\- SLACK\_BOT\_TOKEN — xoxb- token from api.slack.com

\- GOOGLE\_SHEETS\_OAUTH — Client ID + Secret from Google Cloud Console

\- SHEET\_ID — Your Google Sheet ID



\## 4. How to Replay Sample Payloads

```bash

bash replay.sh

```

Or manually:

```bash

curl -X POST http://localhost:5678/webhook/support-ticket \\

&#x20; -H "Content-Type: application/json" \\

&#x20; -d @samples/billing\_01.json

```



\## 5. Classification Rules

| Keywords | Category | Priority |

|---|---|---|

| refund, invoice, charge, payment | billing | high |

| crash, error, broken, 500 | bug | high |

| feature, suggest, enhancement | feature\_request | medium |

| (no match) | general | low |


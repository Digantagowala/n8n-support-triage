#!/bin/bash
WEBHOOK_URL="http://localhost:5678/webhook/support-ticket"

echo "Sending billing_01..."
curl -s -X POST $WEBHOOK_URL -H "Content-Type: application/json" -d @samples/billing_01.json

echo "Sending billing_02..."
curl -s -X POST $WEBHOOK_URL -H "Content-Type: application/json" -d @samples/billing_02.json

echo "Sending bug_01..."
curl -s -X POST $WEBHOOK_URL -H "Content-Type: application/json" -d @samples/bug_01.json

echo "Sending bug_02..."
curl -s -X POST $WEBHOOK_URL -H "Content-Type: application/json" -d @samples/bug_02.json

echo "Sending feature_01..."
curl -s -X POST $WEBHOOK_URL -H "Content-Type: application/json" -d @samples/feature_01.json

echo "Sending feature_02..."
curl -s -X POST $WEBHOOK_URL -H "Content-Type: application/json" -d @samples/feature_02.json

echo "Sending general_01..."
curl -s -X POST $WEBHOOK_URL -H "Content-Type: application/json" -d @samples/general_01.json

echo "Sending general_02 (DUPLICATE)..."
curl -s -X POST $WEBHOOK_URL -H "Content-Type: application/json" -d @samples/general_02.json

echo "Done!"
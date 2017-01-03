request.post({
    url: "https://api.kik.com/v1/config",
    auth: {
        user: "zeus_bot2",
        pass: "bf22e40e-2807-4a2e-9694-04130e2f8263"
    },

    json: {
        "webhook": "https://example.com/incoming",
        "features": {
            "receiveReadReceipts": false,
            "receiveIsTyping": false,
            "manuallySendReadReceipts": false,
            "receiveDeliveryReceipts": false
        }
}, callback);
request.get({
    url: "https://api.kik.com/v1/config",
    auth: {
      user: "zeus_bot2",
      pass: "bf22e40e-2807-4a2e-9694-04130e2f8263"
    }
}, callback);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { telegramID, message } = req.body;

            if (!telegramID || !message) {
                return res.status(400).json({ error: "Missing parameters" });
            }

            const telegramToken = process.env.TELEGRAM_TOKEN;
            console.log(telegramToken);
            const telegramAPI_URL = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

            const response = await fetch(telegramAPI_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: telegramID,
                    text: message
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(data))
            }

            return res.status(200).json({ message: "Message sent successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}
import Mailjet from 'node-mailjet'
import { setHeader } from 'h3'

export default defineEventHandler(async (event) => {
	// Set CORS headers
	setHeader(event, 'Access-Control-Allow-Origin', '*') // Adjust origin as needed
	setHeader(event, 'Access-Control-Allow-Methods', 'POST')
	setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type')

	const body = await readBody(event)

	if (body) {
		const { name, email, message } = body
		console.log({ name, email, message })

		function newLine(str) {
			return str.replace(/(?:\r\n|\r|\n)/g, '<br>')
		}

		const emailBody = `<strong>${name}</strong> sent you this message:
		<br /><br />
		${newLine(message)}
		<br /><br />
		--- <br />
		Reply directly to <strong>${name}</strong> at <a href="mailto:${email}">${email}</a>`

		const mailjet = Mailjet.apiConnect(
			process.env.MAILJET_API_KEY,
			process.env.MAILJET_API_SECRET
		)

		try {
			const result = await mailjet
				.post('send', { version: 'v3.1' })
				.request({
					Messages: [
						{
							From: {
								Email: "noreply@arnav.blog",
								Name: "Website Contact Form"
							},
							ReplyTo: {
								Email: email,
								Name: name
							},
							To: [
								{
									Email: "hi@arnav.blog",
									Name: "Arnav"
								}
							],
							Subject: `${name} sent you a message via website`,
							TextPart: `${name} (${email}) sent you this message:\n\n${message}`,
							HTMLPart: emailBody,
							Headers: {
								"Reply-To": `${name} <${email}>`
							}
						}
					]
				})

			console.log('Email sent:', result.body)
			return { body, message: 'Success', error: false }
		} catch (error) {
			console.error('Email error:', error)
			return { body, message: error.message || 'Unknown error', error: true }
		}
	} else {
		return { message: 'Only POST requests are accepted.' }
	}
})
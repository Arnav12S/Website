import Mailjet from 'node-mailjet'
import { setHeader, readBody } from 'h3'

export default defineEventHandler(async (event) => {
	// Set CORS headers
	setHeader(event, 'Access-Control-Allow-Origin', '*')
	setHeader(event, 'Access-Control-Allow-Methods', 'POST')
	setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type')

	const body = await readBody(event)

	if (!body) {
		console.warn('No body in the request.')
		return { message: 'Only POST requests with body are accepted.', error: true }
	}

	const { name, email, message } = body
	console.log('Received form data:', { name, email, message })

	// Validate environment variables
	if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_API_SECRET) {
		console.error('Missing Mailjet credentials')
		return { 
			message: 'Server configuration error', 
			error: true 
		}
	}

	try {
		// Initialize Mailjet client using the older method
		const mailjet = Mailjet.apiConnect(
			process.env.MAILJET_API_KEY,
			process.env.MAILJET_API_SECRET
		)

		const result = await mailjet.post('send', { version: 'v3.1' }).request({
			Messages: [{
				From: {
						Email: "noreply@arnav.blog",
						Name: "Website Contact Form"
				},
				To: [{
					Email: "hi@arnav.blog",
					Name: "Arnav"
				}],
				Subject: `${name} sent you a message via website`,
				TextPart: `${name} (${email}) sent you this message:\n\n${message}`,
				HTMLPart: `<strong>${name}</strong> sent you this message:<br/><br/>${message.replace(/\n/g, '<br/>')}<br/><br/>Reply directly to <strong>${name}</strong> at <a href="mailto:${email}">${email}</a>`,
				Headers: {
					"Reply-To": `${name} <${email}>`
				}
			}]
		})

		console.log('Email sent successfully:', result.body)
		return { success: true, message: 'Message sent successfully', error: false }
	} catch (error) {
		console.error('Failed to send email:', error)
		return { 
			message: `Failed to send message: ${error.message}`, 
			error: true 
		}
	}
})
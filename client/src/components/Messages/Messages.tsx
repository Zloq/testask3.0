import { default as React } from 'react'
import styles from '../Messages/Messages.module.css'

interface User {
	name: string
}

interface Message {
	user: User
	message: string
	timestamp?: string
}

interface MessagesProps {
	messages: Message[]
	name: string
}

const Messages: React.FC<MessagesProps> = ({ messages, name }) => {
	return (
		<div className={styles.messages}>
			{messages.map(({ user, message, timestamp }, i) => {
				const itsMe =
					user.name.trim().toLowerCase() === name.trim().toLowerCase()
				const className = itsMe ? styles.me : styles.other
				return (
					<div key={i} className={`${styles.message} ${className}`}>
						<div className={styles.text}>
							<p>
								<span className={styles.user}>{user.name}</span>
							</p>
							{message}
							{timestamp && (
								<p>
									<span className={styles.timestamp}>{timestamp}</span>
								</p>
							)}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Messages

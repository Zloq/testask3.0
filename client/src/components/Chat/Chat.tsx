import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import style from '../Chat/Chat.module.css'
import Messages from '../Messages/Messages.tsx'

const socket = io('http://localhost:5000')

function Chat() {
	const navigate = useNavigate()
	const [state, setState] = useState<
		{ user: { name: string }; message: string; timestamp?: string }[]
	>([])
	const [message, setMessage] = useState<string>('')
	const { search } = useLocation()
	const [params, setParams] = useState<{ room: string; name: string }>({
		room: '',
		name: '',
	})
	const [users, setUsers] = useState<number>(0)

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search))
		setParams(searchParams as { room: string; name: string })
		socket.emit('join', searchParams)
	}, [search])

	useEffect(() => {
		socket.on('message', ({ data }) => {
			const timestamp = new Date().toLocaleString()
			setState(prevState => [{ ...data, timestamp }, ...prevState])
		})
	}, [])

	useEffect(() => {
		socket.on('joinRoom', ({ data: { users } }) => {
			setUsers(users.length)
		})
	}, [])

	const leftRoom = () => {
		socket.emit('leftRoom', { params })
		navigate('/')
	}

	const handleChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => setMessage(value)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!message) return
		socket.emit('sendMessage', { message, params })
		setMessage('')
	}

	return (
		<section>
			<div className={style.wrap}>
				<div className={style.header}>
					<div className={style.title}>{params.room}</div>
					<div className={style.users}>{users} users in this room</div>
					<button
						type='button'
						className={style.button_left}
						onClick={leftRoom}
					>
						Left the room
					</button>
				</div>
				<div className={style.messages}>
					<Messages messages={state} name={params.name} />
				</div>
				<form className={style.form} onSubmit={handleSubmit}>
					<div className={style.input}>
						<input
							type='text'
							name='message'
							value={message}
							placeholder='Начать писать'
							required
							autoComplete='off'
							onChange={handleChange}
						/>
					</div>
					<div className={style.but}>
						<input type='submit' value='Send a message' />
					</div>
				</form>
			</div>
		</section>
	)
}

export default Chat

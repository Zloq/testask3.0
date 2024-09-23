import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../Main/Main.module.css'

const Main: React.FC = () => {
	const [name, setName] = useState('')
	const [room, setRoom] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		if (name === 'name') {
			setName(value)
		} else {
			setRoom(value)
		}
	}

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!name || !room) {
			e.preventDefault()
		}
	}

	return (
		<section>
			<div className={style.Form_Box}>
				<div className={style.Form_Value}>
					<form action=''>
						<h2>Авторизация</h2>
						<div className={style.Input_Box}>
							<input
								type='text'
								name='name'
								value={name}
								required
								autoComplete='off'
								onChange={handleChange}
							/>
							<label htmlFor='Text'>Имя</label>
						</div>
						<div className={style.Input_Box}>
							<input
								type='text'
								name='room'
								value={room}
								required
								autoComplete='off'
								onChange={handleChange}
							/>
							<label htmlFor=''>Комната</label>
						</div>
						<Link onClick={handleClick} to={`/chat?name=${name}&room=${room}`}>
							<button type='submit' className={style.button}>
								Войти
							</button>
						</Link>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Main

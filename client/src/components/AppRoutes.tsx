import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Chat from './Chat/Chat.tsx'
import Main from './Main/Main.tsx'

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/chat' element={<Chat />} />
		</Routes>
	)
}

export default AppRoutes

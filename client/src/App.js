import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ExpenseTracker from './ExpenseTracker'

const App = () => {
  return (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home/>}/>
			<Route path='/login' element={<Login/>}/>
			<Route path='/Register' element={<Register/>}/>
			<Route path="/expenses" element={<ExpenseTracker />} />
		</Routes>
	</BrowserRouter>
  )
}
export default App
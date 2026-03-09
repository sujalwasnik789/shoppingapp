import { useState } from 'react'
import './App.css'
import { PasswordField } from './PasswordField'

function App() {
	const [password, setPassword] = useState<string>('sujal')
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const handlePasswordChange = (value: string) => {
		setPassword(value)
	}
  console.log(password);
	const handleToggleShow = () => {
		setShowPassword((prev) => !prev)
	}

	return (
		<div className="app">
			<h1>Password Toggle</h1>
			<PasswordField
				password={password}
				showPassword={showPassword}
				onPasswordChange={handlePasswordChange}
				onToggleShow={handleToggleShow}
			/>
		</div>
	)
}

export default App
interface PasswordFieldProps {
  password: string
  showPassword: boolean
  onPasswordChange: (value: string) => void
  onToggleShow: () => void
}

export function PasswordField({
  password,
  showPassword,
  onPasswordChange,
  onToggleShow,
}: PasswordFieldProps) {
  return (
    <div className="password-field">
      <input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(event) => onPasswordChange(event.target.value)}
        placeholder="Enter password"
      />
      <button type="button" onClick={onToggleShow}>
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  )
}

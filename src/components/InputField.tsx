import styled from 'styled-components/native'
import theme from '../styles/theme'

interface InputFieldProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#717171"
    />
  )
}

const StyledInput = styled.TextInput`
  width: 100%;
  border: 1px solid ${theme.colors.primaryBlue};
  border-radius: 6px;
  padding: 16px;
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.primaryBlue};
`

export default InputField

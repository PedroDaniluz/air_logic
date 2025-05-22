import styled from 'styled-components/native';
import { Pressable } from 'react-native';
import theme from '../styles/theme';

interface LoginButtonProps {
  filled?: boolean;
  text: string;
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  text,
  filled = true
}) => {
  return (
    <Pressable onPress={onClick}>
      {({ pressed }) => (
        <StyledButton filled={filled} pressed={pressed}>
          <ButtonText filled={filled}>{text}</ButtonText>
        </StyledButton>
      )}
    </Pressable>
  );
};

const StyledButton = styled.View<{ filled: boolean; pressed: boolean }>`
  width: 100%;
    background-color: ${({ filled, pressed }) =>
      filled
        ? pressed
          ? 'black'
          : theme.colors.primaryBlue
        : 'transparent'};
    border: ${({ filled }) => (filled ? 'none' : `2px solid ${theme.colors.primaryBlue}`)};
    padding: 16px 0;
    border-radius: 6px;
    align-items: center;
    opacity: ${({ pressed }) => (pressed ? 0.8 : 1)};
`;

const ButtonText = styled.Text<{ filled: boolean }>`
  color: ${({ filled }) => (filled ? theme.colors.background : theme.colors.primaryBlue)};
  font-family: ${theme.fonts.bold};
  font-size: 14px;
`;

export default LoginButton;

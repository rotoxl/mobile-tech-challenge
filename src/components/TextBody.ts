import styled from 'styled-components/native';
import theme from '../theme';

const TextBody = styled.Text`
  ${theme.typography.body};
  margin: 0;
  color: ${theme.palette.text.primary};
  text-align: center;
`;

export default TextBody;

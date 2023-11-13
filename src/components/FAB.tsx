import styled from 'styled-components/native';
import theme, { Spacing } from '../theme';

const FAB = styled.Pressable`
  border-radius: 50px;
  width: 50px;
  height: 50px;

  background: ${theme.palette.attention.light};

  position: absolute;
  right: ${theme.spacing(Spacing.xl)};
  bottom: ${theme.spacing(Spacing.xl)};

  justify-content: center;
  align-items: center;
`;

export default FAB;

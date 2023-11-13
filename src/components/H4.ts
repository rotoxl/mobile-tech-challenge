import styled from 'styled-components/native';
import theme, { Spacing } from '../theme';

const H4 = styled.Text`
  ${theme.typography.h4};
  margin: 0;
  margin-bottom: ${theme.spacing(Spacing.xl)};
  color: ${theme.palette.text.primary};
`;

export default H4;

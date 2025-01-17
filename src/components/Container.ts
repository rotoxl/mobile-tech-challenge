import styled from 'styled-components/native';
import theme, { Spacing } from '../theme';

const Container = styled.View`
  padding-horizontal: ${theme.spacing(Spacing.l)};
  background: ${theme.palette.background.body};
  flex: 1;
`;

export default Container;

import styled from 'styled-components/native';
import theme, { Spacing } from '../theme';

const RootContainer = styled.SafeAreaView`
  padding-top: ${theme.spacing(Spacing.xl)};
  background: ${theme.palette.background.body};
  flex: 1;
`;

export default RootContainer;

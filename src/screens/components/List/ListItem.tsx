import React from 'react';
import { Pressable } from 'react-native';
import H6 from '../../../components/H6';
import { Tournament } from '../../../features/tournament/tournamentSlice';
import theme, { Spacing } from '../../../theme';
import styled from 'styled-components/native';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type ListItemProps = {
  tournament: Tournament;
  index: number;
  onPress: () => void;
};

export const ListItem = ({ tournament, index, onPress }: ListItemProps) => {
  const isEven = index % 2 === 0;

  const content = (
    <Pressable onPress={onPress}>
      <>
        <Avatar>
          <MCIcon
            name="toy-brick"
            size={20}
            color={theme.palette.text.primary}
          />
        </Avatar>
        <TitleContainer>
          <H6 numberOfLines={2}>{tournament.game}</H6>
        </TitleContainer>
      </>
    </Pressable>
  );

  if (isEven) {
    return <ListItemContainerEven>{content}</ListItemContainerEven>;
  } else {
    return <ListItemContainerOdd>{content}</ListItemContainerOdd>;
  }
};

const ListItemContainerOdd = styled.View`
  margin-left: ${theme.spacing(Spacing.s)};
  margin-bottom: ${theme.spacing(Spacing.m)};
  padding: ${theme.spacing(Spacing.s)};
  background: ${theme.palette.background.alt1};
  border-radius: 4px;
  flex: 1;
`;

const ListItemContainerEven = styled(ListItemContainerOdd)`
  margin-left: 0px;
  margin-right: ${theme.spacing(Spacing.s)};
`;

const Avatar = styled.View`
  align-self: center;
  margin-vertical: ${theme.spacing(Spacing.xl)};
  border-radius: 100px;
  height: 60px;
  width: 60px;
  background: ${theme.palette.background.alt2};
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.View`
  height: 60px;
`;

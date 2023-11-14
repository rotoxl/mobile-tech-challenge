import React from 'react';
import { Pressable } from 'react-native';
import H6 from '../../../components/H6';
import { Tournament } from '../../../features/tournament/tournamentSlice';
import theme, { Spacing } from '../../../theme';
import styled from 'styled-components/native';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextBody from '../../../components/TextBody';

type ListItemProps = {
  tournament: Tournament;
  onPress: () => void;
};

export const ListItem = ({ tournament, onPress }: ListItemProps) => {
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
          <TextBody numberOfLines={1}>{tournament.game}</TextBody>
          <H6 numberOfLines={2}>{tournament.name}</H6>
        </TitleContainer>
      </>
    </Pressable>
  );

  return <ListItemContainer>{content}</ListItemContainer>;
};

const ListItemContainer = styled.View`
  margin-horizontal: ${theme.spacing(Spacing.s / 2)};
  margin-bottom: ${theme.spacing(Spacing.m)};
  padding: ${theme.spacing(Spacing.s)};
  background: ${theme.palette.background.alt1};
  border-radius: ${theme.borderRadius};
  flex: 1;
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

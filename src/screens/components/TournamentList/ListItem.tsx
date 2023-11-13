import React from 'react';
import { StyleSheet, Text } from 'react-native';
import H6 from '../../../components/H6';
import { Tournament } from '../../../features/tournament/tournamentSlice';
import theme, { Spacing } from '../../../theme';
import styled from 'styled-components/native';
import { FormattedDate } from 'react-intl';

type ListItemProps = {
  tournament: Tournament;
  index: number;
};

const ListItemContainerOdd = styled.View`
  margin-left: ${theme.spacing(Spacing.s)};
  margin-bottom: ${theme.spacing(Spacing.m)};
  padding: ${theme.spacing(Spacing.s)};
  background: ${theme.palette.background.alt1};
  flex: 1;
`;

const ListItemContainerEven = styled.View`
  margin-right: ${theme.spacing(Spacing.s)};
  margin-bottom: ${theme.spacing(Spacing.m)};
  padding: ${theme.spacing(Spacing.s)};
  background: ${theme.palette.background.alt1};
  flex: 1;
`;

const Avatar = styled.View`
  align-self: center;
  margin-vertical: ${theme.spacing(Spacing.xl)};
  border-radius: 100px;
  height: 60px;
  width: 60px;
  background: ${theme.palette.background.alt2};
`;

const Row = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const TitleContainer = styled.View`
  height: 60px;
`;

export const ListItem = ({ tournament, index }: ListItemProps) => {
  const isEven = index % 2 === 0;

  const content = (
    <>
      <Avatar />
      <TitleContainer>
        <H6 numberOfLines={2}>
          #{index} {tournament.game}
        </H6>
      </TitleContainer>
      <Text style={styles.text}>{tournament.organizer}</Text>

      <Row>
        <Text
          style={styles.text}
        >{`${tournament.participants.current}/${tournament.participants.max}`}</Text>

        <Text style={styles.text}>
          <FormattedDate
            value={tournament.startDate}
            month="short"
            day="numeric"
          />
        </Text>
      </Row>
    </>
  );

  if (isEven) {
    return <ListItemContainerEven>{content}</ListItemContainerEven>;
  } else {
    return <ListItemContainerOdd>{content}</ListItemContainerOdd>;
  }
};

const styles = StyleSheet.create({
  text: {
    color: theme.palette.text.primary,
  },
});

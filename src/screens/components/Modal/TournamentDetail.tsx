import React, { useCallback } from 'react';

import { Tournament } from '../../../features/tournament/tournamentSlice';
import theme, { Spacing } from '../../../theme';

import styled from 'styled-components/native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import H4 from '../../../components/H4';
import Row from '../../../components/Row';
import TextBody from '../../../components/TextBody';
import { FormattedDate } from 'react-intl';
import { Alert } from 'react-native';
import { bottomSheetModalRef } from './TournamentModal';

type TournamentDetailProps = {
  tournament: Tournament;
};

export const TournamentDetail = ({ tournament }: TournamentDetailProps) => {
  const handleEdit = useCallback(() => {}, []);
  const handleDelete = useCallback(() => {
    const performDelete = () => {
      bottomSheetModalRef.current?.close();
    };

    Alert.alert(
      'Confirm Delete',
      'Do you really want to delete this tournament?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: performDelete,
          style: 'destructive',
        },
      ]
    );
  }, []);

  const HeroImage = useCallback(
    () => (
      <>
        <Image>
          <MCIcon
            name="toy-brick"
            size={60}
            color={theme.palette.text.primary}
          />
        </Image>
      </>
    ),
    []
  );
  const Organizer = useCallback(
    () => (
      <Row>
        <IconContainer>
          <MCIcon
            name="office-building-outline"
            size={20}
            color={theme.palette.text.primary}
          />
        </IconContainer>
        <TextBody>{tournament?.organizer}</TextBody>
      </Row>
    ),
    [tournament?.organizer]
  );
  const Participants = useCallback(
    () => (
      <Row>
        <IconContainer>
          <MCIcon
            name="account-group-outline"
            size={20}
            color={theme.palette.text.primary}
          />
        </IconContainer>
        <TextBody>{`${tournament?.participants.current}/${tournament?.participants.max}`}</TextBody>
      </Row>
    ),
    [tournament?.participants]
  );
  const EventDate = useCallback(
    () => (
      <Row>
        <IconContainer>
          <MCIcon
            name="calendar-text-outline"
            size={20}
            color={theme.palette.text.primary}
          />
        </IconContainer>
        <TextBody>
          <FormattedDate
            value={tournament?.startDate}
            dateStyle="short"
            timeStyle="medium"
          />
        </TextBody>
      </Row>
    ),
    [tournament?.startDate]
  );

  return (
    <>
      <HeroImage />
      <Container>
        <H4>{tournament?.game}</H4>

        <Row>
          <Container>
            <Organizer />
            <Participants />
            <EventDate />
          </Container>

          <Buttons>
            <RoundButton onPress={handleEdit}>
              <MCIcon
                name="pencil"
                size={20}
                color={theme.palette.text.primary}
              />
            </RoundButton>

            <RoundButton onPress={handleDelete}>
              <MCIcon
                name="close"
                size={20}
                color={theme.palette.text.primary}
              />
            </RoundButton>
          </Buttons>
        </Row>
      </Container>
    </>
  );
};

const IconContainer = styled.View`
  margin-right: ${theme.spacing(Spacing.s)};
`;

const Container = styled.View`
  padding-horizontal: ${theme.spacing(Spacing.l)};
`;
const Image = styled.View`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.palette.background.alt1};
  margin-bottom: ${theme.spacing(Spacing.m)};
`;

const RoundButton = styled.Pressable`
  border-radius: 60px;
  width: 40px;
  height: 40px;
  background-color: ${theme.palette.background.alt2};
  border: 0px;
  left: 10px;
  justify-content: center;
  align-items: center;
`;
const Buttons = styled(Row)`
  left: 60px;
`;

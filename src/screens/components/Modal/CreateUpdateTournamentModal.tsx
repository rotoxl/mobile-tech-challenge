import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { z } from 'zod';

import Button from '../../../components/Button';
import H6 from '../../../components/H6';
import Input from '../../../components/Input';
import { bottomSheetModalRef } from '../../../components/Modal';
import {
  createTournament,
  updateTournament,
} from '../../../features/tournament/tournamentSlice';
import { useAppDispatch } from '../../../store/hooks';
import theme, { Spacing } from '../../../theme';
import { ActivityIndicator } from 'react-native';

export const latinSpacesAndNumbers = /^[a-zA-Z0-9 ]+$/;
const FormValidator = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(
      latinSpacesAndNumbers,
      'Only latin characters, spaces and numbers are allowed'
    ),
});

type Props =
  | {
      operation: 'create';
      name?: never;
      id?: never;
    }
  | {
      operation: 'update';
      name: string;
      id: string;
    };

export const CreateUpdateTournamentModal = ({ name, id, operation }: Props) => {
  const [inputValue, setInputValue] = React.useState<string>(name ?? '');
  const [errorDescription, setErrorDescription] = React.useState<
    string | undefined
  >();
  const [loading, setLoading] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const isInputValid = useCallback(() => {
    const validationResult = FormValidator.safeParse({ name: inputValue });
    if (!validationResult.success) {
      const errorMessage =
        validationResult.error.formErrors.fieldErrors.name?.[0];
      setErrorDescription(errorMessage);
    } else {
      setErrorDescription(undefined);
    }
    return validationResult.success;
  }, [inputValue]);

  const handleSaveData = useCallback(async () => {
    if (isInputValid()) {
      setLoading(true);
      try {
        if (operation === 'update') {
          await dispatch(updateTournament({ id, name: inputValue })).unwrap();
        } else {
          await dispatch(createTournament(inputValue)).unwrap();
        }
        setLoading(false);
        bottomSheetModalRef.current?.close();
      } catch (e: any) {
        console.log(e);
        setErrorDescription(`${e.message}; please try again later`);
        setLoading(false);
      }
    }
  }, [dispatch, id, inputValue, isInputValid, operation]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setErrorDescription(undefined);
  }, []);

  const isCreate = operation === 'create';
  return (
    <ModalContainer>
      <H6>{isCreate ? 'Create Tournament' : 'Edit Tournament'}</H6>

      <Container>
        <Input
          placeholder="Tournament name"
          onChangeText={handleInputChange}
          placeholderTextColor={theme.palette.text.secondary}
          selectionColor={theme.palette.text.primary}
          cursorColor={theme.palette.text.primary}
          autoFocus
          defaultValue={inputValue}
        />
      </Container>
      <ErrorDescription>{errorDescription ?? ' '}</ErrorDescription>

      {loading ? (
        <ActivityIndicator size="small" color={theme.palette.secondary.light} />
      ) : (
        <Button onPress={handleSaveData}>Create</Button>
      )}
    </ModalContainer>
  );
};

const ModalContainer = styled.View`
  background: ${theme.palette.background.base};
  margin-bottom: ${theme.spacing(Spacing.l)};
  padding-horizontal: ${theme.spacing(Spacing.l)};
`;

const Container = styled.View`
  flex-direction: row;
`;

const ErrorDescription = styled.Text`
  ${theme.typography.body};
  margin-vertical: ${theme.spacing(Spacing.l)};
  margin-left: ${theme.spacing(Spacing.m)};
  color: ${theme.palette.attention.dark};
`;

import React, { useCallback, useState } from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import { useDebouncedFilter } from './useDebouncedFilter';
import Input from '../../../components/Input';
import theme, { Spacing } from '../../../theme';

const Row = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: ${theme.spacing(Spacing.l)};
  align-items: center;
  background: ${theme.palette.background.base};
`;

const LeftButton = styled.View`
  margin-right: ${theme.spacing(Spacing.s)};
  width: 32px;
  justify-content: center;
  align-items: center;
  border-color: ${theme.palette.background.alt1};
  border-right-width: 1px;
`;
const RightButton = styled(LeftButton)`
  border-right-width: 0px;
  border-left-width: 1px;
`;

type SearchBoxProps = {
  onChange: (value: string) => void;
};

export const SearchBox = ({ onChange }: SearchBoxProps) => {
  const [filter, setFilter] = useState<string>('');
  const filterHasContent = filter.length > 0;

  useDebouncedFilter(filter, onChange);

  const handleClearFilter = useCallback(() => setFilter(''), []);

  return (
    <Row>
      <LeftButton>
        <MCIcon name="magnify" size={20} color={theme.palette.text.secondary} />
      </LeftButton>
      <Input
        placeholder="Search tournaments"
        placeholderTextColor={theme.palette.text.secondary}
        onChangeText={setFilter}
        value={filter}
      />
      {filterHasContent && (
        <RightButton>
          <MCIcon
            name="close"
            size={20}
            color={theme.palette.text.secondary}
            onPress={handleClearFilter}
          />
        </RightButton>
      )}
    </Row>
  );
};

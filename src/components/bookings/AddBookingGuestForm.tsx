import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { MdOutlineSearch, MdAddCircleOutline, MdCheck } from 'react-icons/md';
import styled, { css } from 'styled-components';
import { IconButton } from '../../layouts/buttons/Button';
import { CardContent, CardHeader, CardTitle } from '../../layouts/cards/Card';
import Alert from '../../layouts/communications/Alerts';
import { Label } from '../../layouts/crafts/Text';
import { FormCard, FormCardSection, FormField, InputGroup, Input } from '../../layouts/inputs/Inputs';
import { List, ListItem } from '../../layouts/lists/Lists';
import { getGuestCollection, ISearchGuestQuery } from '../../services/guest-api';

const ListIcon = styled.span(({ theme }) => css`
  font-size: 1.6rem;
  color: inherit;
`);

const ListItemBtn = styled(ListItem)(({theme}) => css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  color: ${theme.text.interactive};

  :hover {
    color: ${theme.text.interactiveActive};
  }

  :focus {
    color: ${theme.text.highlight};
  }

  :focus-visible {
    outline: ${theme.border.focusVisible};
  }
`);

export type AddBookingGuestFormProps = {
  bookingId: string;
  loading?: boolean;
  onSave: (data: { bookingId: string, guestId: string }) => void;
  onAdd: () => void;
}

function handleSearchQuery(query?: string): ISearchGuestQuery {
  const filters: ISearchGuestQuery = {};

  if (!!query) filters['search'] = query;

  return filters;
};

function AddBookingGuestForm({ bookingId, loading, onSave, onAdd }: AddBookingGuestFormProps) {
  const [search, setSearch] = useState('');
  const { data: guests, isFetching, isError, isSuccess, error } = useQuery(['guests', search],
    () => !!search
      ? getGuestCollection({ ...handleSearchQuery(search), sortBy: 'name asc' })
      : Promise.resolve({ items: [], count: 0 }));
  
  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    setSearch(data.get('search') as string);
    event.target.dispatchEvent(new Event('reset'));
  }

  function coerce(b?: boolean) {
    return !!b ? true : undefined;
  }

  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return JSON.stringify(error);
  }

  return (
    <FormCard onSubmit={handleSave} autoComplete="off">
      <CardHeader>
        <CardTitle>Adicionar Hóspede</CardTitle>
      </CardHeader>
      <FormCardSection>
        <FormField>
          <InputGroup>
            <Input type="search" name="search" placeholder="Pesquisar hóspede" defaultValue={search} disabled={coerce(loading)} />
            <IconButton type="submit" loading={coerce(loading)} disabled={coerce(loading)}><MdOutlineSearch /></IconButton>
            <IconButton type="button" loading={coerce(loading)} disabled={coerce(loading)} onClick={() => onAdd()}>
              <MdAddCircleOutline />
            </IconButton>
          </InputGroup>
        </FormField>
      </FormCardSection>
      <CardContent>
        {isError && <Alert level="error" message={getErrorMessage(error)} />}
        {isFetching && <Alert level="info" message="Pesquisando..." />}
        {(!!guests?.items?.length) && <List>
          {guests?.items.map(guest =>
            <ListItemBtn tabIndex={0} key={guest.id} onClick={() => onSave({ bookingId, guestId: guest.id })}>
              <Label>{guest.name}</Label>
              <ListIcon><MdCheck /></ListIcon>
            </ListItemBtn>)}
        </List>}
        {!!search && isSuccess && !guests?.items && <Alert level="info" message="Sem resultados encontrados" />}
      </CardContent>
    </FormCard>
  );
}

AddBookingGuestForm.displayName = 'AddBookingGuestForm'
export default AddBookingGuestForm;
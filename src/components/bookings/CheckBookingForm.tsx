import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { Button } from '../../layouts/buttons/Button';
import { Label } from '../../layouts/crafts/Text';
import { FormCard, FormCardActions, FormCardSection, FormField, Input, InputGroup } from '../../layouts/inputs/Inputs';
import { ISearchAvailablePlacesQuery } from '../../services/search-api';

export type CheckBookingFormProps = {
  query?: ISearchAvailablePlacesQuery;
  loading?: boolean;
  onSearch: (query?: ISearchAvailablePlacesQuery) => void;
}

function CheckBookingForm({ query, loading, onSearch }: CheckBookingFormProps) {
  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    if (!data.get('checkIn') || !data.get('checkOut')) onSearch(undefined)

    const checkIn = new Date(data.get('checkIn') as string);
    const checkOut = new Date(data.get('checkOut') as string);

    onSearch({ checkIn, checkOut });
  }

  function coerce(b?: boolean) {
    return !!b ? true : undefined;
  }

  return (
    <FormCard onSubmit={handleSave} autoComplete="off">
      <FormCardSection>
        <InputGroup>
          <FormField>
            <Label>Período Início</Label>
            <Input name="checkIn" type="date" required disabled={coerce(loading)} defaultValue={query?.checkIn.toISOString().substring(0, 10)} />
          </FormField>
          <FormField>
            <Label>Período Fim</Label>
              <Input name="checkOut" type="date" required disabled={coerce(loading)} defaultValue={query?.checkOut.toISOString().substring(0, 10)} />
          </FormField>
        </InputGroup>
      </FormCardSection>
      <FormCardActions>
        <Button type="submit" loading={coerce(loading)} disabled={coerce(loading)}>
          <MdOutlineSearch />
          <span>Pesquisar</span>
        </Button>
      </FormCardActions>
    </FormCard>
  );
}

CheckBookingForm.displayName = 'CheckBookingForm'
export default CheckBookingForm;
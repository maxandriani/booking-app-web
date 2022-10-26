import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Button } from '../../layouts/buttons/Button';
import { Label } from '../../layouts/crafts/Text';
import { FormCard, FormCardActions, FormCardSection, FormField, Input, InputGroup, Option, Select, TextArea } from '../../layouts/inputs/Inputs';
import { ICreateUpdateBookingBody } from '../../services/bookings-api';
import { getPlacesCollection } from '../../services/places-api';

export type BookingFormProps = {
  booking?: ICreateUpdateBookingBody,
  loading?: boolean,
  onSave: (body: ICreateUpdateBookingBody) => void
};

function BookingForm({ booking, loading, onSave }: BookingFormProps) {
  const { data: places } = useQuery(['places'], () => getPlacesCollection({ sortBy: 'name asc' }), { suspense: true });
  
  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const placeId = data.get('placeId') as string;
    const description = data.get('description') as string;
    const checkIn = new Date(data.get('checkIn') as string);
    const checkOut = new Date(data.get('checkOut') as string);

    onSave({ placeId, description, checkIn, checkOut });
  }

  function coerce(b?: boolean) {
    return !!b ? true : undefined;
  }

  return (
    <FormCard onSubmit={handleSave} autoComplete="off">
      <FormCardSection>
        <FormField>
          <Label>Local</Label>
          <Select name="placeId" required disabled={coerce(loading)} placeholder="Selecione um local" defaultValue={booking?.placeId}>
            {places?.items.map(place => <Option key={place.id} value={place.id}>{place.name}</Option>)}
          </Select>
        </FormField>
        <InputGroup>
          <FormField>
            <Label>Período Início</Label>
            <Input name="checkIn" type="date" required disabled={coerce(loading)} defaultValue={booking?.checkIn.toISOString().substring(0, 10)} />
          </FormField>
          <FormField>
            <Label>Período Fim</Label>
              <Input name="checkOut" type="date" required disabled={coerce(loading)} defaultValue={booking?.checkOut.toISOString().substring(0, 10)} />
          </FormField>
        </InputGroup>
        <FormField>
          <Label>Descrição</Label>
          <TextArea name="description" required defaultValue={booking?.description} disabled={coerce(loading)} />
        </FormField>
      </FormCardSection>
      <FormCardActions>
        <Button type="submit" loading={coerce(loading)} disabled={coerce(loading)}>Salvar</Button>
      </FormCardActions>
    </FormCard>
  );
}

BookingForm.displayName = 'BookingForm'
export default BookingForm;
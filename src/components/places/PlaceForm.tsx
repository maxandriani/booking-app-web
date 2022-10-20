import React from 'react';
import { Button } from '../../layouts/buttons/Button';
import { Label } from '../../layouts/crafts/Text';
import { FormCard, FormCardActions, FormCardSection, FormField, Input } from '../../layouts/inputs/Inputs';
import { ICreateUpdatePlaceBody, IPlaceResponse } from '../../services/places-api';

export type PlaceFormProps = {
  className?: string;
  loading?: boolean;
  place?: IPlaceResponse;
  onSave: (place: ICreateUpdatePlaceBody) => void;
}

function PlaceForm({place, loading, onSave, ...props }: PlaceFormProps) {
  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const response: ICreateUpdatePlaceBody = {
      name: data.get('name')?.toString() ?? '',
      address: data.get('address')?.toString() ?? ''
    };
    onSave(response);
  }

  function coerce(b?: boolean) {
    return !!b ? true : undefined;
  }
  
  return (
    <FormCard onSubmit={handleSave} autoComplete="off">
      <FormCardSection>
        <FormField>
          <Label>Nome</Label>
          <Input name="name" required defaultValue={place?.name} disabled={coerce(loading)} />
        </FormField>
        <FormField>
          <Label>Endereço</Label>
          <Input name="address" required defaultValue={place?.address} disabled={coerce(loading)} />
        </FormField>
      </FormCardSection>
      <FormCardActions>
        <Button type="submit" loading={coerce(loading)}>Salvar</Button>
      </FormCardActions>
    </FormCard>
  );
}

PlaceForm.displayName = 'PlaceForm'
export default PlaceForm;
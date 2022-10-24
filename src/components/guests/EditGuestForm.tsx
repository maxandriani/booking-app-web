import React from 'react';
import { Button } from '../../layouts/buttons/Button';
import { Label } from '../../layouts/crafts/Text';
import { FormCard, FormCardActions, FormCardSection, FormField, Input } from '../../layouts/inputs/Inputs';
import { IGuestWithContactsResponse, IUpdateGuestBody } from '../../services/guest-api';

export type EditGuestFormProps = {
  loading?: boolean;
  guest?: IGuestWithContactsResponse;
  onSave: (guest: IUpdateGuestBody) => void;
}

function EditGuestForm({ loading, guest, onSave }: EditGuestFormProps) {
  
  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const name = data.get('name')?.toString() ?? '';
    onSave({ name });
  }

  function coerce(b?: boolean) {
    return !!b ? true : undefined;
  }

  return (
    <FormCard onSubmit={handleSave} autoComplete="off">
      <FormCardSection>
        <FormField>
          <Label>Nome</Label>
          <Input name="name" required defaultValue={guest?.name} disabled={coerce(loading)} />
        </FormField>
      </FormCardSection>
      <FormCardActions>
        <Button type="submit" loading={coerce(loading)}>Salvar</Button>
      </FormCardActions>
    </FormCard>
  );
}

EditGuestForm.displayName = 'EditGuestForm'
export default EditGuestForm;
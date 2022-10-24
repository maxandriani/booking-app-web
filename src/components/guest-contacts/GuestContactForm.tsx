import React from 'react';
import { Button } from '../../layouts/buttons/Button';
import { Label } from '../../layouts/crafts/Text';
import { FormCard, FormCardSection, FormField, InputGroup, Select, Option, Input, FormCardActions } from '../../layouts/inputs/Inputs';
import { coerceContactType, GuestContactTypeEnum, ICreateUpdateGuestContactBody, IGuestContactResponse } from '../../services/guest-contact-api';

export type GuestContactFormProps = {
  contact?: IGuestContactResponse;
  loading?: boolean;
  onSave: (body: ICreateUpdateGuestContactBody) => void;
}

function GuestContactForm({ contact, loading = false, onSave, ...props }: GuestContactFormProps) {
  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);

    const type = coerceContactType(data.get('type')?.toString() ?? '');
    const value = data.get('value')?.toString() ?? '';

    onSave({ type, value });
    event.target.dispatchEvent(new Event('reset'));
  }

  function coerce(b?: boolean) {
    return !!b ? true : undefined;
  }

  return (
    <FormCard onSubmit={handleSave} autoComplete="off">
      <FormCardSection>
        <FormField>
          <Label>Contato</Label>
          <InputGroup>
            <Select name="type" defaultValue={contact?.type}>
              <Option value={GuestContactTypeEnum.Phone}>Telefone</Option>
              <Option value={GuestContactTypeEnum.Email}>Email</Option>
              <Option value={GuestContactTypeEnum.Unknown}>Outro</Option>
            </Select>
            <Input name="value" defaultValue={contact?.value} />
          </InputGroup>
        </FormField>
      </FormCardSection>
      <FormCardActions>
        <Button type="submit" loading={coerce(loading)}>Salvar</Button>
      </FormCardActions>
    </FormCard>
  );
}

GuestContactForm.displayName = 'GuestContactForm'
export default GuestContactForm;

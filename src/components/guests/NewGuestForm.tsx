import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { coerceContactType, ICreateUpdateGuestContactBody } from '../../services/guest-contact-api';
import { Button, IconButton } from '../../layouts/buttons/Button';
import { Label } from '../../layouts/crafts/Text';
import { FormCard, FormCardSection, FormCardActions, Input, FormField, InputGroup, Select, Option } from '../../layouts/inputs/Inputs';
import { ICreateGuestWithContactsBody } from '../../services/guest-api';
import { GuestContactTypeEnum } from '../../services/guest-contact-api';

export type GuestFormProps = {
  loading?: boolean;
  guest?: ICreateGuestWithContactsBody;
  onSave: (guest: ICreateGuestWithContactsBody) => void;
}

function NewGuestForm({ loading, guest, onSave }: GuestFormProps) {
  const [contactFields, setContactFields] = useState<Array<ICreateUpdateGuestContactBody>>(guest?.contacts ?? [{ type: GuestContactTypeEnum.Phone, value: '' }]);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);

    const name = data.get('name')?.toString() ?? '';
    const types = data.getAll('contacts.type');
    const values = data.getAll('contacts.value');
    const contacts = contactFields.map((_, idx) => ({
      type: coerceContactType(types[idx]?.toString() ?? ''),
      value: values[idx]?.toString() ?? ''
    }));

    onSave({ name, contacts });
    event.target.dispatchEvent(new Event('reset'));
    resetContactField();
  }

  function coerce(b?: boolean) {
    return !!b ? true : undefined;
  }

  function addContactField() {
    setContactFields([...contactFields, { type: GuestContactTypeEnum.Phone, value: '' }]);
  }

  function resetContactField() {
    setContactFields([{ type: GuestContactTypeEnum.Phone, value: '' }]);
  }

  function onRemoveContactField(idx: number) {
    const n = [...contactFields];
    n.splice(idx, 1);
    setContactFields(n);
  }

  useEffect(() => {
    if (contactFields.length === 0)
      resetContactField();
  }, [contactFields, resetContactField])

  return (
    <FormCard onSubmit={handleSave} autoComplete="off">
      <FormCardSection>
        <FormField>
          <Label>Nome</Label>
          <Input name="name" required defaultValue={guest?.name} disabled={coerce(loading)} />
        </FormField>
      </FormCardSection>
      <FormCardSection>
        {contactFields.map((field, idx) =>
          <FormField key={idx}>
            <Label>Contato</Label>
            <InputGroup>
              <Select name="contacts.type" defaultValue={GuestContactTypeEnum.Phone}>
                <Option value={GuestContactTypeEnum.Phone}>Telefone</Option>
                <Option value={GuestContactTypeEnum.Email}>Email</Option>
                <Option value={GuestContactTypeEnum.Unknown}>Outro</Option>
              </Select>
              <Input name="contacts.value" defaultValue={field.value} />
              <IconButton type="button" tabIndex={-1} onClick={() => onRemoveContactField(idx)}>
                <MdDeleteForever />
              </IconButton>
            </InputGroup>
          </FormField>)}
        <Button type="button" onClick={() => addContactField()}>
          <span>Adicionar Contato</span>
        </Button>
      </FormCardSection>
      <FormCardActions>
        <Button type="submit" loading={coerce(loading)}>Salvar</Button>
      </FormCardActions>
    </FormCard>
  );
}

NewGuestForm.displayName = 'NewGuestForm'
export default NewGuestForm;

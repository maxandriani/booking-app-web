import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { MdDeleteForever } from 'react-icons/md';
import { queryClient } from '../../..';
import { IconButton } from '../../../layouts/buttons/Button';
import { Label } from '../../../layouts/crafts/Text';
import { ListKeyValueItem } from '../../../layouts/lists/Lists';
import { IGuestWithContactsResponse } from '../../../services/guest-api';
import { deleteGuestContact, IGuestContactResponse, toContactType } from '../../../services/guest-contact-api';

export type GuestContactItemProps = {
  contact: IGuestContactResponse;
  onError?: (error: Error) => void;
}

function GuestContactItem({ contact, onError = () => {} }: GuestContactItemProps) {
  const { mutate, isLoading } = useMutation<void, Error, { guestId: string, id: string }>(
    ({ guestId, id }) => deleteGuestContact(guestId, id),
    {
      onSuccess: (_, { guestId, id }) => {
        const guest = queryClient.getQueryData<IGuestWithContactsResponse>(['guest', guestId]);
        if (!guest) return;
        const contacts = [...guest?.contacts ?? []];
        contacts.splice(contacts.findIndex(x => x.id === id), 1);
        queryClient.setQueriesData(['guest', guestId], {...guest, contacts});
      },
      onError: (error) => onError(error)
    });

  return (
    <ListKeyValueItem key={contact.id}>
      <Label>{toContactType(contact.type)}</Label>
      <Label>{contact.value}</Label>
      <IconButton type="button" onClick={() => mutate(contact)} disabled={isLoading}>
        <MdDeleteForever />
      </IconButton>
    </ListKeyValueItem>
  );
}

GuestContactItem.displayName = 'GuestContactItem'
export default GuestContactItem;
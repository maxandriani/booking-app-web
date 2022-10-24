import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Label } from '../../layouts/crafts/Text';
import { List, ListItem } from '../../layouts/lists/Lists';
import { IGuestContactResponse, toContactType } from '../../services/guest-contact-api';

const ContactListItem = styled(ListItem)`
  display: flex;
  gap: 0.5rem;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const ContactTypeLabel = styled(Label)`
  flex: 1 0;
  max-width: 30%;
  min-width: 80px;
`;
const ContactValueLabel = styled(Label)`
  flex: 1;
`;

const ContactActions = styled.div``;

export type GuestContactListProps = {
  contacts: Array<IGuestContactResponse>;
  onClick?: (contact: IGuestContactResponse) => void;
  actions?: (contact: IGuestContactResponse) => ReactNode;
}

function GuestContactList({ contacts, actions, onClick }: GuestContactListProps) {
  return (
    <List>
      {contacts
        .map(contact =>
          <ContactListItem key={contact.id} onClick={() => onClick?.call(null, contact)}>
            <ContactTypeLabel>{toContactType(contact.type)}</ContactTypeLabel>
            <ContactValueLabel>{contact.value}</ContactValueLabel>
            {!!actions && <ContactActions>{actions(contact)}</ContactActions>}
          </ContactListItem>)}
    </List>
  );
}

GuestContactList.displayName = 'GuestContactList'
export default GuestContactList;
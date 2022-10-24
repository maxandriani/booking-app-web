import React, { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardActions, CardContent } from '../../layouts/cards/Card';
import { IGuestWithContactsResponse } from '../../services/guest-api';
import GuestContactList from '../guest-contacts/GuestContactList';

export type GuestCardProps = {
  guest: IGuestWithContactsResponse;
  actions?: ReactNode;
  showContactList?: boolean;
}

function GuestCard({guest, actions, showContactList = true, ...props}: GuestCardProps) {
  
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{guest.name}</CardTitle>
        {guest.contacts.length > 0 && <CardDescription>{guest.contacts[0]?.value}</CardDescription>}
      </CardHeader>
      {showContactList && guest.contacts.length > 0 && <CardContent>
        <GuestContactList contacts={guest.contacts} />
      </CardContent>}
      {!!actions && <CardActions>{ actions }</CardActions>}
    </Card>
  );
}

GuestCard.displayName = 'GuestCard'
export default GuestCard;
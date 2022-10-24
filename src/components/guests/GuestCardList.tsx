import React, { ReactNode } from 'react';
import { CardList, CardListItem } from '../../layouts/lists/Lists';
import { IGuestWithContactsResponse } from '../../services/guest-api';
import GuestCard from './GuestCard';

export type GuestCardListProps = {
  guests: Array<IGuestWithContactsResponse>;
  showContactList?: boolean;
  guestActions?: (guest: IGuestWithContactsResponse) => ReactNode;
}

function GuestCardList({ guests, showContactList = true, guestActions, ...props }: GuestCardListProps) {
  
  return (
    <CardList {...props}>
      {guests.map(guest =>
        <CardListItem key={guest.id}>
          <GuestCard showContactList={showContactList} guest={guest} actions={guestActions?.call(null, guest)} />
        </CardListItem>)}
    </CardList>
  );
}

GuestCardList.displayName = 'GuestCardList'
export default GuestCardList;
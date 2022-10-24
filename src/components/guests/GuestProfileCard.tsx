import React, { ReactNode } from 'react';
import { Card, CardActions, CardContent, CardHeader } from '../../layouts/cards/Card';
import { Label, Title } from '../../layouts/crafts/Text';
import { List, ListKeyValueItem } from '../../layouts/lists/Lists';
import { IGuestWithContactsResponse } from '../../services/guest-api';

export type GuestProfileCardProps = {
  guest: IGuestWithContactsResponse;
  actions?: ReactNode;
}

function GuestProfileCard({guest, actions, ...props}: GuestProfileCardProps) {
  
  return (
    <Card {...props}>
      <CardHeader>
        <Title>Informações</Title>
      </CardHeader>
      <CardContent>
        <List>
          <ListKeyValueItem>
            <Label>Nome</Label>
            <Label>{guest.name}</Label>
          </ListKeyValueItem>
        </List>
      </CardContent>
      {!!actions && <CardActions>{ actions }</CardActions>}
    </Card>
  );
}

GuestProfileCard.displayName = 'GuestProfileCard'
export default GuestProfileCard;
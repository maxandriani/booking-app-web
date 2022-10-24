import { ReactNode } from 'react';
import { CardList, CardListItem } from '../../layouts/lists/Lists';
import { IPlaceResponse } from '../../services/places-api';
import { PlaceCard } from './PlaceCard';

export type PlaceCardListProps = {
  className?: string;
  places: Array<IPlaceResponse>;
  placeActions?: (place: IPlaceResponse) => ReactNode
}

function PlaceCardList({
  places,
  placeActions,
  ...props
}: PlaceCardListProps) {
  return (
    <CardList {...props}>
      {places.map(place =>
        <CardListItem key={place.id}>
          <PlaceCard place={place} actions={placeActions?.call(null, place)} />
        </CardListItem>)}
    </CardList>
  );
}

PlaceCardList.displayName = 'PlaceCardList'
export default PlaceCardList;
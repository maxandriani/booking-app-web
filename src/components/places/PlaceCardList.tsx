import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../../layouts/theme';
import { IPlaceResponse } from '../../services/places-api';

const PlaceCardListPaper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
`;
const PlaceCardListItem = styled.li`
  flex: 1 0;

  :hover {
    box-shadow: ${theme.elevation2};
  }
`;

export type PlaceCardListProps = {
  className?: string;
  places: Array<IPlaceResponse>;
  placeItem: (place: IPlaceResponse) => ReactNode
}

function PlaceCardList({
  places,
  placeItem,
  ...props
}: PlaceCardListProps) {
  return (
    <PlaceCardListPaper {...props}>
      {places.map(place =>
        <PlaceCardListItem key={place.id}>
          {placeItem(place)}
        </PlaceCardListItem>)}
    </PlaceCardListPaper>
  );
}

PlaceCardList.displayName = 'PlaceCardList'
export default PlaceCardList;
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IBookingResponse } from '../../services/bookings-api';
import BookingShortCard from './BookingShortCard';

const BookingCardListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const BookingCardListItem = styled.li`
  margin-bottom: 1rem;

  :last-child {
    margin-bottom: 0;
  }
`;

export type BookingCardListProps = {
  bookings: Array<IBookingResponse>;
  actions?: (booking: IBookingResponse) => ReactNode;
}

function BookingCardList({ bookings, actions }: BookingCardListProps) {
  
  return (
    <BookingCardListWrapper>
      {bookings.map(booking => <BookingCardListItem key={booking.id}>
        <BookingShortCard booking={booking} actions={actions?.call(null, booking)} />
      </BookingCardListItem>)}
    </BookingCardListWrapper>
  );
}

BookingCardList.displayName = 'BookingCardList'
export default BookingCardList;
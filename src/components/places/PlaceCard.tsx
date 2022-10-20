import { ReactNode } from "react";
import styled from "styled-components";
import { Card, CardActions, CardDescription, CardHeader, CardTitle } from "../../layouts/cards/Card";
import { IPlaceResponse } from "../../services/places-api";

export type PlaceCardProps = {
  place: IPlaceResponse;
  className?: string;
  actions?: ReactNode;
};

export function PlaceCard({
  place,
  actions,
  ...props
}: PlaceCardProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{place.name}</CardTitle>
        <CardDescription>{place.address}</CardDescription>
      </CardHeader>
      {!!actions && <CardActions>{ actions }</CardActions>}
    </Card>
  )
}
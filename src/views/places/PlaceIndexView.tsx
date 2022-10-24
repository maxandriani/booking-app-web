import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdAddCircleOutline, MdDeleteForever, MdOutlineFilterList, MdOutlineSearch, MdOutlineSort } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import PlaceCardList from "../../components/places/PlaceCardList";
import { Button, IconButton } from "../../layouts/buttons/Button";
import Alert from "../../layouts/communications/Alerts";
import { VerticalDivider } from "../../layouts/crafts/Divider";
import { FilterForm } from "../../layouts/filters/FilterForm";
import { InputBase } from "../../layouts/inputs/Inputs";
import { AppActionBar } from "../../layouts/structure/AppActionBar";
import AppContent from "../../layouts/structure/AppContent";
import AppHeader from "../../layouts/structure/AppHeader";
import AppLayout from "../../layouts/structure/AppLayout";
import AppMainBar from "../../layouts/structure/AppMainBar";
import AppPageTitle from "../../layouts/structure/AppPageTitle";
import { deletePlace, getPlacesCollection, IGetPlacesQuery, IPlaceResponse } from "../../services/places-api";

type PlaceCardActionsProps = {
  place: IPlaceResponse;
  onDeleted: () => {};
}

function PlaceCardActions({ place, onDeleted }: PlaceCardActionsProps) {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  async function doDelete() {
    setIsDeleting(true);
    try {
      await deletePlace(place.id);
      setIsDeleting(false);
      onDeleted();
    } catch (error) {
      if (error instanceof Error)
        alert(error.message);
    }
  }

  return (
    <>
      <Button onClick={() => navigate(`/places/${place.id}`)}>
        <span>Visualizar</span>
      </Button>
      <IconButton disabled={isDeleting ? true : undefined} loading={isDeleting ? true : undefined} onClick={doDelete}>
        <MdDeleteForever />
      </IconButton>
    </>
  )
}

export default function PlaceIndexView() {
  const [filters, setFilters] = useState<IGetPlacesQuery | undefined>(undefined);
  const { data, error, isSuccess, isError, isFetching, refetch } = useQuery(['places', filters], ({ queryKey: [_, filters] }) => getPlacesCollection(filters as IGetPlacesQuery));
  const navigate = useNavigate();

  function doSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const search = data.get('search');
    if (search != null) {
      setFilters({ ...(filters ?? {}), search: search.toString() });
    } else if (!!filters) {
      const clone = { ...filters };
      delete clone.search;
      setFilters(clone);
    }
  }

  return (
    <AppLayout>
      <AppMainBar />
      <AppHeader>
        <AppPageTitle>Locais</AppPageTitle>
      </AppHeader>
      <AppContent>
        <AppActionBar>
          <IconButton onClick={() => navigate('/places/new')}>
            <MdAddCircleOutline />
          </IconButton>

          <FilterForm onSubmit={doSearch} autoComplete="off">
            <InputBase name="search" placeholder="Pesquisar locais" />
            <IconButton type="submit">
              <MdOutlineSearch />
            </IconButton>
            <VerticalDivider />
            <IconButton disabled>
              <MdOutlineFilterList />
            </IconButton>
            <IconButton disabled>
              <MdOutlineSort />
            </IconButton>
          </FilterForm>
        </AppActionBar>

        {isError && <Alert level="error" message={(error as Error).message} timeout={9} />}
        {isFetching && <Alert level="info" message="Carregando dados..." />}
        {isSuccess && <PlaceCardList
          places={data?.items}
          placeActions={place => <PlaceCardActions place={place} onDeleted={refetch} />} />}
      </AppContent>
    </AppLayout>
  )
}
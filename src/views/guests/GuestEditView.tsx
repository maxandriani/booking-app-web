import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../..";
import { Title } from "../../layouts/crafts/Text";
import { List } from "../../layouts/lists/Lists";
import EditGuestForm from "../../components/guests/EditGuestForm";
import GuestProfileCard from "../../components/guests/GuestProfileCard";
import { Button, IconButton } from "../../layouts/buttons/Button";
import { Card, CardContent, CardHeader } from "../../layouts/cards/Card";
import Alert from "../../layouts/communications/Alerts";
import AppContent from "../../layouts/structure/AppContent";
import AppHeader from "../../layouts/structure/AppHeader";
import AppLayout from "../../layouts/structure/AppLayout";
import AppMainBar from "../../layouts/structure/AppMainBar";
import AppPageTitle from "../../layouts/structure/AppPageTitle";
import GuestContactItem from './partials/GuestContactItem';
import { createGuestContact, ICreateUpdateGuestContactBody, IGuestContactResponse } from "../../services/guest-contact-api";
import { getGuestByKey, IGuestWithContactsResponse, IUpdateGuestBody, updateGuest } from "../../services/guest-api";
import GuestContactForm from "../../components/guest-contacts/GuestContactForm";

interface AlertInfo {
  level: 'info' | 'error',
  message: string
}

export default function PlaceEditView() {
  const navigate = useNavigate();
  const { guestId } = useParams();
  const [alert, setAlert] = useState<AlertInfo|undefined>();
  if (!guestId) throw new Error('Required parameter placeId');
  const { data: guest } = useQuery(['guest', guestId], () => getGuestByKey(guestId), { suspense: true });
  const [editMode, setEditMode] = useState(false);
  
  const { mutate, isError, isLoading, error } = useMutation<IGuestWithContactsResponse, Error, IUpdateGuestBody>(
    guest => updateGuest(guestId, guest),
    {
      onSuccess: (data) => {
        queryClient.setQueriesData(['guest', data.id], data);
        setAlert({ level: 'info', message: 'Registros salvos com sucesso!' });
        setEditMode(false);
      }
    });
  
  const addGuest = useMutation<IGuestContactResponse, Error, { guestId: string, body: ICreateUpdateGuestContactBody }>(
    ({ guestId, body }) => createGuestContact(guestId, body),
    {
      onSuccess: (contact) => {
        queryClient.setQueriesData(['guest', guestId], { ...guest, contacts: [...guest?.contacts ?? [], contact] });
        setAlert({ level: 'info', message: 'Registros salvos com sucesso!' });
      }
    }
  )
  
  if (!guest) throw Error('Guest não encontrado');
    
  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return JSON.stringify(error);
  }

  useEffect(() => {
    if (isError || addGuest.isError) {
      setAlert({ level: 'error', message: getErrorMessage(error ?? addGuest.error) });
    }
  }, [isError, error, setAlert, addGuest.isError, addGuest.error]);

  return (
    <AppLayout>
      <AppMainBar />
      <AppHeader>
        <IconButton onClick={() => navigate('/guests')}>
          <MdArrowBack />
        </IconButton>
        <AppPageTitle>{guest.name}</AppPageTitle>
      </AppHeader>
      <AppContent>
        {alert && <Alert level={alert?.level} message={alert?.message} onClose={() => setAlert(undefined)} />}
        {editMode
          ? <EditGuestForm loading={isLoading} guest={guest} onSave={mutate} />
          : <GuestProfileCard guest={guest} actions={<Button onClick={() => setEditMode(true)}>Alterar</Button>} />}

        <Card>
          <CardHeader>
            <Title>Contatos</Title>
          </CardHeader>
          <CardContent>
            <List>
              {guest.contacts.map(contact =>
                <GuestContactItem key={contact.id} contact={contact} onError={error => setAlert({ level: 'error', message: getErrorMessage(error) })} />)}
            </List>
          </CardContent>
        </Card>

        <GuestContactForm onSave={body => addGuest.mutate({guestId, body})} loading={addGuest.isLoading} />
      </AppContent>
    </AppLayout>
  );
}

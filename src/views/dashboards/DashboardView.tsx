import AppContent from "../../layouts/structure/AppContent";
import AppHeader from "../../layouts/structure/AppHeader";
import AppLayout from "../../layouts/structure/AppLayout";
import AppMainBar from "../../layouts/structure/AppMainBar";
import AppPageTitle from "../../layouts/structure/AppPageTitle";

export default function DashboardView() {
  return (
    <AppLayout>
      <AppMainBar />
      <AppHeader>
        <AppPageTitle>Dashboard</AppPageTitle>
      </AppHeader>
      <AppContent>
        <p>...todo</p>
      </AppContent>
    </AppLayout>
  );
}

import MapView from "@/components/map/MapView";
import Sidebar from "@/components/ui/Sidebar";
import SearchPanel from "@/components/search/SearchPanel2";
import RouteInfoDialog from "@/components/map/RouteInfoDialog";
export default function HomePage() {
  return (
    <main className="flex h-screen w-screen">
      <Sidebar />
      <SearchPanel />
      <div className="flex-1 relative">
        <MapView />
        <RouteInfoDialog />
      </div>
    </main>
  );
}

import MapView from "@/components/map/MapView";
import Sidebar from "@/components/ui/Sidebar";
import SearchPanel from "@/components/search/SearchPanel";

export default function HomePage() {
  return (
    <main className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 relative">
        <SearchPanel />
        <MapView />
      </div>
    </main>
  );
}

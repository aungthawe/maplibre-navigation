import MapView from "@/components/map/MapView";
import Sidebar from "@/components/ui/Sidebar";

export default function HomePage() {
  return (
    <main className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 relative">
        <MapView />
      </div>
    </main>
  );
}

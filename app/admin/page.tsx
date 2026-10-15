import AdminPanel from "@/components/AdminPanel";
import { storeReady, paymentsReady } from "@/lib/store";
export const metadata = { title: "Administración | UNOVIX", robots: { index: false, follow: false } };
export default function AdminPage() { return <AdminPanel configured={storeReady()} payments={paymentsReady()} />; }

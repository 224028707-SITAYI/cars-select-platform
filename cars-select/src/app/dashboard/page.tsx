import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Car, MessageSquare, Heart, BarChart3, Settings, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Seller Dashboard</h1>
            <p className="text-slate-600 mt-1">Manage your listings, inquiries and performance.</p>
          </div>
          <Link href="/dashboard/listings/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New listing
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active listings", value: "12", icon: Car },
            { label: "Open inquiries", value: "5", icon: MessageSquare },
            { label: "Favourites", value: "48", icon: Heart },
            { label: "Views (30d)", value: "1.2k", icon: BarChart3 },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-teal-50 p-2.5">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/dashboard/listings" className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:border-teal-200 transition">
            <Car className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold">My Listings</h3>
            <p className="text-sm text-slate-500 mt-1">Create, edit, pause or delete your vehicle, parts and service listings.</p>
          </Link>
          <Link href="/dashboard/inquiries" className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:border-teal-200 transition">
            <MessageSquare className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold">Inquiries</h3>
            <p className="text-sm text-slate-500 mt-1">Respond to buyer messages and manage conversations.</p>
          </Link>
          <Link href="/dashboard/settings" className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:border-teal-200 transition">
            <Settings className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold">Account & Verification</h3>
            <p className="text-sm text-slate-500 mt-1">Update profile, business details and verification status.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

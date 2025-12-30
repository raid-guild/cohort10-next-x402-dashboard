import DashboardHeader from "@/components/dashboard/DashboardHeader"

export default function DashboardPage() {
    return (
        <>
            <DashboardHeader title="API Keys" />
            <div className="container-custom py-8 px-8">
                <div className="rounded-md border border-moloch-200 bg-white p-12 text-center text-moloch-500">
                    <h3 className="mb-2 text-lg font-medium text-moloch-900">No API Keys Found</h3>
                    <p>Generate your first API key to get started.</p>
                </div>
            </div>
        </>
    )
}

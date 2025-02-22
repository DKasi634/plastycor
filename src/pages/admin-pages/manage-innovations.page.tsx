import InnovationsContainer from "@/components/innovations-container/innovations-container.component"


const ManageInnovationsPage = () => {
  return (
    <div className="flex flex-col py-8">
        <h2 className="text-2xl font-bold text-dark w-full text-center my-4">Gérer les innovations</h2>
        <InnovationsContainer OwnerEmail={null} adminView={true} />
    </div>
  )
}

export default ManageInnovationsPage
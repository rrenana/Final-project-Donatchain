type Props = {
  title: string
  description: string
}

export default function CampaignCard({ title, description }: Props) {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
        Donate
      </button>
    </div>
  )
}

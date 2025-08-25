import { useState } from "react"
import SearchBar from "../components/SearchBar"
import CampaignCard from "../components/CampaignCard"

const campaigns = [
  { title: "Education for All", description: "Help provide education for underprivileged children." },
  { title: "Medical Aid", description: "Support families in need of urgent medical treatment." },
  { title: "Food Donations", description: "Provide meals for communities in crisis." },
]

export default function Campaigns() {
  const [results, setResults] = useState(campaigns)

  const handleSearch = (query: string) => {
    const filtered = campaigns.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {results.map((c, i) => (
          <CampaignCard key={i} title={c.title} description={c.description} />
        ))}
      </div>
    </div>
  )
}


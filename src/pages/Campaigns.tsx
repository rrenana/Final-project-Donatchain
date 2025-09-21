import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CampaignCard from "../components/CampaignCard";

const campaigns = [
  { title: "חינוך לכולם", description: "עזור לספק חינוך לילדים מעוטי יכולת." },
  { title: "סיוע רפואי", description: "תמוך במשפחות הזקוקות לטיפולים רפואיים דחופים." },
  { title: "תרומות מזון", description: "ספק ארוחות לקהילות במצוקה." },
];

export default function Campaigns() {
  const [results, setResults] = useState(campaigns);

  const handleSearch = (query: string) => {
    const filtered = campaigns.filter(c =>
      c.title.includes(query) || c.description.includes(query)
    );
    setResults(filtered);
  };

  return (
    <div className="p-6">
      {/* חיפוש ומיון */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <SearchBar onSearch={handleSearch} />
        <select className="border rounded-md p-2">
          <option>מיין לפי</option>
          <option>פופולריות</option>
          <option>הכי חדש</option>
        </select>
      </div>

      {/* גריד של קמפיינים */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((c, i) => (
          <CampaignCard key={i} title={c.title} description={c.description} />
        ))}
      </div>
    </div>
  );
}

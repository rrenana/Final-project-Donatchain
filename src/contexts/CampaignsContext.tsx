// CampaignsContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { getCampaigns, createCampaign } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

interface Campaign {
  _id: string;
  title: string;
  goal: number;
  raised: number;
  startDate: string;
  endDate: string;
  description: string;
  ngoLogo?: string;
  image?: string;
  video?: string;
  gallery?: string[];
}

// טיפוס ליצירת קמפיין (מה שה־frontend שולח) — בלי _id ובלי raised
export type NewCampaign = Omit<Campaign, "_id" | "raised">;

interface CampaignsContextType {
  campaigns: Campaign[];
  addCampaign: (c: NewCampaign) => Promise<void>;
  refreshCampaigns: () => Promise<void>;
}

const CampaignsContext = createContext<CampaignsContextType | undefined>(undefined);

export function CampaignsProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const { ngo } = useAuth();

  const refreshCampaigns = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error("Error loading campaigns:", err);
    }
  };

  const addCampaign = async (c: NewCampaign) => {
    try {
      if (!ngo?.token) throw new Error("NGO not logged in");
      // createCampaign צריך לקבל את הניו-קמפיין (ולרוב גם טוקן)
      await createCampaign(c, ngo.token);
      await refreshCampaigns();
    } catch (err) {
      console.error("Error creating campaign:", err);
    }
  };

  return (
    <CampaignsContext.Provider value={{ campaigns, addCampaign, refreshCampaigns }}>
      {children}
    </CampaignsContext.Provider>
  );
}

export function useCampaigns() {
  const ctx = useContext(CampaignsContext);
  if (!ctx) throw new Error("useCampaigns חייב להיות בתוך CampaignsProvider");
  return ctx;
}

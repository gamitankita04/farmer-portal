import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

const GovtFarmerSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch all schemes from Firebase
  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "government_projects"));
      const schemesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchemes(schemesArray);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      // Fallback to static data if Firebase fails
      setSchemes(staticSchemes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  // Static data as fallback
  const staticSchemes = [
    {
      title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      category: "Financial Support",
      description: "Provides ₹6,000 per year to eligible landholding farmer families, paid in three equal installments directly to their bank accounts.",
      officialWebsite: "https://pmkisan.gov.in",
      helplineNumber: "155261 / 011-23381092"
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      category: "Risk Management",
      description: "Crop insurance covering losses due to natural disasters. Farmers pay a small premium; the rest is subsidized by the government.",
      officialWebsite: "https://pmfby.gov.in",
      helplineNumber: "1800110090"
    },
    {
      title: "Kisan Credit Card (KCC)",
      category: "Credit Access",
      description: "Provides farmers with short-term credit at low interest rates (4% p.a.) for those who repay loans on time.",
      officialWebsite: "https://rbi.org.in",
      helplineNumber: "1800112211"
    },
    {
      title: "Agricultural Infrastructure Fund (AIF)",
      category: "Infrastructure Development",
      description: "Offers medium- to long-term financing with interest subvention and guarantees for projects like warehouses and cold chains.",
      officialWebsite: "https://agriinfra.dac.gov.in",
      helplineNumber: "18001801551"
    },
    {
      title: "Pradhan Mantri Kisan Maan Dhan Yojana (PM-KMY)",
      category: "Pension Scheme",
      description: "A voluntary pension plan for small and marginal farmers, offering ₹3,000 per month upon reaching 60 years of age.",
      officialWebsite: "https://maandhan.in",
      helplineNumber: "1800 267 6888"
    },
    {
      title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
      category: "Irrigation",
      description: "Expands micro-irrigation through the 'Per Drop More Crop' initiative to improve water-use efficiency.",
      officialWebsite: "https://pmksy.gov.in",
      helplineNumber: "011-23381258"
    },
    {
      title: "Soil Health Card (SHC) Scheme",
      category: "Soil Management",
      description: "Provides farmers with a soil report every 2–3 years with fertilizer and nutrient recommendations.",
      officialWebsite: "https://soilhealth.dac.gov.in",
      helplineNumber: "18001801551"
    },
    {
      title: "PM KUSUM Scheme",
      category: "Renewable Energy",
      description: "Encourages use of solar energy by subsidizing solar pumps and on-farm solar power plants.",
      officialWebsite: "https://mnre.gov.in",
      helplineNumber: "1800-180-3333"
    },
    {
      title: "e-NAM (National Agriculture Market)",
      category: "Market Access",
      description: "An online trading platform linking APMCs nationwide to help farmers get transparent prices for their produce.",
      officialWebsite: "https://enam.gov.in",
      helplineNumber: "1800 270 0224"
    },
    {
      title: "Sub-Mission on Agricultural Mechanization (SMAM)",
      category: "Technology",
      description: "Provides subsidies on farm machinery and supports Custom Hiring Centres to rent equipment affordably.",
      officialWebsite: "https://agricoop.nic.in",
      helplineNumber: "011-23382354"
    },
    {
      title: "Namo Drone Didi Scheme",
      category: "Women Empowerment",
      description: "Helps Women SHGs buy drones and offer rental spraying services to farmers, promoting agri-technology.",
      officialWebsite: "https://rural.nic.in",
      helplineNumber: "1800116446"
    },
    {
      title: "Farmer Producer Organizations (FPO) Formation",
      category: "Collective Farming",
      description: "Supports formation of 10,000 FPOs to enhance small farmers' bargaining power and market access.",
      officialWebsite: "https://sfacindia.com",
      helplineNumber: "011-25843271"
    },
    {
      title: "Rashtriya Krishi Vikas Yojana (RKVY)",
      category: "State Initiatives",
      description: "Provides funds and flexibility to states for projects addressing regional agricultural needs.",
      officialWebsite: "https://rkvy.nic.in",
      helplineNumber: "011-23381092"
    },
    {
      title: "Paramparagat Krishi Vikas Yojana (PKVY)",
      category: "Organic Farming",
      description: "Promotes organic clusters, certification, and marketing to encourage sustainable farming.",
      officialWebsite: "https://pgsindia-ncof.gov.in",
      helplineNumber: "18001801551"
    },
    {
      title: "National Food Security Mission (NFSM)",
      category: "Food Security",
      description: "Aims to boost production of rice, wheat, pulses, and other crops to ensure national food security.",
      officialWebsite: "https://nfsm.gov.in",
      helplineNumber: "011-23384277"
    },
    {
      title: "Mission for Aatmanirbharta in Pulses",
      category: "Self-Reliance",
      description: "Launched in Oct 2025 to increase pulse production and reduce imports by supporting pulse farmers.",
      officialWebsite: "https://agricoop.nic.in",
      helplineNumber: "011-23381092"
    }
  ];

  // Get unique categories for filter
  const categories = ["all", ...new Set(schemes.map(scheme => scheme.category))];

  // Filter schemes based on search and category
  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading government schemes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="text-green-600  py-8 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Government Schemes for Farmers</h1>
          <p className="text-green-500 text-lg">
            Discover and access various government initiatives to support your farming journey
          </p>
        </div>
      </header>

      {/* Stats and Search */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{schemes.length}</div>
              <div className="text-gray-600">Total Schemes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {schemes.filter(s => s.status === 'active').length}
              </div>
              <div className="text-gray-600">Active Schemes</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search schemes by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme, index) => (
            <div
              key={scheme.id || index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {scheme.category}
                  </span>
                  {scheme.status && (
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      scheme.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : scheme.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {scheme.status}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                  {scheme.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {scheme.description}
                </p>

                {/* Additional Info */}
                {(scheme.eligibility || scheme.benefits) && (
                  <div className="mb-4 space-y-2">
                    {scheme.eligibility && (
                      <div>
                        <span className="text-sm font-semibold text-gray-700">Eligibility: </span>
                        <span className="text-sm text-gray-600">{scheme.eligibility}</span>
                      </div>
                    )}
                    {scheme.benefits && (
                      <div>
                        <span className="text-sm font-semibold text-gray-700">Benefits: </span>
                        <span className="text-sm text-gray-600">{scheme.benefits}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Links and Contact */}
                <div className="border-t pt-4 space-y-2">
                  {scheme.officialWebsite && (
                    <a
                      href={scheme.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-600 hover:text-green-800 font-medium text-sm transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Official Website
                    </a>
                  )}
                  {scheme.helplineNumber && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Helpline: {scheme.helplineNumber}
                    </div>
                  )}
                  {scheme.applicationProcess && (
                    <div className="text-xs text-gray-500 mt-2">
                      <strong>Apply:</strong> {scheme.applicationProcess}
                    </div>
                  )}
                </div>

                {/* Last Date if available */}
                {scheme.lastDate && (
                  <div className={`mt-3 text-sm font-medium ${
                    new Date(scheme.lastDate) > new Date() 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    Last Date: {new Date(scheme.lastDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No schemes found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCategory !== "all" 
                ? "Try changing your search or filter criteria." 
                : "No government schemes available at the moment."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovtFarmerSchemes;
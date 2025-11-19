import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

const GovernmentProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [project, setProject] = useState({
    title: "",
    category: "",
    description: "",
    eligibility: "",
    benefits: "",
    applicationProcess: "",
    officialWebsite: "",
    helplineNumber: "",
    documentsRequired: "",
    lastDate: "",
    status: "active",
  });

  // Complete predefined schemes data
  const predefinedSchemes = [
    {
      title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      category: "Financial Support",
      description: "Provides ₹6,000 per year to eligible landholding farmer families, paid in three equal installments directly to their bank accounts.",
      eligibility: "Small and marginal landholding farmer families",
      benefits: "₹6,000 per year in three installments",
      applicationProcess: "Online through PM-KISAN portal or CSC centers",
      officialWebsite: "https://pmkisan.gov.in",
      helplineNumber: "155261 / 011-23381092",
      documentsRequired: "Aadhaar card, Bank account details, Land records"
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      category: "Risk Management",
      description: "Crop insurance covering losses due to natural disasters. Farmers pay a small premium; the rest is subsidized by the government.",
      eligibility: "All farmers including sharecroppers and tenant farmers",
      benefits: "Comprehensive crop insurance coverage",
      applicationProcess: "Through banks/PACS/insurance companies",
      officialWebsite: "https://pmfby.gov.in",
      helplineNumber: "1800110090",
      documentsRequired: "Aadhaar card, Land records, Bank account details"
    },
    {
      title: "Kisan Credit Card (KCC)",
      category: "Credit Access",
      description: "Provides farmers with short-term credit at low interest rates (4% p.a.) for those who repay loans on time.",
      eligibility: "Individual farmers, joint borrowers, tenant farmers",
      benefits: "Credit up to ₹3 lakh at 4% interest rate",
      applicationProcess: "Through local banks with land documents",
      officialWebsite: "https://rbi.org.in",
      helplineNumber: "1800112211",
      documentsRequired: "Land documents, Aadhaar, PAN, Photos"
    },
    {
      title: "Agricultural Infrastructure Fund (AIF)",
      category: "Infrastructure Development",
      description: "Offers medium- to long-term financing with interest subvention and guarantees for projects like warehouses and cold chains.",
      eligibility: "Farmers, FPOs, Agri-entrepreneurs",
      benefits: "Interest subvention and credit guarantee",
      applicationProcess: "Through scheduled commercial banks",
      officialWebsite: "https://agriinfra.dac.gov.in",
      helplineNumber: "18001801551",
      documentsRequired: "Project report, Land documents, Financial statements"
    },
    {
      title: "Pradhan Mantri Kisan Maan Dhan Yojana (PM-KMY)",
      category: "Pension Scheme",
      description: "A voluntary pension plan for small and marginal farmers, offering ₹3,000 per month upon reaching 60 years of age.",
      eligibility: "Small and marginal farmers aged 18-40 years",
      benefits: "₹3,000 monthly pension after 60 years",
      applicationProcess: "Through Common Service Centers (CSCs)",
      officialWebsite: "https://maandhan.in",
      helplineNumber: "1800 267 6888",
      documentsRequired: "Aadhaar card, Bank account details, Age proof"
    },
    {
      title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
      category: "Irrigation",
      description: "Expands micro-irrigation through the 'Per Drop More Crop' initiative to improve water-use efficiency.",
      eligibility: "Individual farmers, farmer groups",
      benefits: "Subsidy for micro-irrigation systems",
      applicationProcess: "Through state agriculture departments",
      officialWebsite: "https://pmksy.gov.in",
      helplineNumber: "011-23381258",
      documentsRequired: "Land records, Aadhaar, Bank account details"
    },
    {
      title: "Soil Health Card (SHC) Scheme",
      category: "Soil Management",
      description: "Provides farmers with a soil report every 2–3 years with fertilizer and nutrient recommendations.",
      eligibility: "All farmers",
      benefits: "Free soil testing and recommendations",
      applicationProcess: "Through soil testing labs/Krishi Vigyan Kendras",
      officialWebsite: "https://soilhealth.dac.gov.in",
      helplineNumber: "18001801551",
      documentsRequired: "Land details, Farmer identification"
    },
    {
      title: "PM KUSUM Scheme",
      category: "Renewable Energy",
      description: "Encourages use of solar energy by subsidizing solar pumps and on-farm solar power plants.",
      eligibility: "Farmers, cooperatives, FPOs",
      benefits: "Subsidy for solar pumps and power plants",
      applicationProcess: "Through state nodal agencies",
      officialWebsite: "https://mnre.gov.in",
      helplineNumber: "1800-180-3333",
      documentsRequired: "Land documents, Electricity connection details"
    },
    {
      title: "e-NAM (National Agriculture Market)",
      category: "Market Access",
      description: "An online trading platform linking APMCs nationwide to help farmers get transparent prices for their produce.",
      eligibility: "All registered farmers and traders",
      benefits: "Better price discovery, transparent trading",
      applicationProcess: "Registration on e-NAM portal",
      officialWebsite: "https://enam.gov.in",
      helplineNumber: "1800 270 0224",
      documentsRequired: "Aadhaar, Bank account, Land records"
    },
    {
      title: "Sub-Mission on Agricultural Mechanization (SMAM)",
      category: "Technology",
      description: "Provides subsidies on farm machinery and supports Custom Hiring Centres to rent equipment affordably.",
      eligibility: "Individual farmers, groups, FPOs",
      benefits: "Subsidy on farm machinery",
      applicationProcess: "Through state agriculture departments",
      officialWebsite: "https://agricoop.nic.in",
      helplineNumber: "011-23382354",
      documentsRequired: "Land records, Identity proof, Bank details"
    },
    {
      title: "Namo Drone Didi Scheme",
      category: "Women Empowerment",
      description: "Helps Women SHGs buy drones and offer rental spraying services to farmers, promoting agri-technology.",
      eligibility: "Women Self Help Groups",
      benefits: "Subsidy for drone purchase and training",
      applicationProcess: "Through state rural development departments",
      officialWebsite: "https://rural.nic.in",
      helplineNumber: "1800116446",
      documentsRequired: "SHG registration, Bank details, Identity proof"
    },
    {
      title: "Farmer Producer Organizations (FPO) Formation",
      category: "Collective Farming",
      description: "Supports formation of 10,000 FPOs to enhance small farmers' bargaining power and market access.",
      eligibility: "Groups of small and marginal farmers",
      benefits: "Financial support for FPO formation",
      applicationProcess: "Through implementing agencies",
      officialWebsite: "https://sfacindia.com",
      helplineNumber: "011-25843271",
      documentsRequired: "Farmer details, Land records, Registration documents"
    },
    {
      title: "Rashtriya Krishi Vikas Yojana (RKVY)",
      category: "State Initiatives",
      description: "Provides funds and flexibility to states for projects addressing regional agricultural needs.",
      eligibility: "State governments, implementing agencies",
      benefits: "Financial assistance for state-specific projects",
      applicationProcess: "Through state agriculture departments",
      officialWebsite: "https://rkvy.nic.in",
      helplineNumber: "011-23381092",
      documentsRequired: "Project proposal, State government approval"
    },
    {
      title: "Paramparagat Krishi Vikas Yojana (PKVY)",
      category: "Organic Farming",
      description: "Promotes organic clusters, certification, and marketing to encourage sustainable farming.",
      eligibility: "Farmers, farmer groups, FPOs",
      benefits: "Financial assistance for organic farming",
      applicationProcess: "Through state organic farming agencies",
      officialWebsite: "https://pgsindia-ncof.gov.in",
      helplineNumber: "18001801551",
      documentsRequired: "Land records, Cluster formation details"
    },
    {
      title: "National Food Security Mission (NFSM)",
      category: "Food Security",
      description: "Aims to boost production of rice, wheat, pulses, and other crops to ensure national food security.",
      eligibility: "Farmers in identified districts",
      benefits: "Subsidy on seeds, inputs, and technology",
      applicationProcess: "Through state agriculture departments",
      officialWebsite: "https://nfsm.gov.in",
      helplineNumber: "011-23384277",
      documentsRequired: "Land records, Crop details, Bank account"
    },
    {
      title: "Mission for Aatmanirbharta in Pulses",
      category: "Self-Reliance",
      description: "Launched in Oct 2025 to increase pulse production and reduce imports by supporting pulse farmers.",
      eligibility: "Pulse growing farmers",
      benefits: "Support for pulse production and marketing",
      applicationProcess: "Through state agriculture departments",
      officialWebsite: "https://agricoop.nic.in",
      helplineNumber: "011-23381092",
      documentsRequired: "Land records, Pulse crop details"
    }
  ];

  // Check if project/scheme already exists
  const checkDuplicateProject = async (title) => {
    try {
      const q = query(
        collection(db, "government_projects"), 
        where("title", "==", title)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking duplicate:", error);
      return false;
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "government_projects"));
      const projectsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsArray);
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("Failed to load projects data.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check for duplicate
      const isDuplicate = await checkDuplicateProject(project.title);
      if (isDuplicate) {
        alert("❌ A project with this title already exists!");
        setLoading(false);
        return;
      }

      const newProject = {
        title: project.title,
        category: project.category,
        description: project.description,
        eligibility: project.eligibility,
        benefits: project.benefits,
        applicationProcess: project.applicationProcess,
        officialWebsite: project.officialWebsite,
        helplineNumber: project.helplineNumber,
        documentsRequired: project.documentsRequired,
        lastDate: project.lastDate,
        status: project.status,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "government_projects"), newProject);

      alert("✅ Project added successfully!");
      setShowAddForm(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("❌ Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  // Handle project edit
  const handleEdit = (projectItem) => {
    setEditingProject(projectItem);
    setProject({
      title: projectItem.title,
      category: projectItem.category,
      description: projectItem.description,
      eligibility: projectItem.eligibility,
      benefits: projectItem.benefits,
      applicationProcess: projectItem.applicationProcess,
      officialWebsite: projectItem.officialWebsite,
      helplineNumber: projectItem.helplineNumber,
      documentsRequired: projectItem.documentsRequired,
      lastDate: projectItem.lastDate,
      status: projectItem.status,
    });
    setShowAddForm(true);
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check for duplicate only if title changed
      if (project.title !== editingProject.title) {
        const isDuplicate = await checkDuplicateProject(project.title);
        if (isDuplicate) {
          alert("❌ A project with this title already exists!");
          setLoading(false);
          return;
        }
      }

      const updatedProject = {
        title: project.title,
        category: project.category,
        description: project.description,
        eligibility: project.eligibility,
        benefits: project.benefits,
        applicationProcess: project.applicationProcess,
        officialWebsite: project.officialWebsite,
        helplineNumber: project.helplineNumber,
        documentsRequired: project.documentsRequired,
        lastDate: project.lastDate,
        status: project.status,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(doc(db, "government_projects", editingProject.id), updatedProject);

      alert("✅ Project updated successfully!");
      setShowAddForm(false);
      resetForm();
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      alert("❌ Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  // Handle project deletion
  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteDoc(doc(db, "government_projects", projectId));
        alert("✅ Project deleted successfully!");
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("❌ Failed to delete project");
      }
    }
  };

  // Add predefined schemes (only non-duplicates)
  const addPredefinedSchemes = async () => {
    setLoading(true);
    try {
      let addedCount = 0;
      let skippedCount = 0;

      for (const scheme of predefinedSchemes) {
        // Check if scheme already exists
        const isDuplicate = await checkDuplicateProject(scheme.title);
        
        if (!isDuplicate) {
          await addDoc(collection(db, "government_projects"), {
            ...scheme,
            status: "active",
            createdAt: serverTimestamp(),
          });
          addedCount++;
          console.log(`Added: ${scheme.title}`);
        } else {
          skippedCount++;
          console.log(`Skipped (duplicate): ${scheme.title}`);
        }
      }

      if (addedCount > 0) {
        alert(`✅ ${addedCount} new schemes added successfully!${skippedCount > 0 ? ` ${skippedCount} duplicates skipped.` : ''}`);
      } else {
        alert(`ℹ️ All ${predefinedSchemes.length} schemes already exist in the database. No new schemes added.`);
      }
      
      fetchProjects();
    } catch (error) {
      console.error("Error adding predefined schemes:", error);
      alert("❌ Failed to add predefined schemes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setProject({
      title: "",
      category: "",
      description: "",
      eligibility: "",
      benefits: "",
      applicationProcess: "",
      officialWebsite: "",
      helplineNumber: "",
      documentsRequired: "",
      lastDate: "",
      status: "active",
    });
    setEditingProject(null);
  };

  // Filter projects based on search
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get category counts for stats
  const categoryCounts = projects.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Government Projects Management</h1>
        <p className="text-gray-600">Manage all government schemes and projects for farmers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{projects.length}</div>
          <div className="text-gray-600">Total Projects</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {projects.filter(p => p.status === 'active').length}
          </div>
          <div className="text-gray-600">Active Projects</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Object.keys(categoryCounts).length}
          </div>
          <div className="text-gray-600">Categories</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {projects.filter(p => p.lastDate && new Date(p.lastDate) > new Date()).length}
          </div>
          <div className="text-gray-600">Open for Application</div>
        </div>
      </div>

      {/* Search + Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search projects by title, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={addPredefinedSchemes}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center gap-2"
          >
            {loading ? "Adding..." : `Add All Schemes (${predefinedSchemes.length})`}
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowAddForm(!showAddForm);
            }}
            className="bg-green-800 text-white px-4 py-3 rounded-lg hover:bg-green-900 flex items-center gap-2"
          >
            {showAddForm ? "Close Form" : "Add New Project"}
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow border mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingProject ? "Edit Project" : "Add New Government Project"}
          </h2>
          <form
            onSubmit={editingProject ? handleUpdate : handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Project Title"
              name="title"
              value={project.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Category (e.g., Financial Support, Risk Management)"
              name="category"
              value={project.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              placeholder="Description"
              name="description"
              value={project.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg md:col-span-2"
              rows="3"
              required
            />
            <textarea
              placeholder="Eligibility Criteria"
              name="eligibility"
              value={project.eligibility}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="2"
            />
            <textarea
              placeholder="Benefits"
              name="benefits"
              value={project.benefits}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="2"
            />
            <textarea
              placeholder="Application Process"
              name="applicationProcess"
              value={project.applicationProcess}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="2"
            />
            <input
              type="url"
              placeholder="Official Website"
              name="officialWebsite"
              value={project.officialWebsite}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Helpline Number"
              name="helplineNumber"
              value={project.helplineNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Documents Required"
              name="documentsRequired"
              value={project.documentsRequired}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="2"
            />
            <input
              type="date"
              placeholder="Last Date to Apply"
              name="lastDate"
              value={project.lastDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="upcoming">Upcoming</option>
            </select>

            <div className="md:col-span-2 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-900 disabled:bg-green-400"
              >
                {loading ? "Saving..." : (editingProject ? "Update Project" : "Add Project")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      <div className="bg-white rounded-lg shadow border">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 p-6">
            {filteredProjects.map((projectItem) => (
              <div key={projectItem.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-2">{projectItem.title}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        projectItem.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : projectItem.status === 'upcoming'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {projectItem.status}
                      </span>
                      <span className="ml-2 inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {projectItem.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(projectItem)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(projectItem.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{projectItem.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-gray-900">Eligibility:</strong>
                      <p className="text-gray-600">{projectItem.eligibility || 'Not specified'}</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Benefits:</strong>
                      <p className="text-gray-600">{projectItem.benefits || 'Not specified'}</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Application Process:</strong>
                      <p className="text-gray-600">{projectItem.applicationProcess || 'Not specified'}</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">Documents Required:</strong>
                      <p className="text-gray-600">{projectItem.documentsRequired || 'Not specified'}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    {projectItem.officialWebsite && (
                      <a 
                        href={projectItem.officialWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Official Website →
                      </a>
                    )}
                    {projectItem.helplineNumber && (
                      <span className="text-gray-600">
                        Helpline: {projectItem.helplineNumber}
                      </span>
                    )}
                    {projectItem.lastDate && (
                      <span className={`font-medium ${
                        new Date(projectItem.lastDate) > new Date() 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        Last Date: {new Date(projectItem.lastDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            {projects.length === 0 ? (
              <div>
                <p className="mb-4">No government projects found.</p>
                <button
                  onClick={addPredefinedSchemes}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Add All Government Schemes ({predefinedSchemes.length})
                </button>
              </div>
            ) : (
              "No projects match your search."
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentProjects;
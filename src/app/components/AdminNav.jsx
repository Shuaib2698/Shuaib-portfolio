const AdminNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "hero", name: "Hero Section" },
    { id: "about", name: "About" },
    { id: "experience", name: "Experience" },
    { id: "projects", name: "Projects" },
    { id: "skills", name: "Skills" },
    { id: "email", name: "Email Section" },
  ];

  return (
    <div className="flex flex-wrap gap-2 border-b border-[#333] pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-md ${
            activeTab === tab.id
              ? "bg-[rgb(var(--primary-color))] text-black"
              : "bg-[#111] text-white hover:bg-[#222]"
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default AdminNav;
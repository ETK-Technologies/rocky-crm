const PageHeader = ({ icon: IconComponent, title, description }) => {
  return (
    <div className="flex items-center gap-4 mb-3">
      <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
        <IconComponent className="w-6 h-6 text-primary-600" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">{title}</h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-1 h-4 bg-primary-600 rounded-full"></div>
          <p className="text-secondary-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

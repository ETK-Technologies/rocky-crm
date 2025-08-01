import Icons from "@/components/icons";

const PageHeader = ({
  icon: IconComponent,
  title,
  description,
  onBack,
  backLabel = "Back",
  actions,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {IconComponent && (
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl">
              <IconComponent className="w-6 h-6 text-primary-600" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">{title}</h1>
            {description && (
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1 h-4 bg-primary-600 rounded-full"></div>
                <p className="text-secondary-600 text-sm">{description}</p>
              </div>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors"
        >
          <Icons.Collapse className="w-4 h-4" />
          {backLabel}
        </button>
      )}
    </div>
  );
};

export default PageHeader;

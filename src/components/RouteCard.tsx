"use client";

interface RouteCardProps {
  type: "bus" | "metro" | "car";
  duration: number; // minutes
  cost: number; // TL
  description?: string;
}

export default function RouteCard({
  type,
  duration,
  cost,
  description,
}: RouteCardProps) {
  const getIcon = () => {
    switch (type) {
      case "bus":
        return (
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7a2 2 0 00-2-2H10a2 2 0 00-2 2z"
            />
          </svg>
        );
      case "metro":
        return (
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case "car":
        return (
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (type) {
      case "bus":
        return "Otobüs";
      case "metro":
        return "Metro";
      case "car":
        return "Araç";
      default:
        return "";
    }
  };

  const getColor = () => {
    switch (type) {
      case "bus":
        return "border-blue-200 bg-blue-50";
      case "metro":
        return "border-green-200 bg-green-50";
      case "car":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`card border-2 ${getColor()} p-4`}>
      <div className="flex items-center space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0">{getIcon()}</div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900">{getLabel()}</h3>
            <span className="text-sm font-medium text-gray-700">
              {formatPrice(cost)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{duration} dakika</span>
            {description && <span className="text-xs">{description}</span>}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-3 pt-3 border-t border-current border-opacity-20">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Günlük maliyet</span>
          <span className="font-medium">{formatPrice(cost * 2)}</span>
        </div>
      </div>
    </div>
  );
}

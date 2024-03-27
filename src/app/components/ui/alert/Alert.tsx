// Alert component.

interface AlertProps {
  title?: string;
  body: React.ReactNode;
  type?: "success" | "warning" | "error";
}

// Title Optional, Type will default to success.
export default function Alert({ title = "", body, type = "success" }: AlertProps) {
  // Define color sets for each type
  const colorSets = {
    success: { border: "border-green-500", text: "text-green-700", background: "bg-green-100" },
    warning: { border: "border-orange-500", text: "text-orange-700", background: "bg-orange-100" },
    error: { border: "border-red-500", text: "text-red-700", background: "bg-red-100" },
  };

  // Select the appropriate color set based on the type prop
  const colors = colorSets[type];

  return (
    <div
      className={`w-full max-w-lg mt-5 ${colors.background} border-l-4 ${colors.border} ${colors.text} p-4`}
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{body}</p>
    </div>
  );
}

const Error = ({ message }: { message?: string }) => {
  return (
    <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
      <p className="text-sm text-red-600">{message || "An error occurred"}</p>
    </div>
  );
};

export default Error;

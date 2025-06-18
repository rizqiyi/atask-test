const NotFound = ({
  text,
  Icon,
}: {
  text: string;
  Icon: React.ReactElement;
}) => {
  return (
    <div className="p-8 text-center" data-testid="not-found">
      {Icon}
      <p className="text-gray-500" data-testid="not-found-text">{text}</p>
    </div>
  );
};

export default NotFound;

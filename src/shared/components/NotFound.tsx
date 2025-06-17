const NotFound = ({ text, Icon }) => {
  return (
    <div className="p-8 text-center">
      {Icon}
      <p className="text-gray-500">{text}</p>
    </div>
  );
};

export default NotFound;

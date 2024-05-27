import "./divider.scss";
const CustomDivider = ({ ...props }: any) => {
  return (
    <>
      <hr className="custom-divider" {...props} />
    </>
  );
};

export default CustomDivider;

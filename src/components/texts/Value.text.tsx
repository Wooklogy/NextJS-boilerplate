import React from "react";

const Value = ({ value }: { value: string | number | undefined }) => {
  const [val, setVal] = React.useState<string | number | undefined>(value);
  React.useEffect(() => {
    setVal(val);
  }, [value]);
  return <span>{Number(val).toLocaleString("en-US")}</span>;
};

export default React.memo(Value);

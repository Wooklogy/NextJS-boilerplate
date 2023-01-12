import React from "react";
import { NextPageWithLayout } from "./_app";
import { ColumnsType } from "antd/es/table";
import DndTable from "src/components/tables/Dnd.table.comp";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const Main: NextPageWithLayout = () => {
  const [tempData, setData] = React.useState([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ]);
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <DndTable
      columns={columns}
      dataSource={tempData}
      setData={setData}
    ></DndTable>
  );
};

export default Main;

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import ReactDOM from "react-dom";
const ACCEPT_TYPE = "DraggableBodyRow";

interface DraggableBodyRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableBodyRow = ({
  index,
  moveRow,
  style,
  ...restProps
}: DraggableBodyRowProps) => {
  const ref = React.useRef<HTMLTableRowElement>(null);
  const [{ isDragging, handlerIndex }, drag] = useDrag(
    {
      type: ACCEPT_TYPE,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerIndex: monitor.getHandlerId(),
      }),
    },
    [moveRow]
  );

  const [, drop] = useDrop(
    {
      accept: ACCEPT_TYPE,
      hover: (item: any, monitor) => {
        const curRef = ref.current;
        if (!curRef) return null;
        const dragedIndex = item?.index;
        if (dragedIndex === null) return null;
        if (dragedIndex === index) return null;
        const hoverElement = ReactDOM?.findDOMNode(curRef) as Element;
        const hoverBoundingRect = hoverElement.getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();

        if (!clientOffset) return null;
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragedIndex < index && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragedIndex > index && hoverClientY > hoverMiddleY) {
          return;
        }
        moveRow(dragedIndex, index);
        item.index = index;
      },
    },
    [moveRow]
  );

  drag(ref);
  drop(ref);

  const opacity = isDragging ? 0 : 1;
  const zIndex = isDragging ? 2 : 1;
  const containerStyle = React.useMemo(
    () => ({ ...style, zIndex, opacity }),
    [opacity]
  );

  return (
    <tr
      ref={ref}
      style={containerStyle}
      data-handler-index={handlerIndex}
      {...restProps}
    ></tr>
  );
};

interface DndTableProps {
  columns: ColumnsType<any>;
  dataSource: any[];
  setData: any;
  restProps?: any;
}

const DndTable = (props: DndTableProps) => {
  const moveRow = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = props.dataSource[dragIndex];
      props.setData(
        update(props.dataSource, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [props.dataSource]
  );
  const components = {
    body: { row: DraggableBodyRow },
  };
  return (
    <Table
      columns={props.columns}
      dataSource={props.dataSource}
      components={components}
      onRow={(_, index) => {
        const attr = { index, moveRow };
        return attr as React.HTMLAttributes<any>;
      }}
      {...props.restProps}
    ></Table>
  );
};

export default DndTable;

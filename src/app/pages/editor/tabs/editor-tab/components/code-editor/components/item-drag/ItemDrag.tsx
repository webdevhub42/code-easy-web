import React from 'react';
import { ConnectDragSource, DragSource, useDrag } from 'react-dnd';

const style: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid gray',
    backgroundColor: 'gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
    height: '50px',
}

export const ItemTypes = {
    BOX: 'box',
}

export interface ItemDragProps {
    id?: any
    left?: number
    top?: number
    title: string
    hideSourceOnDrag?: boolean

    // Collected Props
    // connectDragSource: ConnectDragSource
    // isDragging?: boolean
}
/* 
const ItemDrag: React.FC<ItemDragProps> = ({ left, top, connectDragSource, isDragging, children }) => {
    if (isDragging) return null;

    return connectDragSource(<div style={{ ...style, left, top }}>{children}</div>);
}

export default DragSource(
    ItemTypes.BOX,
    {
        beginDrag(props: ItemDragProps) {
            const { id, left, top, title } = props;
            return { id, left, top, title }
        },
    },
    (connect, monitor) => ({ connectDragSource: connect.dragSource(), isDragging: monitor.isDragging() }),
)(ItemDrag)
 */

const ItemForDrag: React.FC<ItemDragProps> = ({ left, top, children }) => {
    const [{ isDragging }, dragRef] = useDrag({
        item: { type: ItemTypes.BOX },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return <div ref={dragRef} style={{ ...style, left, top, backgroundColor: isDragging ? "blue" : "" }}>{children}</div>;
}

export const ItemToDrag = DragSource(
    ItemTypes.BOX,
    {
        beginDrag(props: ItemDragProps) {
            const { id, left, top, title } = props;
            return { id, left, top, title }
        },
    },
    (connect) => ({ connectDragSource: connect.dragSource() }),
)(ItemForDrag)

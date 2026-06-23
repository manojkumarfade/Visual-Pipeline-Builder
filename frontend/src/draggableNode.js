export const DraggableNode = ({ type, label, icon, color }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node draggable-node--${type}`}
      style={{ '--node-chip-color': color }}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className="draggable-node__icon" aria-hidden="true">{icon}</span>
      <span className="draggable-node__label">{label}</span>
      <span className="draggable-node__drag-handle" aria-hidden="true">::</span>
    </div>
  );
};
  

import React from 'react';


enum StepType {
    Order = "订单",
    Factory = "工厂",
    Logistics = "物流",
    AfterSales = "售后",
  }

interface NodeProps {
  id: number;
  text: string;
  position?: { x: number; y: number };
  expanded: boolean;
  showStepTypeInput: boolean;
  hasNextNode: boolean;
  selectedStep: StepType; // 将 selectedStep 添加到 NodeProps
  toggleNodeExpansion: () => void;
  onClick: () => void;
  addNextNode: (selectType: StepType) => void;
  addChildNode: () => void;
  deleteNode: () => void;
  deleteChildNode: (childId: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void; // 添加拖动开始事件处理程序
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void; // 添加拖动事件处理程序
  onDragEnd: () => void; // 添加拖动结束事件处理程序
}

const Node: React.FC<NodeProps> = ({ 
    id, 
    text, 
    position, 
    expanded, 
    showStepTypeInput, 
    hasNextNode,
    selectedStep,
    onClick, 
    addNextNode, 
    addChildNode, 
    deleteNode, 
    deleteChildNode,
    onDragStart,
    onDrag,
    onDragEnd,
}) => {
    return (
      <div style={{ position: 'absolute', left: position?.x, top: position?.y }}
      draggable // 设置节点为可拖动
      onDragStart={(e) => onDragStart(e, id)} // 触发拖动开始事件处理程序
      onDrag={(e) => onDrag(e)} // 触发拖动事件处理程序
      onDragEnd={onDragEnd} // 触发拖动结束事件处理程序
      >
        <div className={`node-shape ${expanded ? 'expanded' : 'collapsed'}`} onClick={onClick}>
          {text}
        </div>
        {showStepTypeInput && !hasNextNode && (
          <div>
            <select onChange={(e) => {
              const stepType = e.target.value as StepType;
              addNextNode(stepType);
            }}>
              <option value="">请选择下一步并点击</option>
              {Object.values(StepType).map((stepType) => (
                <option key={stepType} value={stepType}>{stepType}</option>
              ))}
            </select>
          </div>
          
        )}
        <button onClick={() => addChildNode()}>Add Child</button>
        <button onClick={() => deleteNode()}>Delete</button>
        {/* Render children if the node is expanded */}
        {expanded && (
          <div className="child-nodes">
            {/* Map through children and render them */}
          </div>
        )}
      </div>
    );
  };
  

export default Node;

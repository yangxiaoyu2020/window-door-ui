import React, { useState, useEffect, Children } from 'react';
import '../styles/Pipeline.css';
import Node from './Node'

interface Node {
  id: number;
  text: string;
  children: Node[];
  position: { x: number; y: number };
  expanded: boolean; // Track whether the node is expanded or collapsed
  selectedStep: StepType | null; // 新增selectedStep属性
  showStepTypeInput: boolean; // 新增属性用于控制显示步骤类型输入的标志
  hasNextNode: boolean;
}

enum StepType {
  Order = "订单",
  Factory = "工厂",
  Logistics = "物流",
  AfterSales = "售后",
}

// 定义箭头类型
interface Arrow {
  id: number;
  startNodeId: number;
  endNodeId: number;
  start: { x: number; y: number };
  end: { x: number; y: number };
}

const HORIZONTAL_GAP = 200;
const VERTICAL_GAP = 100;

const Pipeline: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedStep, setSelectedStep] = useState<StepType | null>(null);
  const [arrows, setArrows] = useState<Arrow[]>([]); // 箭头状态
  const [draggingNode, setDraggingNode] = useState<number | null>(null); // 正在拖动的节点ID



  useEffect(() => {
    initNodes();
    initArrows();
  }, []);

  const initArrows = () => {
    setArrows([]);
  };

  const initNodes = () => {
    setNodes([]);
  };

  const addRootNode = () => {
    setNodes([]);
    addNode(null);
  };

  const addNode = (parent: Node | null) => {
    if (selectedStep) {
      const newId = Date.now();
      let x = 0;
      let y = 0;
      if (parent) {
        x = parent.position.x + HORIZONTAL_GAP;
        y = parent.position.y;
      }
      else {
        const newButtonPosition = document.getElementById("add-button")?.getBoundingClientRect();
        x = 0;
        y = (newButtonPosition) ? newButtonPosition.bottom:VERTICAL_GAP;
      }
      const newNode: Node = {
        id: newId,
        text: parent?(parent.selectedStep?parent.selectedStep.toString():selectedStep.toString()):selectedStep.toString(),
        children: [],
        position: {
          x: x,
          y: y,
        },
        expanded: true, // New nodes are initially expanded
        selectedStep: parent?parent.selectedStep:selectedStep, // 新增属性用于控制显示步骤类型输入的标志
        showStepTypeInput: true, // 设置新节点的selectedStep为当前选中的StepType
        hasNextNode: false,
        
      };
      setNodes(prevNodes => [...prevNodes, newNode]);
      return newId;
    }
    return null;
  };

  const addArrow = (startNodeId: number, endNodeId: number) => {
    const startNode = nodes.find((node) => node.id === startNodeId);
    const endNode = nodes.find((node) => node.id === endNodeId);
    if (startNode && endNode) {
      const newArrow: Arrow = {
        id: arrows.length + 1,
        startNodeId: startNodeId,
        endNodeId: endNodeId,
        start: { x: startNode.position.x, y: startNode.position.y },
        end: { x: endNode.position.x, y: endNode.position.y },
      };
      setArrows((prevArrows) => [...prevArrows, newArrow]);
    }
  };

  const addNextNode = (parent: Node, selectType: StepType) => {
      const newId = Date.now();
      let x = 0;
      let y = 0;
      x = parent.position.x + HORIZONTAL_GAP;
      y = parent.position.y;
      const newNode: Node = {
        id: newId,
        text: selectType.toString(),
        children: [],
        position: {
          x: x,
          y: y,
        },
        expanded: true, // New nodes are initially expanded
        selectedStep: selectType, // 新增属性用于控制显示步骤类型输入的标志
        showStepTypeInput: true, // 设置新节点的selectedStep为当前选中的StepType
        hasNextNode: false,
        
      };
      parent.hasNextNode = true;
      console.log(selectType);
          // 添加节点时将 hasNextNode 设为 true
      setNodes(prevNodes => [...prevNodes, newNode]);

      setNodes(prevNodes => {
        return prevNodes.map(n => {
          if (n.id === parent?.id) {
            return { ...n, children: [...n.children], hasNextNode: true };
          }
          return n;
        });
      });
      console.log(nodes);
      return newId;
  };

  const deleteNode = (id: number) => {
    setNodes(prevNodes => prevNodes.filter(node => node.id !== id));
  };

    // 更新节点位置
    const updateNodePosition = (id: number, newPosition: { x: number; y: number }) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => (node.id === id ? { ...node, position: newPosition } : node))
      );
    };
  
    // 拖动节点事件处理程序
    const handleNodeDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
      setDraggingNode(id);
    };
  
    const handleNodeDrag = (e: React.DragEvent<HTMLDivElement>) => {
      if (draggingNode !== null) {
        const newPosition = {
          x: e.clientX,
          y: e.clientY,
        };
        updateNodePosition(draggingNode, newPosition);
      }
    };
  
    const handleNodeDragEnd = () => {
      setDraggingNode(null);
    };

  

  const addChildNode = (parentId: number) => {
    const updatedNodes = nodes.map(node => {
      if (node.id === parentId) {
        const childId = addNode(node);
        if (childId !== null) {
          return {
            ...node,
            children: [...node.children, { 
              id: childId,
              text: node.text.toString() + node.children.length, 
              children: [], 
              position: { x: 0, y: node.position.y + VERTICAL_GAP  + node.children.length * VERTICAL_GAP},
              expanded: true, // New child nodes are initially expanded
              selectedStep: selectedStep, // 设置新子节点的selectedStep为当前选中的StepType
              showStepTypeInput:false,
              hasNextNode: true,
            }]
          };
        }
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const deleteChildNode = (parentId: number, childId: number) => {
    const updatedNodes = nodes.map(node => {
      if (node.id === parentId) {
        const updatedChildren = node.children.filter(child => child.id !== childId);
        return { ...node, children: updatedChildren };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const toggleNodeExpansion = (id: number) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, expanded: !node.expanded } : node
      )
    );
  };


  return (
    <div style={{ position: 'relative', height: '1000px' }}>
      <h2>Pipeline</h2>
      <select onChange={(e) => setSelectedStep(e.target.value as StepType)}>
        <option value="">Select Step Type</option>
        {Object.values(StepType).map((stepType) => (
          <option key={stepType} value={stepType}>{stepType}</option>
        ))}
      </select>
      <button onClick={addRootNode}>init Node</button>
      {nodes.map(node => (
        <div key={node.id} style={{ position: 'absolute', left: node.position.x, top: node.position.y }}>
          <Node
            id={node.id}
            text={node.text}
            position={node.position}
            expanded={node.expanded}
            showStepTypeInput={node.showStepTypeInput}
            hasNextNode={node.hasNextNode}
            selectedStep={node.selectedStep || StepType.Order} // 处理 null 值
            onClick={() => toggleNodeExpansion(node.id)}
            addNextNode={(selectType) => addNextNode(node, selectType)}
            addChildNode={() => addChildNode(node.id)}
            deleteNode={() => deleteNode(node.id)}
            deleteChildNode={(childId) => deleteChildNode(node.id, childId)}
            toggleNodeExpansion={() => toggleNodeExpansion(node.id)} // 添加了 toggleNodeExpansion 属性
            onDragStart={(e) => handleNodeDragStart(e, node.id)} // 拖动开始事件处理程序
            onDrag={(e) => handleNodeDrag(e)} // 拖动事件处理程序
            onDragEnd={handleNodeDragEnd} // 拖动结束事件处理程序
          />
          {node.expanded && node.children.map(child => (
            <div
              key={child.id}
              style={{ position: 'absolute', left: child.position.x, top: child.position.y }}
              className="child-node-shape"
            >
              <span>{child.text}</span>
              <button onClick={() => deleteChildNode(node.id, child.id)}>Delete Child</button>
            </div>
          ))}
        </div>
      ))}
            {/* 渲染箭头 */}
            {arrows.map((arrow) => (
        <svg key={arrow.id} style={{ position: 'absolute', zIndex: -1 }}>
          {/* 箭头内容 */}
          <line
            x1={arrow.start.x}
            y1={arrow.start.y}
            x2={arrow.end.x}
            y2={arrow.end.y}
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </svg>
      ))}

      {/* 添加节点按钮 */}
      {/* 添加箭头按钮 */}
      <button onClick={() => addArrow(1, 2)}>Add Arrow</button>
    </div>
  );
  
  
  
};

export default Pipeline;

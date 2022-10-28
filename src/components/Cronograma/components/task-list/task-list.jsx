import React, { useEffect, useRef } from "react";

export const TaskList = ({
  headerHeight,
  fontFamily,
  fontSize,
  rowWidth,
  rowHeight,
  scrollY,
  tasks,
  selectedTask,
  setSelectedTask,
  onExpanderClick,
  locale,
  ganttHeight,
  taskListRef,
  horizontalContainerClass,
  TaskListHeader,
  TaskListTable,
  handleEdit,
  handleDelete,
}) => {
  //useRef horizontalContainerRef
  const horizontalContainerRef = useRef(null);
  //cuando cambie el valor ScrollY  cambia el valor de scrollTop = scrollY
  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);
  
/** 
 * Constante objeto headerProps con valores de 
 * headerHeight fontFamily, fontSize, rowWidth (props)
 * */ 
  const headerProps = {
    headerHeight,
    fontFamily,
    fontSize,
    rowWidth,
  };
  /**
   * selectedTaskId si selectedTask esta definido
   * le asigna el valor de id del selectedTask o le asigna
   * valor vacío ""
   */
  const selectedTaskId = selectedTask ? selectedTask.id : "";
  /**
   * tableProps una constante para el manejo de tableProps
   */
  const tableProps = {
    rowHeight,
    rowWidth,
    fontFamily,
    fontSize,
    tasks,
    locale,
    selectedTaskId: selectedTaskId,
    setSelectedTask,
    onExpanderClick,
  };

  return (
    <div ref={taskListRef}>
      <TaskListHeader {...headerProps} />
      <div
        ref={horizontalContainerRef}
        className={horizontalContainerClass}
        style={ganttHeight ? { height: ganttHeight } : {}}
      >
        <TaskListTable {...tableProps} handleEdit={handleEdit}
        handleDelete={handleDelete}/>
      </div>
    </div>
  );
};
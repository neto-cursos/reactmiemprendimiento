import React from "react";
import { ViewMode } from "gantt-task-react";

export const ViewSwitcher = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  return (
    <div className="ViewContainer">
      {/* <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Hour)}
      >
        Hora
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.QuarterDay)}
      >
        Quarter of Day
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.HalfDay)}
      >
        Half of Day
      </button> */}
      <button className="Button" onClick={() => onViewModeChange(ViewMode.Day)}>
        Día
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Semana
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Mes
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.Year)}
      >
        Año
      </button>
      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Ver Datos
      </div>
    </div>
  );
};
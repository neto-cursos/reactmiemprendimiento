import React from "react";
import styles from "./task-list-header.module.css";

export const TaskListHeaderDefault = ({ headerHeight, fontFamily, fontSize, rowWidth }) => {
  return (
    <div
      className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight - 2,
        }}
      >
        <div
          className={`pl-2 ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: rowWidth,
          }}
        >
          &nbsp;Actividad
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        />
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            //minWidth: rowWidth,
            minWidth: '90px',
          }}
        >
          &nbsp;Inicio
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: '90px',
          }}
        >
          &nbsp;Fin
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: '155px',
          }}
        >
          &nbsp;Responsable
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: '70px',
          }}
        >
          &nbsp;Act. Req
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: '70px',
          }}
        >
          &nbsp;Cantidad
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: '100px',
          }}
        >
          &nbsp;Unidad
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: '100px',
          }}
        >
          &nbsp;Monto
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: '250px',
          }}
        >
          &nbsp;Observación
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: '50px',
          }}
        >
          &nbsp;C
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.25,
          }}
        />
        <div
          className={`text-center ${styles.ganttTable_HeaderItem}`}
          style={{
            minWidth: '30px',
          }}
        >
          &nbsp;B
        </div>
      </div>
    </div>
  );
};
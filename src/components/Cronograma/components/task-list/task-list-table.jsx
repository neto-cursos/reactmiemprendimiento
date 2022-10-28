import { Checkbox } from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCron_done } from "../../../../reduxfeatures/cronogramaSlice";
import EraseEntry from "../../../Icons/eraseEntry";
import styles from "./task-list-table.module.css";

const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
}


const formatDate = (date) => {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

const localeDateStringCache = {};
const toLocaleDateStringFactory =
  (locale) =>
    (date, dateTimeOptions) => {
      const key = date.toString();
      // console.log("key: ");
      // console.log(key);
      let lds = localeDateStringCache[key];
      // console.log("lds: ");
      // console.log(lds);
      if (!lds) {
        // console.log("ENTRÓ");
        lds = date.toLocaleDateString(locale, dateTimeOptions);
        localeDateStringCache[key] = lds;

      }
      return lds;
    };
const dateTimeOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const TaskListTableDefault = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick,
  handleEdit,
  handleDelete,
}) => {
  const crons = useSelector(state => state.cronogramas);
  const dispatch = useDispatch();

  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(locale),
    [locale]
  );

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    console.log(event.target);
    dispatch(changeCron_done({ id: event.target.id, value: event.target.checked, }))
    setChecked(event.target.checked);
  };
  // t.cron_done == true ? ()=>{setChecked(true);return } : setChecked(false)

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map(t => {
        let expanderSymbol = "";
        if (t.hideChildren === false) {
          expanderSymbol = "▼";
        } else if (t.hideChildren === true) {
          expanderSymbol = "▶";
        }

        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: rowHeight }}
            key={`${t.id}row`}
          >
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
              title={t.name}
            >
              <div className={styles.taskListNameWrapper}>
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  onClick={() => onExpanderClick(t)}
                >
                  {expanderSymbol}
                </div>


                <div
                  className={styles.taskListCell}
                  style={{

                    //minWidth: rowWidth,
                    //maxWidth: rowWidth,
                    minWidth: '30px',
                    maxWidth: '30px',
                  }}
                >
                  &nbsp;{t.displayOrder}
                  {/* &nbsp;{toLocaleDateString(t.start, dateTimeOptions)} */}
                </div>
                
                <h3 className={'hover:text-redish  cursor-pointer focus:ring-blue-500 text-bluenavish'} onClick={t.id!=='1'?() => handleEdit(t.id):null}>{t.name}
                </h3>
              </div>
            </div>
            <div
              className={styles.taskListCell}
              style={{

                //minWidth: rowWidth,
                //maxWidth: rowWidth,
                minWidth: '90px',
                maxWidth: '90px',
              }}
            >
              &nbsp;{formatDate(t.start)}
              {/* &nbsp;{toLocaleDateString(t.start, dateTimeOptions)} */}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: '90px',
                maxWidth: '90px',
              }}
            >
              {/* &nbsp;{toLocaleDateString(t.end, dateTimeOptions)} */}

              &nbsp;{formatDate(t.end)}
              {/* {            
              console.log(t.end.getDate()+"/"+(t.end.getMonth() + 1)+"/"+t.end.getFullYear())} */}
              {/* {console.log(formatDate(t.end))} */}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
              title={t.responsable}
            >
              &nbsp;{t.responsable}
            </div>
            <div
              className={`text-center ${styles.taskListCell}`}
              style={{
                minWidth: '70px',
                maxWidth: '70px',
              }}
              title={t.dependencies}
            >
              &nbsp;{t.dependencies}
            </div>
            {/* cantidad */}
            <div
              className={`text-center ${styles.taskListCell}`}
              style={{
                minWidth: '70px',
                maxWidth: '70px',
              }}
              title={t.cantidad}
            >
              &nbsp;{t.cantidad}
            </div>
            {/* unidad */}
            <div
              className={`text-center ${styles.taskListCell}`}
              style={{
                minWidth: '100px',
                maxWidth: '100px',
              }}
              title={t.unidad}
            >
              &nbsp;{t.unidad}
            </div>
            {/* monto */}
            <div
              className={`text-center ${styles.taskListCell}`}
              style={{
                minWidth: '100px',
                maxWidth: '100px',
              }}
              title={t.monto}
            >
              &nbsp;{t.monto}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: '250px',
                maxWidth: '250px',
              }}
              title={t.notas}
            >
              &nbsp;{t.notas}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: '50px',
                maxWidth: '50px',
              }}
              title={t.cron_done ? 'completado' : 'no completado'}
            >
              &nbsp;{t.id!=='1'&&
                <Checkbox id={t.id} sx={{
                  color: '#b33c50',
                  '&.Mui-checked': {
                    color: '#e397a4',
                  },
                }}
                  checked={t.cron_done == true ? true : false}
                  onChange={handleChange}
                ></Checkbox>}

            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: '30px',
                maxWidth: '30px',
                paddingTop:'1rem',
                textAlign:'center',
              }}
              title={'Eliminar'}
            >
              &nbsp;{t.id!=='1'&&

                <button className='' onClick={() => {
                  return handleDelete(t.id)
                }}><EraseEntry color="redish"></EraseEntry>&nbsp;
                </button>}


            </div>

          </div>
        );
      })}
    </div>
  );
};
import React from 'react';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

const Cronograma = () => {
    let tasks = [
        {
          start: new Date(2022, 10, 1),
          end: new Date(2022, 11, 1),
          name: 'Idea',
          id: 'Tarea 0',
          type:'task',
          progress: 30,
          isDisabled: true,
          styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
        },
        {
            start: new Date(2022, 10, 1),
            end: new Date(2022, 11, 1),
            name: 'Idea2',
            id: 'Tarea 1',
            type:'task',
            progress: 10,
            isDisabled: true,
            styles: { progressColor: '#d65323', progressSelectedColor: '#e36d1e' },
            
          },
    ];
    return (
        <div>
            <h1 className='text-center font-extrabold'>Cronogramas De Emprendimiento: {'nombre de emprendimiento'}</h1>
            <br />
            <Gantt tasks={tasks} locale="spa" />
        </div>
    );
}

export default Cronograma;

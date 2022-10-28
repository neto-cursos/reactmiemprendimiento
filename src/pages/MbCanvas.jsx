import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Canvas from '../components/Canvas';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { nanoid } from '@reduxjs/toolkit';
import { modulos } from './../constants/modulos'

const MbCanvas = () => {

    const [select, setSelect] = React.useState({
        id: 1, value: `Módulo 1 
    ${modulos.find((nodo => nodo.modu_id == 1)).modulo}`
    });

    const handleChange = (e) => {
        console.log(e.target);
        setSelect({
            id: e.target.value,
            value: `Módulo ${e.target.value} 
        ${modulos.find((nodo => nodo.modu_id == Number(e.target.value))).modulo}`,
        });
    }
    const { empr_id } = useParams();
    return (
        <div className='flex relative flex-col'>

            <h1 className="text-4xl text-darkish text-center">PLAN NEGOCIOS</h1>
            <div className='pb-4 flex flex-row justify-center items-center'>
                <FormControl variant="standard" sx={{ mr: 1, minWidth: 120 }}>
                    <InputLabel id="lblselectmodule">Módulo</InputLabel>
                    <Select key={nanoid()}
                        labelId="lblselectmodule"
                        id="selectmodule"
                        value={select.id}
                        onChange={handleChange}
                        label="Módulo"
                    >
                        {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
                        <MenuItem value={1}>módulo 1</MenuItem>
                        <MenuItem value={2}>módulo 2</MenuItem>
                        <MenuItem value={3}>módulo 3</MenuItem>
                        <MenuItem value={4}>módulo 4</MenuItem>
                        <MenuItem value={5}>módulo 5</MenuItem>
                        <MenuItem value={6}>módulo 6</MenuItem>
                        <MenuItem value={7}>módulo 7</MenuItem>
                        <MenuItem value={8}>módulo 8</MenuItem>
                        <MenuItem value={9}>módulo 9</MenuItem>
                    </Select>
                </FormControl>
                <Link to={`/misemprendimientos/fill/${empr_id}/${select.id}/Industria`}>
                    <button className='text-whitish bg-redish rounded-sm'>
                        Llenar {select.value}
                    </button>
                </Link>
                
            </div>
            <Canvas>

            </Canvas>

        </div>
    );
}

export default MbCanvas;

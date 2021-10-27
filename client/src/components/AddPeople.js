import React, { useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from "@material-ui/core";

const AddPeople = () => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        nombre: '',
        apellido: '',
        edad: ''
    });

    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);

    const BASE_URL = "/api/people/";
    // POST http://localhost:5000/api/people/
    const peticionPost = async() => {
        await axios.post(BASE_URL, usuarioSeleccionado).then(res => {
            setData(data.concat(res.data));
            abrirCerrarModalInsertar();
            Toast.fire({
                icon: 'success',
                title: 'Usuario añadido'
            });
            window.location.reload();
        }).catch(
            abrirCerrarModalInsertar(),
            Toast.fire({
                icon: 'error',
                title: 'Faltan datos por llenar'
            })
        );
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setUsuarioSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(usuarioSeleccionado);
    };

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    };

    const useStyles = makeStyles((theme) => ({
        modal: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }));

    const bodyInsertar = (
        <div className = { useStyles.modal }>
            <div className="modal">
                <h3>Agregar nuevo usuario</h3>
                <div className="modalInput">
                    <input type="text" name="nombre" className={ useStyles.inputMaterial } placeholder="Nombre" onChange={ handleChange }/>
                    <input type="text" name="apellido" className={ useStyles.inputMaterial } placeholder="Apellido" onChange={ handleChange } />
                    <input type="number" name="edad" className={ useStyles.inputMaterial } placeholder="Edad" onChange={ handleChange } />
                </div>
                <div className="modalButton">
                    <button className="done" onClick={ () => peticionPost() }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Insertar</span>
                    </button>
                    <button className="cancel" onClick={ () => abrirCerrarModalInsertar() }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>Cancelar</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const MODALS = (
        <div>
            <Modal
                open = { modalInsertar }
                onClose = { abrirCerrarModalInsertar }>
                { bodyInsertar }
            </Modal>
        </div>
    );

    return (
        <div className="addPeople">
            <button onClick={ ()=>abrirCerrarModalInsertar() }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                <span>Agregar Usuario</span>
            </button>
            { MODALS }
        </div>
    );
}

export default AddPeople;
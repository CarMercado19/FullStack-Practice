import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Edit, Delete } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Modal } from "@material-ui/core";

const TablaUI = () => {

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        nombre: '',
        apellido: '',
        edad: ''
    });

    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const BASE_URL = "/api/people/";
    // GET http://localhost:5000/api/people/
    const peticionGet = async() => {
        await axios.get(BASE_URL).then( res => {
            setData(res.data);
        });
    };
    // PUT http://localhost:5000/api/people/1
    const peticionPut = async() => {
        await axios.put(BASE_URL + usuarioSeleccionado.id, usuarioSeleccionado).then(res => {
            var dataNueva = data;
            dataNueva.map(usuario => {
                if(usuarioSeleccionado.id === usuario.id) {
                    usuario.nombre = usuarioSeleccionado.nombre;
                    usuario.apellido = usuarioSeleccionado.apellido;
                }
            });
            setData(dataNueva);
            abrirCerrarModalEditar();
        });
    };
    // DELETE http://localhost:5000/api/people/1
    const peticionDelete = async() => {
        await axios.delete(BASE_URL + usuarioSeleccionado.id).then(res => {
            setData(data.filter(usuario => usuario.id !== usuarioSeleccionado.id ));
            abrirCerrarModalEliminar();
        });
    };

    useEffect(async() => {
        await peticionGet();
    }, []);

    const handleChange = e => {
        const {name, value} = e.target;
        setUsuarioSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(usuarioSeleccionado);
    };
    
    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    };

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    };

    const seleccionarUsuario = (usuario, caso) => {
        setUsuarioSeleccionado(usuario);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
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
        },
        iconos:{
            cursor: 'pointer',
            marginRight: '0.5rem'
        }, 
        inputMaterial:{
            width: '100%'
        }
    }));
    const styles = useStyles();

    const bodyEditar = (
        <div className={styles.modal}>
            <div className="modal">
                <h3>Editar Usuario</h3>
                <div className="modalInput">
                    <input type="text" name="nombre" className={ styles.inputMaterial } placeholder="Nombre" onChange={ handleChange } value={ usuarioSeleccionado && usuarioSeleccionado.nombre } />
                    <input type="text" name="apellido" className={ styles.inputMaterial } placeholder="Apellido" onChange={ handleChange } value={ usuarioSeleccionado && usuarioSeleccionado.apellido } />
                    <input type="number" name="edad" className={ styles.inputMaterial } placeholder="Edad" onChange={ handleChange } value={ usuarioSeleccionado && usuarioSeleccionado.edad } />
                </div>
                <div className="modalButton">
                    <button className="done" onClick={ () => peticionPut() }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Editar</span>
                    </button>
                    <button className="cancel" onClick={ () => abrirCerrarModalEditar() }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>Cancelar</span>
                    </button>
                </div>
            </div>
        </div>
    );
    
    const bodyEliminar = (
        <div className={styles.modal}>
            <div className="modalDelete">
                <span>¿Estás seguro que deseas eliminar el usuario <span><b>{usuarioSeleccionado && usuarioSeleccionado.nombre}</b></span>?</span>
                <div className="modalButton">
                    <button className="done" onClick={ () => peticionDelete() }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Sí</span>
                    </button>
                    <button className="cancel" onClick={ () => abrirCerrarModalEliminar() }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span>No</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const MATERIAL_TABLE_UI = (
        <div className="table">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><span>ID</span></TableCell>
                            <TableCell><span>Nombre</span></TableCell>
                            <TableCell><span>Apellido</span></TableCell>
                            <TableCell><span>Edad</span></TableCell>
                            <TableCell><span>Acciones</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(usuario => (
                            <TableRow key = { usuario.id }>
                                <TableCell>{ usuario.id }</TableCell>
                                <TableCell>{ usuario.nombre }</TableCell>
                                <TableCell>{ usuario.apellido }</TableCell>
                                <TableCell>{ usuario.edad }</TableCell>
                                <TableCell>
                                    <Edit className={ styles.iconos } onClick={ () => seleccionarUsuario(usuario, 'Editar') }/>
                                    <Delete className={ styles.iconos } onClick={ () => seleccionarUsuario(usuario, 'Eliminar') }/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

    const MODALS = (
        <div>
            <Modal
                open = { modalEditar }
                onClose = { abrirCerrarModalEditar }>
                { bodyEditar }
            </Modal>
            
            <Modal
                open = { modalEliminar }
                onClose = { abrirCerrarModalEliminar }>
                { bodyEliminar }
            </Modal>
        </div>
    );

    return (
        <div className="tablaUI">
            { MATERIAL_TABLE_UI }
            { MODALS }
        </div>
    );
}

export default TablaUI;
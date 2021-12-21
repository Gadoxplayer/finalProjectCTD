import React, { useEffect, useState, useContext } from "react";
import { Contexto } from "../Contexto/Contexto";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Card from "../Card/Card";
import "./crudadmin.scoped.css";
import useService from "../../hooks/useService";

export default function CRUDadmin() {
  const [session] = useLocalStorage("session", {});
  const { estado, setEstado } = useContext(Contexto);

  // Configuramos las llamadas al API, usando useService
  const {
    api: getCiudades,
    data: ciudades,
    response: responseCiudades,
  } = useService();

  const {
    api: getCategorias,
    data: categorias,
    response: responseCategorias,
  } = useService();

  const {
    api: getProductos,
    data: productos,
    response: responseProductos,
  } = useService();

  // Al recibir respuesta de los endPoints actualizamos el contexto, incluimos la sessión
  useEffect(() => {
    setEstado((estado) => ({
      ...estado,
      ciudades,
      categorias,
      productos,
      session,
    }));
  }, [ciudades, categorias, productos]);

  // Ejecutar las llamadas a los diferentes endPoints
  const consultarAPI = async () => {
    await getProductos({ resource: "/productos" });
    await getCiudades({ resource: "/ciudades" });
    await getCategorias({ resource: "/categorias" });
  };

  // Ejecutar solo al montar el componentes
  useEffect(() => consultarAPI(), []);

  const [show, setShow] = useState(true);
  let CardL;
  CardL = (
    <div className="contenedor-cards">
      {productos?.map((data, index) => {
        return (
          <div>
            <Card data={data} key={index} />
            <p onClick={() => remCard(index)} className="cerrarX" >
              x
            </p>
          </div>
        );
      })}
    </div>
  );
  function remCard(index){
    index = CardL.index
    setShow(false)
  }
  if (!show) {
    CardL = <></>;
  }

  return (
    <>
    <div>
      <h3>Header</h3>
      <div className="contenedorTitulo">
        <h2>Listado de autos en base de datos</h2>
        <button className="botonCrear">Crear un nuevo auto</button>
      </div>
      <div className="contenedorC">{CardL}</div>
      <h3>Footer</h3>
    </div>
    </>
  );
}

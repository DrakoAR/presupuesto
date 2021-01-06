import React, { useState } from "react";
import PropTypes from "prop-types";
import Error from "./error.js";
import shortid from "shortid";
const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
	const [nombre, guardarNombre] = useState("");
	const [cantidad, guardarCantidad] = useState("");
	const [error, guardarError] = useState(false);

	// Evita que gastos cantidad de error cuando se borran los valores
	// const definirCantidad = (e) => {
	// 	//Problema is NaN
	// 	if (Number.isNaN(parseInt(e.target.value, 10))) {
	// 		guardarCantidad("");
	// 	} else {
	// 		guardarCantidad(Number(e.target.value, 10));
	// 	}
	// };
	const agregarGasto = (e) => {
		e.preventDefault();

		//validar

		if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === "") {
			guardarError(true);
			return;
		}
		guardarError(false);

		//construir gasto
		const gasto = {
			nombre,
			cantidad,
			id: shortid.generate(),
		};
		//pasar el gasto al componente principal
		guardarGasto(gasto);
		guardarCrearGasto(true);
		//resetear formulario
		guardarNombre("");
		guardarCantidad("");
	};
	return (
		<form onSubmit={agregarGasto}>
			<h2>Agregar datos</h2>
			{error ? (
				<Error mensaje="Ambos campos son obligatorios o Presupuesto incorrecto" />
			) : null}

			<div className="campo">
				<label>Nombe Gastos</label>
				<input
					type="text"
					className="u-full-width"
					placeholder="Ej. Transporte"
					value={nombre}
					onChange={(e) => guardarNombre(e.target.value)}
				/>
			</div>

			<div className="campo">
				<label>Cantidad Gastos</label>
				<input
					type="number"
					className="u-full-width"
					placeholder="Ej. 300"
					value={cantidad}
					onChange={(e) =>
						Number.isNaN(parseInt(e.target.value, 10))
							? guardarCantidad("")
							: guardarCantidad(Number(e.target.value, 10))
					}
				/>
			</div>
			<input
				type="submit"
				className="button-primary full-width"
				value="Agregar Gasto"
			/>
		</form>
	);
};
Formulario.propTypes = {
	guardarGasto: PropTypes.func.isRequired,
	guardarCrearGasto: PropTypes.func.isRequired,
};

export default Formulario;

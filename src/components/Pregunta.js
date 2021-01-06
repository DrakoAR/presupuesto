import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Error from "./error";
const Pregunta = ({
	guardarPresupuesto,
	guardarRestante,
	actualizarPregunta,
}) => {
	const [cantidad, guardarCantidad] = useState(0);
	// Funcion que lee el presupuesto
	const definirPresupuesto = (e) => {
		guardarCantidad(parseInt(e.target.value, 10));
	};

	const [error, guardarError] = useState(false);

	// Submit para definir funcion
	const agregarPresupuesto = (e) => {
		e.preventDefault();

		if (cantidad < 1 || isNaN(cantidad)) {
			guardarError(true);
			return;
		}
		guardarError(false);
		guardarPresupuesto(cantidad);
		guardarRestante(cantidad);
		actualizarPregunta(false);
	};

	return (
		<Fragment>
			<h2>Coloca tu presupuesto</h2>

			{error ? <Error mensaje="El Presupuesto es incorrecto" /> : null}

			<form onSubmit={agregarPresupuesto}>
				<input
					type="number"
					className="u-full-width"
					placeholder="coloca tu presupuesto"
					onChange={definirPresupuesto}
				/>

				<input
					type="submit"
					className="button-primary u-full-width"
					value="Definir Presupuesto"
				/>
			</form>
		</Fragment>
	);
};
Pregunta.propTypes = {
	guardarPresupuesto: PropTypes.func.isRequired,
	guardarRestante: PropTypes.func.isRequired,
	actualizarPregunta: PropTypes.func.isRequired,
};

export default Pregunta;

import React, { Component } from "react";
import PropTypes from "prop-types";

class Openlibra extends Component {
  // Elimiaciones de las tarjetas guardadas del cliente
  getbook = () =>
    new Promise(async (resolve, reject) => {
      try {
        const GetBook = await fetch(
          "https://www.etnassoft.com/api/v1/get/?get_categories=all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const getbook = await GetBook.json();
        resolve(getbook);
      } catch (error) {
        reject(error);
      }
    });
}

Openlibra.propTypes = { children: PropTypes.func.isRequired };

export default Openlibra;

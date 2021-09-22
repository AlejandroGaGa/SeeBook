import React, { Component } from "react";
import PropTypes from "prop-types";

class Openlibra extends Component {

  getcategories = () =>
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
        const getcategories = await GetBook.json();
        resolve(getcategories);
      } catch (error) {
        reject(error);
      }
    });
}

Openlibra.propTypes = { children: PropTypes.func.isRequired };

export default Openlibra;

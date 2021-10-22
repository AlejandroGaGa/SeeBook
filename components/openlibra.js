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
  //obtener libros topic
  getbookstop = () =>
    new Promise(async (resolve, reject) => {
      try {
        const GetBooks = await fetch(
          "https://www.etnassoft.com/api/v1/get/?publisher_date=2019",
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const getbookstop = await GetBooks.json();
        resolve(getbookstop);
      } catch (error) {
        reject(error);
      }
    });
  //obtener libros topic
  listbd = () =>
    new Promise(async (resolve, reject) => {
      try {
        const GetBooks = await fetch(
          "http://192.168.15.170:7010/api/Producto/ListProducts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const getbookstop = await GetBooks.json();
        resolve(getbookstop);
      } catch (error) {
        reject(error);
      }
    });
  showid = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        const GetBooks = await fetch(
          "http://192.168.15.170:7010/api/Producto/Search/" + id + "",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const getbookstop = await GetBooks.json();
        resolve(getbookstop);
      } catch (error) {
        reject(error);
      }
    });
}

Openlibra.propTypes = { children: PropTypes.func.isRequired };

export default Openlibra;

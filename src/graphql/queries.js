/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMyBooks = /* GraphQL */ `
  query GetMyBooks($id: ID!) {
    getMyBooks(id: $id) {
      id
      idUser
      idBook
      createdAt
      updatedAt
    }
  }
`;
export const listMyBooks = /* GraphQL */ `
  query ListMyBooks(
    $filter: ModelmyBooksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMyBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        idUser
        idBook
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

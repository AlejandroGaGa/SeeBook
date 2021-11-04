/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMyBooks = /* GraphQL */ `
  mutation CreateMyBooks(
    $input: CreateMyBooksInput!
    $condition: ModelmyBooksConditionInput
  ) {
    createMyBooks(input: $input, condition: $condition) {
      id
      idUser
      idBook
      createdAt
      updatedAt
    }
  }
`;
export const updateMyBooks = /* GraphQL */ `
  mutation UpdateMyBooks(
    $input: UpdateMyBooksInput!
    $condition: ModelmyBooksConditionInput
  ) {
    updateMyBooks(input: $input, condition: $condition) {
      id
      idUser
      idBook
      createdAt
      updatedAt
    }
  }
`;
export const deleteMyBooks = /* GraphQL */ `
  mutation DeleteMyBooks(
    $input: DeleteMyBooksInput!
    $condition: ModelmyBooksConditionInput
  ) {
    deleteMyBooks(input: $input, condition: $condition) {
      id
      idUser
      idBook
      createdAt
      updatedAt
    }
  }
`;

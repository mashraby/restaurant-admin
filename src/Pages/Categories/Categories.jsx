import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { QueryContext } from "../../Context/QueryContext";

const NEW_CATEGORIE = gql`
  mutation ($name: String!, $imgUrl: String!) {
    newCategorie(name: $name, img_url: $imgUrl) {
      id
      name
      img_url
    }
  }
`;

const DELETE_CATEGORIE = gql`
  mutation ($deleteCategorieId: ID!) {
    deleteCategorie(id: $deleteCategorieId) {
      name
    }
  }
`;

export default function Categories() {
  const [variables, setVariables] = useState({
    name: "",
    imgUrl: "",
  });

  const { categories } = useContext(QueryContext);

  const [newCategorie] = useMutation(NEW_CATEGORIE, {
    onError: (err) =>
      alert(
        "Serverda muammo bo'lganligi uchun categorielar ro'yhatiga qo'shilmadi :("
      ),
    onCompleted: (data) => {
      alert("Categorie muvafaqiyatli qo'shildi :)");
      window.location.reload();
    },
  });

  const [deleteCategorie] = useMutation(DELETE_CATEGORIE, {
    onCompleted: (data) => alert("Muvaffaqiyatli o'chirildi :)"),
    onError: (err) => console.log(err),
  });

  const handleCategorie = (e) => {
    e.preventDefault();

    newCategorie({ variables });

    window.location.reload();
  };

  const deleteCtgSubmit = (e) => {
    deleteCategorie({
      variables: { deleteCategorieId: e.target.id },
    });

    window.location.reload();
  };

  return (
    <>
      <div className="row">
        <Sidebar className="col-4" />
        <div className="wrapper-table col-8 ml-5">
          <div className="d-flex justify-content-content align-items-center p-5">
            <h1 className="m-0">Categories</h1>
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="btn btn-primary ms-auto"
            >
              Add Categories
            </button>
          </div>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">#Categorie ID</th>
                <th scope="col">Categorie Name</th>
                <th scope="col">Delete Categorie</th>
              </tr>
            </thead>
            <tbody>
              {categories?.categories &&
                categories?.categories.map((e) => (
                  <tr key={e.id}>
                    <th scope="row">{e.id}</th>
                    <td>
                      <h5>{e.name}</h5>
                    </td>
                    <td>
                      <button
                        id={e.id}
                        onClick={(e) => deleteCtgSubmit(e)}
                        className="btn btn-danger"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={(e) => handleCategorie(e)} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Categorie Name
                </label>
                <input
                  onChange={(e) =>
                    setVariables({ ...variables, name: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Categorie img url
                </label>
                <input
                  onChange={(e) =>
                    setVariables({ ...variables, imgUrl: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

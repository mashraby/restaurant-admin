import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { QueryContext } from "../../Context/QueryContext";

const NEW_RESTAURANT = gql`
  mutation ($name: String!, $imgUrl: String!, $ctgId: ID!) {
    newRestaurant(name: $name, img_url: $imgUrl, ctgId: $ctgId) {
      name
    }
  }
`;

const DELETE_RESTAURANT = gql`
  mutation ($deleteRestaurantId: ID!) {
    deleteRestaurant(id: $deleteRestaurantId) {
      name
    }
  }
`;

export default function Restaurants() {
  const { categories, restaurants } = useContext(QueryContext);

  const [variables, setVariables] = useState({
    name: "",
    imgUrl: "",
    ctgId: "",
  });

  const [newRestaurant] = useMutation(NEW_RESTAURANT);

  const [deleteRestaurant] = useMutation(DELETE_RESTAURANT, {
    onError: (err) => console.log(err),
    onCompleted: (data) => alert("Muvaffaqiyatli o'shirildi :)"),
  });

  const createRest = (e) => {
    e.preventDefault();

    newRestaurant({ variables });

    window.location.reload();
  };

  const deleteRest = (e) => {
    deleteRestaurant({
      variables: {
        deleteRestaurantId: e.target.id,
      },
    });
    window.location.reload();
  };

  return (
    <>
      <div className="row">
        <Sidebar className="col-4" />
        <div className="wrapper-table col-8 ml-5">
          <div className="d-flex justify-content-content align-items-center p-5">
            <h1 className="m-0">Restaurants</h1>
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop1"
              className="btn btn-primary ms-auto"
            >
              Add Restaurant
            </button>
          </div>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">#Restaurant ID</th>
                <th scope="col">Restaurant Name</th>
                <th scope="col">Delete Restaurant</th>
              </tr>
            </thead>
            <tbody>
              {restaurants?.restaurantsAll &&
                restaurants?.restaurantsAll.map((e) => (
                  <tr key={e.id}>
                    <th scope="row">{e.id}</th>
                    <td>
                      <h5>{e.name}</h5>
                    </td>
                    <td>
                      <button
                        id={e.id}
                        onClick={(e) => deleteRest(e)}
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
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={(e) => createRest(e)} className="modal-content">
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
                <label className="form-label" htmlFor="">
                  Qaysi Categorie bo'yicha Restoran qo'shmoqchisiz
                </label>
                <select
                  onChange={(e) =>
                    setVariables({ ...variables, ctgId: e.target.value })
                  }
                  name="ctgId"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option disabled selected>
                    Categorieni tanlang
                  </option>
                  {categories?.categories &&
                    categories?.categories.map((e) => {
                      return (
                        <option key={e.id} value={e.id}>
                          {e.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Restaurant Name
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
                  Restaurant img url
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

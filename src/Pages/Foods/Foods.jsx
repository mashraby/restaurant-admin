import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { QueryContext } from "../../Context/QueryContext";

const NEW_FOOD = gql`
  mutation ($name: String!, $price: String!, $imgUrl: String!, $rstId: ID!) {
    newFood(name: $name, price: $price, img_url: $imgUrl, rstId: $rstId) {
      name
    }
  }
`;

const DELETE_FOOD = gql`
  mutation ($deleteFoodId: ID!) {
    deleteFood(id: $deleteFoodId) {
      name
    }
  }
`;

export default function Foods() {
  const { foods, restaurants } = useContext(QueryContext);

  const [variables, setVariables] = useState({
    name: "",
    price: "",
    imgUrl: "",
    rstId: "",
  });

  const [createFood] = useMutation(NEW_FOOD, {
    onCompleted: (data) => {
      alert("Food muvaffaqaiyatli qo'shildi");
    },
    onError: (err) => console.log(err),
  });

  const [deleteFood] = useMutation(DELETE_FOOD, {
    onCompleted: (data) => alert("Muvaffaqiyatli o'chirildi :)"),
  });

  const createdFoodSubmit = (e) => {
    e.preventDefault();

    createFood({ variables });

    window.location.reload();
  };

  const deletedFood = (e) => {
    deleteFood({
      variables: {
        deleteFoodId: e.target.id,
      },
    });
    window.location.reload();
  };

  return (
    <>
      <div className="row">
        <Sidebar className="col-4" />
        <div className="col-8 wrapper-table">
          <div className="d-flex justify-content-content align-items-center p-5">
            <h1 className="m-0">Foods</h1>
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop2"
              className="btn btn-primary ms-auto"
            >
              Add Food
            </button>
          </div>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">#Food ID</th>
                <th scope="col">Food Name</th>
                <th scope="col">Food Price</th>
                <th scope="col">Delete Food</th>
              </tr>
            </thead>
            <tbody>
              {foods?.foodsAll &&
                foods?.foodsAll.map((e, i) => (
                  <tr key={e.id}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <h5>{e.name}</h5>
                    </td>
                    <td>
                      <h5>{e.price} So'm</h5>
                    </td>
                    <td>
                      <button
                        id={e.id}
                        onClick={(e) => deletedFood(e)}
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
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form
            onSubmit={(e) => createdFoodSubmit(e)}
            className="modal-content"
          >
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
                <label htmlFor="" className="form-label">
                  Qaysi Restarauntga ovqat qo'shmoqchisiz
                </label>
                <select
                  onChange={(e) =>
                    setVariables({ ...variables, rstId: e.target.value })
                  }
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Restaurantni tanlang</option>
                  {restaurants?.restaurantsAll &&
                    restaurants?.restaurantsAll.map((e) => {
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
                  Food Name
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
                  Food Price
                </label>
                <input
                  onChange={(e) =>
                    setVariables({ ...variables, price: e.target.value })
                  }
                  type="number"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Food img url
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

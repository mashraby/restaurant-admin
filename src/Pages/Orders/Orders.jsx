import { gql, useQuery } from "@apollo/client";
import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";

const GET_ORDERS = gql`
  query {
    orders {
      id
      client
      location
      phone
      purchase
      time
    }
  }
`;

export default function Orders() {
  const { data, loading, error } = useQuery(GET_ORDERS);

  return (
    <div className="row">
      <Sidebar className="col-4" />
      <div className="wrapper-table col-8 ml-5">
        <div className="d-flex justify-content-content align-items-center p-5">
          <h1 className="m-0">Orders</h1>
        </div>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#Order ID</th>
              <th scope="col">Order Client</th>
              <th scope="col">Order Address</th>
              <th scope="col">Order Phone Number</th>
              <th scope="col">Order Purchase</th>
              <th scope="col">Order Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders &&
              data?.orders.map((e) => (
                <tr key={e.id}>
                  <th scope="row">{e.id}</th>
                  <td>
                    <h5>{e.client}</h5>
                  </td>
                  <td>
                    <h5>{e.location}</h5>
                  </td>
                  <td>
                    <h5>{e.phone}</h5>
                  </td>
                  <td>
                    <h5>{e.purchase}</h5>
                  </td>
                  <td>
                    <h5>{e.time}</h5>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

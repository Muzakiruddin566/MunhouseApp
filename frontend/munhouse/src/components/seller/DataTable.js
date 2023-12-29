import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./DataTable.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteAdvertisement } from "../../utils/api";
import Notification from "../Notification";
import { useNavigate } from "react-router-dom";
const DataTable = ({ rowData }) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setTableData(rowData);
  }, [rowData]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 1000); 
  };

  const columnDefs = [
    { headerName: "Address", field: "address" },
    { headerName: "Postal Code", field: "postal_code" },
    { headerName: "Price", field: "price" },
    {
      headerName: "Description",
      field: "description",
      cellRenderer: (params) => (
        <div dangerouslySetInnerHTML={{ __html: params.data.description }} />
      ),
    },
    { headerName: "Area", field: "area" },
    { headerName: "Washrooms", field: "no_of_washrooms" },
    { headerName: "Bedrooms", field: "no_of_bedrooms" },
    {
      headerName: "Images",
      field: "media",
      cellRenderer: (params) =>
        params.value.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`House ${index}`}
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
        )),
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => {
        const handleEdit = () => {
          navigate(`/postproperty/${params.data._id}`)
          console.log("Edit clicked for row:", params.data._id);
        };

        const handleDelete = async () => {
          try {
            const response = await deleteAdvertisement(params.data._id);
            if (response.success) {
              console.log("Advertisement deleted successfully!");

              const updatedTableData = tableData.filter(item => item._id !== params.data._id);
              setTableData(updatedTableData);
              showNotification('Property deleted successfully!');
            } else {
              console.error("Error deleting advertisement:", response.error);
            }
          } catch (error) {
            console.error("Unexpected error deleting advertisement:", error);
          }
        };

        return (
          <div>
            <button
              onClick={handleEdit}
              style={{
                backgroundColor: "#3498db",
                color: "#fff",
                padding: "10px",
                marginRight: "10px",
              }}
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              style={{
                backgroundColor: "#e74c3c",
                color: "#fff",
                padding: "10px",
                marginRight: "10px",
              }}
            >
              <FaTrashAlt />
            </button>
          </div>
        );
      },
      width: 120,
      suppressSizeToFit: true,
    },
  ];

  return (
    <div>
        {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
    <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={tableData}  
        domLayout="autoHeight"
        pagination={true}
        paginationPageSize={10}
      />
    </div>
    </div>
  );
};

export default DataTable;


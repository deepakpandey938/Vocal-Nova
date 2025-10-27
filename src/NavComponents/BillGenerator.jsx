import React, { useState } from "react";
import './BillGenerator.css';
import jsPDF from "jspdf";
import "jspdf-autotable";


const BillGenerator = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    name: "",
    description: "",
    quantity: 1,
    price: "",
    tax: "",
    discount: "",
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
    setErrorMessage(""); // Clear the error message when the user types
  };

  const calculateItemTotal = (item) => {
    const priceWithTax = item.price * (1 + item.tax / 100);
    const priceAfterDiscount = priceWithTax * (1 - item.discount / 100);
    return priceAfterDiscount * item.quantity;
  };

  const addItem = () => {
    // Check if all required fields are filled
    if (
      !currentItem.name ||
      !currentItem.description ||
      !currentItem.price ||
      currentItem.tax === "" ||
      currentItem.discount === ""
    ) {
      setErrorMessage("Please fill in all fields before adding an item.");
      return;
    }

    const newItem = {
      ...currentItem,
      quantity: Number(currentItem.quantity),
      price: Number(currentItem.price),
      tax: Number(currentItem.tax),
      discount: Number(currentItem.discount),
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    setTotalAmount(
      updatedItems.reduce((total, item) => total + calculateItemTotal(item), 0)
    );

    // Reset the current item fields
    setCurrentItem({
      name: "",
      description: "",
      quantity: 1,
      price: "",
      tax: "",
      discount: "",
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Bill Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const tableData = items.map((item, index) => [
      index + 1,
      item.name,
      item.description,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `${item.tax}%`,
      `${item.discount}%`,
      `$${calculateItemTotal(item).toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [
        [
          "#",
          "Item Name",
          "Description",
          "Quantity",
          "Price (Per Unit)",
          "Tax (%)",
          "Discount (%)",
          "Total",
        ],
      ],
      body: tableData,
      startY: 40,
    });

    doc.setFontSize(14);
    doc.text(
      `Total Amount: $${totalAmount.toFixed(2)}`,
      14,
      doc.lastAutoTable.finalY + 20
    );

    doc.save("bill-report.pdf");
  };

  return (
    <div className="outside-container-vox">
      <h1>Bill Generator</h1>
      <div style={{ marginBottom: "20px" }}>
        <div className="inner-box-container">
          <div className="items-box-billgenerator">
            <label className="label-billgenerator">Item Name</label>
   
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={currentItem.name}
              onChange={handleInputChange}
              className="input-billgenerator"
            />
          </div>
          <div className="items-box-billgenerator">
            <label className="label-billgenerator">GST Number</label>
       
            <input
              type="text"
              name="description"
              placeholder="GST Number"
              value={currentItem.description}
              onChange={handleInputChange}
              className="input-billgenerator"
            />
          </div>
          <div className="items-box-billgenerator">
            <label className="label-billgenerator">Quantity</label>
        
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={currentItem.quantity}
              onChange={handleInputChange}
              className="input-billgenerator"
            />
          </div>
          <div className="items-box-billgenerator">
            <label className="label-billgenerator">Price (Per Unit)</label>
         
            <input
              type="number"
              name="price"
              placeholder="Price (Per Unit)"
              value={currentItem.price}
              onChange={handleInputChange}
              className="input-billgenerator"
            />
          </div>    </div>
          <div className="inner-box-container">
          <div className="items-box-billgenerator">
            <label className="label-billgenerator">Tax (%)</label>
     
            <input
              type="number"
              name="tax"
              placeholder="Tax (%)"
              value={currentItem.tax}
              onChange={handleInputChange}
              className="input-billgenerator"
            />
          </div>
          <div className="items-box-billgenerator">
            <label className="label-billgenerator">Discount (%)</label>
         
            <input
              type="number"
              name="discount"
              placeholder="Discount (%)"
              value={currentItem.discount}
              onChange={handleInputChange}
              className="input-billgenerator"
            />
          </div>
        </div>
        {errorMessage && (
          <p style={{ color: "red", marginLeft: "15px" }}>{errorMessage}</p>
        )}
        <button
          onClick={addItem}
          style={{
            padding: "10px 30px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "2px",
            cursor: "pointer",
            marginLeft: "15px",
          }}
        >
          Add Item
        </button>
      </div>

      {items.length > 0 && (
        <div>
          <h2
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
              fontSize: "20px",
              marginLeft: "15px",
            }}
          >
            Bill Report
          </h2>
          {/* Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
              fontSize: "16px",
              marginLeft: "15px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid #ddd" }}>
                <th style={{ textAlign: "left", padding: "8px" }}>S.No</th>
                <th style={{ textAlign: "left", padding: "8px" }}>Item Name</th>
                <th style={{ textAlign: "left", padding: "8px" }}>
                  GST Bill Number
                </th>
                <th style={{ textAlign: "left", padding: "8px" }}>Quantity</th>
                <th style={{ textAlign: "left", padding: "8px" }}>
                  Price (Per Unit)
                </th>
                <th style={{ textAlign: "left", padding: "8px" }}>Tax (%)</th>
                <th style={{ textAlign: "left", padding: "8px" }}>
                  Discount (%)
                </th>
                <th style={{ textAlign: "left", padding: "8px" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px" }}>{index + 1}</td>
                  <td style={{ padding: "8px" }}>{item.name}</td>
                  <td style={{ padding: "8px" }}>{item.description}</td>
                  <td style={{ padding: "8px" }}>{item.quantity}</td>
                  <td style={{ padding: "8px" }}>₹{item.price.toFixed(2)}</td>
                  <td style={{ padding: "8px" }}>{item.tax}%</td>
                  <td style={{ padding: "8px" }}>{item.discount}%</td>
                  <td style={{ padding: "8px" }}>
                  ₹{calculateItemTotal(item).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3
            style={{
              fontSize: "20px",
              marginLeft: "15px",
            }}
          >
            Total Amount: ₹{totalAmount.toFixed(2)}
          </h3>
          <button
            onClick={generatePDF}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginLeft: "412px",
            }}
          >
            Download Bill Report
          </button>
        </div>
      )}
    </div>
  );
};

export default BillGenerator;


import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Add from './Add';
import Edit from './Edit';
function Cform() {

    const [item, setitem] = useState(()=>{
      const response=localStorage.getItem("item");
      const value=JSON.parse(response);
      return value || "";
    });

  
    const [showAddModal, setshowAddModal] = useState(false)
    //edit
    const [showEditModal, setshowEditModal] = useState(false)
    const [selecteditem, setselecteditem] = useState({})
   
    useEffect(()=>{
        fetchitem();
        //localStorage.setItem(item);
    },[]);
    
  
    let fetchitem= async()=>{
        try{
          localStorage.setItem("item",JSON.stringify(item))
           const response=JSON.parse(localStorage.setItem("item"))
            console.log(response.data);

            if(response.data.error) {
                const errMessage=response.data.message;
            }

            else{
                const fetcheditems=JSON.parse(localStorage.getItem('response'));
                //return fetcheditems;
                setitem(fetcheditems);
            }
        }catch(err)
        {
            console.log(err);
        }
    };

    //add product moodal
    let updateShowAddModal=()=>{
        setshowAddModal(true);
    }
    let hideShowAddModal=()=>{
        setshowAddModal(false);
    }

    //edit
    let updateselecteditem=(item)=>{
        setshowEditModal(true);
        setselecteditem(item);
    }

    let hideShowEditModal=()=>{
        setshowEditModal(false);
    }

    
    let deleteProduct=async(itemId)=>{
       try{
          let response=localStorage.setItem("item",JSON.stringify(item));
           if(response.data.error){
               alert(response.data.message);
            }else{
               fetchitem();
            }
        }catch(err)
        {
           alert(err.message);
      }
    }

    return (
        <div>
            <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Cirtification Name</th>
            <th>cirtificationfrom</th>
            <th>Yearofcomplition</th>
            <th>
              <button className="btn btn-warning" onClick={updateShowAddModal}>
                ADD
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {item.length > 0 &&
            item.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.cirtificationName}</td>
                  <td>{item.cirtificationfrom}</td>
                  <td>{item.Yearofcomplition}</td>
                  <td>
                  <button
                      className="btn btn-primary"
                      onClick={() => {
                        updateselecteditem(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteProduct(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Add
        showAddModal={showAddModal}
        hideShowAddModal={hideShowAddModal}
        fetchProducts={fetchitem}
      />

       <Edit
        showEditModal={showEditModal}
        hideShowEditModal={hideShowEditModal}
        selectedProduct={selecteditem}
        fetchProducts={fetch}
      />
        </div>
    )
}

export default Cform

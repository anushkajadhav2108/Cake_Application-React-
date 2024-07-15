import { useState, useEffect } from 'react';
import axios from 'axios';

const Callingapi = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [productData, setProductData] = useState(null);
  const [searchTerm,setSearchTerm] = useState('');

  useEffect(() => {
     setTimeout(() => {
      axios.get('http://localhost:3000/product')
       .then((response) => {
         console.log(response);
         setProductData(response.data);
         setIsLoaded(true);
         console.log('Count of Cakes Loaded: ',response.data.length);

       })
       .catch((error) => {
         console.log(error);
         setIsLoaded(true); 
         
       });                                                                                    

     }, 1000);                                                                                     
  }, []);


const handleAdd = () =>{
 
  let AddNewCakeName = prompt('Enter cake name: ');
  let AddNewCakePrice = prompt('Enter the cake price: ');
  let AddNewCakeImg = prompt('Enter img URL: ');

  let AddCakes ={
    name : AddNewCakeName,
    price: AddNewCakePrice,
    img: AddNewCakeImg
  }

  axios.post(`http://localhost:3000/product`,AddCakes)
  .then((response)=>{
    console.log(response);
    setProductData([...productData,response.data])
  })
  .catch((error)=>{
    console.log(error);
  })
}


const handleEdit = (idToEdit) =>{
    console.log('I am'+idToEdit);
    let NewCakeName = prompt('Enter the new cake name: ');
    let NewCakePrice = prompt('Enter new cake price: ');
    let NewCakeImg = prompt('Enter cake image URL: ');

    let updateProduct = {
      id: idToEdit,
      name: NewCakeName,
      price: NewCakePrice,
      img: NewCakeImg
    };

    axios.put(`http://localhost:3000/product/${idToEdit}`, updateProduct)
    .then((response)=>{
      console.log(response);
      setProductData(productData.map(product => 
        product.id === idToEdit ? updateProduct : product
      ))
    })
    .catch((error)=>{
      console.log(error);
    });
}; 


const handleDelete = (id) =>{

  axios.delete(`http://localhost:3000/product/${id}`)
  .then((response)=>{
    console.log(response)
    setProductData(productData.filter(product=> product.id !== id));
  })
  .catch((error)=>{
    console.log(error);
  })
}

const filterProduct = productData ? productData.filter(product=>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
):[];


  return (
    <div>
      {!isLoaded ? (
        <h1>Loading....</h1>
      ) : (
        productData && (
          <>
            <h1 >
              All Products
            </h1>

          <div className='search-bar'>
            <input type="text" 
            placeholder='Search Cakes...'
            value={searchTerm}
            onChange={(event)=>setSearchTerm(event.target.value)}
            />&nbsp; &nbsp;
            <button onClick={handleAdd} className='add-cakes'>Add Cakes</button>
          </div>

            <div className="product-list">
              {
              filterProduct.map((product) => (
                <div key={product.id} className="product-item"> 
                  <img src={product.img} />
                  <h3>{product.name}</h3>
                  <span>${product.price}</span>

                  <button  onClick={()=>handleEdit(product.id)} className="edit">Edit</button> &nbsp;
                  <button  onClick={()=>handleDelete(product.id)} className="delete">Delete</button> &nbsp;
                  <button className="add">Add To Cart</button> &nbsp;

                </div>
              ))}
              </div>
          </>
        )
      )}
    </div>
  );
};

export default Callingapi;

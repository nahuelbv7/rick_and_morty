import "./Card.css"

export default function Card({id, name, status, species, gender, origin, image, onClose}) {  //ESTO LO ENVIAMOS DESDE APP.JS (de la function App)
   return (
      <div className="card">
         
         <button onClick={onClose}>X</button>         
         <h2>{name}</h2>
         <h2>{status}</h2>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <h2>{origin}</h2>
         <img src={image} alt={name} /> 
      </div>
   );
}

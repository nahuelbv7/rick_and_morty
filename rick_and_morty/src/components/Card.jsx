import "./Card.css"

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFav, removeFav } from "../redux/actions/actions";
import { useEffect, useState } from "react";
 
function Card(props) {
   const { id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myFavorites } = props;
   
   const [isFav, setIsFav] = useState(false);

   function handleFavorite() {
      if (isFav) {
         setIsFav(false);
         removeFav(id);
      } else {
         setIsFav(true);
         addFav(props);
      }
   }
   
   useEffect(() => {
      myFavorites?.forEach((fav) => {
        if (fav.id === props.id) {
          setIsFav(true);
        }
      });
   }, [myFavorites]);

   return (
      <div className="card">
         {
            isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>♡</button>
            )
         }
         <button onClick={() => onClose(id)}>X</button>     
         <Link className="link" to={`/detail/${id}`} >
            <h2>{name}</h2>
            <h2>{origin}</h2>
            <img src={image} alt={name} /> 
         </Link>     
      </div>
   );
}

function mapStateToProps(state) {
   return {
      myFavorites: state.myFavorites
   }
}

function mapDispatchToProps(dispatch) {
   return {
      addFav: (character) => dispatch(addFav(character)),
      removeFav: (id) => dispatch(removeFav(id))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
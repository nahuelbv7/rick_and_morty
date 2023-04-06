export default function SearchBar({onSearch}) {
   return (
      <div>
         <input type='search' />
         <button onClick={() => {onSearch("ID NOT FOUND")}}>Agregar</button>
      </div>
   );
}

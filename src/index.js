//API para consumir informacion
//Web api
//Conectarnos al server
//TAREA usar asynk await
//Solución con async await
/* const fetchData = async () => {
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  let todosItemsAsync = [];
} */
const baseUrl = "https://platzi-avo.vercel.app";

const formatPrice = (price) => {

  const newPrice = new window.Intl.NumberFormat('en-EN', {
    style: "currency",
    currency: "USD"
  }).format(price)

  return newPrice;
}

const appNode = document.querySelector("#app")
window
  .fetch(`${baseUrl}/api/avo`)
  //Procesar la respuesta y convertila en Json
  .then(respuesta => respuesta.json())
  // Json => Data => Renderizar info en browser
  .then((responseJson) => {
    const todosItems = [];
    responseJson.data.forEach(item => {
      //crear el titulo
      const title = document.createElement('h2');
      title.textContent = item.name;
      title.className = "text-lg";
      //Crear la imagen
      const imagen = document.createElement('img');
      imagen.src = `${baseUrl}${item.image}`;
      imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

      //Crear el precio
      const price = document.createElement('div');
      price.textContent = formatPrice(item.price);
      price.className = "text-gray-600";


      //Creamos contenedor para precio y titulo
      const priceAndTitle = document.createElement("div")
        priceAndTitle.className = "text-center md:text-left";
        priceAndTitle.appendChild(title);
        priceAndTitle.appendChild(price);
      //Metemos todo en una tarjeta contenedora
      const card = document.createElement("div");
        card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
        card.append(imagen, priceAndTitle);

      /* Todo al contenedor principal */
      const container = document.createElement('div');
      container.append(card);

      todosItems.push(container)
    });
    appNode.append(...todosItems)
  })

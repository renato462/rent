
const input = document.getElementById('search');
const btnSearch = document.getElementById('btn-search');

const searchFor = () => {
    // Declare variables
    
    const filter = input.value.toUpperCase();
    const table = document.getElementById("table");
    const tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {

      let td1 = tr[i].getElementsByTagName("td")[1];
      let td2 = tr[i].getElementsByTagName("td")[2];
      let td3 = tr[i].getElementsByTagName("td")[3];
      let td4 = tr[i].getElementsByTagName("td")[4];
      
      
      if (td1 || td2 || td3 || td4) {
        let txtValue1 = td1.textContent || td1.innerText;
        let txtValue2 = td2.textContent || td2.innerText;
        let txtValue3 = td3.textContent || td3.innerText;
        let txtValue4 = td4.textContent || td4.innerText;

         if (txtValue1.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } 
        else if (txtValue2.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } 
        else if (txtValue3.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } 
        else if (txtValue4.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        }   
        else {
          tr[i].style.display = "none";
        }
      }
    }
  }

const keyUpHandler = () => {

        if (input.value.length > 5 ){
            searchFor();
        };
};

input.addEventListener('keyup',keyUpHandler);
btnSearch.addEventListener('click',searchFor);
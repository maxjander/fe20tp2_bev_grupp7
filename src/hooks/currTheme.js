let localPars;

const checkStorage =  localStorage.getItem('authUser');
const parsStorage = JSON.parse(checkStorage);

if(!parsStorage)
{
    localPars = {theme: "light"};
}
else{
    localPars = parsStorage
}

export default localPars;
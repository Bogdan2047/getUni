const dadada = (data) =>{
    
    let  string = `${data}.png`

arr =[ 'amd___23__45__67', "amd___23__45__60", "amd___23__45__62"]

    arr.find( (element)=>{
        if(element === `amd___23__45__${data}`) {
            console.log(element);
        } 
    })

    console.log(string);
}

dadada('foto')
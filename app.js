const getUrl = 'https://one00x-data-analysis.onrender.com/assignment/#/?email=m.borgaonker313@gmail.com';
const postUrl="https://one00x-data-analysis.onrender.com/assignment";
const getData = async() =>{
    const response = await fetch(getUrl);
    return response;
}

const postData =async(data) =>{
    const respone = await fetch(postUrl,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    
    const stat  = await respone.json();
    
    return stat;
}

const mostUsedWords =(words) =>{
    let ans = [];


    let freq=0;
    for(let i=0;i<100;i++){
        let count=0;
        for(let j=i+1;j<100;j++){
            if(words[i] == words[j])
            count ++;
        }
        if(count > freq){
            ans = [words[i]];
            freq = count;
        }
        else if(count == freq){
            ans.push(words[i]);
        }

    }
    return ans;

}

const runProgram =async() =>{
    try{
    const res= await getData();
    const assignmentId =  res.headers.get("x-assignment-id"); 

    const words = await res.json();
    const ans = mostUsedWords(words);

    for(let i=0;i<ans.length;i++){
        const stat = await postData({
            assignment_id: assignmentId,
            answer : ans[i]

        })
        console.log(`${stat.result} for ${ans[i]} word`);
    }
}
catch(error){
    console.error("error : ",error);
}
}

runProgram();
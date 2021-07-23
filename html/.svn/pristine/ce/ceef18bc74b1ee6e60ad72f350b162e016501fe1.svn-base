let sleep = async function(time){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('sleeping...');
            resolve();
        } , 1000 * time);
    })
}

async function start(){
    // console.log(123);
    // await sleep(2);
    // console.log(456);
    let arr = new Array(100);
    arr.fill(1);
    let time = new Date().getTime();
    // for(let i of arr){
    //     await sleep(0.1)
    // }
    // for(let i = 0 ; i < arr.length; i++){
    //     console.log(i);
    //     await sleep(2)
    // }
    arr.forEach(async (value,index) => {
        console.log(index);
        await sleep(2)
        // console.log(index,'******')
    })
    console.log((new Date().getTime() - time));
}

(async () => {
    await start();
})()


function sleep2(time){
    setTimeout(() => {
        console.log('sleeping...');
    },1000 * 2)
}
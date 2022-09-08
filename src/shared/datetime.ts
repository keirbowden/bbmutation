const getElapsedTimeString = (started) => {
    const finished=new Date().getTime();
    let elapsedMillis=finished-started;
    const hours=Math.floor(elapsedMillis/(3600*1000));
    elapsedMillis-=hours*(3600*1000);
    const minutes=Math.floor(elapsedMillis/(60*1000));
    elapsedMillis-=minutes*(60*1000);
    const seconds=Math.floor(elapsedMillis/1000);

    let result='';
    if (hours>0) {
        result+=hours + ' hour(s) ';
    }
    if (minutes>0) {
        result+=minutes + ' minute(s) ';
    }
    result+=seconds + ' seconds';

    return result
}


export { getElapsedTimeString }
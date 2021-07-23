/**
 * Created by zwt on 2018/9/12.
 */


function anchor_distance_formatter(value,row){
    if(!value) return value;
    var color = '';
    if(value < 5 || value>150){
        color = 'red'
    }else if(value <= 15 || value>70){
        color = 'orange'
    }else{
        color = 'green'
    }
    var span = '<span style="color:' + color + '">' + value.toFixed(2) + '</span>';
    return span;
}


function rssi_median_formatter(value,row){
    var color = '';
    if(value <= -80){
        color = 'red'
    }else if(value > -70){
        color = 'green'
    }else{
        color = 'orange'
    }
    var span = '<span style="color:' + color + '">' + value + '</span>';
    return span;
}

function lost_ratio_formatter(value,row){
    var num = Number(value);
    var color;
    if(num <= 5){
        color = 'green'
    }else if(num > 20){
        color = 'red'
    }else{
        color = 'orange'
    }
    var span = '<span style="color:' + color + '">' + value + '</span>';
    return span;
}

function error_ratio_formatter(value,row){
    var num = Number(value);
    var color;
    if(num <= 7.5){
        color = 'green'
    }else if(num > 30){
        color = 'red'
    }else{
        color = 'orange'
    }
    var span = '<span style="color:' + color + '">' + value + '</span>';
    return span;
}




